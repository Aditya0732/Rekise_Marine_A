import React from 'react';

const Timer = ({ timeRemaining, isMoving, isCompleted }) => {
  return (
    <div className='p-4 flex items-center'>
      <div className="relative w-full h-16">
        <div className={`bg-gradient-to-r from-[#444444] to-[#333333] absolute inset-0 rounded-full ${isCompleted ? 'bg-gradient-to-b from-purple-500 to-purple-600' : ''}`}></div>
        <div className="flex justify-center items-center w-full h-full">
          {isCompleted ? (
            <h1 className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold z-10">Congratulations! Your journey is completed.</h1>
          ) : !isMoving ? (
            <h1 className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold z-10">Remaining time will be shown here once trip starts!</h1>
          ) : (
            <h1 className="text-white text-4xl font-bold z-10">{timeRemaining}</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
