// BottomBar.js
import React from 'react';

const BottomBar = ({ handlePause, handleStart, handleRestart }) => {
  return (
    <div className='bg-[#232323] shadow-lg shadow-black p-4 rounded-lg flex justify-center gap-3'>
      <button
        className='w-full p-2 bg-[#444444] text-white text-lg font-semibold rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300'
        onClick={handlePause}
      >
        Pause
      </button>
      <button
        className='w-full p-2 bg-[#444444] text-white text-lg font-semibold rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300'
        onClick={handleStart}
      >
        Start
      </button>
      <button
        className='w-full p-2 bg-[#444444] text-white text-lg font-semibold rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300'
        onClick={handleRestart}
      >
        Reset
      </button>
    </div>
  );
};

export default BottomBar;
