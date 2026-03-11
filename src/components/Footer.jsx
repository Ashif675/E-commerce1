// ─── Footer (Amazon-style) ───────────────────────────────────────────

import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="mt-auto">
      {/* Back to top */}
      <button onClick={scrollToTop}
        className="w-full bg-[#37475A] hover:bg-[#485769] text-white text-sm font-medium py-3 transition-colors">
        Back to top
      </button>

      {/* Main footer */}
      <div className="bg-[#232F3E] text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Get to Know Us</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-[#FF9900] transition-colors">About Shop.in</a></li>
                <li><a href="#" className="hover:text-[#FF9900] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#FF9900] transition-colors">Press Releases</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Shop With Us</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><Link to="/products" className="hover:text-[#FF9900] transition-colors">All Products</Link></li>
                <li><Link to="/cart" className="hover:text-[#FF9900] transition-colors">Your Cart</Link></li>
                <li><Link to="/wishlist" className="hover:text-[#FF9900] transition-colors">Wishlist</Link></li>
                <li><Link to="/orders" className="hover:text-[#FF9900] transition-colors">Your Orders</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Help</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-[#FF9900] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#FF9900] transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-[#FF9900] transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-[#FF9900] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Connect</h4>
              <div className="flex gap-2 mb-4">
                <a href="#" className="p-2 bg-[#37475A] rounded-lg hover:bg-[#FF9900] hover:text-[#0F1111] transition-all"><FiTwitter size={16} /></a>
                <a href="#" className="p-2 bg-[#37475A] rounded-lg hover:bg-[#FF9900] hover:text-[#0F1111] transition-all"><FiInstagram size={16} /></a>
                <a href="#" className="p-2 bg-[#37475A] rounded-lg hover:bg-[#FF9900] hover:text-[#0F1111] transition-all"><FiGithub size={16} /></a>
                <a href="#" className="p-2 bg-[#37475A] rounded-lg hover:bg-[#FF9900] hover:text-[#0F1111] transition-all"><FiMail size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#131921] text-gray-500">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <Link to="/" className="inline-flex items-center gap-1 mb-2">
            <span className="text-white font-black text-sm">Shop</span>
            <span className="text-[#FF9900] font-black text-sm">.in</span>
          </Link>
          <p className="text-xs">© {new Date().getFullYear()} Shop.in — All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
