import React, { useEffect, useState } from "react";
import "./weather.scss";
import Loading from "../loading/loading";
import sunny from "./sunny.png";
import night from "./night.png";
import partlyCloud from "./partly-cloud.png";
import partlyCloudNight from "./partly-cloud-night.png";
import rain from "./rain.png";
import rainNight from "./rain-night.png";
import thunderStorm from "./thunder-storm.png";
import snow from "./snow.png";
import mist from "./mist.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [locationDenied, setLocationDenied] = useState(false); // Joylashuvni rad etish holati


  useEffect(() => {
    // Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
          setLocationDenied(false); // Ruxsat berildi, rad etilganligini o'chirish
        },
        (error) => {
          setLocationDenied(true); // Foydalanuvchi ruxsat bermadi
          setError(
            "Joylashuv ma'lumotlari olinmadi. Obi-havo ma'lumotlarini ko'rish uchun 'Sozlamalar'dan joylashuv uchun ruxsat bering yoki sahifani qayta yuklang"
          );
          fetchWeather(41.2995, 69.2401); // Default to Tashkent
        }
      );
    } else {
      setError("Joylashuv funksiyasi qo'llab-quvvatlanmaydi.");
      fetchWeather(41.2995, 69.2401); // Default to Tashkent
    }
  }, []);
  const fetchWeather = (lat, lon) => {
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d66a3a2f03bbb26656d45fa20fb11454&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.city) {
          // Shahar nomi va mamlakatni tekshirish
          if (data.city.name === "Massy" && data.city.country === "KG") {
            data.city.name = "Andijon";
            data.city.country = "UZ";
          }
          setWeatherData(data); // O'zgartirilgan ob'ektni saqlash
        } else {
          setError("Ob-havo ma'lumotlarini olishda xatolik yuz berdi.");
        }
      })
      .catch(() =>
        setError("Ob-havo ma'lumotlarini olishda xatolik yuz berdi.")
      );

    const updateTimeAndDay = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      };
      setCurrentTime(now.toLocaleDateString("uz-UZ", options));

      // Short weekday name
      const shortDayOptions = { weekday: "short" };
      setCurrentDay(now.toLocaleDateString("uz-UZ", shortDayOptions));
    };

    updateTimeAndDay();
    const timer = setInterval(updateTimeAndDay, 60000); // Update every minute

    return () => clearInterval(timer); // Clear interval on component unmount
  };

  const requestLocationAgain = () => {
    // Geolocation so'rovini qayta yuborish
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
          setLocationDenied(false); // Ruxsat berildi, rad etilganligini o'chirish
        },
        (error) => {
          setLocationDenied(true); // Foydalanuvchi yana rad etsa
          setError("Joylashuv ma'lumotlari olinmadi.");
        }
      );
    }
  };
  if (error) {
    return <p style={{width: '55%'}} className="location-error">{error}</p>;
  }

  if (!weatherData) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const iconMapping = {
    "01d": sunny,
    "01n": partlyCloudNight,
    "02d": partlyCloud,
    "02n": partlyCloudNight,
    "09d": rain,
    "09n": rainNight,
    "10d": rain,
    "10n": rain,
    "11d": thunderStorm,
    "11n": thunderStorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const currentWeather = weatherData.list[0];
  const weatherIcon = iconMapping[currentWeather.weather[0].icon];

  return (
    <div className="weather-widget">
      <div className="current-weather">
        <div className="current-temp">
          <div className="weather-left">
            <img
              src={weatherIcon}
              alt={currentWeather.weather[0].description}
            />
            <h1>
              {Math.round(weatherData.list[0].main.temp)} <span>°C</span>
            </h1>
          </div>
          <div className="nam">
            <p>Namlik: {weatherData.list[0].main.humidity}%</p>
            <p>Shamol: {weatherData.list[0].wind.speed} km/h</p>
          </div>
        </div>
        <div className="additional-info">
          <div className="info">
            <p>{weatherData.city.name}</p>
            <p>{currentTime}</p>
          </div>
        </div>
      </div>
      <div className="forecast">
        <h3>Soatlik prognoz</h3>
        <div className="forecast-hours">
          {weatherData.list.slice(0, 8).map((hour, index) => (
            <div key={index} className="hour">
              <p className="date-hour">
                {new Date(hour.dt * 1000).getHours()}:00
              </p>
              <img
                src={
                  iconMapping[hour.weather[0].icon] ||
                  `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`
                }
                alt={hour.weather[0].description}
              />
              <p>{Math.round(hour.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
