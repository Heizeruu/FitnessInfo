import React, { useState } from 'react';
import './BMICalculator.css';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi.toFixed(2));
  };
  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <div className="bmi-form">
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <button onClick={calculateBMI}>Calculate BMI</button>
      </div>
      {bmi && <p className="bmi-result">Your BMI is: {bmi}</p>}
    </div>
  );
}; export default BMICalculator;
