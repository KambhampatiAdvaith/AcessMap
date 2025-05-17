import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocations } from '../context/LocationsContext';
import { useFilters } from '../context/FiltersContext';
import MapFilters from '../components/map/MapFilters';
import LocationPopup from '../components/map/LocationPopup';
import MapRoutePlanner from '../components/map/MapRoutePlanner';

// Fix Leaflet icon issues
// @ts-ignore: Unreachable code error
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

// Custom accessible location marker
const createCustomIcon = (color: string) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Category to color mapping
const categoryColors: Record<string, string> = {
  restaurant: 'red',
  park: 'green',
  transit: 'blue',
  shopping: 'orange',
  entertainment: 'violet',
  healthcare: 'black',
  education: 'gold',
  government: 'gray',
  other: 'blue'
};

const MapPage: React.FC = () => {
  const { locations, loading } = useLocations();
  const { filters } = useFilters();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [showRoutePlanner, setShowRoutePlanner] = useState(false);
  // Hyderabad coordinates: 17.3850° N, 78.4867° E
  const [mapCenter, setMapCenter] = useState<[number, number]>([17.3850, 78.4867]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          // Don't set mapCenter here to keep focus on Hyderabad
        },
        () => {
          console.log('Unable to retrieve your location');
        }
      );
    }
  }, []);

  // Filter locations based on the current filters
  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      // Filter by category
      if (filters.categories.length > 0 && !filters.categories.includes(location.category)) {
        return false;
      }
      
      // Filter by accessibility features
      if (filters.accessibilityFeatures.length > 0) {
        const locationFeatures = location.accessibilityFeatures.map(f => f.name);
        const hasAllFeatures = filters.accessibilityFeatures.every(feature => 
          locationFeatures.includes(feature)
        );
        if (!hasAllFeatures) return false;
      }

      // Filter by rating
      if (location.ratings < filters.minRating) {
        return false;
      }

      // Filter by distance (if userLocation is available)
      if (userLocation) {
        const [lat, lng] = userLocation;
        const latDiff = location.lat - lat;
        const lngDiff = location.lng - lng;
        const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111; // Approximate km
        if (distance > filters.maxDistance) {
          return false;
        }
      }

      return true;
    });
  }, [locations, filters, userLocation]);

  // MapUpdater component to update map view when center changes
  const MapUpdater = () => {
    const map = useMap();
    
    useEffect(() => {
      if (mapCenter) {
        map.setView(mapCenter, 12); // Increased zoom level for better city view
      }
    }, [mapCenter, map]);
    
    return null;
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex h-full">
        {/* Sidebar */}
        <div 
          className={`${
            sidebarOpen ? 'translate-x-0 w-full md:w-96' : '-translate-x-full w-0'
          } bg-white shadow-lg z-10 flex flex-col transition-all duration-300 absolute md:relative h-full`}
          style={{ maxHeight: 'calc(100vh - 4rem)' }}
        >
          <button 
            className="absolute -right-12 top-2 bg-white p-2 rounded-r-md shadow-md z-50 md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '←' : '→'}
          </button>
          
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Accessibility Map</h2>
            <p className="text-gray-600 text-sm">
              Find and filter accessible locations in Hyderabad
            </p>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4">
            <MapFilters />
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-800">
                  Locations ({filteredLocations.length})
                </h3>
                <button 
                  className="text-blue-600 text-sm hover:underline"
                  onClick={() => setShowRoutePlanner(!showRoutePlanner)}
                >
                  {showRoutePlanner ? 'Hide Route Planner' : 'Plan Route'}
                </button>
              </div>
              
              {showRoutePlanner && <MapRoutePlanner locations={filteredLocations} />}
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : filteredLocations.length > 0 ? (
                <div className="space-y-3 mt-4">
                  {filteredLocations.map(location => (
                    <div 
                      key={location.id}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                      onClick={() => setMapCenter([location.lat, location.lng])}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-800">{location.name}</h4>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {location.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {location.description}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400 mr-2">
                          {'★'.repeat(Math.round(location.ratings))}
                          {'☆'.repeat(5 - Math.round(location.ratings))}
                        </div>
                        <span className="text-xs text-gray-500">
                          ({location.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No locations match your current filters.
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="flex-grow relative">
          {!sidebarOpen && (
            <button 
              className="absolute top-2 left-2 bg-white p-2 rounded-md shadow-md z-50 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              →
            </button>
          )}
          
          <MapContainer 
            center={mapCenter} 
            zoom={12} // Increased zoom level for better city view
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapUpdater />
            
            {/* User location marker */}
            {userLocation && (
              <Marker 
                position={userLocation} 
                icon={new L.Icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                })}
              >
                <Popup>
                  <div className="text-center">
                    <p className="font-semibold">Your Location</p>
                  </div>
                </Popup>
              </Marker>
            )}
            
            {/* Location markers */}
            {filteredLocations.map(location => (
              <Marker
                key={location.id}
                position={[location.lat, location.lng]}
                icon={createCustomIcon(categoryColors[location.category] || 'blue')}
              >
                <Popup>
                  <LocationPopup location={location} />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapPage;