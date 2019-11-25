const Atividade = require('../models/AtividadeModel')

module.exports = {
    async list(req, res, next) {
        try {
            const activities = await Atividade.find().sort('_id')

            return res.json(activities)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}