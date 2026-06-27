"use client"

import React, { useEffect, useState } from 'react'
import HourlyForecast from '@/components/HourelyForecast'
import SearchBox from '@/components/SearchBox'
import WeatherCard from '@/components/WeatherCard'
import SevenDayForecast from '@/components/SevenDays'
import { getWeather } from '@/services/DataFetch'
import ThemeToggle from '@/components/ThemeToggle'

const Page = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city);
      if(data) {
        setWeather(data);
        console.log('Weather data:', data); // This will log when data is fetched
      } else {
        setError('City not found');
      }
    } catch (err) {
      setError('Failed to fetch weather');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    search("Noakhali");
  }, []);

  // Log weather whenever it changes
  useEffect(() => {
    if (weather) {
      console.log('Weather updated:', weather);
    }
  }, [weather]);

  return (
    <div className=' max-w-5xl w-full flex flex-col '>
      <ThemeToggle/>
      <SearchBox 
        onSearch={search} 
        loading={loading}/>
      {error && <p className="text-red-500">{error}</p>}

      <WeatherCard
         weather={weather} 
         loading={loading}/> 
      <HourlyForecast weather={weather} loading={loading}/>
      <SevenDayForecast weather={weather} loading={loading}/>
    </div>
  )
}

export default Page