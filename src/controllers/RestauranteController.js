const Restaurante = require('../models/RestauranteModel')

module.exports = {
    async list(req, res, next) {
        try {
            const restaurants = await Restaurante.find().sort('_id')

            return res.json(restaurants)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async findUse(req, res) {
        try {
            console.log('Aqui ó')
            const _id = req.body._id
            const creditos = req.body.creditos

            const restaurante = await Restaurante.findById( { _id }, (err) => { console.log(err) })
            
            console.log('RESTAURANTE: ' + restaurante._id)

            restaurante.usos = restaurante.usos + creditos

            await restaurante.save()

            return res.json(restaurante)
        } catch (error) {
            res.status(400).send(error)
        }
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