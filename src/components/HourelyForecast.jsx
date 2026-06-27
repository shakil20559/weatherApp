import React from 'react';
import { getWeatherInfo, isNightTime } from '@/services/WeatherCodes';

const HourlyForecast = ({ weather }) => {
  if (!weather || !weather.hourly) {
    return (
      <div className="animate-pulse flex space-x-4 p-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  // Get current hour to find starting index
  const currentHour = new Date().getHours();
  
  // Find the next hour index
  let startIndex = 0;
  for (let i = 0; i < weather.hourly.time.length; i++) {
    const hour = new Date(weather.hourly.time[i]).getHours();
    if (hour > currentHour) {
      startIndex = i;
      break;
    }
  }
  
  // If no future hour found (end of day), start from beginning
  if (startIndex === 0 && new Date(weather.hourly.time[0]).getHours() <= currentHour) {
    startIndex = 0;
  }

  // Get 8 hours starting from next hour
  const hourlyData = weather.hourly.time.slice(startIndex, startIndex + 10).map((time, index) => {
    const date = new Date(time);
    const hour = date.getHours();
    const weatherInfo = getWeatherInfo(
      weather.hourly.weather_code[startIndex + index],
      isNightTime(hour)
    );
    
    return {
      time: date,
      hour: hour,
      temperature: Math.round(weather.hourly.temperature_2m[startIndex + index]),
      weatherInfo: weatherInfo,
      precipitation: weather.hourly.precipitation ? Math.round(weather.hourly.precipitation[startIndex + index] * 10) / 10 : 0,
      windSpeed: weather.hourly.wind_speed_10m ? Math.round(weather.hourly.wind_speed_10m[startIndex + index]) : 0
    };
  });

  
  while (hourlyData.length < 10) {
    break;
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg py-6 px-4 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          8-Hour Forecast
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </span>
      </div>

      {/* 8 Hour Grid */}
      <div className="grid grid-cols-5 gap-4">
        {hourlyData.map((data, index) => {
          const IconComponent = data.weatherInfo.iconComponent;
          const isNow = index === 0;

          return (
            <div 
              key={index}
              className={`
                flex flex-col items-center p-4 rounded-3xl transition-all duration-200
                ${isNow 
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-400 dark:border-blue-500 shadow-md' 
                  : 'bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 border-2 border-transparent'
                }
              `}
            >
              {/* Time */}
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {data.hour === 0 ? '12 AM' : 
                 data.hour === 12 ? '12 PM' :
                 data.hour > 12 ? `${data.hour - 12} PM` : 
                 `${data.hour} AM`}
              </div>

              {/* Weather Icon */}
              <div className="my-2">
                <IconComponent 
                  className={`
                    text-4xl transition-transform duration-300
                    ${isNow ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-gray-700 dark:text-gray-200'}
                  `} 
                />
              </div>

              {/* Temperature */}
              <div className={`
                text-xl font-bold
                ${isNow ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-white'}
              `}>
                {data.temperature}°
              </div>

              {/* Weather Description */}
              {/* <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center leading-tight">
                {data.weatherInfo.description}
              </div> */}

              {/* Precipitation indicator */}
              {data.precipitation > 0 && (
                <div className="text-[10px] text-blue-500 dark:text-blue-400 mt-1 flex items-center gap-1">
                  <span>💧</span>
                  {data.precipitation}mm
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
            Next hour
          </span>
          <span>💧 = Precipitation</span>
        </div>
        <div>
          {weather.hourly.temperature_2m_unit || '°C'}
        </div>
      </div>
    </div>
  );
};
export default HourlyForecast;


