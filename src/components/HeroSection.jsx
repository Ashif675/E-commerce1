// ─── Hero Section Component ───────────────────────────────────────────
// Full-width banner with gradient overlay, headline, and CTA buttons.

import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 min-h-[85vh] flex items-center">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white animate-fade-in-up">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-sm font-medium px-4 py-2 rounded-full mb-6">
              <FiShoppingBag size={14} />
              New Collection 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Discover Products That
              <span className="block text-yellow-300">Define Your Style</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
              Explore thousands of premium products at unbeatable prices. Free shipping on orders above ₹999.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 hover:text-indigo-900 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Now <FiArrowRight />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                View Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              <div>
                <p className="text-3xl font-bold text-white">10K+</p>
                <p className="text-white/60 text-sm">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="text-white/60 text-sm">Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">4.8★</p>
                <p className="text-white/60 text-sm">Rating</p>
              </div>
            </div>
          </div>

          {/* Right side decorative card stack */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 bg-white/10 backdrop-blur-sm rounded-3xl rotate-6 border border-white/20" />
              <div className="absolute top-4 left-4 w-72 h-72 bg-white/15 backdrop-blur-sm rounded-3xl -rotate-3 border border-white/20" />
              <div className="absolute top-8 left-8 w-72 h-72 bg-white/20 backdrop-blur-sm rounded-3xl rotate-1 border border-white/25 flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-6xl mb-4">🛍️</p>
                  <p className="text-white font-bold text-xl">Premium Quality</p>
                  <p className="text-white/70 text-sm mt-2">Curated just for you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
