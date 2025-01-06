import React, { useEffect, useState } from "react";
import "./weather.scss";
import Loading from "../loading/loading";
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Tashkent&appid=d66a3a2f03bbb26656d45fa20fb11454&units=metric")
      .then(response => response.json())
      .then(data => setWeatherData(data));
  }, []);
  if (!weatherData) {
    return <div>
      <Loading />
    </div>;
  }
  return (
    <div className="weather-widget">
      <div className="current-weather">
        <div className="current-temp">
          <h1>{Math.round(weatherData.list[0].main.temp)}°C</h1>
          <p>{weatherData.city.name}</p>
        </div>
        <div className="additional-info">
          <div className="info">
            <p>{weatherData.list[0].main.humidity}% Humidity</p>
            <p>{weatherData.list[0].wind.speed} km/h Wind</p>
          </div>
        </div>
      </div>
      <div className="forecast">
        <h3>Hourly Forecast</h3>
        <div className="forecast-hours">
          {weatherData.list.slice(0, 8).map((hour, index) => (
            <div key={index} className="hour">
              <p>{new Date(hour.dt * 1000).getHours()}:00</p>
              <p>{Math.round(hour.main.temp)}°C</p>
              <img
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                alt="weather icon"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
