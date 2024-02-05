import React, { useState } from 'react';
import { useCreateReviewMutation, useGetProductReviewsQuery } from '@/redux/services/apiSlice';
import { Product } from '@/redux/features/productsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { LiaStarSolid } from 'react-icons/lia';

interface ProductAuthorDetailsProps {
  productId: Product | string;
  averageRating: Product | any;
  reviews: Product | any;
  ratingCount: Product | any;
}

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className='flex gap-x-1'>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label className='flex' key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="hidden"
            />
            <LiaStarSolid
              className="cursor-pointer"
              color={ratingValue <= (hover || rating) ? "#FF754C" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              size={20}
            />
          </label>
        );
      })}
    </div>
  );
};

const WriteReviews: React.FC<ProductAuthorDetailsProps> = ({ productId }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [createReview] = useCreateReviewMutation();
  const { refetch } = useGetProductReviewsQuery(productId); // Add this line
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please log in to submit a review.');
      return;
    }
    try {
      const response = await createReview({ product: productId, comment: review, rating }).unwrap();
      // Check if the review was successfully created before refetching
      if (response) {
        refetch(); // Refetch reviews after successful submission
      }
      setReview(''); // Optionally reset the review form
      setRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  return (
    <div className='bg-white dark:bg-[#11161b] dark:border-[1px] border-[#333333] shadow-md rounded-lg p-6 my-10'>
      <h2 className='text-2xl font-semibold mb-4 dark:text-[#fff]'>Write a Review</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <textarea
          className='border border-gray-300 p-3 w-full rounded-lg focus:ring-[#6C5DD3] focus:border-[#6C5DD3] transition-all'
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder='Share your thoughts about the book'
          rows={5}
        />
        <div>
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <button type='submit' className='button py-2 px-3 text-white'>
          <p className='z-10'>Submit Review</p>
        </button>
      </form>
    </div>
  );
};

export default WriteReviews;
