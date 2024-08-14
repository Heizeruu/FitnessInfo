const express = require('express');
const router = express.Router();
const Nutrition = require('../models/Nutrition');

// Endpoint to add a new nutrition record
router.post('/add', async (req, res) => {
    try {
        const { food, calories, protein, fat, carbohydrates } = req.body;

        // Create a new Nutrition document
        const newNutrition = new Nutrition({
            food,
            calories,
            protein,
            fat,
            carbohydrates
        });

        // Save the document to the database
        await newNutrition.save();

        res.status(201).json(newNutrition);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
