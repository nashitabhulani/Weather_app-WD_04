import React, { useEffect, useRef, useState } from 'react';
import { API_KEY } from '../config.js';
import './Weather.css';
import clear_icon from '../assets/clear-sky.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rainy.png';
import snow_icon from '../assets/snowflake.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {

  const inputRef=useRef();
  const [weatherData, setWeatherData]=useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": rain_icon,
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

    const search= async(city)=>{
      try{
        if(city===""){
          alert("Enter city name");
          return;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;


        const response=await fetch(url);
        const data=await response.json();
        console.log(data);
        const icon= allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity:data.main.humidity,
          windSpeed:data.wind.speed,
          temperature:Math.floor(data.main.temp),
          location:data.name,
          icon:icon
        })
      }catch(error){

      }
    }
    useEffect(()=>{
      search("washington");
    },[]
    )

 return (
    <div className='weather'>
      <div className='search'>
        <input ref={inputRef} type='text' placeholder='Enter city' />
        <i onClick={()=>search(inputRef.current.value)} className="fa-solid fa-magnifying-glass"></i>
      </div>
      <img src={weatherData.icon} alt='clear_icon' className='weather_icon' />
      <p className='temperature'>{weatherData.temperature} &deg; C</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather_data'>
        <div className='col'>
          <img src={humidity_icon} alt="Humidity" />
          <div className="text">
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind_icon} alt="Wind Speed" />
          <div className="text">
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
