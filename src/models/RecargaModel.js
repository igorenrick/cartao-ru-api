const mongoose = require('mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId

const RecargaSchema = new mongoose.Schema({
    dono: {
        type: ObjectId,
        require: false
    },
    data: {
        type: Date,
        require: true,
        default: Date.now
    },
    creditos: {
        type: Number,
        require: true,
        default: 0
    }
})

module.exports = mongoose.model('Recarga', RecargaSchema)