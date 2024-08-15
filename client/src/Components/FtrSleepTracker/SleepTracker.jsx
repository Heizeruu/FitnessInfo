import React, { useState } from 'react';
import './SleepTracker.css';

const SleepTracker = () => {
  const [sleepData, setSleepData] = useState([]);
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');

  const addSleepData = () => {
    if (sleepTime && wakeTime) {
      setSleepData([...sleepData, { sleepTime, wakeTime }]);
      setSleepTime('');
      setWakeTime('');
    }
  };

  return (
    <div className="sleep-tracker">
      <h2>Sleep Tracker</h2>
      <div className="sleep-form">
        <input
          type="time"
          value={sleepTime}
          onChange={(e) => setSleepTime(e.target.value)}
          placeholder="Sleep Time"
        />
        <input
          type="time"
          value={wakeTime}
          onChange={(e) => setWakeTime(e.target.value)}
          placeholder="Wake Time"
        />
        <button onClick={addSleepData}>Add Sleep Data</button>
      </div>
      <div className="sleep-list">
        {sleepData.map((data, index) => (
          <div key={index} className="sleep-item">
            <p>Slept at: {data.sleepTime}, Woke up at: {data.wakeTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SleepTracker;
