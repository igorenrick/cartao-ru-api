const Usuario = require('../models/UsuarioModel')
const Cartao = require('../models/CartaoModel')
const Atividade = require('../models/AtividadeModel')

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

    async search(req, res) {
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
            res.status(500).send(error)
        }
    },
}