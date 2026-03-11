// ─── Home Page (Amazon-style) ────────────────────────────────────────

import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import sampleProducts, { categories } from '../data/sampleProducts';

export default function Home() {
  const featured = [...sampleProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const perks = [
    { icon: <FiTruck size={20} />, title: 'Free Shipping', desc: 'On orders above ₹999' },
    { icon: <FiShield size={20} />, title: 'Secure Payment', desc: '100% secure checkout' },
    { icon: <FiRefreshCw size={20} />, title: 'Easy Returns', desc: '30-day return policy' },
    { icon: <FiHeadphones size={20} />, title: '24/7 Support', desc: 'Dedicated help center' },
  ];

  return (
    <div>
      <HeroSection />

      {/* Perks Bar */}
      <section className="bg-[#131921] border-b border-[#232F3E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {perks.map(perk => (
              <div key={perk.title} className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 bg-[#FF9900]/10 text-[#FF9900] rounded-lg border border-[#FF9900]/10 flex-shrink-0">{perk.icon}</div>
                <div>
                  <p className="font-semibold text-gray-200 text-xs sm:text-sm">{perk.title}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {categories.filter(c => c !== 'All').map(cat => {
            const emoji = { Electronics: '🔌', Clothing: '👕', Home: '🏠', Books: '📚' }[cat];
            return (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                className="group bg-[#1a1a2e] hover:bg-[#232F3E] rounded-xl p-5 sm:p-6 text-center border border-[#232F3E] hover:border-[#FF9900]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#FF9900]/5 hover:-translate-y-1"
              >
                <span className="text-3xl sm:text-4xl block mb-2">{emoji}</span>
                <span className="font-semibold text-gray-300 group-hover:text-[#FF9900] transition-colors text-sm sm:text-base">{cat}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-[#131921]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Best Sellers</h2>
              <p className="text-gray-500 text-sm mt-0.5">Top-rated products for you</p>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-1 text-[#FF9900] hover:text-[#FFB347] font-medium text-sm transition-colors"
            >
              See all <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <Link to="/products" className="inline-flex items-center gap-1 text-[#FF9900] font-medium text-sm">
              See All Products <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-gradient-to-br from-[#232F3E] via-[#1a1a2e] to-[#131921] rounded-2xl p-6 sm:p-10 text-center border border-[#FF9900]/10 glow-orange">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Join 50,000+ Happy Customers</h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-5 text-sm sm:text-base leading-relaxed">
            "Shop.in completely changed my shopping experience. The quality and delivery are always outstanding!"
          </p>
          <p className="font-semibold text-[#FF9900] text-sm mb-4">— Priya Sharma, Verified Buyer</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 amz-btn-orange px-6 sm:px-8 py-2.5 rounded-full text-sm font-bold"
          >
            Create Account <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
