// ─── Review List Component ────────────────────────────────────────────

import { FiStar, FiUser } from 'react-icons/fi';

export default function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-gray-500 text-sm py-4">
        No reviews yet. Be the first to review this product!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, idx) => (
        <div key={idx} className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500/15 rounded-full flex items-center justify-center border border-emerald-500/20">
                <FiUser size={14} className="text-emerald-400" />
              </div>
              <span className="font-medium text-sm text-gray-300">{review.user}</span>
            </div>
            <span className="text-xs text-gray-600">{review.date}</span>
          </div>
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FiStar
                key={i}
                size={14}
                className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-700'}
              />
            ))}
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
