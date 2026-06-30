export const getWeather = async (city, country = null) => {
  try {
    let searchQuery = city;
    if (country) {
      searchQuery = `${city}, ${country}`;
    }

    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=1&language=en`
    );

    const geoData = await geoRes.json();

    if (!geoData.results?.length) {
      throw new Error("City not found");
    }

    const { latitude, longitude, name, country: countryName, timezone } = geoData.results[0];

    // Get weather data
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=${timezone || 'auto'}`
    );

    const weatherData = await weatherRes.json();

    return {
      city: name,
      country: countryName,
      latitude,
      longitude,
      timezone: timezone || 'auto',
      ...weatherData
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
