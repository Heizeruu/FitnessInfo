import React, { useState } from 'react';

const NutrientForm = () => {
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Example POST request
        try {
            const response = await fetch('/api/nutrient', { // Adjust the URL as needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    calories: Number(calories),
                    protein: Number(protein),
                    fat: Number(fat),
                    carbohydrates: Number(carbohydrates),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save nutrient information');
            }

            alert('Nutrient information saved successfully');
            // Clear form fields
            setCalories('');
            setProtein('');
            setFat('');
            setCarbohydrates('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Enter Nutrient Information</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Calories:
                        <input
                            type="number"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Protein:
                        <input
                            type="number"
                            value={protein}
                            onChange={(e) => setProtein(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Fat:
                        <input
                            type="number"
                            value={fat}
                            onChange={(e) => setFat(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Carbohydrates:
                        <input
                            type="number"
                            value={carbohydrates}
                            onChange={(e) => setCarbohydrates(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default NutrientForm;
