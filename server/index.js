// server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Nutritionix API credentials
const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID;
const NUTRITIONIX_API_KEY = process.env.NUTRITIONIX_API_KEY;

// Route to get nutrition information
app.post('/api/nutrition', async (req, res) => {
    const { food } = req.body;

    if (!food) {
        return res.status(400).json({ message: 'Food item is required' });
    }

    try {
        const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', 
            { query: food }, 
            { 
                headers: {
                    'x-app-id': NUTRITIONIX_APP_ID,
                    'x-app-key': NUTRITIONIX_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching nutrition info:', error);
        res.status(500).json({ message: 'Error fetching nutrition information' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
