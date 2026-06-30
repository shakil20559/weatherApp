import Image from 'next/image'
// import backgroundIMG from '../../public/backgroundSun.jpg'
import { getWeatherInfo, isNightTime } from '@/services/WeatherCodes'
import { LuWind } from 'react-icons/lu';
import { IoWaterOutline } from 'react-icons/io5';

const WeatherCard = ({weather, }) => {

  if (!weather || !weather.current) {
    return <div>Loading...</div>;
  }

  const currentHour = new Date().getHours();
  const isNight = isNightTime(currentHour);
  const weatherInfo = getWeatherInfo(weather.current.weather_code, isNight);

  return (
    
      <div className="max-w-xl w-full mx-auto my-10 py-5 px-3
       bg-[url('/backgroundSun.jpg')] bg-cover bg-center bg-no-repeat
      backdrop-blur-xl shadow-lg
       border border-gray-700 rounded-3xl 
      transition-colors duration-300 
      ">
        
        {/* Location */}
        <div className="text-center">
          <h2 className="text-3xl font-medium text-white/90 tracking-wider">
           {weather.city}
          </h2>
          <p className="text-white/60 mt-1 text-2xl">
           {weather.country}
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-12 ml-6">
          {/* Temperature Info */}
           <h1 className="text-7xl font-light text-gray-200 ">
              {Math.round(weather.current.temperature_2m)}°C
            </h1>

            <div className="text-2xl font-normal text-gray-200 tracking-wider mt-2">
             {weatherInfo.description} Sky 
            </div>
    
            <p className="text-base text-gray-300 mt-1">
              Feels like
              <span className="text-lg font-semibold ml-1 text-blue-400">
                {Math.round(weather.current.apparent_temperature)}°c
              </span> 
            </p>
        </div>

       
        {/* Extra Details */}
        <div className="flex items-center justify-between gap-4 mt-12 mb-2 py-2 px-4 sm:px-6 w-full rounded-3xl border border-white/10 
        bg-transparent backdrop-blur-2xl shadow-2xl ">
          <div className='flex flex-col gap-2 my-2'>
            <p className='text-gray-300'>
               Max: 
                <span className="text-lg font-semibold ml-1 text-blue-400">
                {Math.round(weather.daily.temperature_2m_max[0])}°
                </span>
            </p>
              
            <p className='text-gray-300'>
               Min: 
                <span className="text-lg font-semibold ml-1 text-blue-400">
               {Math.round(weather.daily.temperature_2m_min[0])}°
                </span>
            </p>
              
          </div>

          
          {/* humidity & wind */}
          <div >
            <div className=" flex gap-8 items-center mb-2 text-center ">
            <p className="flex items-center gap-1 sm:gap-2 text-gray-200 text-base">
             <IoWaterOutline className='text-2xl'/> Humidity
            </p>
            <p className="text-lg font-medium text-blue-400">
              {weather.current.relative_humidity_2m}%
            </p>
          </div>

            <div className=" flex gap-8 items-center text-center ">
              <p className="flex items-center gap-2 text-gray-200 text-base">
              <LuWind className='text-2xl'/>  Wind
              </p>
              <p className="text-lg font-medium text-blue-400">
              {Math.round(weather.current.wind_speed_10m)} km/h 

              </p>
            </div>
          </div>
           
        </div> 

      </div>
    // </div>
  )
}

export default WeatherCard