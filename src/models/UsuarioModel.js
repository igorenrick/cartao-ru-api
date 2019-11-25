const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var ObjectId = mongoose.Schema.Types.ObjectId

const UsuarioSchema = new mongoose.Schema({
    primeironome: {
        type: String,
        require: true
    },
    segundonome: {
        type: String,
        require: true
    },
    curso: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    },
    matricula: {
        type: String,
        unique: true,
        require: true
    },
    cartao: {
        type: ObjectId,
        require: true
    },
    isento: {
        type: Boolean,
        require: true
    },
    atividade: {
        type: ObjectId,
        require: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

UsuarioSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('senha')) {
        user.senha = await bcrypt.hash(user.senha, 8)
    }
    next()
})

UsuarioSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UsuarioSchema.statics.findByCredentials = async (email, senha) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }

    const isPasswordMatch = await bcrypt.compare(senha, user.senha)

    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

module.exports = mongoose.model('User', UsuarioSchema)