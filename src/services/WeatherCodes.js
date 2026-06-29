const weatherGroups = {
  CLEAR: { 
    codes: [0, 1],
    description: 'Clear',
    icon: '☀️',
    iconNight: '🌙' // Clean celestial distinction
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
  icon: '🌧️', // Blue/white rain cloud - clean look
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
  icon: '⚡', // Yellow/white lightning - high contrast
  iconNight: '⚡'
}
};

// Create a reverse mapping for quick lookup
const codeToWeatherMap = {};
Object.values(weatherGroups).forEach(group => {
  group.codes.forEach(code => {
    codeToWeatherMap[code] = group;
  });
});

// Create a simple React component that renders an emoji
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
      // Return a component that renders the fallback emoji
      iconComponent: (props) => <WeatherIcon emoji="❓" {...props} />
    };
  }

  const iconKey = isNight ? 'iconNight' : 'icon';
  const emoji = weatherGroup[iconKey] || weatherGroup.icon;

  return {
    description: weatherGroup.description,
    icon: emoji,
    // Return a React component that renders the emoji with className support
    iconComponent: (props) => <WeatherIcon emoji={emoji} {...props} />,
    isNight: isNight
  };
};

// Helper to check if it's night time
export const isNightTime = (hour) => {
  return hour < 6 || hour >= 18;
};