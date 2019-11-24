const mongoose = require('mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId

const AtividadeSchema = new mongoose.Schema({
    dono: {
        type: ObjectId,
        require: true
    },
    recargas: [ 
        {
            type: ObjectId,
            require: true
        }
    ],
    transferencias: [ 
        {
            type: ObjectId,
            require: true
        }
    ],
    usos: [ 
        {
            type: ObjectId,
            require: true
        }
    ],
})

module.exports = mongoose.model('Atividade', AtividadeSchema)