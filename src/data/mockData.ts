import { Location, AccessibilityFeature } from '../types';

// Mock accessibility features
export const accessibilityFeatures: AccessibilityFeature[] = [
  {
    id: 'f1',
    name: 'wheelchairAccessible',
    description: 'Wheelchair accessible entrance and interior',
    icon: 'wheelchair',
  },
  {
    id: 'f2',
    name: 'accessibleParking',
    description: 'Designated accessible parking spaces',
    icon: 'parkingSquare',
  },
  {
    id: 'f3',
    name: 'accessibleRestroom',
    description: 'Accessible restroom facilities',
    icon: 'bath',
  },
  {
    id: 'f4',
    name: 'brailleSignage',
    description: 'Braille signage available',
    icon: 'braille',
  },
  {
    id: 'f5',
    name: 'elevator',
    description: 'Elevator access available',
    icon: 'elevator',
  },
  {
    id: 'f6',
    name: 'ramp',
    description: 'Ramp access available',
    icon: 'moveUp',
  },
  {
    id: 'f7',
    name: 'wideDoorways',
    description: 'Wide doorways for wheelchair access',
    icon: 'door',
  },
  {
    id: 'f8',
    name: 'hearingLoop',
    description: 'Hearing loop system available',
    icon: 'ear',
  },
  {
    id: 'f9',
    name: 'serviceAnimalsWelcome',
    description: 'Service animals welcome',
    icon: 'dog',
  },
];

// Mock locations data for Hyderabad
export const mockLocations: Location[] = [
  {
    id: 'loc1',
    name: 'Charminar Access Point',
    description: 'Historic monument with wheelchair accessibility and ramps.',
    address: 'Charminar Rd, Char Kaman, Hyderabad',
    lat: 17.3616,
    lng: 78.4747,
    category: 'entertainment',
    accessibilityFeatures: [
      accessibilityFeatures[0],
      accessibilityFeatures[5],
      accessibilityFeatures[6],
    ],
    ratings: 4.5,
    reviewCount: 28,
    photos: [
      'https://images.pexels.com/photos/11321242/pexels-photo-11321242.jpeg',
    ],
    addedBy: 'user1',
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-03-10T09:30:00Z',
  },
  {
    id: 'loc2',
    name: 'Hyderabad Metro Station - Ameerpet',
    description: 'Fully accessible metro station with elevators and tactile paths.',
    address: 'Ameerpet, Hyderabad',
    lat: 17.4374,
    lng: 78.4487,
    category: 'transit',
    accessibilityFeatures: [
      accessibilityFeatures[0],
      accessibilityFeatures[3],
      accessibilityFeatures[4],
      accessibilityFeatures[7],
    ],
    ratings: 4.2,
    reviewCount: 45,
    photos: [
      'https://images.pexels.com/photos/2896132/pexels-photo-2896132.jpeg',
    ],
    addedBy: 'user2',
    createdAt: '2023-11-05T10:15:00Z',
    updatedAt: '2024-02-20T14:45:00Z',
  },
  {
    id: 'loc3',
    name: 'KIMS Hospital',
    description: 'Modern hospital with comprehensive accessibility features.',
    address: 'Minister Road, Secunderabad',
    lat: 17.4400,
    lng: 78.4990,
    category: 'healthcare',
    accessibilityFeatures: [
      accessibilityFeatures[0],
      accessibilityFeatures[1],
      accessibilityFeatures[2],
      accessibilityFeatures[4],
      accessibilityFeatures[8],
    ],
    ratings: 4.8,
    reviewCount: 36,
    photos: [
      'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg',
    ],
    addedBy: 'user3',
    createdAt: '2023-09-20T09:00:00Z',
    updatedAt: '2024-03-05T16:20:00Z',
  },
  {
    id: 'loc4',
    name: 'Inorbit Mall',
    description: 'Shopping mall with excellent accessibility features.',
    address: 'Mindspace, HITEC City',
    lat: 17.4343,
    lng: 78.3826,
    category: 'shopping',
    accessibilityFeatures: [
      accessibilityFeatures[0],
      accessibilityFeatures[1],
      accessibilityFeatures[2],
      accessibilityFeatures[4],
    ],
    ratings: 4.3,
    reviewCount: 51,
    photos: [
      'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg',
    ],
    addedBy: 'user4',
    createdAt: '2023-10-10T11:30:00Z',
    updatedAt: '2024-02-15T13:10:00Z',
  },
  {
    id: 'loc5',
    name: 'Paradise Restaurant',
    description: 'Famous restaurant with wheelchair accessibility.',
    address: 'SD Road, Secunderabad',
    lat: 17.4400,
    lng: 78.4983,
    category: 'restaurant',
    accessibilityFeatures: [
      accessibilityFeatures[0],
      accessibilityFeatures[2],
      accessibilityFeatures[6],
    ],
    ratings: 4.6,
    reviewCount: 72,
    photos: [
      'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
    ],
    addedBy: 'user5',
    createdAt: '2023-08-15T08:45:00Z',
    updatedAt: '2024-03-01T10:50:00Z',
  },
];