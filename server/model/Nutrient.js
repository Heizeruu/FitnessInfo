const mongoose = require('mongoose');

// Define the schema for nutritional information
const nutritionSchema = new mongoose.Schema({
    food: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    carbohydrates: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Create and export the model
const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;
