import React, { useState, useEffect } from 'react';
import './Components.scss';

const LoadingComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('hasVisitedBefore')) {
      setIsLoading(true);
      localStorage.setItem('hasVisitedBefore', 'true');

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="loading-component">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <button onClick={() => props.onStart()}>Start</button>
      )}
    </div>
  );
};

export default LoadingComponent;
