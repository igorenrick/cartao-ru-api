const Recarga = require('../models/RecargaModel')
const Usuario = require('../models/UsuarioModel')
const Cartao = require('../models/CartaoModel')
const Atividade = require('../models/AtividadeModel')

module.exports = {
    async list(req, res, next) {
        try {
            const recargas = await Recarga.find().sort('_id')

            return res.json(recargas)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async create(req, res, next) {
        try {
            const recarga = new Recarga(req.body)
            const dono = await Usuario.findOne({_id: recarga.dono})

            if(!dono.isento) {
                const cartao = await Cartao.findOne({_id: dono.cartao})
                const atividade = await Atividade.findOne({_id: dono.atividade})

                cartao.creditos = cartao.creditos + recarga.creditos

                atividade.recargas.push(recarga._id)

                await atividade.save()
                await cartao.save()
                await recarga.save()
            } else{
                recarga = 'Usuário isento. Não é possível fazer recargas nesta categoria.'
            }

            res.status(201).send({ recarga })
        } catch (error) {
            res.status(400).send(error)
        }
    }
}