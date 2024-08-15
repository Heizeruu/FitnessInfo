import React, { useState } from 'react';
import './WorkoutTracker.css';

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  const addWorkout = () => {
    setWorkouts([...workouts, { exercise, sets, reps }]);
    setExercise('');
    setSets('');
    setReps('');
  };

  return (
    <div className="workout-tracker">
      <h2>Workout Tracker</h2>
      <div className="workout-form">
        <input
          type="text"
          placeholder="Exercise"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />
        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <button onClick={addWorkout}>Add Workout</button>
      </div>
      <div className="workout-list">
        {workouts.map((workout, index) => (
          <div key={index} className="workout-item">
            <p>{workout.exercise} - {workout.sets} sets of {workout.reps} reps</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutTracker;
