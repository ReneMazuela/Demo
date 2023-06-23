import React, { useState } from 'react';
import Chatbot from './comps/Querying';
import LoadingComponent from './comps/LoadingComponent';
import './App.scss';
import Navbar from './comps/navbar';
import Footer from './comps/Footer';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  return (
    <div className='app'>
      <Navbar />
        <div className='content'>
          <Chatbot />
          <Footer />
        </div>

    </div>
  );
}

export default App;