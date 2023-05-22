import { data } from "autoprefixer"
import React, { useEffect, useState } from "react"

function Weather() {
    

    const[weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        const fetchWeatherData = () => {
            fetch('http://api.weatherapi.com/v1/current.json?key=391e94c342374b5b976154320232205&q=auto:ip')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setWeatherData(data)
            })
            .catch(error => {
                console.error('Error fetching weather data', error)
            })
        }
        
        fetchWeatherData()
        
        const interval = setInterval(fetchWeatherData, 5 * 60 * 1000);
        
        return () => clearInterval(interval)
    }, []);

    return (
        <div className="weather">
            {weatherData && (
                <div className="weather-wrapper">
                    <div className="location">
                        <img src="" alt=""/>
                        <p>{weatherData.location.name}</p>
                    </div>
                    <div className="condition">
                        <img src={weatherData.current.condition.icon} alt=""/>
                        <p>{weatherData.current.condition.text}</p>
                    </div>
                    <div className="temp">
                        <p>{JSON.stringify(weatherData.current.temp_c)}°C</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather