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
}