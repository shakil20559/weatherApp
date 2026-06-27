// components/ForecastDetails.jsx
import React from 'react';
import { 
  WiThermometer, 
  WiRaindrop, 
  WiStrongWind, 
  WiDaySunny,
  WiSunrise,
  WiSunset,
  WiHumidity,
  WiBarometer
} from 'react-icons/wi';

const ForecastDetails = ({ day, onClose }) => {
  const IconComponent = day.weatherInfo.iconComponent;

  return (
    <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-blue-200 dark:border-gray-700 relative animate-slideIn">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <IconComponent className="text-6xl text-blue-600 dark:text-blue-400" />
        <div>
          <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
            {day.dayName}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{day.fullDate}</p>
        </div>
        <div className="ml-auto text-right">
          <div className="text-3xl font-bold text-gray-800 dark:text-white">
            {day.temperatureMax}°
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {day.temperatureMin}° min
          </div>
        </div>
      </div>

      {/* Weather Description */}
      <div className="mb-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {day.weatherInfo.description}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <DetailItem 
          icon={WiThermometer}
          label="Feels Like"
          value={`${day.temperatureMax}°`}
        />
        <DetailItem 
          icon={WiRaindrop}
          label="Precipitation"
          value={`${day.precipitation} mm`}
        />
        <DetailItem 
          icon={WiStrongWind}
          label="Wind Speed"
          value={`${day.windSpeed} km/h`}
        />
        <DetailItem 
          icon={WiDaySunny}
          label="UV Index"
          value={day.uvIndex}
          valueColor={day.uvIndex > 7 ? 'text-red-500' : 'text-yellow-500'}
        />
        {day.sunrise && (
          <DetailItem 
            icon={WiSunrise}
            label="Sunrise"
            value={new Date(day.sunrise).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          />
        )}
        {day.sunset && (
          <DetailItem 
            icon={WiSunset}
            label="Sunset"
            value={new Date(day.sunset).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          />
        )}
      </div>
    </div>
  );
};

// Detail Item Sub-component
const DetailItem = ({ icon: Icon, label, value, valueColor = 'text-gray-800 dark:text-white' }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <Icon className="text-2xl text-blue-500 dark:text-blue-400" />
      <div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
        <div className={`font-semibold ${valueColor}`}>{value}</div>
      </div>
    </div>
  );
};

export default ForecastDetails;