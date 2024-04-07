import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const Map = ({ startPosition, currentPosition, angle, endPosition, customIconStart, customIconVector, customIconEnd }) => {
  return (
    <div className='w-full lg:w-2/3 p-4'>
      <div className='w-full h-full rounded-xl overflow-hidden'>
        <div style={{ height: '100%' }}>
          <div className="lg:h-full h-96">
            <MapContainer
              center={startPosition}
              zoom={10}
              style={{ height: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker position={startPosition} icon={customIconStart}></Marker>
              <Marker position={currentPosition} icon={customIconVector} rotationAngle={angle}></Marker>
              <Marker position={endPosition} icon={customIconEnd}></Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
