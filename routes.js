const express = require('express');
const router = express.Router();
const { convertCurrency, convertCurrencyWithAuth } = require('./currencyService');
const rateLimit = require('express-rate-limit');


// Middleware for authentication
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  next();
}

const windowMs = process.env.RATE_LIMIT_WINDOW_MS || (60 * 60 * 1000); // Default: 1 hour
const maxRequests = process.env.RATE_LIMIT_MAX_REQUESTS || 100; // Default: 100

const limiter = rateLimit({
  windowMs: parseInt(windowMs, 10),
  max: parseInt(maxRequests, 10),
  message: { error: 'Too many requests from this IP, please try again later.' }, // Send JSON message
  headers: true,
  standardHeaders: true,
  legacyHeaders: false,
});

// Function to log successful conversion
function logSuccess(source, targets, convertedResult) {
  console.log(`Currency conversion successful for ${source} to ${targets.join(', ')}:`);
  console.log(convertedResult);
}

// POST /api/convert
// Body: { "source": "inr", "targets": ["usd", "aed", "eur"] }
router.post('/convert', limiter, async (req, res) =>  {
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
router.post('/convert-auth', limiter, authenticate, async (req, res) => {
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
