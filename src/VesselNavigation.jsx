import React, { useEffect, useState } from 'react';
import L from 'leaflet';

const VesselNavigation = ({ map, startingCoordinates, endCoordinates, speedKmph, refreshRate }) => {
  const [vesselMarker, setVesselMarker] = useState(null);
  const [intervals, setIntervals] = useState(0);

  useEffect(() => {
    if (!map) return;

    // Create vessel marker
    const marker = L.marker(startingCoordinates).addTo(map);
    setVesselMarker(marker);

    // Calculate intermediate coordinates and intervals
    const distance = map.distance(startingCoordinates, endCoordinates); // in meters
    const timeInSeconds = (distance / (speedKmph * 1000 / 3600)); // in seconds
    const intervals = Math.floor(timeInSeconds / refreshRate);
    setIntervals(intervals);

    // Function to update vessel position
    const updateVesselPosition = () => {
      if (intervals > 0) {
        const fraction = intervals / timeInSeconds;
        const lat = startingCoordinates[0] + fraction * (endCoordinates[0] - startingCoordinates[0]);
        const lng = startingCoordinates[1] + fraction * (endCoordinates[1] - startingCoordinates[1]);
        marker.setLatLng([lat, lng]);
        setIntervals(intervals - 1);
      }
    };

    // Start vessel movement
    const timerId = setInterval(updateVesselPosition, refreshRate * 1000);

    // Clean up
    return () => clearInterval(timerId);
  }, [map, startingCoordinates, endCoordinates, speedKmph, refreshRate]);

  return null; // No need to render anything since the marker is managed internally
};

export default VesselNavigation;
