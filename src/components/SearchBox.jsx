'use client'

import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';

const SearchBox = () => {
  function handleSubmit (e){
      e.preventDefault();
  }
  return (
    <div className='flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4'>
      <div className='text-center mb-6'>
        <div className='flex items-center justify-center gap-2 mb-2'>         
          <h1 className='text-4xl md:text-5xl  '>
            Weather in
          </h1>
          <FaMapMarkerAlt className=' text-2xl' />
        </div>
        <p className=' text-base  italic tracking-wide'>
          Find your city's weather forecast
        </p>
      </div>
      
      <form  
        onSubmit={handleSubmit}
        className='relative w-full max-w-lg'>
        <div className=' bg_globalColor  relative flex items-center 
        shadow-lg hover:shadow-xl transition-shadow duration-300 
        rounded-full overflow-hiddenborder border-violet-500
         focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200'>
          <input 
            type="text"
            className='flex-1 py-3 px-4 text-lg placeholder-gray-400 text-white outline-none bg-transparent'
            placeholder='Enter city name...'
            aria-label="Search for city weather"
          />
          <button 
            type="submit"
            className='btn_globalStyle py-3 px-8 rounded-full 
            text-2xl tracking-wider text-white
           transition-all duration-300 cursor-pointer shadow-lg'
            aria-label="Search weather"
          >
            <BiSearch className='text-xl' />
          </button>
        </div>
        
       
      </form>
    </div>
  );
};

export default SearchBox;