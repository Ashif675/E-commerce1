// ─── Home Page ────────────────────────────────────────────────────────
// Landing page with hero, featured products, categories, and testimonials.

import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import sampleProducts, { categories } from '../data/sampleProducts';

export default function Home() {
  // Show top 4 rated products as "featured"
  const featured = [...sampleProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

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
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map(perk => (
              <div key={perk.title} className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">{perk.icon}</div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{perk.title}</p>
                  <p className="text-xs text-slate-500">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Shop by Category</h2>
          <p className="text-slate-500">Find exactly what you're looking for</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.filter(c => c !== 'All').map(cat => {
            const emoji = { Electronics: '🔌', Clothing: '👕', Home: '🏠', Books: '📚' }[cat];
            return (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                className="group bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-2xl p-8 text-center border border-indigo-100/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <span className="text-4xl block mb-3">{emoji}</span>
                <span className="font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors">{cat}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Featured Products</h2>
              <p className="text-slate-500">Hand-picked selections just for you</p>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
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
            <Link to="/products" className="inline-flex items-center gap-2 text-indigo-600 font-medium">
              View All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Join 50,000+ Happy Customers</h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-6 leading-relaxed">
            "ShopStore completely changed my shopping experience. The quality of products is outstanding
            and the delivery is always on time. Highly recommended!"
          </p>
          <p className="font-semibold">— Priya Sharma, Verified Buyer</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-3 rounded-xl mt-6 hover:bg-yellow-300 hover:text-indigo-900 transition-all"
          >
            Create Account <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
