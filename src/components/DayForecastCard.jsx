// components/DayForecastCard.jsx
import React from 'react';
import { WiThermometer, WiRaindrop, WiStrongWind } from 'react-icons/wi';

const DayForecastCard = ({ day, isToday, isSelected, onSelect }) => {
  const IconComponent = day.weatherInfo.iconComponent;


  return (
// import React from 'react';

// export default function WeatherForecastCard({ day, isSelected, onSelect, IconComponent }) {
//   return (
    <div
      onClick={onSelect}
      className={`
        relative overflow-hidden cursor-pointer rounded-3xl p-6 mt-8 text-white max-w-md mx-auto w-full
        transition-all duration-300 min-h-48 flex flex-col justify-between
        bg-white dark:bg-[#362e63] shadow-xl hover:scale-[1.02]
        ${isSelected ? 'ring-2 ring-purple-400/50 shadow-purple-900/40' : ''}
      `}
    >
      {/* Dynamic Angled Background Overlay (Matches the image) */}
      <div  
        className="absolute inset-0 bg-gradient-to-r from-[#4f3fb9] to-[#040d30]" 
        style={{ clipPath: 'polygon(0 0, 100% 34%, 100% 100%, 0% 100%)' }}
      />

      {/* Main Content (Relative to sit above clip-path) */}
      <div className="relative z-10 flex justify-between items-start h-full w-full">
        
        {/* Left Side: Temperature Stats & Location/Day */}
        <div className="flex flex-col justify-between h-full">
          <div>
            {/* Massive Main Temperature Display */}
            <h2 className="text-5xl font-light tracking-tight flex items-start">
              {day.temperatureMax}<span className="text-3xl font-extralight opacity-90">°</span>
            </h2>
            
            {/* High / Low Forecast Values */}
            <div className="text-sm font-medium text-white/70 mt-2 tracking-wide uppercase">
              H:{day.temperatureMax}° &nbsp; L:{day.temperatureMin}°
            </div>
          </div>

          {/* Day / Location Label */}
          <div className="text-sm font-semibold tracking-wide text-white/90 mt-4">
            {day.dayName}
          </div>
        </div>

        {/* Right Side: 3D-Style Icon Asset & Text Condition */}
        <div className="flex flex-col justify-between items-end h-full text-right self-stretch">
          
          {/* Weather Icon Box */}
          <div className="transform drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300">
            <IconComponent className="text-7xl text-white fill-current" />
          </div>

          {/* Condition Text */}
          <div className="text-sm font-medium text-white tracking-wider capitalize">
            {day.weatherInfo.description }
          </div>
        </div>

      </div>

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