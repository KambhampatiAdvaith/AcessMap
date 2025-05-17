import React, { useState } from 'react';
import { Star, Upload } from 'lucide-react';
import { useLocations } from '../../context/LocationsContext';
import { useAuth } from '../../context/AuthContext';

interface ReviewFormProps {
  locationId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ locationId }) => {
  const { user } = useAuth();
  const { addReview } = useLocations();
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (comment.trim().length < 10) {
      setError('Please provide a more detailed review (at least 10 characters)');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      // In a real app, we would also handle photo uploads here
      await addReview(locationId, {
        locationId,
        userId: user?.id || 'anonymous',
        username: user?.username || 'Anonymous User',
        rating,
        comment,
        photos: [],
      });
      
      setSubmitted(true);
      setRating(0);
      setComment('');
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-500 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-lg font-medium text-green-800 mb-2">Thank You for Your Review!</h4>
        <p className="text-green-600 mb-4">
          Your accessibility review helps others in the community find suitable places.
        </p>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          onClick={() => setSubmitted(false)}
        >
          Write Another Review
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Accessibility Rating
        </label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="text-2xl focus:outline-none"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={`w-8 h-8 ${
                  (hoverRating || rating) >= star
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
          
          <span className="ml-2 text-sm text-gray-500">
            {rating > 0 && (
              <>
                {rating} {rating === 1 ? 'star' : 'stars'} - 
                {' '}
                {
                  rating === 1 ? 'Poor accessibility' :
                  rating === 2 ? 'Limited accessibility' :
                  rating === 3 ? 'Moderate accessibility' :
                  rating === 4 ? 'Good accessibility' :
                  'Excellent accessibility'
                }
              </>
            )}
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Your Accessibility Review
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Please describe your accessibility experience. What worked well? What could be improved? This helps others with accessibility needs."
          className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Photos (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">
            Drag and drop photos here, or click to select files
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Photos of accessibility features help others see what to expect
          </p>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            // In a real app, we would handle file uploads
          />
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm inline-block"
          >
            Select Photos
          </button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
            submitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;