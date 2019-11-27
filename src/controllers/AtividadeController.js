const Atividade = require('../models/AtividadeModel')
const Uso = require('../models/UsoModel')

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
            console.log('Uso[0]: ' + usos)

            return res.json(activities)
        } catch (error) {
            res.status(400).send(error)
        }
    },
}