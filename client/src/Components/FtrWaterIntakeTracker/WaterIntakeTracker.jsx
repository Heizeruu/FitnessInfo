import React, { useState } from 'react';
import './WaterIntakeTracker.css';

const WaterIntakeTracker = () => {
  const [glasses, setGlasses] = useState(0);

  const addGlass = () => setGlasses(glasses + 1);

  return (
    <div className="water-intake">
      <h2>Water Intake Tracker</h2>
      <p className="glasses-count">Glasses of water: {glasses}</p>
      <button onClick={addGlass}>Add Glass</button>
    </div>
  );
};

export default WaterIntakeTracker;
