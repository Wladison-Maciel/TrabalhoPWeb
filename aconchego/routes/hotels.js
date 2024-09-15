const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// GET: Listar hotéis
router.get('/', async (req, res) => {
    try {
        // Busca todos os hotéis e ordena pela nota (rating) de forma decrescente
        const hotels = await Hotel.find().sort({ rating: -1 });
        
        // Pega os 3 melhores avaliados
        const topHotels = hotels.slice(0, 4);
        
        // Pega os demais hotéis
        const otherHotels = hotels.slice(3);

        // Renderiza a página passando os dois grupos de hotéis
        res.render('index', { topHotels, otherHotels });
    } catch (err) {
        res.status(500).send('Erro ao buscar hotéis.');
    }
});

// GET: Formulário para adicionar um novo hotel
router.get('/new', (req, res) => {
    res.render('new');
});

// POST: Adicionar um novo hotel
router.post('/new', async (req, res) => {
    try {
        const newHotel = new Hotel({
            title: req.body.title,
            location: req.body.location,
            image: req.body.image,
            rating: req.body.rating // Adiciona a nota ao banco de dados
        });
        await newHotel.save();
        res.redirect('/hotels');
    } catch (err) {
        res.status(500).send('Erro ao adicionar hotel.');
    }
});

module.exports = router;
