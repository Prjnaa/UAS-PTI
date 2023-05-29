import { useEffect, useState } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = () => {
      fetch(
        "https://api.weatherapi.com/v1/current.json?key=391e94c342374b5b976154320232205&q=auto:ip"
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
    <div className="my-2 weather text-black">
      {weatherData && (
        <div className="weather-wrapper">
          <div className="location">
            <p className="text-end md:text-base/4 text-sm/snug">
              {weatherData.location.name}
            </p>
          </div>
          <div className="condition grid grid-cols-2">
            <img
              className="md:w-14 w-12 col-start-1 col-end-2"
              src={weatherData.current.condition.icon}
              alt=""
            />
            <div className="relative col-start-2 col-end-3">
              <div className="top-2 right-0 absolute">
                <p className="w-fit font-semibold md:text-base/4 text-sm/4">
                  {weatherData.current.temp_c}°
                </p>
                <p className="w-fit font-semibold md:text-base/6 text-sm/4">
                  {Math.trunc(weatherData.current.feelslike_c)}°
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-end md:text-base/3 text-xs/3 mt-2">
              {weatherData.current.condition.text}
            </p>
            <p className="text-end md:text-base text-xs/6 md:mt-3 mt-1 -mb-1">
              {"UV index: " + weatherData.current.uv}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
