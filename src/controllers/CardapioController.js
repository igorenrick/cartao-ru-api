const Cardapio = require('../models/CardapioModel')
const Restaurante = require('../models/RestauranteModel')

module.exports = {
    async list(req, res, next) {
        const menus = await Cardapio.find().sort('_id')

        return res.json(menus)
    },

    async create(req, res, next) {
        try {
            const menu = new Cardapio(req.body)

            console.log('Menu Restaurante: ' + menu.restaurante)

            const restaurant = await Restaurante.findOne({_id: menu.restaurante})

            console.log('Restaurante: ' +  restaurant.nome)

            restaurant.cardapios.push(menu)

            await menu.save()
            await restaurant.save()

            res.status(201).send({ menu })
        } catch (error) {
            res.status(400).send(error)
        }
    }
}