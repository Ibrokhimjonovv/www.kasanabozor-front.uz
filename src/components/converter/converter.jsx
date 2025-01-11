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

  return (
    <div id="currency-container">
      <h1>Valyuta kurslari</h1>
      {/* AQSH dollari */}
      <p className="currency-lines">
        <div>
          <span>USD</span>
          <span>AQSH dollari</span>
        </div>
        <span>
          <span>{rates["UZS"]}</span>
          {previousRates &&
            (rates["UZS"] > previousRates["UZS"] ? (
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
            ))}
        </span>
      </p>

      {/* Rossiya rubli */}
      <p className="currency-lines">
        <div>
          <span>RUB</span>
          <span>Rossiya rubli</span>
        </div>
        <span>
          <span>{(rates["UZS"] / rates["RUB"]).toFixed(2)}</span>
          {previousRates &&
            (rates["RUB"] > previousRates["RUB"] ? (
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
            ))}
        </span>
      </p>

      {/* Yevro */}
      <p className="currency-lines">
        <div>
          <span>EUR</span>
          <span>Yevro</span>
        </div>
        <span>
          <span>{(rates["UZS"] / rates["EUR"]).toFixed(2)}</span>
          {previousRates &&
            (rates["EUR"] > previousRates["EUR"] ? (
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
            ))}
        </span>
      </p>

      {/* Buyuk Britaniya funti */}
      <p className="currency-lines">
        <div>
          <span>GBP</span>
          <span>Buyuk Britaniya funti</span>
        </div>
        <span>
          <span>{(rates["UZS"] / rates["GBP"]).toFixed(2)}</span>
          {previousRates &&
            (rates["GBP"] > previousRates["GBP"] ? (
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
            ))}
        </span>
      </p>

      {/* Yapon yenasi */}
      <p className="currency-lines">
        <div>
          <span>JPY</span>
          <span>Yapon yenasi</span>
        </div>
        <span>
          <span>{(rates["UZS"] / rates["JPY"]).toFixed(2)}</span>
          {previousRates &&
            (rates["JPY"] > previousRates["JPY"] ? (
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
            ))}
        </span>
      </p>
    </div>
  );
};

export default CurrencyRates;
