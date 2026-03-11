// ─── Hero Section (Amazon-style) ─────────────────────────────────────

import { Link } from 'react-router-dom';
import { FiArrowRight, FiZap, FiTruck, FiShield, FiPercent } from 'react-icons/fi';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#232F3E] via-[#131921] to-[#0F1111]">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#FF9900]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FF9900]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Deal Banner */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 bg-[#CC0C39] text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full animate-pulse">
            <FiZap size={14} />
            Great Indian Sale — Up to 70% OFF
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className="text-white animate-fade-in-up text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              Shop Everything
              <span className="block text-gradient">You Love, For Less</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 mb-6 max-w-md mx-auto md:mx-0 leading-relaxed">
              Discover thousands of products at unbeatable prices. Free delivery on orders above ₹999.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 amz-btn-orange px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full animate-glow font-bold"
              >
                Shop Now <FiArrowRight />
              </Link>
              <Link
                to="/products?category=Electronics"
                className="inline-flex items-center gap-2 border border-gray-600 text-gray-200 font-medium px-6 sm:px-8 py-3 rounded-full hover:bg-white/5 hover:border-[#FF9900]/50 transition-all text-sm sm:text-base"
              >
                Today's Deals
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex gap-6 sm:gap-8 mt-8 justify-center md:justify-start">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#FF9900]">10K+</p>
                <p className="text-gray-500 text-xs sm:text-sm">Products</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#FF9900]">50K+</p>
                <p className="text-gray-500 text-xs sm:text-sm">Customers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#FF9900]">4.8★</p>
                <p className="text-gray-500 text-xs sm:text-sm">Rating</p>
              </div>
            </div>
          </div>

          {/* Right side - Deal cards */}
          <div className="hidden md:grid grid-cols-2 gap-3">
            {[
              { emoji: '🎧', title: 'Electronics', discount: 'Up to 60% OFF', bg: 'from-blue-900/30 to-blue-950/50' },
              { emoji: '👕', title: 'Fashion', discount: 'Min 40% OFF', bg: 'from-pink-900/30 to-pink-950/50' },
              { emoji: '🏠', title: 'Home & Kitchen', discount: 'Starting ₹199', bg: 'from-green-900/30 to-green-950/50' },
              { emoji: '📚', title: 'Books', discount: 'Flat 30% OFF', bg: 'from-amber-900/30 to-amber-950/50' },
            ].map(card => (
              <Link
                key={card.title}
                to={`/products?category=${card.title === 'Fashion' ? 'Clothing' : card.title === 'Home & Kitchen' ? 'Home' : card.title}`}
                className={`bg-gradient-to-br ${card.bg} rounded-xl p-5 border border-white/5 hover:border-[#FF9900]/30 transition-all hover:-translate-y-1 group`}
              >
                <span className="text-3xl block mb-2">{card.emoji}</span>
                <p className="font-bold text-white text-sm group-hover:text-[#FF9900] transition-colors">{card.title}</p>
                <p className="text-xs text-[#FF9900] font-semibold mt-1">{card.discount}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Trust badges - mobile visible */}
        <div className="grid grid-cols-3 gap-3 mt-8 md:mt-12">
          {[
            { icon: <FiTruck size={18} />, label: 'Free Delivery' },
            { icon: <FiShield size={18} />, label: 'Secure Payment' },
            { icon: <FiPercent size={18} />, label: 'Best Prices' },
          ].map(badge => (
            <div key={badge.label} className="flex items-center justify-center gap-2 bg-white/5 rounded-lg py-2.5 px-3 border border-white/5">
              <span className="text-[#FF9900]">{badge.icon}</span>
              <span className="text-xs sm:text-sm font-medium text-gray-300">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
