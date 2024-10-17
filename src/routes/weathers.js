const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/weather', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/weather', {
      params: {
        city: 'New York',
      },
    });
    res.status(200).json({
      code: 200,
      message: 'Error fetching weather data',
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: error || 'Error fetching weather data',
      data: null,
    });
  }
});
module.exports = router;
