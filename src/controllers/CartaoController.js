const Cartao = require('../models/CartaoModel')

module.exports = {
    async list(req, res, next) {
        const cards = await Cartao.find().sort('_id')

        return res.json(cards)
    }
}