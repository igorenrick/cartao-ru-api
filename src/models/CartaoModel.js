const mongoose = require('mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId

const CartaoSchema = new mongoose.Schema({
    dono: {
        type: ObjectId,
        require: false
    },
    matricula: {
        type: String,
        require: true
    },
    creditos: {
        type: Number,
        require: true,
        default: 0
    }
})

module.exports = mongoose.model('Cartao', CartaoSchema)