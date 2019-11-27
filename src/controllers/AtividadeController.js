const Atividade = require('../models/AtividadeModel')
const Uso = require('../models/UsoModel')
const Recarga = require('../models/RecargaModel')
const transferencia = require('../models/TransferenciaModel')

module.exports = {
    async list(req, res, next) {
        try {
            const activities = await Atividade.find().sort('_id')

            return res.json(activities)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async listusos(req, res, next) {
        try {
            const _id = req.body
            const atividade = await Atividade.findOne({_id})
            console.log('Atividade: ' + atividade)

            const usos = await Uso.find({dono: atividade.dono}).sort({'data': -1}).limit(3)
            console.log('Uso: ' + usos)

            return res.json(usos)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async listreloads(req, res, next) {
        try {
            const _id = req.body
            const atividade = await Atividade.findOne({_id})
            console.log('Atividade: ' + atividade)

            const recargas = await Recarga.find({dono: atividade.dono}).sort({'data': -1}).limit(3)
            console.log('Recargas: ' + recargas)

            return res.json(recargas)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async listtransfers(req, res, next) {
        try {
            const _id = req.body
            const atividade = await Atividade.findOne({_id})
            console.log('Atividade: ' + atividade)

            const transferencias = await Transferencia.find({dono: atividade.dono}).sort({'data': -1}).limit(3)
            console.log('Transferencias: ' + transferencias)

            return res.json(transferencias)
        } catch (error) {
            res.status(400).send(error)
        }
    },
}