// ─── Review Form (Amazon-style) ──────────────────────────────────────

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
    onSubmit({ user: user.displayName || 'Anonymous', rating, comment: comment.trim(), date: new Date().toISOString().split('T')[0] });
    setRating(0); setComment(''); toast.success('Review submitted!');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1a1a2e] rounded-lg border border-[#232F3E] p-4 sm:p-5">
      <h4 className="font-semibold text-white text-sm mb-3">Write a Review</h4>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map(star => (
          <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} className="transition-colors">
            <FiStar size={20} className={star <= (hover || rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-600'} />
          </button>
        ))}
        <span className="ml-2 text-xs text-gray-500">{rating > 0 && `${rating}/5`}</span>
      </div>
      <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Share your experience..."
        rows={3} className="w-full bg-[#232F3E] border border-[#37475A] rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9900] resize-none mb-3" />
      <button type="submit" className="inline-flex items-center gap-2 amz-btn-orange font-bold px-4 py-2 rounded-lg text-xs">
        <FiSend size={12} /> Submit Review
      </button>
    </form>
  );
}
