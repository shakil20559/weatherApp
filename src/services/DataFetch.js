export const getWeather = async (city) => {
  try {
    // Get latitude & longitude
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    const geoData = await geoRes.json();

    if (!geoData.results?.length) {
      throw new Error("City not found");
    }

    const { latitude, longitude } = geoData.results[0];

    // Get weather data
    const weatherRes = await fetch(
       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7`
       
    );

    const weatherData = await weatherRes.json();

    return weatherData;
  } catch (error) {
    console.error(error);
    return null;
  }
};