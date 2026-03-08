// ─── Review List Component ────────────────────────────────────────────
// Displays a list of product reviews with star ratings.

import { FiStar, FiUser } from 'react-icons/fi';

export default function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-slate-500 text-sm py-4">
        No reviews yet. Be the first to review this product!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, idx) => (
        <div key={idx} className="bg-white rounded-xl border border-slate-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <FiUser size={14} className="text-indigo-600" />
              </div>
              <span className="font-medium text-sm text-slate-700">{review.user}</span>
            </div>
            <span className="text-xs text-slate-400">{review.date}</span>
          </div>
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FiStar
                key={i}
                size={14}
                className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
              />
            ))}
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
