const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  title: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String }, // Novo campo para armazenar a URL da imagem
    rating: { type: Number, min: 0, max: 10 }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
