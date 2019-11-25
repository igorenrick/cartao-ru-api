const mongoose = require('mongoose')

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
    }
})

module.exports = mongoose.model('User', UsuarioSchema)