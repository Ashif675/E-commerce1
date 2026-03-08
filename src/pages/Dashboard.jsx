// ─── Dashboard Page ───────────────────────────────────────────────────
// User profile dashboard with quick links to orders and wishlist.

import { Link } from 'react-router-dom';
import { FiUser, FiPackage, FiHeart, FiShoppingCart, FiSettings, FiMail, FiCalendar } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();

  const quickLinks = [
    { to: '/orders', icon: <FiPackage size={24} />, label: 'My Orders', desc: 'View order history', color: 'bg-blue-50 text-blue-600' },
    { to: '/wishlist', icon: <FiHeart size={24} />, label: 'Wishlist', desc: `${wishlistItems.length} items`, color: 'bg-pink-50 text-pink-600' },
    { to: '/cart', icon: <FiShoppingCart size={24} />, label: 'Cart', desc: `${cartCount} items`, color: 'bg-green-50 text-green-600' },
    ...(isAdmin ? [{ to: '/admin', icon: <FiSettings size={24} />, label: 'Admin Panel', desc: 'Manage store', color: 'bg-purple-50 text-purple-600' }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">My Dashboard</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUser size={32} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">{user?.displayName || 'User'}</h2>
          <div className="flex items-center justify-center gap-1 text-sm text-slate-500 mb-1">
            <FiMail size={14} />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-sm text-slate-500 mb-4">
            <FiCalendar size={14} />
            <span>Joined {new Date(user?.metadata?.creationTime || Date.now()).toLocaleDateString()}</span>
          </div>
          {isAdmin && (
            <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
              ADMIN
            </span>
          )}
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {quickLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${link.color}`}>
                {link.icon}
              </div>
              <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{link.label}</h3>
              <p className="text-sm text-slate-500 mt-1">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-10 bg-white rounded-2xl border border-slate-100 p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Welcome to ShopStore!</h3>
        <p className="text-slate-500 leading-relaxed">
          Manage your orders, wishlist, and cart from your dashboard. Browse our collection of premium products and enjoy exclusive deals.
        </p>
        <div className="mt-6 flex gap-4">
          <Link to="/products" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Browse Products
          </Link>
          <Link to="/orders" className="border border-slate-200 hover:border-indigo-300 text-slate-700 font-medium px-6 py-3 rounded-xl transition-all">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
