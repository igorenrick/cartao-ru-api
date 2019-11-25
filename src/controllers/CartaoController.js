const Cartao = require('../models/CartaoModel')

module.exports = {
    async list(req, res, next) {
        try {
            const cards = await Cartao.find().sort('_id')

            return res.json(cards)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}