const mongoose = require('mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId

pegaData = () => {
    const data = new Date()

    var dia = data.getDate().toString()
    if(dia.length == 1){ dia = '0' + dia }

    const mes  = (data.getMonth() + 1).toString()
    if(mes.length == 1){ mes = '0' + mes }

    const ano = data.getFullYear()
    
    const datahoje = ano + "-" + mes + "-" + dia + 'T03:00:00.000+00:00'

    return datahoje
}

const CardapioSchema = new mongoose.Schema({
    restaurante: {
        type: ObjectId,
        require: true
    },
    data: {
        type: Date,
        require: true,
        unique: true,
        default: pegaData(),
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