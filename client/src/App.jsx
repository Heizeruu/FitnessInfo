// src/App.js
import React from 'react'
import Navbar from './Components/Navbar/Navbar.jsx'
import NutritionInfo from './Components/Nutrition/NutritionInfo.jsx';



const App = () => {
    return (
        <div>
            <Navbar/>
            <NutritionInfo/>
        </div>
    );
};

export default App
