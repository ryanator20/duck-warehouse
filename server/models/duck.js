const mongoose = require('mongoose')

const duckSchema = new mongoose.Schema({
    color: {type: String, immutable: true},
    size: {type: String, immutable: true},
    price: Number,
    quantity: Number,
    deleted: {type: Boolean, default: false}
})

const Duck = mongoose.model('Duck', duckSchema)

module.exports = Duck