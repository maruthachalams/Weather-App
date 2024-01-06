import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assects/Search.png';
import wind_icon from '../Assects/Wind.png';
import snow_icon from '../Assects/Snow.png';
import rain_icon from '../Assects/Rain.png';
import drizzle_icon from '../Assects/Drizzle.png';
import humidity_icon from '../Assects/Humidity.png';
import cloudy_icon from '../Assects/Cloudy.png';
import clear_icon from '../Assects/Clear.png';

const WeatherApp = () => {
    let api_key = "f3d548879e51609cb09cfd0f8d727a8b";
    const [wicon, setWicon] = useState(cloudy_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let data; // Declare data outside the try block

        try {
            let response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            data = await response.json();
            updateWeatherData(data);
            updateWeatherIcon(data.weather[0].icon);

        } catch (error) {
            console.error("An error occurred:", error.message);
            // Handle error, e.g., display an error message to the user
            return;
        }

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-speed");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = Math.floor(data.main.humidity) + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) + " °c";
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear_icon);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloudy_icon);
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain_icon);
        } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain_icon);
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow_icon);
        } else {
            setWicon(clear_icon);
        }
    };

    const updateWeatherData = (data) => {
        // Implement your logic to update weather data
    };

    const updateWeatherIcon = (icon) => {
        // Implement your logic to update weather icon
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className="cityInput" placeholder='search' />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt=" " />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>

            <div className="weather-temp">24°c</div>
            <div className="weather-location">Pollachi</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">80%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-speed">15 Km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <p>&copy; Maruthachalam S </p>
                <p>LinkedIn: linkedin.com/in/maruthachalams</p>
            </div>
        </div>
    );
};

export default WeatherApp;
