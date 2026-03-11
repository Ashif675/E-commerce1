// ─── Review List (Amazon-style) ──────────────────────────────────────

import { FiStar, FiUser } from 'react-icons/fi';

export default function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) {
    return <p className="text-gray-500 text-sm py-4">No reviews yet. Be the first to review!</p>;
  }

  return (
    <div className="space-y-3">
      {reviews.map((review, idx) => (
        <div key={idx} className="bg-[#1a1a2e] rounded-lg border border-[#232F3E] p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#FF9900]/15 rounded-full flex items-center justify-center border border-[#FF9900]/20">
                <FiUser size={12} className="text-[#FF9900]" />
              </div>
              <span className="font-medium text-xs sm:text-sm text-gray-300">{review.user}</span>
            </div>
            <span className="text-[10px] text-gray-600">{review.date}</span>
          </div>
          <div className="flex gap-0.5 mb-1.5">
            {Array.from({ length: 5 }, (_, i) => (
              <FiStar key={i} size={12} className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-700'} />
            ))}
          </div>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
