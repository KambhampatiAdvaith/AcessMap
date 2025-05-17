import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { useLocations } from '../../context/LocationsContext';
import { Location } from '../../types';
import AccessibilityFeatureIcons from '../shared/AccessibilityFeatureIcons';

const FeaturedLocations: React.FC = () => {
  const { locations } = useLocations();
  
  // Get top 3 highest rated locations
  const featuredLocations = [...locations]
    .sort((a, b) => b.ratings - a.ratings)
    .slice(0, 3);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Featured Accessible Locations
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Discover highly-rated places with excellent accessibility features, as recommended by our community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredLocations.map(location => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/map"
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium text-lg hover:bg-blue-700 transition-all duration-300"
          >
            View All Locations
          </Link>
        </div>
      </div>
    </section>
  );
};

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <Link to={`/location/${location.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={location.photos[0] || 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png'}
            alt={location.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
            <Star className="text-yellow-400 w-4 h-4 mr-1" />
            {location.ratings.toFixed(1)}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="text-white bg-blue-600 px-3 py-1 rounded-full text-xs font-medium">
              {location.category.charAt(0).toUpperCase() + location.category.slice(1)}
            </span>
          </div>
        </div>
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
            {location.name}
          </h3>
          <div className="flex items-start mb-3 text-gray-600">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm">{location.address}</p>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{location.description}</p>
          <div className="mt-auto">
            <AccessibilityFeatureIcons features={location.accessibilityFeatures} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedLocations;