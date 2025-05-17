import React from 'react';
import { accessibilityFeatures } from '../../data/mockData';
import { Armchair as Wheelchair, ParkingSquare, Bath, Brain as Braille, Calculator as Elevator, MoveUp, DoorOpen as Door, Ear, Dog } from 'lucide-react';

const AccessibilityFeaturesList: React.FC = () => {
  const iconMap = {
    'wheelchair': <Wheelchair className="w-5 h-5" />,
    'parkingSquare': <ParkingSquare className="w-5 h-5" />,
    'bath': <Bath className="w-5 h-5" />,
    'braille': <Braille className="w-5 h-5" />,
    'elevator': <Elevator className="w-5 h-5" />,
    'moveUp': <MoveUp className="w-5 h-5" />,
    'door': <Door className="w-5 h-5" />,
    'ear': <Ear className="w-5 h-5" />,
    'dog': <Dog className="w-5 h-5" />
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Accessibility Features We Track
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Our platform helps you find places with the specific accessibility features you need.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {accessibilityFeatures.map(feature => (
            <div 
              key={feature.id}
              className="bg-white rounded-lg p-4 flex items-center hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 flex-shrink-0">
                {iconMap[feature.icon as keyof typeof iconMap]}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  {feature.name.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccessibilityFeaturesList;