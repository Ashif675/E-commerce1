// ─── Dashboard (Amazon-style) ────────────────────────────────────────

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
    { to: '/orders', icon: <FiPackage size={22} />, label: 'Your Orders', desc: 'Track, return, or buy things again', color: 'text-blue-400' },
    { to: '/wishlist', icon: <FiHeart size={22} />, label: 'Wishlist', desc: `${wishlistItems.length} items saved`, color: 'text-pink-400' },
    { to: '/cart', icon: <FiShoppingCart size={22} />, label: 'Your Cart', desc: `${cartCount} items in cart`, color: 'text-[#FF9900]' },
    ...(isAdmin ? [{ to: '/admin', icon: <FiSettings size={22} />, label: 'Admin Panel', desc: 'Manage store & products', color: 'text-green-400' }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Your Account</h1>
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Profile */}
        <div className="bg-[#1a1a2e] rounded-lg border border-[#232F3E] p-5 sm:p-6 text-center">
          <div className="w-16 h-16 bg-[#FF9900] rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl font-bold text-[#0F1111]">{user?.displayName?.charAt(0) || 'U'}</span>
          </div>
          <h2 className="text-lg font-bold text-white mb-1">{user?.displayName || 'User'}</h2>
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-0.5"><FiMail size={12} /><span>{user?.email}</span></div>
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-3"><FiCalendar size={12} /><span>Joined {new Date(user?.metadata?.creationTime || Date.now()).toLocaleDateString()}</span></div>
          {isAdmin && <span className="inline-block bg-[#FF9900]/15 text-[#FF9900] text-xs font-bold px-3 py-1 rounded-full border border-[#FF9900]/20">ADMIN</span>}
        </div>

        {/* Quick links */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
          {quickLinks.map(link => (
            <Link key={link.to} to={link.to} className="bg-[#1a1a2e] rounded-lg border border-[#232F3E] p-4 sm:p-5 hover:border-[#FF9900]/30 hover:-translate-y-0.5 transition-all duration-300 group">
              <div className={`mb-2 ${link.color}`}>{link.icon}</div>
              <h3 className="font-bold text-gray-200 group-hover:text-[#FF9900] transition-colors text-sm">{link.label}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Welcome */}
      <div className="mt-6 bg-[#1a1a2e] rounded-lg border border-[#232F3E] p-5 sm:p-6">
        <h3 className="text-base font-bold text-white mb-2">Welcome to Shop.in!</h3>
        <p className="text-gray-500 text-sm leading-relaxed">Manage your orders, wishlist, and account settings. Browse products and enjoy exclusive deals.</p>
        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Link to="/products" className="amz-btn-orange font-bold px-5 py-2 rounded-lg text-sm text-center">Browse Products</Link>
          <Link to="/orders" className="border border-[#37475A] hover:border-[#FF9900]/40 text-gray-300 font-medium px-5 py-2 rounded-lg text-sm text-center transition-all">View Orders</Link>
        </div>
      </div>
    </div>
  );
}
