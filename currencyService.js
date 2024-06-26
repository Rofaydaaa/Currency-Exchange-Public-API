const axios = require('axios');
require('dotenv').config();

const APY_TOKEN = process.env.APY_TOKEN || 'apyhub-token';
const APY_BASE_URL = 'https://api.apyhub.com/data/convert/currency/multiple';

// Function to convert currency without authentication
async function convertCurrency(source, targets) {
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
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to convert currency with authentication
async function convertCurrencyWithAuth(source, targets, authToken) {
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
    return response.data;
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
