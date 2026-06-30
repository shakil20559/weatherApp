'use client';
import React, { useState } from 'react';
import DayForecastCard from './DayForecastCard';
import ForecastDetails from './ForecastDetails';
import { getWeatherInfo, isNightTime } from '@/services/WeatherCodes';

const SevenDayForecast = ({ weather, loading }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  if (loading) {
    return <SevenDayForecastSkeleton />;
  }

  if (!weather || !weather.daily) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No forecast data available
      </div>
    );
  }

  const createDateFromString = (dateStr) => {
    const parts = dateStr.split('-').map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  };

  // Process daily data
  const dailyData = weather.daily.time.map((date, index) => {
    const dateObj = createDateFromString(date);
    const weatherInfo = getWeatherInfo(
      weather.daily.weather_code[index],
      false 
    );

    return {
      date: dateObj,
      dayName: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: dateObj.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }),
      weatherInfo: weatherInfo,
      temperatureMax: Math.round(weather.daily.temperature_2m_max[index]),
      temperatureMin: Math.round(weather.daily.temperature_2m_min[index]),
      precipitation: weather.daily.precipitation_sum ? 
        Math.round(weather.daily.precipitation_sum[index] * 10) / 10 : 0,
      windSpeed: weather.daily.wind_speed_10m_max ? 
        Math.round(weather.daily.wind_speed_10m_max[index]) : 0,
      uvIndex: weather.daily.uv_index_max ? 
        Math.round(weather.daily.uv_index_max[index]) : 0,
      sunrise: weather.daily.sunrise ? weather.daily.sunrise[index] : null,
      sunset: weather.daily.sunset ? weather.daily.sunset[index] : null,
    };
  });

  // Get today's date in local timezone without time component
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg py-6 px-6 sm:px-10 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          7-Day Forecast
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {weather.daily.temperature_2m_max_unit || '°C'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   gap-4">
        {dailyData.map((day, index) => {
          const dayDate = `${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, '0')}-${String(day.date.getDate()).padStart(2, '0')}`;
          const isToday = dayDate === todayStr;
          const isSelected = selectedDay === index;

          return (
            <DayForecastCard
              key={index}
              day={day}
              isToday={isToday}
              isSelected={isSelected}
              onSelect={() => setSelectedDay(isSelected ? null : index)}
            />
          );
        })}
      </div>

      {/* Details Panel */}
      {selectedDay !== null && dailyData[selectedDay] && (
        <ForecastDetails
          day={dailyData[selectedDay]}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
};

// Skeleton Loader Component
const SevenDayForecastSkeleton = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-4">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-xl p-4 h-40">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-3"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SevenDayForecast;