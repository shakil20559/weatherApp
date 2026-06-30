'use client'

import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';

const SearchBox = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity(''); // Optional: Clear input after search
    }
  }
  return (
    <div className='flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 mt-16 mb-10'>
      <div className='text-center mb-6'>
        <div className='flex items-center justify-center gap-2 mb-2'>         
          <h1 className='text-4xl md:text-5xl'>
            Weather in
          </h1>
          <FaMapMarkerAlt className='text-2xl' />
        </div>
        <p className='text-base italic tracking-wide'>
          Find your city's weather forecast
        </p>
      </div>
      
      <form  
        onSubmit={handleSubmit}
        className='relative w-full max-w-lg'>
          
        <div className='bg_globalColor relative flex items-center 
        px-5 shadow-lg hover:shadow-xl transition-shadow duration-300 
        rounded-full overflow-hidden border border-violet-500
        focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200'>
          <input 
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='flex-1 py-3  text-lg placeholder-gray-400 text-white outline-none bg-transparent'
            placeholder='Enter city name...'
            aria-label="Search for city weather"
            disabled={loading}
          />
          <button 
            type="submit"
            disabled={loading || !city.trim()}
            className='btn_globalStyle py-3 px-2 rounded-full 
            text-2xl tracking-wider text-white
            transition-all duration-300 cursor-pointer shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed'
            aria-label="Search weather"
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <BiSearch className='text-xl' />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
