const Transferencia = require('../models/TransferenciaModel')
const Usuario = require('../models/UsuarioModel')
const Cartao = require('../models/CartaoModel')
const Atividade = require('../models/AtividadeModel')

module.exports = {
    async list(req, res, next) {
        try {
            const transferencias = await Transferencia.find().sort('_id')

            return res.json(transferencias)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async create(req, res, next) {
        try {
            const transferencia = new Transferencia(req.body)

            const origem = await Usuario.findOne({_id: transferencia.usuarioOrigem})
            const destino = await Usuario.findOne({_id: transferencia.usuarioDestino})

            if (!origem.isento && !destino.isento) {

                const cartaoOrigem = await Cartao.findOne({_id: origem.cartao})
                const cartaoDestino = await Cartao.findOne({_id: destino.cartao})

                const atividadeOrigem = await Atividade.findOne({_id: origem.atividade})
                const atividadeDestino = await Atividade.findOne({_id: destino.atividade})

                cartaoOrigem.creditos = cartaoOrigem.creditos - transferencia.creditos
                cartaoDestino.creditos = cartaoDestino.creditos + transferencia.creditos

                atividadeOrigem.transferencias.push(transferencia._id)
                atividadeDestino.transferencias.push(transferencia._id)

                await atividadeOrigem.save()
                await atividadeDestino.save()

                await cartaoOrigem.save()
                await cartaoDestino.save()

                await transferencia.save()

                res.status(201).send({ transferencia })

            }
            res.status(400).send('Transferência inválida')
        } catch (error) {
            res.status(400).send(error)
        }
    }
}