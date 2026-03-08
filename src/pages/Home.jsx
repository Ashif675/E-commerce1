// ─── Home Page ────────────────────────────────────────────────────────
// Landing page with hero, featured products, categories, and testimonials.

import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import sampleProducts, { categories } from '../data/sampleProducts';

export default function Home() {
  // Show top 8 rated products as "featured"
  const featured = [...sampleProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const perks = [
    { icon: <FiTruck size={24} />, title: 'Free Shipping', desc: 'On orders above ₹999' },
    { icon: <FiShield size={24} />, title: 'Secure Payment', desc: '100% secure checkout' },
    { icon: <FiRefreshCw size={24} />, title: 'Easy Returns', desc: '30-day return policy' },
    { icon: <FiHeadphones size={24} />, title: '24/7 Support', desc: 'Dedicated help center' },
  ];

  return (
    <div>
      {/* Hero */}
      <HeroSection />

      {/* Perks Bar */}
      <section className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map(perk => (
              <div key={perk.title} className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/10">{perk.icon}</div>
                <div>
                  <p className="font-semibold text-gray-200 text-sm">{perk.title}</p>
                  <p className="text-xs text-gray-500">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Shop by Category</h2>
          <p className="text-gray-500">Find exactly what you're looking for</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.filter(c => c !== 'All').map(cat => {
            const emoji = { Electronics: '🔌', Clothing: '👕', Home: '🏠', Books: '📚' }[cat];
            return (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                className="group bg-gray-900 hover:bg-gray-800 rounded-2xl p-8 text-center border border-gray-800 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1"
              >
                <span className="text-4xl block mb-3">{emoji}</span>
                <span className="font-semibold text-gray-300 group-hover:text-emerald-400 transition-colors">{cat}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Products</h2>
              <p className="text-gray-500">Hand-picked selections just for you</p>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 text-emerald-400 font-medium">
              View All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-emerald-950 via-gray-900 to-gray-950 rounded-3xl p-8 md:p-12 text-center border border-emerald-500/15 glow-green">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Join 50,000+ Happy Customers</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            "ShopStore completely changed my shopping experience. The quality of products is outstanding
            and the delivery is always on time. Highly recommended!"
          </p>
          <p className="font-semibold text-emerald-400">— Priya Sharma, Verified Buyer</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-emerald-500 text-gray-950 font-bold px-8 py-3 rounded-xl mt-6 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
          >
            Create Account <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
