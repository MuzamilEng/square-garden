const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    more: {
        type: String,
        default: 'Find more ...',
    }
})

module.exports = mongoose.model('Product', productSchema)