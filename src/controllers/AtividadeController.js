const Atividade = require('../models/AtividadeModel')

module.exports = {
    async list(req, res, next) {
        const activities = await Atividade.find().sort('_id')

        return res.json(activities)
    }
}