import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Filter, Route, Star, Plus, User } from 'lucide-react';
import { useLocations } from '../context/LocationsContext';
import FeaturedLocations from '../components/home/FeaturedLocations';
import AccessibilityFeaturesList from '../components/home/AccessibilityFeaturesList';

const HomePage: React.FC = () => {
  const { locations } = useLocations();
  const totalLocations = locations.length;

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Find Accessible Places Near You
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            AccessMap helps you locate and navigate to wheelchair-friendly
            restaurants, parks, transit stops, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/map"
              className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium text-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300"
            >
              Explore Map
            </Link>
            <Link
              to="/add-location"
              className="px-8 py-3 bg-purple-700 text-white rounded-full font-medium text-lg shadow-lg hover:bg-purple-800 hover:shadow-xl transition-all duration-300"
            >
              Add Location
            </Link>
          </div>
        </div>
        
        {/* Decorative Shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Making Cities Accessible for Everyone
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapPin size={28} />}
              title="Interactive Map"
              description="Explore our interactive map with detailed accessibility information for thousands of locations."
            />
            <FeatureCard
              icon={<Filter size={28} />}
              title="Accessibility Filters"
              description="Filter places by the specific accessibility features you need, from wheelchair ramps to braille signage."
            />
            <FeatureCard
              icon={<Route size={28} />}
              title="Accessible Routes"
              description="Plan your journey with accessible routes that avoid stairs, steep inclines, and other barriers."
            />
            <FeatureCard
              icon={<Star size={28} />}
              title="Community Reviews"
              description="Read and contribute verified reviews about the accessibility of various locations."
            />
            <FeatureCard
              icon={<Plus size={28} />}
              title="Add New Places"
              description="Contribute to our database by adding new locations or updating information for existing ones."
            />
            <FeatureCard
              icon={<User size={28} />}
              title="Personalized Experience"
              description="Create a profile to save favorite places, track contributions, and get recommendations."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="text-4xl font-bold text-blue-600 mb-2">{totalLocations}</p>
              <p className="text-gray-600">Accessible Locations</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="text-4xl font-bold text-green-600 mb-2">9</p>
              <p className="text-gray-600">Accessibility Features</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="text-4xl font-bold text-purple-600 mb-2">100%</p>
              <p className="text-gray-600">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <FeaturedLocations />

      {/* Accessibility Features */}
      <AccessibilityFeaturesList />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Accessibility Movement</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Help us make the world more accessible by contributing information, 
            writing reviews, and sharing AccessMap with others.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300"
            >
              Sign Up Now
            </Link>
            <Link
              to="/map"
              className="px-8 py-3 bg-purple-700 text-white rounded-full font-medium text-lg hover:bg-purple-800 transition-all duration-300"
            >
              Explore Map
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="bg-blue-100 text-blue-600 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;