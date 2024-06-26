const express = require('express');
const bodyParser = require('body-parser');
const exchangeRoutes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');


// Load environment variables from .env file as it contains the token for the external API use
require('dotenv').config();

const app = express();
const PORT = 3000;
const swaggerDocument = YAML.load('./swagger.yaml');

// Middleware Setup
app.use(bodyParser.json());
app.use('/api', exchangeRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
