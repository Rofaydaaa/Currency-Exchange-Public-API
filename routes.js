const express = require('express');
const router = express.Router();
const { convertCurrency, convertCurrencyWithAuth } = require('./currencyService');

// Function to log successful conversion
function logSuccess(source, targets, convertedResult) {
  console.log(`Currency conversion successful for ${source} to ${targets.join(', ')}:`);
  console.log(convertedResult); // Log the actual conversion result
}

// POST /api/convert
// Body: { "source": "inr", "targets": ["usd", "aed", "eur"] }
router.post('/convert', async (req, res) => {
  const { source, targets } = req.body;

  if (!source || !targets || !Array.isArray(targets)) {
    console.error('Invalid request payload');
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  try {
    const result = await convertCurrency(source, targets);
    logSuccess(source, targets, result);
    res.json(result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'Internal Server Error';
    res.status(statusCode).json({ error: errorMessage });
  }
});

// POST /api/convert-auth
// Body: { "source": "inr", "targets": ["usd", "aed", "eur"] }
// Headers: { "Authorization": "Bearer <token>" }
router.post('/convert-auth', async (req, res) => {
  const { source, targets } = req.body;
  const authToken = req.headers.authorization;

  if (!source || !targets || !Array.isArray(targets)) {
    console.error('Invalid request payload');
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  try {
    const result = await convertCurrencyWithAuth(source, targets, authToken);
    logSuccess(source, targets, result);
    res.json(result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'Internal Server Error';
    res.status(statusCode).json({ error: errorMessage });
  }
});

module.exports = router;
