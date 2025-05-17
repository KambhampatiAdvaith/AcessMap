import React, { useState } from 'react';
import { Location } from '../../types';
import { Route, MapPin, Navigation } from 'lucide-react';

interface MapRoutePlannerProps {
  locations: Location[];
}

const MapRoutePlanner: React.FC<MapRoutePlannerProps> = ({ locations }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [routePlanned, setRoutePlanned] = useState(false);
  
  const locationOptions = locations.map(loc => ({
    value: loc.id,
    label: loc.name
  }));
  
  const handlePlanRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (startLocation && endLocation) {
      setRoutePlanned(true);
      
      // In a real app, this would call a routing API to get an accessible route
      // For this demo, we'll just simulate the result
    }
  };
  
  return (
    <div className="bg-blue-50 p-3 rounded-lg mb-4">
      <div className="flex items-center mb-3">
        <Route className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="font-medium text-blue-800">Accessible Route Planner</h3>
      </div>
      
      {!routePlanned ? (
        <form onSubmit={handlePlanRoute}>
          <div className="mb-3">
            <label className="block text-sm text-gray-700 mb-1">Starting Point</label>
            <div className="relative">
              <MapPin className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              <select
                className="w-full pl-8 pr-2 py-2 bg-white border rounded-md text-sm"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                required
              >
                <option value="">Select starting location</option>
                <option value="current">My current location</option>
                {locationOptions.map(option => (
                  <option key={`start-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-3">
            <label className="block text-sm text-gray-700 mb-1">Destination</label>
            <div className="relative">
              <Navigation className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              <select
                className="w-full pl-8 pr-2 py-2 bg-white border rounded-md text-sm"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                required
              >
                <option value="">Select destination</option>
                {locationOptions.map(option => (
                  <option key={`end-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            disabled={!startLocation || !endLocation}
          >
            Find Accessible Route
          </button>
        </form>
      ) : (
        <div>
          <div className="bg-white p-3 rounded-md mb-3">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Accessible Route</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                High Accessibility
              </span>
            </div>
            
            <div className="flex items-start mb-2">
              <div className="mt-1 mr-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <div className="w-0.5 h-10 bg-gray-300 mx-auto"></div>
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
              </div>
              <div>
                <p className="text-sm">
                  {startLocation === 'current' ? 'Your Location' : 
                    locations.find(l => l.id === startLocation)?.name || 'Start'}
                </p>
                <p className="text-xs text-gray-500 mb-2">Starting point</p>
                <p className="text-sm">
                  {locations.find(l => l.id === endLocation)?.name || 'Destination'}
                </p>
                <p className="text-xs text-gray-500">Destination</p>
              </div>
            </div>
            
            <div className="border-t pt-2">
              <div className="flex justify-between text-sm">
                <span>Distance: 1.2 km</span>
                <span>Time: ~15 min</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-md text-sm">
            <h4 className="font-medium mb-2">Route Details:</h4>
            <ul className="space-y-2">
              <li className="flex">
                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                <span>Head north on Main St toward Park Ave</span>
              </li>
              <li className="flex">
                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                <span>Use the wheelchair ramp at the corner of Park Ave</span>
              </li>
              <li className="flex">
                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">3</span>
                <span>Continue east on Park Ave for 0.5 km</span>
              </li>
              <li className="flex">
                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">4</span>
                <span>Use the elevator at Central Station to reach 2nd level</span>
              </li>
              <li className="flex">
                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">5</span>
                <span>Arrive at your destination</span>
              </li>
            </ul>
          </div>
          
          <button
            className="w-full mt-3 border border-blue-600 text-blue-600 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
            onClick={() => setRoutePlanned(false)}
          >
            Plan Another Route
          </button>
        </div>
      )}
    </div>
  );
};

export default MapRoutePlanner;