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
            const _id = req.body._id
            
            console.log('RESTAURANTE: ' + _id)
            const restaurante = await Restaurante.findById( { _id }, (err) => { console.log(err) })

            console.log('CARDÁPIOS DO RESTAURANTE: ' + restaurante.cardapios)

            const data = new Date()
            const dia = data.getDate().toString()
            if(dia.length == 1){
                dia = '0' + dia
            }

            const mes  = (data.getMonth() + 1).toString() //+1 pois no getMonth Janeiro começa com zero.
            if(mes.length == 1){
                mes = '0' + mes
            }

            const ano = data.getFullYear()
            
            const datahoje = ano + "-" + mes + "-" + dia + 'T03:00:00.000+00:00'

            const cardapioDoDia = await Cardapio.find( {data: '2019-11-25T03:00:00.000+00:00'}, (err) => { console.log('ERRO: ' + err) })

            console.log('1: ' + cardapioDoDia.restaurante + ' 2: ' + _id)

            console.log('AQUI: ' + cardapioDoDia)

            if (cardapioDoDia.restaurante == _id) {
                res.send(cardapioDoDia)
            }

        } catch (error) {
            res.status(400).send(error)
        }
    }
}