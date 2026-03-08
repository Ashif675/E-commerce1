// ─── Review Form Component ────────────────────────────────────────────
// Star-rating selector + comment form for product reviews.

import { useState } from 'react';
import { FiStar, FiSend } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (!user) return toast.error('Please login to leave a review');
    if (rating === 0) return toast.error('Please select a rating');
    if (!comment.trim()) return toast.error('Please write a comment');

    onSubmit({
      user: user.displayName || 'Anonymous',
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0]
    });

    setRating(0);
    setComment('');
    toast.success('Review submitted!');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6">
      <h4 className="font-semibold text-slate-800 mb-4">Write a Review</h4>

      {/* Star selector */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="transition-colors"
          >
            <FiStar
              size={24}
              className={
                star <= (hover || rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-300'
              }
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-slate-500">{rating > 0 && `${rating}/5`}</span>
      </div>

      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Share your experience with this product..."
        rows={3}
        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-4"
      />

      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
      >
        <FiSend size={14} /> Submit Review
      </button>
    </form>
  );
}
