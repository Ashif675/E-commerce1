// ─── Footer Component ─────────────────────────────────────────────────

import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="bg-gradient-to-r from-emerald-500 to-green-400 text-gray-950 px-3 py-1 rounded-lg text-sm font-black">
                SHOP
              </span>
              <span className="text-white">Store</span>
            </Link>
            <p className="text-gray-500 max-w-md leading-relaxed">
              Your one-stop destination for premium products at unbeatable prices.
              Shop with confidence — quality guaranteed.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"><FiTwitter size={18} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"><FiInstagram size={18} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"><FiGithub size={18} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"><FiMail size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-emerald-400 transition-colors">Products</Link></li>
              <li><Link to="/cart" className="hover:text-emerald-400 transition-colors">Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-emerald-400 transition-colors">Wishlist</Link></li>
              <li><Link to="/orders" className="hover:text-emerald-400 transition-colors">Orders</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} ShopStore. All rights reserved. Built with 💚
        </div>
      </div>
    </footer>
  );
}
