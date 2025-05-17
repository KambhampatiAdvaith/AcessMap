import React, { useState } from 'react';
import { useFilters } from '../../context/FiltersContext';
import { LocationCategory, AccessibilityFeatureName } from '../../types';
import { accessibilityFeatures } from '../../data/mockData';
import { Armchair as Wheelchair, ParkingSquare, Bath, Brain as Braille, Calculator as Elevator, MoveUp, DoorOpen as Door, Ear, Dog, Filter, X } from 'lucide-react';

const MapFilters: React.FC = () => {
  const { filters, updateFilters, resetFilters } = useFilters();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const categories: { value: LocationCategory; label: string }[] = [
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'park', label: 'Parks' },
    { value: 'transit', label: 'Transit' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'government', label: 'Government' },
    { value: 'other', label: 'Other' },
  ];

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

  const handleCategoryChange = (category: LocationCategory) => {
    const currentCategories = [...filters.categories];
    if (currentCategories.includes(category)) {
      updateFilters({
        categories: currentCategories.filter(c => c !== category)
      });
    } else {
      updateFilters({
        categories: [...currentCategories, category]
      });
    }
  };

  const handleFeatureChange = (feature: AccessibilityFeatureName) => {
    const currentFeatures = [...filters.accessibilityFeatures];
    if (currentFeatures.includes(feature)) {
      updateFilters({
        accessibilityFeatures: currentFeatures.filter(f => f !== feature)
      });
    } else {
      updateFilters({
        accessibilityFeatures: [...currentFeatures, feature]
      });
    }
  };

  const handleRatingChange = (rating: number) => {
    updateFilters({ minRating: rating });
  };

  const handleDistanceChange = (distance: number) => {
    updateFilters({ maxDistance: distance });
  };

  const hasActiveFilters = () => {
    return (
      filters.categories.length > 0 ||
      filters.accessibilityFeatures.length > 0 ||
      filters.minRating > 0 ||
      filters.maxDistance !== 10
    );
  };

  return (
    <div className="bg-white rounded-lg border">
      <div 
        className="flex justify-between items-center p-3 cursor-pointer"
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      >
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-medium">Filters</h3>
          {hasActiveFilters() && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </div>
        <button>
          {isFiltersOpen ? (
            <X className="w-5 h-5 text-gray-500" />
          ) : (
            <span className="text-sm text-blue-600">
              {isFiltersOpen ? 'Hide' : 'Show'}
            </span>
          )}
        </button>
      </div>
      
      {isFiltersOpen && (
        <div className="p-3 border-t">
          {/* Categories */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  className={`px-3 py-1 text-xs rounded-full ${
                    filters.categories.includes(category.value)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => handleCategoryChange(category.value)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Accessibility Features */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Accessibility Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {accessibilityFeatures.map(feature => (
                <button
                  key={feature.id}
                  className={`px-3 py-2 text-xs rounded-lg flex items-center ${
                    filters.accessibilityFeatures.includes(feature.name)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => handleFeatureChange(feature.name)}
                >
                  <span className="mr-2">{iconMap[feature.icon as keyof typeof iconMap]}</span>
                  <span className="truncate">
                    {feature.name.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Rating Filter */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <h4 className="text-sm font-medium text-gray-700">Minimum Rating</h4>
              <span className="text-sm text-gray-500">{filters.minRating}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={filters.minRating}
              onChange={(e) => handleRatingChange(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Any</span>
              <span>5 ★</span>
            </div>
          </div>
          
          {/* Distance Filter */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <h4 className="text-sm font-medium text-gray-700">Maximum Distance</h4>
              <span className="text-sm text-gray-500">{filters.maxDistance} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={filters.maxDistance}
              onChange={(e) => handleDistanceChange(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>
          
          {/* Reset Filters */}
          <button
            className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MapFilters;