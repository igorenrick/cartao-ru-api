const mongoose = require('mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId

const UsoSchema = new mongoose.Schema({
    dono: {
        type: ObjectId,
        require: false
    },
    data: {
        type: Date,
        default: Date.now,
        require: true
    },
    local: {
        type: ObjectId,
        require: true
    },
    creditos: {
        type: Number,
        default: '1',
        require: true
    }
})

module.exports = mongoose.model('Uso', UsoSchema)