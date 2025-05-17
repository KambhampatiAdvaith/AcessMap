import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Location, Review, AccessibilityFeatureName } from '../types';
import { mockLocations } from '../data/mockData';

interface LocationsContextType {
  locations: Location[];
  loading: boolean;
  error: string | null;
  addLocation: (location: Omit<Location, 'id' | 'ratings' | 'reviewCount' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateLocation: (id: string, updates: Partial<Location>) => Promise<void>;
  addReview: (locationId: string, review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  getLocationById: (id: string) => Location | undefined;
  getLocationsByFeature: (feature: AccessibilityFeatureName) => Location[];
  getNearbyLocations: (lat: number, lng: number, radiusKm: number) => Location[];
}

const LocationsContext = createContext<LocationsContextType | undefined>(undefined);

export const LocationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchLocations = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setLocations(mockLocations);
        setLoading(false);
      } catch (err) {
        setError('Failed to load locations');
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const addLocation = async (newLocation: Omit<Location, 'id' | 'ratings' | 'reviewCount' | 'createdAt' | 'updatedAt'>) => {
    try {
      // In a real app, this would be an API call
      const location: Location = {
        ...newLocation,
        id: `loc-${Date.now()}`,
        ratings: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setLocations(prevLocations => [...prevLocations, location]);
    } catch (err) {
      setError('Failed to add location');
    }
  };

  const updateLocation = async (id: string, updates: Partial<Location>) => {
    try {
      setLocations(prevLocations => 
        prevLocations.map(location => 
          location.id === id 
            ? { ...location, ...updates, updatedAt: new Date().toISOString() } 
            : location
        )
      );
    } catch (err) {
      setError('Failed to update location');
    }
  };

  const addReview = async (locationId: string, review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newReview: Review = {
        ...review,
        id: `rev-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Update the location's ratings and review count
      setLocations(prevLocations => 
        prevLocations.map(location => {
          if (location.id === locationId) {
            const newReviewCount = location.reviewCount + 1;
            const newRatings = ((location.ratings * location.reviewCount) + review.rating) / newReviewCount;
            
            return {
              ...location,
              ratings: Number(newRatings.toFixed(1)),
              reviewCount: newReviewCount,
              updatedAt: new Date().toISOString(),
            };
          }
          return location;
        })
      );

      // In a real app, we would store the review in a database
    } catch (err) {
      setError('Failed to add review');
    }
  };

  const getLocationById = (id: string) => {
    return locations.find(location => location.id === id);
  };

  const getLocationsByFeature = (feature: AccessibilityFeatureName) => {
    return locations.filter(location => 
      location.accessibilityFeatures.some(f => f.name === feature)
    );
  };

  const getNearbyLocations = (lat: number, lng: number, radiusKm: number) => {
    // Simple distance calculation (not accounting for Earth's curvature)
    // For real apps, use a proper geospatial function
    return locations.filter(location => {
      const latDiff = location.lat - lat;
      const lngDiff = location.lng - lng;
      const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111; // rough km conversion
      return distance <= radiusKm;
    });
  };

  return (
    <LocationsContext.Provider
      value={{
        locations,
        loading,
        error,
        addLocation,
        updateLocation,
        addReview,
        getLocationById,
        getLocationsByFeature,
        getNearbyLocations,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocations = () => {
  const context = useContext(LocationsContext);
  if (context === undefined) {
    throw new Error('useLocations must be used within a LocationsProvider');
  }
  return context;
};