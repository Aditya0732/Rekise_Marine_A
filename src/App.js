import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import { GrEdit } from "react-icons/gr";
import Timer from './components/Timer';
import Inputs from './components/Inputs';
import Map from './components/Map';
import BottomBar from './components/BottomBar';

const App = () => {
  const [startPosition, setStartPosition] = useState([22.1696, 91.4996]);
  const [endPosition, setEndPosition] = useState([22.2637, 91.7159]);
  const [speed, setSpeed] = useState(20000); // in kmph
  const [fps, setFps] = useState(2);
  const [moving, setMoving] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(startPosition);
  const [angle, setAngle] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const startTimeRef = useRef(null);

  const customIconStart = new Icon({
    iconUrl: "start.png",
    iconSize: [38, 38]
  });

  const customIconEnd = new Icon({
    iconUrl: "end.png",
    iconSize: [38, 38]
  });

  const customIconVector = new Icon({
    iconUrl: "vector4.png",
    iconSize: [100, 65],
  });

  useEffect(() => {
    const initialAngle = calculateHeading(startPosition, endPosition);
    setAngle(initialAngle);

    let intervalId;

    const animateMarker = () => {
      const timeElapsed = Date.now() - startTimeRef.current;
      const distanceCovered = (timeElapsed / (1000 * 3600)) * speed;
      const totalDistance = calculateDistance(startPosition, endPosition);

      if (distanceCovered < totalDistance) {
        const newPosition = calculateNewPosition(distanceCovered, totalDistance);
        setCurrentPosition(newPosition);
        setAngle(calculateHeading(startPosition, endPosition));
        setTimeRemaining(((totalDistance - distanceCovered) / speed * 3600 * 1000) + 1000);
      } else {
        setCurrentPosition(endPosition);
        setMoving(false);
        setTimeRemaining(0);
        setIsCompleted(true);
        clearInterval(intervalId);
      }
    };

    if (moving) {
      startTimeRef.current = Date.now();
      animateMarker(); // Call the function immediately when moving starts
      intervalId = setInterval(animateMarker, 1000 / fps); // Set the interval based on desired fps
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [moving]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (moving === true) {
        setTimeRemaining((prevTime) => Math.max(prevTime - 1000 / fps, 0));
      }
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, []);

  const calculateDistance = (pos1, pos2) => {
    const [lat1, lon1] = pos1;
    const [lat2, lon2] = pos2;
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const calculateNewPosition = (distanceCovered, totalDistance) => {
    const heading = calculateHeading(startPosition, endPosition);
    // const fractionCovered = distanceCovered / totalDistance;
    const lat1 = deg2rad(startPosition[0]);
    const lon1 = deg2rad(startPosition[1]);
    const angularDistance = distanceCovered / 6371; // Distance in radians
    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(angularDistance) +
      Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(heading));
    const lon2 = lon1 + Math.atan2(Math.sin(heading) * Math.sin(angularDistance) * Math.cos(lat1),
      Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2));
    return [rad2deg(lat2), rad2deg(lon2)];
  };

  const calculateHeading = (pos1, pos2) => {
    const [lat1, lon1] = pos1;
    const [lat2, lon2] = pos2;
    const dLon = deg2rad(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(deg2rad(lat2));
    const x = Math.cos(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) -
      Math.sin(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(dLon);
    const heading = Math.atan2(y, x);
    return heading;
  };

  const rad2deg = (rad) => {
    return rad * (180 / Math.PI);
  };

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePause = () => {
    setMoving(false);
  };

  const handleStart = () => {
    setIsCompleted(false);
    setMoving(true);
  };

  const handleRestart = () => {
    setMoving(false);
    setIsCompleted(false);
    setCurrentPosition(startPosition);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    console.log(isEditing)
  };

  const handleSave = () => {
    setIsEditing(false);
    setIsChanged(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "speed") {
      setSpeed(parseInt(value));
    } else if (name === "fps") {
      setFps(parseInt(value));
    } else if (name === "startLat") {
      setStartPosition([parseFloat(value), startPosition[1]]);
    } else if (name === "startLon") {
      setStartPosition([startPosition[0], parseFloat(value)]);
    } else if (name === "endLat") {
      setEndPosition([parseFloat(value), endPosition[1]]);
    } else if (name === "endLon") {
      setEndPosition([endPosition[0], parseFloat(value)]);
    }
    setIsChanged(true);
  };


  return (
    <div className='bg-[#1b1b1b] flex flex-col min-h-screen'>
      <Timer timeRemaining={formatTime(timeRemaining)} isMoving={moving} isCompleted={isCompleted}/>
      <div className='flex flex-1 flex-col lg:flex-row'>
        <Inputs
          speed={speed}
          fps={fps}
          startPosition={startPosition}
          endPosition={endPosition}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
          handleEdit={handleEdit}
          handleSave={handleSave}
        />
        <Map
          startPosition={startPosition}
          currentPosition={currentPosition}
          angle={angle}
          endPosition={endPosition}
          customIconStart={customIconStart}
          customIconVector={customIconVector}
          customIconEnd={customIconEnd}
        />
      </div>
      <BottomBar
        handlePause={handlePause}
        handleStart={handleStart}
        handleRestart={handleRestart}
      />
    </div>
  )
}

export default App;


