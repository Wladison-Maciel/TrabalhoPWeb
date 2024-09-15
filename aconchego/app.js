const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const hotelsRouter = require('./routes/hotels'); // Importando a rota dos hotéis

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Conectar ao MongoDB Atlas
mongoose.connect(config.mongoURI)
  .then(() => console.log('Conectado ao MongoDB Atlas!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware para parsing do corpo das requisições
app.use(express.urlencoded({ extended: true }));

// Definir a rota para '/hotels'
app.use('/hotels', hotelsRouter);

// Tratamento de erros
app.use((req, res, next) => {
  res.status(404).render('error', { message: 'Página não encontrada!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


module.exports = app;