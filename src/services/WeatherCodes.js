const weatherGroups = {
  CLEAR: { 
    codes: [0, 1],
    description: 'Clear',
    icon: '☀️',
    iconNight: '🌙' 
  },
  PARTLY_CLOUDY: { 
    codes: [2],
    description: 'Partly Cloudy',
    icon: '⛅',
    iconNight: '🌌' 
  },
  CLOUDY: { 
    codes: [3],
    description: 'Cloudy',
    icon: '☁️',
    iconNight: '☁️'
  },
  FOG: { 
    codes: [45, 48],
    description: 'Foggy',
    icon: '💨',
    iconNight: '🌃'
  },
  DRIZZLE: { 
    codes: [51, 53, 55, 56, 57],
    description: 'Drizzle',
    icon: '🌦️',
    iconNight: '🌧️'
  },
  RAIN: { 
    codes: [61, 63, 65, 66, 67],
    description: 'Rain',
    icon: '🌧️',
    iconNight: '🌧️'
  },
  SNOW: { 
    codes: [71, 73, 75, 77],
    description: 'Snow',
    icon: '🌨️',
    iconNight: '🌨️'
  },
  RAIN_SHOWERS: { 
  codes: [80, 81, 82],
  description: 'Rain Showers',
  icon: '🌧️', 
  iconNight: '🌧️'
},
  SNOW_SHOWERS: { 
    codes: [85, 86],
    description: 'Snow Showers',
    icon: '❄️',
    iconNight: '❄️'
  },
  THUNDERSTORM: { 
  codes: [95, 96, 99],
  description: 'Thunderstorm',
  icon: '⚡', 
  iconNight: '⚡'
}
};


const codeToWeatherMap = {};
Object.values(weatherGroups).forEach(group => {
  group.codes.forEach(code => {
    codeToWeatherMap[code] = group;
  });
});

const WeatherIcon = ({ emoji, className, ...props }) => {
  return (
    <span className={className} {...props}>
      {emoji}
    </span>
  );
};

export const getWeatherInfo = (code, isNight = false) => {
  const weatherGroup = codeToWeatherMap[code];
  
  if (!weatherGroup) {
    return { 
      description: 'Unknown', 
      icon: '❓',
      iconComponent: (props) => <WeatherIcon emoji="❓" {...props} />
    };
  }

  const iconKey = isNight ? 'iconNight' : 'icon';
  const emoji = weatherGroup[iconKey] || weatherGroup.icon;

  return {
    description: weatherGroup.description,
    icon: emoji,
    iconComponent: (props) => <WeatherIcon emoji={emoji} {...props} />,
    isNight: isNight
  };
};

export const isNightTime = (hour) => {
  return hour < 6 || hour >= 18;
};