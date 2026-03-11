// ─── Navbar Component ─────────────────────────────────────────────────
// Amazon-inspired navigation with search bar, account dropdown, cart badge

import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiLogOut, FiPackage, FiGrid, FiSearch, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenu(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      await logout();
      toast.success('Logged out successfully');
      setTimeout(() => navigate('/'), 600);
    } catch {
      toast.error('Logout failed');
    }
    setUserMenu(false);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  }

  const categoryLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'All Products' },
    { to: '/products?category=Electronics', label: 'Electronics' },
    { to: '/products?category=Clothing', label: 'Clothing' },
    { to: '/products?category=Home', label: 'Home & Kitchen' },
    { to: '/products?category=Books', label: 'Books' },
  ];

  return (
    <nav className="sticky top-0 z-50">
      {/* ── Top Bar (Main Nav) ── */}
      <div className="amz-nav">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center gap-3 h-14 sm:h-16">

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-1.5 text-white">
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-white font-black text-lg sm:text-xl tracking-tight">Shop</span>
              <span className="text-[#FF9900] font-black text-lg sm:text-xl">.in</span>
            </Link>

            {/* Search Bar (Desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-4 max-w-2xl">
              <div className="flex w-full rounded-lg overflow-hidden border-2 border-[#FF9900] focus-within:border-[#FFB347]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands..."
                  className="flex-1 px-4 py-2 bg-white text-gray-900 text-sm placeholder-gray-500 focus:outline-none"
                />
                <button type="submit" className="px-4 bg-[#FF9900] hover:bg-[#FFa726] text-[#0F1111] transition-colors">
                  <FiSearch size={18} />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2 ml-auto">
              {/* Account */}
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setUserMenu(!userMenu)}
                    className="flex flex-col items-start px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded transition-all"
                  >
                    <span className="text-[10px] sm:text-xs text-gray-300">Hello, {user.displayName?.split(' ')[0] || 'User'}</span>
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-0.5">
                      Account <FiChevronDown size={12} />
                    </span>
                  </button>

                  {userMenu && (
                    <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg shadow-2xl border border-gray-200 py-1 animate-fade-in-up z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900">{user.displayName || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link to="/dashboard" onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF9900]">
                        <FiUser size={14} /> My Account
                      </Link>
                      <Link to="/orders" onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF9900]">
                        <FiPackage size={14} /> My Orders
                      </Link>
                      <Link to="/wishlist" onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF9900]">
                        <FiHeart size={14} /> Wishlist
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#FF9900] font-semibold hover:bg-orange-50">
                          <FiGrid size={14} /> Admin Panel
                        </Link>
                      )}
                      <hr className="my-1 border-gray-100" />
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                        <FiLogOut size={14} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login"
                  className="flex flex-col items-start px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded transition-all">
                  <span className="text-[10px] sm:text-xs text-gray-300">Hello, Sign in</span>
                  <span className="text-xs sm:text-sm font-bold text-white">Account</span>
                </Link>
              )}

              {/* Orders */}
              <Link to="/orders"
                className="hidden sm:flex flex-col items-start px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded transition-all">
                <span className="text-[10px] sm:text-xs text-gray-300">Returns</span>
                <span className="text-xs sm:text-sm font-bold text-white">& Orders</span>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative flex items-center gap-1 px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded transition-all">
                <div className="relative">
                  <FiShoppingCart size={24} className="text-white" />
                  <span className="absolute -top-2 -right-1 bg-[#FF9900] text-[#0F1111] text-[10px] sm:text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                </div>
                <span className="hidden sm:block text-xs font-bold text-white">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Search Bar ── */}
      <div className="md:hidden amz-nav-secondary px-3 py-2">
        <form onSubmit={handleSearch} className="flex rounded-lg overflow-hidden border-2 border-[#FF9900]">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Shop.in"
            className="flex-1 px-3 py-2 bg-white text-gray-900 text-sm placeholder-gray-500 focus:outline-none"
          />
          <button type="submit" className="px-3 bg-[#FF9900] hover:bg-[#FFa726] text-[#0F1111]">
            <FiSearch size={16} />
          </button>
        </form>
      </div>

      {/* ── Secondary Bar (Categories - Desktop) ── */}
      <div className="hidden md:block amz-nav-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 h-10 overflow-x-auto scrollbar-hide">
            {categoryLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-gray-200 hover:text-white px-3 py-1 rounded hover:bg-white/10 transition-all whitespace-nowrap font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-[#131921] border-t border-gray-800 animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {user && (
              <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-[#232F3E] rounded-lg">
                <div className="w-10 h-10 bg-[#FF9900] rounded-full flex items-center justify-center text-[#0F1111] font-bold text-sm">
                  {user.displayName?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{user.displayName || 'User'}</p>
                  <p className="text-xs text-gray-400 truncate max-w-[180px]">{user.email}</p>
                </div>
              </div>
            )}
            {categoryLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-gray-200 hover:bg-[#232F3E] hover:text-[#FF9900] font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-gray-700 my-2" />
            <Link to="/wishlist" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-gray-200 hover:bg-[#232F3E] hover:text-[#FF9900] font-medium text-sm">
              <FiHeart size={16} /> Wishlist
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-gray-200 hover:bg-[#232F3E] font-medium text-sm"><FiUser size={16} /> My Account</Link>
                <Link to="/orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-gray-200 hover:bg-[#232F3E] font-medium text-sm"><FiPackage size={16} /> Orders</Link>
                {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[#FF9900] hover:bg-orange-950/30 font-medium text-sm"><FiGrid size={16} /> Admin Panel</Link>}
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-950/30 font-medium text-sm"><FiLogOut size={16} /> Sign Out</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg amz-btn-orange text-center font-bold text-sm">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
