import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Route, ExternalLink, ChevronLeft, PanelRight, User, MessageSquare } from 'lucide-react';
import { useLocations } from '../context/LocationsContext';
import { useAuth } from '../context/AuthContext';
import AccessibilityFeatureIcons from '../components/shared/AccessibilityFeatureIcons';
import LocationReviews from '../components/location/LocationReviews';
import ReviewForm from '../components/location/ReviewForm';

const LocationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getLocationById } = useLocations();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  
  const location = id ? getLocationById(id) : undefined;
  
  if (!location) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Location Not Found</h2>
        <p className="text-gray-600 mb-8">The location you're looking for might have been removed or doesn't exist.</p>
        <Link
          to="/map"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Map
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-4">
        <Link
          to="/map"
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Map
        </Link>
      </div>
      
      {/* Location Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/5">
          <div className="relative rounded-xl overflow-hidden h-72">
            <img
              src={location.photos[0] || 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png'}
              alt={location.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-md">
              <Star className="text-yellow-400 w-4 h-4 mr-1" />
              {location.ratings.toFixed(1)}
            </div>
          </div>
          
          {/* Image Gallery for multiple photos */}
          {location.photos.length > 1 && (
            <div className="flex space-x-2 mt-2 overflow-x-auto pb-2">
              {location.photos.map((photo, index) => (
                <div key={index} className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
                  <img
                    src={photo}
                    alt={`${location.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:w-2/5">
          <div className="bg-white p-6 rounded-xl shadow-sm h-full">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold text-gray-800">{location.name}</h1>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {location.category.charAt(0).toUpperCase() + location.category.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <p className="text-sm">{location.address}</p>
                </div>
                
                <div className="flex items-center mt-2 text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  <p className="text-sm">
                    Added on {new Date(location.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="font-medium text-gray-800 mb-2">Accessibility Features</h2>
                <AccessibilityFeatureIcons features={location.accessibilityFeatures} />
              </div>
              
              <div className="flex space-x-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Route className="w-4 h-4 mr-2" />
                  Directions
                </a>
                
                <Link
                  to="/map"
                  state={{ planRoute: true, destination: location }}
                  className="flex-1 flex items-center justify-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <PanelRight className="w-4 h-4 mr-2" />
                  Plan Route
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mt-8 border-b">
        <div className="flex">
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 ${
              activeTab === 'details'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({location.reviewCount})
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'details' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">About This Location</h2>
              <p className="text-gray-600 mb-6">{location.description}</p>
              
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Detailed Accessibility Information</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <ul className="space-y-3">
                  {location.accessibilityFeatures.map(feature => (
                    <li key={feature.id} className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 p-1 rounded mr-3 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-medium">
                          {feature.name.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                        </p>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Contact Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  For the most up-to-date contact information, please visit the official website.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-blue-600 mt-2 hover:underline"
                >
                  Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h3 className="font-semibold mb-3 text-gray-800">Accessibility Rating</h3>
                <div className="flex items-center mb-4">
                  <div className="text-3xl font-bold text-yellow-500 mr-2">{location.ratings.toFixed(1)}</div>
                  <div className="text-yellow-400 flex">
                    {'★'.repeat(Math.round(location.ratings))}
                    {'☆'.repeat(5 - Math.round(location.ratings))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Based on {location.reviewCount} accessibility reviews
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold mb-3 text-gray-800">Location</h3>
                <div className="bg-gray-200 h-48 rounded-lg overflow-hidden mb-3">
                  {/* In a real app, this would be an embedded map */}
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-800">
                    <MapPin className="w-6 h-6 mr-2" />
                    Map View
                  </div>
                </div>
                <p className="text-sm text-gray-600">{location.address}</p>
                
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 mt-2 hover:underline text-sm"
                >
                  View on Google Maps <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Reviews & Accessibility Ratings
              </h2>
              
              {isAuthenticated ? (
                <button
                  onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Write a Review
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Login to Review
                </Link>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <LocationReviews locationId={location.id} />
                
                {isAuthenticated && (
                  <div id="review-form" className="mt-8 pt-8 border-t">
                    <div className="flex items-center mb-4">
                      <User className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">Write Your Review</h3>
                    </div>
                    <ReviewForm locationId={location.id} />
                  </div>
                )}
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <h3 className="font-semibold mb-3 text-gray-800">Rating Summary</h3>
                  <div className="flex items-center mb-4">
                    <div className="text-3xl font-bold text-yellow-500 mr-2">{location.ratings.toFixed(1)}</div>
                    <div>
                      <div className="text-yellow-400">
                        {'★'.repeat(Math.round(location.ratings))}
                        {'☆'.repeat(5 - Math.round(location.ratings))}
                      </div>
                      <p className="text-sm text-gray-600">
                        {location.reviewCount} reviews
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => {
                      // In a real app, we would calculate these percentages from actual review data
                      const percentage = (6 - rating) * 15;
                      return (
                        <div key={rating} className="flex items-center">
                          <div className="w-12 text-sm text-gray-600">{rating} stars</div>
                          <div className="flex-grow mx-2 bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-yellow-400 h-2.5 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="w-8 text-xs text-gray-500">{percentage}%</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold mb-3 text-gray-800">Review Guidelines</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Focus on accessibility features and experiences
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Be specific about what worked well or needs improvement
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Photos can help others see accessibility features
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Be respectful and constructive in your feedback
                    </li>
                  </ul>
                  
                  <div className="mt-4 pt-4 border-t flex items-center text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                    Your reviews help the community find accessible places!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDetailsPage;