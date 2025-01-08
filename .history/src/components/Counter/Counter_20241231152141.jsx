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
        setCurrentValue(end); // Oxirgi qiymatni o'rnatish
      } else {
        setCurrentValue(Math.floor(current)); // Butun son qilib yangilash
      }
    }, 10); // Har 10ms da yangilash

    return () => clearInterval(timer); // Tozalanish
  }, [start, end, duration]);

  return <span>{currentValue}+</span>;
};

export default Counter;
