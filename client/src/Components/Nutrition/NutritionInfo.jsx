// src/NutritionInfo.js
import React, { useState } from 'react';
import axios from 'axios';
import './NutritionInfo.css';

const NutritionInfo = () => {
    const [food, setFood] = useState('');
    const [nutrition, setNutrition] = useState(null);
    const [error, setError] = useState('');

    const fetchNutrition = async (event) => {
        event.preventDefault(); // Prevent form submission

        try {
            const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', 
                { query: food }, 
                {
                    headers: {
                        'x-app-id': '366f09c5',
                        'x-app-key': '01c6d195f55c92e0e2bf277be8949a30',
                        'Content-Type': 'application/json'
                    }
                }
            );

            setNutrition(response.data);
            setError('');
        } catch (err) {
            console.error('Error fetching nutrition info:', err.response ? err.response.data : err.message);
            setError('Failed to fetch nutrition information.');
        }
    };

    return (
        <form className="nutrition-form">
            <h1>Nutrition Information</h1>
            <input
                type="text"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                placeholder="Enter food item"
                className="search-input"
            />
            <button type="submit" onClick={fetchNutrition} className="search-button">Get Nutrition Info</button>

            {error && <p className="error-message">{error}</p>}

            {nutrition && nutrition.foods && nutrition.foods.length > 0 && (
                <div className="nutrition-results">
                    <h2>Nutrition Facts</h2>
                    <p>Calories: {nutrition.foods[0].nf_calories}</p>
                    <p>Protein: {nutrition.foods[0].nf_protein}g</p>
                    <p>Fat: {nutrition.foods[0].nf_total_fat}g</p>
                    <p>Carbohydrates: {nutrition.foods[0].nf_total_carbohydrate}g</p>
                </div>
            )}
        </form>
    );
};

export default NutritionInfo;
