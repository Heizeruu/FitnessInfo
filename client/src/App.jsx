import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import NutritionInfo from './Components/Nutrition/NutritionInfo';
import WorkoutTracker from './Components/FtrWorkoutTracker/WorkoutTracker';
import WaterIntake from './Components/FtrWaterIntakeTracker/WaterIntakeTracker';
import BMICalculator from './Components/FtrBMICalculator/BMICalculator';
import SleepTracker from './Components/FtrSleepTracker/SleepTracker';
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-content"> {}
        <Routes>
          <Route path="/" element={<NutritionInfo />} />
          <Route path="/workout-tracker" element={<WorkoutTracker />} />
          <Route path="/water-intake" element={<WaterIntake />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/sleep-tracker" element={<SleepTracker />} />
          <Route path="/login-signup" element={<LoginSignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
