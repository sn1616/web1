import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [bannerDescription, setBannerDescription] = useState('');
  const [bannerTimer, setBannerTimer] = useState(0);
  const [countdown, setCountdown] = useState(bannerTimer);

  useEffect(() => {
    let timer;
    if (bannerVisible && countdown > 0) {
      timer = setInterval(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setBannerVisible(false);
    }
    return () => clearInterval(timer);
  }, [countdown, bannerVisible]);

  useEffect(() => {
    fetch('http://localhost:5000/api/banner')
      .then(response => response.json())
      .then(data => {
        if (data) {
          setBannerDescription(data.description);
          setBannerTimer(data.timer);
          setCountdown(data.timer);
        }
      });
  }, []);

  const updateBanner = (description, timer, link) => {
    fetch('http://localhost:5000/api/banner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description, timer, link })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Banner updated successfully');
        }
      });
  };



  return (
    <div className="App">
      {bannerVisible && (
        <div className="banner">
          <p>{bannerDescription}</p>
          <p>{countdown} seconds remaining</p>
        </div>
      )}
      <button onClick={() => setBannerVisible(!bannerVisible)}>Toggle Banner</button>
      <button onClick={() => setBannerDescription(prompt("Enter new description"))}>Update Description</button>
      <button onClick={() => setBannerTimer(parseInt(prompt("Enter timer duration in seconds")))}>Set Timer</button>
    </div>
  );
}

export default App;
