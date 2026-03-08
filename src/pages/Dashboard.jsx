// ─── Dashboard Page ───────────────────────────────────────────────────

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
    { to: '/orders', icon: <FiPackage size={24} />, label: 'My Orders', desc: 'View order history', color: 'bg-blue-500/10 text-blue-400 border-blue-500/10' },
    { to: '/wishlist', icon: <FiHeart size={24} />, label: 'Wishlist', desc: `${wishlistItems.length} items`, color: 'bg-pink-500/10 text-pink-400 border-pink-500/10' },
    { to: '/cart', icon: <FiShoppingCart size={24} />, label: 'Cart', desc: `${cartCount} items`, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' },
    ...(isAdmin ? [{ to: '/admin', icon: <FiSettings size={24} />, label: 'Admin Panel', desc: 'Manage store', color: 'bg-teal-500/10 text-teal-400 border-teal-500/10' }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Dashboard</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
            <FiUser size={32} className="text-gray-950" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{user?.displayName || 'User'}</h2>
          <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1"><FiMail size={14} /><span>{user?.email}</span></div>
          <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4"><FiCalendar size={14} /><span>Joined {new Date(user?.metadata?.creationTime || Date.now()).toLocaleDateString()}</span></div>
          {isAdmin && <span className="inline-block bg-emerald-500/15 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">ADMIN</span>}
        </div>
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {quickLinks.map(link => (
            <Link key={link.to} to={link.to} className="bg-gray-900 rounded-2xl border border-gray-800 p-6 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${link.color}`}>{link.icon}</div>
              <h3 className="font-bold text-gray-200 group-hover:text-emerald-400 transition-colors">{link.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10 bg-gray-900 rounded-2xl border border-gray-800 p-8">
        <h3 className="text-lg font-bold text-white mb-4">Welcome to ShopStore!</h3>
        <p className="text-gray-500 leading-relaxed">Manage your orders, wishlist, and cart from your dashboard. Browse our collection of premium products and enjoy exclusive deals.</p>
        <div className="mt-6 flex gap-4">
          <Link to="/products" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-emerald-600/20">Browse Products</Link>
          <Link to="/orders" className="border border-gray-700 hover:border-emerald-500/40 text-gray-300 font-medium px-6 py-3 rounded-xl transition-all">View Orders</Link>
        </div>
      </div>
    </div>
  );
}
