const Restaurante = require('../models/RestauranteModel')

module.exports = {
    async list(req, res, next) {
        const restaurants = await Restaurante.find().sort('_id')

        return res.json(restaurants)
    },

    async create(req, res, next) {
        try {
            const restaurant = new Restaurante(req.body)

            await restaurant.save()
            
            res.status(201).send({ restaurant })
        } catch (error) {
            res.status(400).send(error)
        }
    }
}