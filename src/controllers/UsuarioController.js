const Usuario = require('../models/UsuarioModel')
const Cartao = require('../models/CartaoModel')
const Atividade = require('../models/AtividadeModel')
const Recargas = require('../models/RecargaModel')
const Usos = require('../models/UsoModel')

module.exports = {
    async index(req, res) {
        return res.json('Olá, Cartão RU!')
    },

    async list(req, res) {
        try {
            const users = await Usuario.find().sort('_id')

            return res.json(users)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async find(req, res) {
        try {
            console.log('Aqui ó')
            const matricula = req.body.matricula
            console.log('Matricula: ' + matricula.matricula)
            const user = await Usuario.findOne({matricula})
            return res.json(user)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async findbyid(req, res) {
        try {
            console.log('Aqui ó')
            const _id = req.body
            const user = await Usuario.findOne({_id})
            return res.json(user)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async profile(req, res, next) {
        return res.send(req.user)
    },

    async create(req, res, next) {
        try {
            const user = new Usuario(req.body)

            const card = new Cartao({
                dono: user._id,
                matricula: user.matricula
            })

            const activity = new Atividade({
                dono: user._id
            })

            user.cartao = card.id
            user.atividade = activity.id
            
            await user.save() ? (
                await activity.save(),
                await card.save()
            ) : null
            
            res.status(201).send({ user, card, activity })
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async login(req, res, next) {
        try {
            const { matricula, senha } = req.body

            const user = await Usuario.findByCredentials(matricula, senha)
            console.log('User found. Matrícula: ' + user.matricula + " . Password: " + user.senha)

            if (!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials.'})
            }
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async logout(req, res, next) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async delete(req, res, next) {
        try {
            console.log('No delete: ' + req.body)
            const _id = req.body._id
            console.log('User id: ' + _id)
            const user = await Usuario.findById({_id})

            console.log('USUARIO: ' + user.primeironome)

            const cartao = await Cartao.deleteOne({_id: user.cartao})
            const atividades = await Atividade.deleteOne({_id: user.atividade})
            const recargas = await Recargas.deleteMany({dono: user._id})
            const usos = await Usos.deleteMany({dono: user._id})

            const userDelete = await Usuario.deleteOne({_id})

            return res.json(userDelete, cartao, atividades, recargas, usos)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}