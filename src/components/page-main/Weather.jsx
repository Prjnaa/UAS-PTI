import { data } from "autoprefixer";
import { useEffect, useState } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = () => {
      fetch(
        "http://api.weatherapi.com/v1/current.json?key=391e94c342374b5b976154320232205&q=auto:ip"
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setWeatherData(data);
        })
        .catch((error) => {
          console.error("Error fetching weather data", error);
        });
    };

    fetchWeatherData();

    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="weather text-lyellow">
      {weatherData && (
        <div className="weather-wrapper">
          <div className="location">
            <img src="" alt="" />
            <p className="text-end md:text-base/4 text-sm/3">
              {weatherData.location.name}
            </p>
          </div>
          <div className="condition flex justify-between">
            <img
              className="md:w-20 md:mt-0 mt-2 w-12"
              src={weatherData.current.condition.icon}
              alt=""
            />
            <div className="md:mt-5 mt-3 h-fit">
              <p className="font-semibold md:text-base/4 text-sm/4">
                {weatherData.current.temp_c}°
              </p>
              <p className="font-semibold md:text-base/6 text-sm/4">
                {Math.trunc(weatherData.current.feelslike_c)}°
              </p>
            </div>
          </div>
          <div>
            <p className="text-end md:text-base/3 text-xs/3">
              {weatherData.current.condition.text}
            </p>
            <p className="text-end md:text-base text-xs/4 md:mt-3">
              UV index : {weatherData.current.uv}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
