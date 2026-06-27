// components/DayForecastCard.jsx
import React from 'react';
import { WiThermometer, WiRaindrop, WiStrongWind } from 'react-icons/wi';

const DayForecastCard = ({ day, isToday, isSelected, onSelect }) => {
  const IconComponent = day.weatherInfo.iconComponent;

  return (
    <div
      onClick={onSelect}
      className={`
        cursor-pointer rounded-xl p-4 transition-all duration-300
        ${isSelected 
          ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg transform ' 
          : 'hover:shadow-md hover:scale-102'
        }
        ${isToday 
          ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-2 border-blue-400 dark:border-blue-500' 
          : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/30 dark:hover:bg-gray-700/50 border-2 border-transparent'
        }
      `}
    >
      {/* Day and Date */}
      <div className="flex items-center justify-between mb-2">
        <span className={`
          font-semibold text-sm
          ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'}
        `}>
          {isToday ? 'Today' : day.dayName}
        </span>
        {isToday && (
          <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full">
            NOW
          </span>
        )}
      </div>

      {/* Weather Icon */}
      <div className="flex justify-center my-2">
        <IconComponent 
          className={`
            text-5xl transition-transform duration-300
            ${isSelected ? 'scale-110 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'}
          `} 
        />
      </div>

      {/* Weather Description */}
      <div className="text-center text-xs text-gray-600 dark:text-gray-400 mb-2">
        {day.weatherInfo.description}
      </div>

      {/* Temperature */}
      <div className="flex items-center justify-center gap-3 text-sm">
        <span className="font-bold text-gray-800 dark:text-white">
          {day.temperatureMax}°
        </span>
        <span className="text-gray-400 dark:text-gray-500">|</span>
        <span className="text-gray-500 dark:text-gray-400">
          {day.temperatureMin}°
        </span>
      </div>

      {/* Quick Stats */}
      <div className="flex justify-around mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
        {day.precipitation > 0 && (
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <WiRaindrop className="text-blue-500" />
            {day.precipitation}mm
          </div>
        )}
        {day.windSpeed > 0 && (
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <WiStrongWind className="text-gray-500" />
            {day.windSpeed}km/h
          </div>
        )}
      </div>
    </div>
  );
};

export default DayForecastCard;