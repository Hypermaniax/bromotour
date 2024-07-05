const mongoose = require('mongoose');

const packages = mongoose.model('packages', {
    via: String,
    harga: Number,
    foto: String,
    fotourl: String,
    rute: Array,
    noHp: String,
    idvia: String
})

module.exports = {
    packages
}