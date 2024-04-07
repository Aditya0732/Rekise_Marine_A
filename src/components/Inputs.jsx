import React from 'react';
import { GrEdit } from 'react-icons/gr';

const Inputs = ({ speed, fps, startPosition, endPosition, isEditing, handleInputChange, handleEdit, handleSave }) => {
  return (
    <div className='w-full lg:w-1/3 p-4 h-full flex flex-col gap-4'>
          <div className='bg-[#232323] shadow-lg shadow-black p-4 rounded-lg relative flex-1'>

            <button
              className='absolute top-2 right-2 p-2 bg-[#e2a21d] shadow-md shadow-black rounded-lg hover:bg-[#cea028]'
              onClick={handleEdit}
            >
              <span><GrEdit color='black' size={20} /></span>
            </button>

            <div className="flex gap-2 items-center px-4 py-1 rounded-lg">
              <label htmlFor="speed" className="text-white text-sm">Speed (kmph) :</label>
              <input
                type="number"
                id="speed"
                name="speed"
                value={speed}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`input-field focus:outline-none ${isEditing ? 'bg-[#333333]' : 'bg-[#232323]'} text-white rounded p-2`}
              />
            </div>
            <div className="flex gap-2 items-center px-4 py-1 rounded-lg">
              <label htmlFor="fps" className="text-white text-sm">Frames per second :</label>
              <input
                type="number"
                id="fps"
                name="fps"
                value={fps}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`input-field focus:outline-none ${isEditing ? 'bg-[#333333]' : 'bg-[#232323]'} text-white rounded p-2`}
              />
            </div>
            <div className="flex gap-2 items-center px-4 py-1 rounded-lg">
              <label htmlFor="startLat" className="text-white text-sm">Start Latitude :</label>
              <input
                type="number"
                id="startLat"
                name="startLat"
                value={startPosition[0]}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`input-field focus:outline-none ${isEditing ? 'bg-[#333333]' : 'bg-[#232323]'} text-white rounded p-2`}
              />
            </div>
            <div className="flex gap-2 items-center px-4 py-1 rounded-lg">
              <label htmlFor="startLon" className="text-white text-sm">Start Longitude :</label>
              <input
                type="number"
                id="startLon"
                name="startLon"
                value={startPosition[1]}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`input-field focus:outline-none ${isEditing ? 'bg-[#333333]' : 'bg-[#232323]'} text-white rounded p-2`}
              />
            </div>
            <div className="flex gap-2 items-center px-4 py-1 rounded-lg">
              <label htmlFor="endLat" className="text-white text-sm">End Latitude :</label>
              <input
                type="number"
                id="endLat"
                name="endLat"
                value={endPosition[0]}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`input-field focus:outline-none ${isEditing ? 'bg-[#333333]' : 'bg-[#232323]'} text-white rounded p-2`}
              />
            </div>
            <div className="flex gap-2 items-center px-4 py-1 rounded-lg">
              <label htmlFor="endLon" className="text-white text-sm">End Longitude :</label>
              <input
                type="number"
                id="endLon"
                name="endLon"
                value={endPosition[1]}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`input-field focus:outline-none ${isEditing ? 'bg-[#333333]' : 'bg-[#232323]'} text-white rounded p-2`}
              />
            </div>
            {isEditing && (<div className="flex justify-center gap-3 mt-3">
              <button
                className='p-2 bg-[#e2a21d] rounded-lg hover:bg-[#dcb154] hover:transition-all hover:scale-105 duration-200 ease-in-out text-black px-4 py-2'
                onClick={handleSave}
              >
                Save
              </button>
            </div>)}
          </div>

        </div>
  );
};

export default Inputs;
