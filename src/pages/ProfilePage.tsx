import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, MapPin, Star, Settings, LogOut, Edit, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'contributions' | 'reviews' | 'settings'>('contributions');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Mock data for contributions and reviews
  const contributions = [
    {
      id: 'loc1',
      name: 'Central Park Cafe',
      address: '123 Park Avenue, New York, NY',
      category: 'restaurant',
      createdAt: '2024-01-15T12:00:00Z',
    },
    {
      id: 'loc2',
      name: 'Community Library',
      address: '789 Reading Road, New York, NY',
      category: 'education',
      createdAt: '2023-09-20T09:00:00Z',
    },
  ];
  
  const reviews = [
    {
      id: 'rev1',
      locationId: 'loc1',
      locationName: 'Central Park Cafe',
      rating: 5,
      comment: "Excellent wheelchair accessibility. Wide entrances and spacious interior.",
      createdAt: '2024-02-15T14:30:00Z',
    },
    {
      id: 'rev2',
      locationId: 'loc3',
      locationName: 'Grand Theatre',
      rating: 4,
      comment: "Good accessibility overall. The elevator was a bit small but functional.",
      createdAt: '2024-01-10T10:15:00Z',
    },
    {
      id: 'rev3',
      locationId: 'loc5',
      locationName: 'Memorial Hospital',
      rating: 5,
      comment: "Exceptional accessibility features throughout the building.",
      createdAt: '2023-12-05T16:45:00Z',
    },
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-8 relative">
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white mask-wave-pattern"></div>
        </div>
        
        <div className="px-8 pb-8 pt-0 relative">
          <div className="flex flex-col md:flex-row mb-8 -mt-16">
            <div className="bg-white rounded-full p-2 shadow-lg w-32 h-32 flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0">
              <User className="w-16 h-16 text-blue-600" />
            </div>
            
            <div className="md:ml-6 text-center md:text-left mt-4 md:mt-8">
              <h1 className="text-2xl font-bold text-gray-800">{user?.username}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500">Member since {new Date(user?.createdAt || '').toLocaleDateString()}</p>
              
              <div className="flex mt-4 space-x-2 justify-center md:justify-start">
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  {contributions.length} Contributions
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                  {reviews.length} Reviews
                </span>
              </div>
            </div>
            
            <div className="ml-auto mt-6 md:mt-8 flex space-x-2 justify-center md:justify-start">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </button>
            </div>
          </div>
          
          <div className="border-b">
            <div className="flex flex-wrap">
              <button
                className={`px-6 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'contributions'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('contributions')}
              >
                My Contributions
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                My Reviews
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'settings'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </div>
          </div>
          
          <div className="py-6">
            {activeTab === 'contributions' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">My Contributions</h2>
                  <Link
                    to="/add-location"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Add New Location
                  </Link>
                </div>
                
                {contributions.length > 0 ? (
                  <div className="space-y-4">
                    {contributions.map(contribution => (
                      <div key={contribution.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <Link to={`/location/${contribution.id}`} className="group">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                {contribution.name}
                              </h3>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                {contribution.address}
                              </div>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {contribution.category.charAt(0).toUpperCase() + contribution.category.slice(1)}
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Added on {new Date(contribution.createdAt).toLocaleDateString()}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No Contributions Yet</h3>
                    <p className="text-gray-600 mb-4">
                      Share accessible locations with the community.
                    </p>
                    <Link
                      to="/add-location"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm inline-block"
                    >
                      Add Your First Location
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">My Reviews</h2>
                
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                        <Link to={`/location/${review.locationId}`} className="group">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                              {review.locationName}
                            </h3>
                            <div className="flex text-yellow-400">
                              {'★'.repeat(review.rating)}
                              {'☆'.repeat(5 - review.rating)}
                            </div>
                          </div>
                          <p className="mt-2 text-gray-600 text-sm">{review.comment}</p>
                          <div className="mt-2 text-xs text-gray-500">
                            Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Star className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No Reviews Yet</h3>
                    <p className="text-gray-600">
                      Share your accessibility experiences with the community.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          value={user?.username || ''}
                          className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Edit Personal Information
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="font-medium text-gray-800 mb-4">Password</h3>
                    <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      Change Password
                    </button>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="font-medium text-gray-800 mb-4">Notification Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="email-notifications"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          defaultChecked
                        />
                        <label htmlFor="email-notifications" className="ml-2 text-sm text-gray-700">
                          Email notifications for reviews on my contributions
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="accessibility-updates"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          defaultChecked
                        />
                        <label htmlFor="accessibility-updates" className="ml-2 text-sm text-gray-700">
                          Accessibility updates and new features
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t mt-6">
                    <h3 className="font-medium text-red-600 mb-4">Danger Zone</h3>
                    <button className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;