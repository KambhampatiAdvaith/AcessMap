import React from 'react';
import { Armchair as Wheelchair, ParkingSquare, Bath, Brain as Braille, Calculator as Elevator, MoveUp, DoorOpen as Door, Ear, Dog } from 'lucide-react';
import { AccessibilityFeature } from '../../types';

interface AccessibilityFeatureIconsProps {
  features: AccessibilityFeature[];
}

const AccessibilityFeatureIcons: React.FC<AccessibilityFeatureIconsProps> = ({ features }) => {
  const iconMap = {
    'wheelchair': <Wheelchair className="w-4 h-4" />,
    'parkingSquare': <ParkingSquare className="w-4 h-4" />,
    'bath': <Bath className="w-4 h-4" />,
    'braille': <Braille className="w-4 h-4" />,
    'elevator': <Elevator className="w-4 h-4" />,
    'moveUp': <MoveUp className="w-4 h-4" />,
    'door': <Door className="w-4 h-4" />,
    'ear': <Ear className="w-4 h-4" />,
    'dog': <Dog className="w-4 h-4" />
  };

  return (
    <div className="flex flex-wrap gap-1">
      {features.map(feature => (
        <div
          key={feature.id}
          className="bg-blue-100 text-blue-800 rounded-full p-1.5 flex items-center justify-center"
          title={feature.description}
        >
          {iconMap[feature.icon as keyof typeof iconMap]}
        </div>
      ))}
    </div>
  );
};

export default AccessibilityFeatureIcons;