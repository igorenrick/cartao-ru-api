const Uso = require('../models/UsoModel')
const Usuario = require('../models/UsuarioModel')
const Cartao = require('../models/CartaoModel')
const Atividade = require('../models/AtividadeModel')
const Restaurante = require('../models/RestauranteModel')

module.exports = {
    async list(req, res, next) {
        try {
            const usos = await Uso.find().sort('_id')

            return res.json(usos)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async create(req, res, next) {
        try {
            const uso = new Uso(req.body)

            const dono = await Usuario.findOne({_id: uso.dono})
            const local = await Restaurante.findOne({_id: uso.local})
            
            const cartao = await Cartao.findOne({_id: dono.cartao})
            const atividade = await Atividade.findOne({_id: dono.atividade})

            if(!dono.isento) {
                cartao.creditos = cartao.creditos - uso.creditos
            }
            local.usos = local.usos + uso.creditos

            atividade.usos.push(uso._id)

            await atividade.save()
            await cartao.save()
            await local.save()
            await uso.save()

            res.status(201).send({ uso })
        } catch (error) {
            res.status(400).send(error)
        }
    }
}