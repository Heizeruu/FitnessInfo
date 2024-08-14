// src/NutritionInfo.js
import React, { useState } from 'react';
import './NutritionInfo.css';
import axios from 'axios';

const NutritionInfo = () => {
    const [food, setFood] = useState('');
    const [nutrition, setNutrition] = useState(null);
    const [error, setError] = useState('');

    const fetchNutrition = async () => {
        try {
            const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
                query: food
            }, {
                headers: {
                    'x-app-id': '366f09c5',
                    'x-app-key': '01c6d195f55c92e0e2bf277be8949a30',
                    'Content-Type': 'application/json'
                }
            });

            setNutrition(response.data);
            setError('');
        } catch (err) {
            console.error('Error fetching nutrition info:', err.response ? err.response.data : err.message);
            setError('Failed to fetch nutrition information.');
        }
    };

    return (
        <div>
            <h1>Nutrition Information</h1>
            <input
                type="text"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                placeholder="Enter food item"
            />
            <button onClick={fetchNutrition}>Get Nutrition Info</button>

            {error && <p>{error}</p>}

            {nutrition && (
                <div>
                    <h2>Nutrition Facts</h2>
                    <p>Calories: {nutrition.foods[0].nf_calories}</p>
                    <p>Protein: {nutrition.foods[0].nf_protein}g</p>
                    <p>Fat: {nutrition.foods[0].nf_total_fat}g</p>
                    <p>Carbohydrates: {nutrition.foods[0].nf_total_carbohydrate}g</p>
                </div>
            )}
        </div>
    );
};

export default NutritionInfo;
