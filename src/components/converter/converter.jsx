import React, { useState, useEffect } from "react";
import "./converter.scss";
import upImg from "./upImg.png";
import downImg from "./downImg.png";

const CurrencyRates = () => {
  const [rates, setRates] = useState(null);
  const [previousRates, setPreviousRates] = useState(null);

  const fetchRates = () => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setPreviousRates(rates);
        setRates(data.rates);
      });
  };

  useEffect(() => {
    fetchRates(); 

    const interval = setInterval(() => {
      fetchRates();
    }, 6000);

    return () => clearInterval(interval);
  }, [rates]);

  if (!rates) {
    return <p>Yuklanmoqda...</p>;
  }

  // Valyutalar ro'yxati
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
      {currencies.map((currency) => (
        <p className="currency-lines" key={currency.code}>
          <div>
            <span>{currency.code}</span>
            <span>{currency.name}</span>
          </div>
          <span>
            <span>{(rates["UZS"] / rates[currency.code]).toFixed(2)}</span>
            {previousRates && (
              (rates["UZS"] / rates[currency.code] >
              previousRates["UZS"] / previousRates[currency.code]) ? (
                <img
                  src={upImg}
                  alt="Kurs oshdi"
                  style={{ width: "20px", height: "20px" }}
                />
              ) : (
                <img
                  src={downImg}
                  alt="Kurs pasaydi"
                  style={{ width: "20px", height: "20px" }}
                />
              )
            )}
          </span>
        </p>
      ))}
    </div>
  );
};

export default CurrencyRates;
