import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Plus, Map, Check } from 'lucide-react';
import { useLocations } from '../context/LocationsContext';
import { useAuth } from '../context/AuthContext';
import { LocationCategory, AccessibilityFeatureName } from '../types';
import { accessibilityFeatures } from '../data/mockData';

const AddLocationPage: React.FC = () => {
  const navigate = useNavigate();
  const { addLocation } = useLocations();
  const { user, isAuthenticated } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState<LocationCategory>('other');
  const [selectedFeatures, setSelectedFeatures] = useState<AccessibilityFeatureName[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Mock function to get coordinates from address
  const getCoordinatesFromAddress = async () => {
    // In a real app, this would call a geocoding service like Google Maps
    return { lat: 40.7128, lng: -74.0060 }; // Default to NYC
  };
  
  const handleFeatureToggle = (feature: AccessibilityFeatureName) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Get coordinates from address if not already set
      let locationCoordinates = coordinates;
      if (!locationCoordinates) {
        locationCoordinates = await getCoordinatesFromAddress();
      }
      
      // Get selected accessibility feature objects
      const featureObjects = accessibilityFeatures.filter(f => 
        selectedFeatures.includes(f.name)
      );
      
      await addLocation({
        name,
        description,
        address,
        lat: locationCoordinates.lat,
        lng: locationCoordinates.lng,
        category,
        accessibilityFeatures: featureObjects,
        addedBy: user?.id || 'anonymous',
        photos,
      });
      
      setSubmitted(true);
      
      // Reset form
      setName('');
      setDescription('');
      setAddress('');
      setCategory('other');
      setSelectedFeatures([]);
      setPhotos([]);
      setCoordinates(null);
    } catch (error) {
      console.error('Failed to add location:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
        <p className="text-gray-600 mb-8">You need to be logged in to add new locations.</p>
        <Link
          to="/login"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login to Continue
        </Link>
      </div>
    );
  }
  
  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="inline-flex items-center justify-center bg-green-100 text-green-600 rounded-full w-16 h-16 mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Location Added Successfully!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for contributing to AccessMap! Your submission helps make our community more accessible for everyone.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/map')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View on Map
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
              }}
              className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Add Another Location
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-4">
        <Link
          to="/map"
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Map
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
            <Plus className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Add Accessible Location</h1>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`ml-2 text-sm ${
                currentStep >= 1 ? 'text-gray-800 font-medium' : 'text-gray-500'
              }`}>
                Basic Info
              </div>
            </div>
            <div className={`flex-grow border-t mx-4 ${
              currentStep >= 2 ? 'border-blue-600' : 'border-gray-200'
            }`}></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className={`ml-2 text-sm ${
                currentStep >= 2 ? 'text-gray-800 font-medium' : 'text-gray-500'
              }`}>
                Accessibility
              </div>
            </div>
            <div className={`flex-grow border-t mx-4 ${
              currentStep >= 3 ? 'border-blue-600' : 'border-gray-200'
            }`}></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <div className={`ml-2 text-sm ${
                currentStep >= 3 ? 'text-gray-800 font-medium' : 'text-gray-500'
              }`}>
                Review
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Location Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Location Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as LocationCategory)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="restaurant">Restaurant</option>
                    <option value="park">Park</option>
                    <option value="transit">Transit</option>
                    <option value="shopping">Shopping</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="government">Government</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <button
                      type="button"
                      className="ml-2 px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors flex-shrink-0"
                      onClick={async () => {
                        // Get user's current location
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const { latitude, longitude } = position.coords;
                              setCoordinates({ lat: latitude, lng: longitude });
                              setAddress('Using current location');
                            },
                            () => {
                              alert('Unable to retrieve your location');
                            }
                          );
                        }
                      }}
                    >
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {coordinates ? 'Location coordinates set!' : 'Enter the full address or use your current location'}
                  </p>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe this location, including any general information about accessibility."
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Map className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Drag and drop photos here, or click to select files
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Including photos of entrances, ramps, and other accessibility features helps others
                    </p>
                    <button
                      type="button"
                      className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm inline-block"
                      onClick={() => {
                        // Mock photo upload - in a real app, we would handle file uploads
                        setPhotos(['https://images.pexels.com/photos/2977513/pexels-photo-2977513.jpeg']);
                      }}
                    >
                      Select Photos
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={!name || !description || !address}
                >
                  Next: Accessibility Features
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Accessibility Features */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Accessibility Features</h2>
              <p className="text-gray-600 mb-4">
                Select all accessibility features that apply to this location.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {accessibilityFeatures.map(feature => (
                  <button
                    key={feature.id}
                    type="button"
                    className={`px-4 py-3 rounded-lg text-left flex items-center ${
                      selectedFeatures.includes(feature.name)
                        ? 'bg-blue-100 border border-blue-300'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => handleFeatureToggle(feature.name)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      selectedFeatures.includes(feature.name)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200'
                    }`}>
                      {selectedFeatures.includes(feature.name) && <Check className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-medium">
                        {feature.name.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                      </p>
                      <p className="text-xs text-gray-500">{feature.description}</p>
                    </div>
                  </button>
                ))}
              </div>
              
              {selectedFeatures.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                  <p className="text-yellow-700 text-sm">
                    Please select at least one accessibility feature.
                  </p>
                </div>
              )}
              
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={selectedFeatures.length === 0}
                >
                  Next: Review
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Review Information</h2>
              <p className="text-gray-600 mb-6">
                Please review the information below before submitting.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Location Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium capitalize">{category}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{address}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Description</p>
                    <p>{description}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Accessibility Features</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFeatures.map(feature => (
                    <span
                      key={feature}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {feature.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
              
              {photos.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">Photos</h3>
                  <div className="flex space-x-2 overflow-x-auto">
                    {photos.map((photo, index) => (
                      <div key={index} className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={photo}
                          alt={`Location photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Location'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddLocationPage;