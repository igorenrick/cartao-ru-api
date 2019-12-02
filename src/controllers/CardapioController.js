const Cardapio = require('../models/CardapioModel')
const Restaurante = require('../models/RestauranteModel')

module.exports = {
    async list(req, res, next) {
        try {
            const menus = await Cardapio.find().sort('_id')

            return res.json(menus)
        } catch (error) {
            res.status(400).send(error)
        }
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
    },

    async get(req, res, next) {
        try {
            restaurante_id = req.body.local
            const restaurante = await Restaurante.findOne({_id: restaurante_id})

            console.log('Restaurante: ' + restaurante.nome)
            console.log('---- Cardápios: ' + restaurante.cardapios)

            //INÍCIO PEGA DATA DO DIA
            const data = new Date()

            var dia = data.getDate().toString()
            if(dia.length == 1){ dia = '0' + dia }

            const mes  = (data.getMonth() + 1).toString()
            if(mes.length == 1){ mes = '0' + mes }

            const ano = data.getFullYear()
            
            const datahoje = ano + "-" + mes + "-" + dia + 'T03:00:00.000+00:00'
            console.log('Data: ' + datahoje)
            //FIM PEGA DATA DO DIA

            const cardapiohoje = await Cardapio.findOne({restaurante: restaurante._id, data: datahoje}, (err) => { console.log(err) })
            console.log('Cadápio hoje: ' + cardapiohoje)

            res.send(cardapiohoje)

        } catch (error) {
            res.status(400).send(error)
        }
    }
}