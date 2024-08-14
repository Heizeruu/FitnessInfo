// src/App.js
import React from 'react';
import NutritionInfo from './NutritionInfo.jsx'
import Navbar from './Navbar';


const App = () => {
    return (
        <div className='container'>
            <Navbar/>
            <NutritionInfo />
        </div>
    );
};

export default App;
