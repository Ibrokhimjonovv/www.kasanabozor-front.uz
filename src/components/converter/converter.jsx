import React, { useState, useEffect } from "react";
import "./converter.scss";
import upImg from "./upImg.png";
import downImg from "./downImg.png";

const CurrencyRates = () => {
  const [rates, setRates] = useState(null);
  const [previousRates, setPreviousRates] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await response.json();
        setPreviousRates(rates);
        setRates(data.rates);
      } catch (error) {
        console.error("Valyuta ma'lumotlarini yuklashda xatolik:", error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 6000);

    return () => clearInterval(interval);
  }, []);
  
  if (!rates) {
    return <p>Yuklanmoqda...</p>;
  }

  const currencies = [
    { code: "USD", name: "AQSH dollari" },
    { code: "RUB", name: "Rossiya rubli" },
    { code: "EUR", name: "Yevro" },
    { code: "GBP", name: "Buyuk Britaniya funti" },
    { code: "JPY", name: "Yapon yenasi" },
  ];

  return (
    <div id="currency-container">
      <h1>Valyuta kurslari</h1>
      {currencies.map((currency) => {
        if (!rates[currency.code]) return null;
        const currentRate = rates[currency.code];
        const previousRate = previousRates ? previousRates[currency.code] : null;

        return (
          <div className="currency-lines" key={currency.code}>
            <div>
              <span>{currency.code}</span>
              <span>{currency.name}</span>
            </div>
            <span>
              <span>{(1 / currentRate).toFixed(2)}</span>
              {previousRate && (
                currentRate > previousRate ? (
                  <img src={upImg} alt="Kurs oshdi" style={{ width: "20px", height: "20px" }} />
                ) : (
                  <img src={downImg} alt="Kurs pasaydi" style={{ width: "20px", height: "20px" }} />
                )
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CurrencyRates;
