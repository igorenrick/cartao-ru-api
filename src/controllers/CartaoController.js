const Cartao = require('../models/CartaoModel')

module.exports = {
    async list(req, res, next) {
        try {
            const cards = await Cartao.find().sort('_id')

            return res.json(cards)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async get(req, res, next) {
        try {
            const _id = req.body._id
            
            console.log('CARTÃO: ' + _id)
            const cartao = await Cartao.findById( { _id }, (err) => { console.log(err) })

            res.send(cartao)

        } catch (error) {
            res.status(400).send(error)
        }
    }
}