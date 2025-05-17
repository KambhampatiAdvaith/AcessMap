import React, { useState } from 'react';
import { Star, Calendar, ThumbsUp, Flag, User } from 'lucide-react';

// Mock reviews data
const mockReviews = [
  {
    id: 'rev1',
    userId: 'user1',
    username: 'AccessUser',
    rating: 5,
    comment: "This place has excellent wheelchair accessibility. The entrance ramp is wide and not too steep, and all areas inside are accessible. The restrooms are spacious with proper grab bars. Staff were very helpful and attentive to accessibility needs.",
    photos: ['https://images.pexels.com/photos/3952034/pexels-photo-3952034.jpeg'],
    createdAt: '2024-02-15T14:30:00Z',
  },
  {
    id: 'rev2',
    userId: 'user2',
    username: 'MobilityMaster',
    rating: 4,
    comment: "Generally good accessibility. The main areas are wheelchair accessible and there's an elevator. The only issue was that one of the bathroom stalls was out of order during my visit. Otherwise, a great experience with helpful staff.",
    photos: [],
    createdAt: '2024-01-20T09:15:00Z',
  },
  {
    id: 'rev3',
    userId: 'user3',
    username: 'AccessibilityAdvocate',
    rating: 3,
    comment: "Mixed experience. While they do have an accessible entrance, it's located at the side of the building and poorly marked. Inside accessibility is good with wide paths and accessible restrooms. Staff seemed unsure about some accessibility features when asked.",
    photos: [],
    createdAt: '2023-12-05T16:45:00Z',
  },
];

interface LocationReviewsProps {
  locationId: string;
}

const LocationReviews: React.FC<LocationReviewsProps> = ({ locationId }) => {
  // In a real app, we would fetch reviews based on the locationId
  const [reviews] = useState(mockReviews);
  const [likedReviews, setLikedReviews] = useState<string[]>([]);
  
  const handleLikeReview = (reviewId: string) => {
    if (likedReviews.includes(reviewId)) {
      setLikedReviews(likedReviews.filter(id => id !== reviewId));
    } else {
      setLikedReviews([...likedReviews, reviewId]);
    }
  };
  
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No reviews yet. Be the first to review this location!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {reviews.map(review => (
        <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{review.username}</h4>
                <div className="flex items-center">
                  <div className="text-yellow-400 mr-1">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              Accessibility Review
            </div>
          </div>
          
          <p className="mt-4 text-gray-600">{review.comment}</p>
          
          {review.photos.length > 0 && (
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
              {review.photos.map((photo, index) => (
                <div key={index} className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                  <img
                    src={photo}
                    alt={`Review photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <button
              className={`flex items-center text-sm ${
                likedReviews.includes(review.id)
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleLikeReview(review.id)}
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              Helpful {likedReviews.includes(review.id) && '(1)'}
            </button>
            
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <Flag className="w-4 h-4 mr-1" />
              Report
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationReviews;