const mongoose = require('mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId

const UsuarioSchema = new mongoose.Schema({
    nome: {
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