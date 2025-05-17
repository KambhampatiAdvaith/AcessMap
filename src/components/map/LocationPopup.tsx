import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink } from 'lucide-react';
import { Location } from '../../types';
import AccessibilityFeatureIcons from '../shared/AccessibilityFeatureIcons';

interface LocationPopupProps {
  location: Location;
}

const LocationPopup: React.FC<LocationPopupProps> = ({ location }) => {
  return (
    <div className="p-1 max-w-xs">
      <div className="relative h-32 mb-2 rounded overflow-hidden">
        <img
          src={location.photos[0] || 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png'}
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
          <Star className="text-yellow-400 w-4 h-4 mr-1" />
          {location.ratings.toFixed(1)}
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-800">{location.name}</h3>
      
      <div className="mt-1 flex items-center">
        <span className="text-xs text-white bg-blue-600 px-2 py-0.5 rounded-full">
          {location.category.charAt(0).toUpperCase() + location.category.slice(1)}
        </span>
        <span className="text-xs text-gray-500 ml-2">
          {location.reviewCount} reviews
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{location.description}</p>
      
      <div className="mt-3">
        <p className="text-xs font-medium text-gray-700 mb-1">Accessibility Features:</p>
        <AccessibilityFeatureIcons features={location.accessibilityFeatures} />
      </div>
      
      <div className="mt-3 flex justify-between">
        <Link
          to={`/location/${location.id}`}
          className="flex items-center text-sm text-blue-600 hover:underline"
        >
          View Details <ExternalLink className="w-3 h-3 ml-1" />
        </Link>
        
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
        >
          Directions
        </a>
      </div>
    </div>
  );
};

export default LocationPopup;