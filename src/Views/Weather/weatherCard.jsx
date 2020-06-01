import React, { useState, useEffect, Fragment } from 'react';
import symbols from './../../Assets/svgs/symbols.svg';
import axios from 'axios';



export const WeatherCard = ({ damName, currentLat, currentLong }) => {

  const [ weatherData, setWeatherData  ] = useState(null);

  useEffect(()=> {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=2b5de48a4182eb07f49650d4a6a854b1`)
    .then(function (response) {
      if (response.data) {
        setWeatherData(response.data);
        console.log(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
     });
  }, [])

  const todayDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  const svgSymbol = <svg width='24' height='24'>
        {weatherData && weatherData.weather[0].icon === '04d' ? 
          (<use xlinkHref={`${symbols}#rainy`} />) : 
            weatherData && weatherData.weather[0].icon === '03d' ? 
              (<use xlinkHref={`${symbols}#windy`} />) : 
              weatherData && weatherData.weather[0].icon === '02d' ? 
                  (<use xlinkHref={`${symbols}#cloudy`} />) : 
                    weatherData && weatherData.weather[0].icon === '50d' ? 
                      (<use xlinkHref={`${symbols}#haze`} />) :
          (<use xlinkHref={`${symbols}#sunny`} />)
        }
  </svg>
  return (
    <article className='weather-card'>
    {
    weatherData &&
      <Fragment>
      <div>
        <div className='dam-title'>{damName}<br /><small>(&nbsp;{weatherData.name}&nbsp;)</small></div>
        <div className='weather-date'>{todayDate}</div>
        <hr />
        <h3 className='weather-temp'><b>{parseInt(weatherData.main.temp - 273.15)}&nbsp;°C</b></h3>
        <div className='weather-temp-range'>{parseInt(weatherData.main.temp_max - 273.15)}&nbsp;°C&nbsp;/&nbsp;{parseInt(weatherData.main.temp_min - 273.15)}&nbsp;°C</div>
        <div className='weather-desc'>{svgSymbol} {weatherData.weather[0].description}</div>
        <hr />
        <div className='wind-speed'>Wind Speed: <b>{weatherData.wind.speed}</b> km/h</div>
        <div className='humidity'>Humidity: <b>{weatherData.main.humidity}</b> %</div>
      </div>
      <div>
        <div className='weather-main'>
          <p>{svgSymbol}</p>
          <p>{weatherData.weather[0].main}</p>
        </div>
      </div>
      </Fragment>
    }
    </article>
  );
}