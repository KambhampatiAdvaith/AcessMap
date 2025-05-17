// User types
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  contributions?: Location[];
  reviews?: Review[];
}

// Authentication types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Location types
export interface Location {
  id: string;
  name: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  category: LocationCategory;
  accessibilityFeatures: AccessibilityFeature[];
  ratings: number;
  reviewCount: number;
  photos: string[];
  addedBy: string;
  createdAt: string;
  updatedAt: string;
}

export type LocationCategory = 
  | 'restaurant'
  | 'park'
  | 'transit'
  | 'shopping'
  | 'entertainment'
  | 'healthcare'
  | 'education'
  | 'government'
  | 'other';

// Accessibility feature types
export interface AccessibilityFeature {
  id: string;
  name: AccessibilityFeatureName;
  description: string;
  icon: string;
}

export type AccessibilityFeatureName = 
  | 'wheelchairAccessible'
  | 'accessibleParking'
  | 'accessibleRestroom'
  | 'brailleSignage'
  | 'audioAssistance'
  | 'elevator'
  | 'ramp'
  | 'handrails'
  | 'wideDoorways'
  | 'lowCounter'
  | 'hearingLoop'
  | 'serviceAnimalsWelcome'
  | 'quietArea'
  | 'staffTrainedInAccessibility'
  | 'other';

// Review types
export interface Review {
  id: string;
  locationId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  photos?: string[];
  createdAt: string;
  updatedAt: string;
}

// Route types
export interface Route {
  id: string;
  startLocation: {
    lat: number;
    lng: number;
    name: string;
  };
  endLocation: {
    lat: number;
    lng: number;
    name: string;
  };
  distance: number;
  duration: number;
  accessibility: AccessibilityRating;
  steps: RouteStep[];
}

export interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  accessibilityNotes?: string;
  startLocation: {
    lat: number;
    lng: number;
  };
  endLocation: {
    lat: number;
    lng: number;
  };
}

export type AccessibilityRating = 'high' | 'medium' | 'low';

// Filter types
export interface Filters {
  categories: LocationCategory[];
  accessibilityFeatures: AccessibilityFeatureName[];
  minRating: number;
  maxDistance: number;
}