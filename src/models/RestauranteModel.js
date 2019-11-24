const mongoose = require('mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId

const RestauranteSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    usos: {
        type: Number,
        require: false,
        default: 0
    },
    cardapios: [
        {
            type: ObjectId,
            require: true
        }
    ]
})

module.exports = mongoose.model('Restaurante', RestauranteSchema)