const express = require('express');
const bodyParser = require('body-parser');
const exchangeRoutes = require('./routes');

// Load environment variables from .env file as it contains the token for the external API use
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware Setup
app.use(bodyParser.json());
app.use('/api', exchangeRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
