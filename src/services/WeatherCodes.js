import { 
  WiDaySunny, 
  WiDayCloudy, 
  WiCloudy, 
  WiFog, 
  WiRain, 
  WiRainMix, 
  WiSnow, 
  WiSnowflakeCold, 
  WiShowers, 
  WiDayShowers, 
  WiThunderstorm, 
  WiStormShowers, 
  WiDaySleet, 
  WiNightSleet, 
  WiCloud, 
  WiDaySunnyOvercast, 
  WiNightClear, 
  WiNightCloudy, 
  WiNightPartlyCloudy, 
  WiNightRain, 
  WiNightSnow, 
  WiNightThunderstorm, 
  WiNightFog, 
  WiHail, 
  WiSleet 
} from 'react-icons/wi';

// Group weather conditions by type
const weatherGroups = {
  CLEAR: { 
    codes: [0, 1],
    description: 'Clear',
    icon: WiDaySunny,
    iconNight: WiNightClear
  },
  PARTLY_CLOUDY: { 
    codes: [2],
    description: 'Partly Cloudy',
    icon: WiDayCloudy, // Changed from WiDayPartlyCloudy (doesn't exist)
    iconNight: WiNightPartlyCloudy
  },
  CLOUDY: { 
    codes: [3],
    description: 'Cloudy',
    icon: WiCloudy,
    iconNight: WiNightCloudy
  },
  FOG: { 
    codes: [45, 48],
    description: 'Foggy',
    icon: WiFog,
    iconNight: WiNightFog
  },
  DRIZZLE: { 
    codes: [51, 53, 55, 56, 57],
    description: 'Drizzle',
    icon: WiRainMix,
    iconNight: WiNightRain
  },
  RAIN: { 
    codes: [61, 63, 65, 66, 67],
    description: 'Rain',
    icon: WiRain,
    iconNight: WiNightRain
  },
  SNOW: { 
    codes: [71, 73, 75, 77],
    description: 'Snow',
    icon: WiSnow,
    iconNight: WiNightSnow
  },
  RAIN_SHOWERS: { 
    codes: [80, 81, 82],
    description: 'Rain Showers',
    icon: WiDayShowers,
    iconNight: WiNightRain
  },
  SNOW_SHOWERS: { 
    codes: [85, 86],
    description: 'Snow Showers',
    icon: WiSnow,
    iconNight: WiNightSnow
  },
  THUNDERSTORM: { 
    codes: [95, 96, 99],
    description: 'Thunderstorm',
    icon: WiThunderstorm,
    iconNight: WiNightThunderstorm
  }
};

// Create a reverse mapping for quick lookup
const codeToWeatherMap = {};
Object.values(weatherGroups).forEach(group => {
  group.codes.forEach(code => {
    codeToWeatherMap[code] = group;
  });
});

export const getWeatherInfo = (code, isNight = false) => {
  const weatherGroup = codeToWeatherMap[code];
  
  if (!weatherGroup) {
    return { 
      description: 'Unknown', 
      icon: WiCloud,
      iconComponent: WiCloud
    };
  }

  const iconKey = isNight ? 'iconNight' : 'icon';
  const IconComponent = weatherGroup[iconKey] || weatherGroup.icon;

  return {
    description: weatherGroup.description,
    icon: IconComponent,
    iconComponent: IconComponent,
    isNight: isNight
  };
};

// Helper to check if it's night time (optional)
export const isNightTime = (hour) => {
  return hour < 6 || hour >= 18;
};

export const getWeatherInfoSimple = (code) => {
  const simpleCodes = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️', 48: '🌫️',
    51: '🌦️', 53: '🌦️', 55: '🌧️', 56: '🌧️', 57: '🌧️',
    61: '🌧️', 63: '🌧️', 65: '🌧️', 66: '🌧️', 67: '🌧️',
    71: '🌨️', 73: '🌨️', 75: '❄️', 77: '❄️',
    80: '🌦️', 81: '🌧️', 82: '⛈️',
    85: '🌨️', 86: '❄️',
    95: '⛈️', 96: '⛈️', 99: '⛈️'
  };
  
  return simpleCodes[code] || '❓';
};