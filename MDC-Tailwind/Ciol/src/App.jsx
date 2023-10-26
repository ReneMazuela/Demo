import React, { useState } from 'react';
import './App.css';
import Sidebar from './comps/sidebar';



function App() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  return (
    <Sidebar />

  );
}

export default App;