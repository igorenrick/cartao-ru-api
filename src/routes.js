const express = require('express')
const routes = new express.Router()

const UsuarioController = require('./controllers/UsuarioController')
const CartaoController = require('./controllers/CartaoController')
const AtividadeController = require('./controllers/AtividadeController')
const CardapioController = require('./controllers/CardapioController')
const RestauranteController = require('./controllers/RestauranteController')
const UsoController = require('./controllers/UsoController')
const RecargaController = require('./controllers/RecargaController')
const TransferenciaController = require('./controllers/TransferenciaController')


const auth = require('./middlewares/auth')

routes.get('/', UsuarioController.index)
routes.get('/users', UsuarioController.list)
routes.post('/users/register', UsuarioController.create)
routes.post('/users/login', UsuarioController.login)
routes.get('/users/me', auth, UsuarioController.profile)

routes.get('/cards', CartaoController.list)

routes.get('/activities', AtividadeController.list)

routes.get('/restaurants', RestauranteController.list)
routes.post('/restaurants/register', RestauranteController.create)

routes.get('/menus', CardapioController.list)
routes.post('/menus/new', CardapioController.create)

routes.get('/uses', UsoController.list)
routes.post('/uses/new', UsoController.create)

routes.get('/reloads', RecargaController.list)
routes.post('/reloads/new', RecargaController.create)

routes.get('/transfers', TransferenciaController.list)
routes.post('/transfers/new', TransferenciaController.create)

module.exports = routes