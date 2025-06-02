// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/localizacao', (req, res) => {
  const { lat, lon } = req.query;

  // Exemplo fictício: qualquer latitude e longitude retorna São Paulo
  res.json({
    city: 'São Paulo',
    state: 'SP',
    temp: 27, // Simulação de temperatura
  });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
