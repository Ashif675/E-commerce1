// ─── Navbar Component ─────────────────────────────────────────────────
// Sticky navigation bar with logo, links, cart badge, user menu, and mobile hamburger.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiLogOut, FiPackage, FiGrid } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch {
      toast.error('Logout failed');
    }
    setUserMenu(false);
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-gradient-to-r from-emerald-500 to-green-400 text-gray-950 px-3 py-1 rounded-lg text-sm font-black">
              SHOP
            </span>
            <span className="text-white">Store</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-400 hover:text-emerald-400 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/wishlist" className="relative p-2 text-gray-400 hover:text-emerald-400 transition-colors">
              <FiHeart size={20} />
            </Link>

            <Link to="/cart" className="relative p-2 text-gray-400 hover:text-emerald-400 transition-colors">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-gray-950 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse-soft">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-full px-3 py-2 transition-colors border border-gray-700/60"
                >
                  <FiUser size={16} className="text-emerald-400" />
                  <span className="text-sm font-medium max-w-[100px] truncate text-gray-300">
                    {user.displayName || 'User'}
                  </span>
                </button>

                {userMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-xl shadow-xl border border-gray-700/60 py-2 animate-fade-in-up">
                    <Link
                      to="/dashboard"
                      onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-emerald-400"
                    >
                      <FiUser size={14} /> My Dashboard
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-emerald-400"
                    >
                      <FiPackage size={14} /> My Orders
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-emerald-400 hover:bg-emerald-950"
                      >
                        <FiGrid size={14} /> Admin Panel
                      </Link>
                    )}
                    <hr className="my-1 border-gray-700/60" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-950/40"
                    >
                      <FiLogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-emerald-600/20"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <Link to="/cart" className="relative p-2 text-gray-400">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-gray-950 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-gray-400">
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 animate-fade-in-up">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-emerald-400 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-emerald-400 font-medium"
            >
              Wishlist
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 font-medium">Dashboard</Link>
                <Link to="/orders" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 font-medium">Orders</Link>
                {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-emerald-400 hover:bg-emerald-950 font-medium">Admin Panel</Link>}
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg text-red-400 hover:bg-red-950/40 font-medium">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg bg-emerald-600 text-white text-center font-semibold">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
