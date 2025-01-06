import React, { useState, useEffect } from "react";
const Counter = ({ start = 0, end, duration = 1000 }) => {
  const [currentValue, setCurrentValue] = useState(start);
  useEffect(() => {
    const increment = (end - start) / (duration / 10);
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        clearInterval(timer);
        setCurrentValue(end);
      } else {
        setCurrentValue(Math.floor(current)); 
      }
    }, 10); 

    return () => clearInterval(timer);
  }, [start, end, duration]);

  return <span>{currentValue}+</span>;
};

export default Counter;
