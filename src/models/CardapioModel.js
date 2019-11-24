const mongoose = require('mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId

const CardapioSchema = new mongoose.Schema({
    restaurante: {
        type: ObjectId,
        require: true
    },
    data: {
        type: Date,
        require: true,
        default: Date.now
    },
    almoco: {
        type: String,
        require: true,
        default: ""
    },
    janta: {
        type: String,
        require: true,
        default: ""
    }
})

module.exports = mongoose.model('Cardapio', CardapioSchema)