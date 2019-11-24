const mongoose = require('mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId

const TransferenciaSchema = new mongoose.Schema({
    data: {
        type: Date,
        require: true,
        default: Date.now
    },
    usuarioDestino: {
        type: ObjectId,
        require: true
    },
    usuarioOrigem: {
        type: ObjectId,
        require: true
    },
    creditos: {
        type: Number,
        require: true,
        default: 0
    }
})

module.exports = mongoose.model('Transferencia', TransferenciaSchema)