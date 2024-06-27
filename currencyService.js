const axios = require('axios');
require('dotenv').config();
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60 * 60 }); 

const APY_TOKEN = process.env.APY_TOKEN || 'apyhub-token';
const APY_BASE_URL = 'https://api.apyhub.com/data/convert/currency/multiple';

// Function to convert currency without authentication
async function convertCurrency(source, targets) {
  const cacheKey = `${source}_${targets.join('-')}`;
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    console.log(`Retrieving from cache for ${cacheKey}`);
    return cachedResult;
  }
  try {
    const response = await axios.post(
        APY_BASE_URL,
        { source, targets },
        {
          headers: {
            'Content-Type': 'application/json',
            'apy-token': APY_TOKEN
          }
        }
      );
    const result = response.data;
    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to convert currency with authentication
async function convertCurrencyWithAuth(source, targets, authToken) {
  const cacheKey = `${source}_${targets.join('-')}`;
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    console.log(`Retrieving from cache for ${cacheKey}`);
    return cachedResult;
  }
  try {
    const token = authToken.split('Bearer ')[1];
    const response = await axios.post(
      APY_BASE_URL,
      { source, targets },
      {
        headers: {
          'Content-Type': 'application/json',
          'apy-token': token
        }
      }
    );
    const result = response.data;
    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to handle Axios errors uniformly
function handleAxiosError(error) {
  if (error.response) {
    const statusCode = error.response.status;
    const errorMessage = error.response.data.error || 'Failed to convert currency';
    console.error(`Error response received: ${statusCode} - ${errorMessage}`);
    throw { statusCode, message: errorMessage };
  } else if (error.request) {
    console.error('No response received');
    throw { statusCode: 500, message: 'No response received' };
  } else {
    console.error('Request error:', error.message);
    throw { statusCode: 500, message: 'Request error' };
  }
}

module.exports = {
  convertCurrency,
  convertCurrencyWithAuth
};
