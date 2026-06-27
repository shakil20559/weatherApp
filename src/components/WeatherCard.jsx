"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import rain from '../../public/rainWeather.jpg'
import { getWeatherInfo, isNightTime } from '@/services/WeatherCodes'

const WeatherCard = ({weather, }) => {

  if (!weather || !weather.current) {
    return <div>Loading...</div>;
  }

  const currentHour = new Date().getHours();
  const isNight = isNightTime(currentHour);
  const weatherInfo = getWeatherInfo(weather.current.weather_code, isNight);

  return (
    
      <div className="max-w-lg w-full mx-auto my-10 py-5 px-12
      bg-white dark:bg-[#0F1A45]/70
      backdrop-blur-xl shadow-lg
       border border-white/10 dark:border-gray-700 rounded-3xl 
      transition-colors duration-300
      ">
        
        {/* Location */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-[#f8fafc]">
            Dhaka, BD
          </h2>
          <p className="text-gray-500 dark:text-[#94a3b8] mt-1">
            Current Weather
          </p>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-between mt-8">
          
          {/* Temperature Info */}
          <div className=''>
            <h1 className="text-7xl font-light text-blue-600 ml dark:text-[#f8fafc]">
              {Math.round(weather.current.temperature_2m)}°C
            </h1>

            <div className="text-xl font-normal text-gray-700 tracking-wider dark:text-[#f8fafc] mt-2">
             Sky  {weatherInfo.description}
            </div>

            <p className="text-base text-blue-500 dark:text-[#94a3b8] mt-1">
              Feels like {Math.round(weather.current.apparent_temperature)}°C
            </p>
          </div>

          {/* Weather Icon */}
          <div className="w-32 h-32 flex items-center justify-center">
            <Image
              src={rain}
              alt="weather condition"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Extra Details */}
        <div className="flex justify-between gap-4 mt-8">

          <div className= "w-32 bg-blue-50 dark:bg-[#06142e]/80 rounded-xl p-4 text-center border border-blue-100 dark:border-[#94a3b8]/30">
            <p className="text-gray-500 dark:text-[#94a3b8] text-base">
              Humidity
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-[#f8fafc]">
              {weather.current.relative_humidity_2m}%
            </p>
          </div>

          <div className="w-32 bg-blue-50 dark:bg-[#06142e]/80 rounded-xl p-4 text-center border border-blue-100 dark:border-[#94a3b8]/30">
            <p className="text-gray-500 dark:text-[#94a3b8] text-base">
              Wind
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-[#f8fafc]">
              12 km/h
            </p>
          </div>
        </div>

      </div>
    // </div>
  )
}

export default WeatherCard