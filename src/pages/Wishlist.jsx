// ─── Wishlist Page (Amazon-style) ────────────────────────────────────

import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  function handleMoveToCart(item) { addToCart(item); removeFromWishlist(item.id); toast.success('Moved to cart'); }

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FiHeart size={40} className="mx-auto text-gray-700 mb-3" />
        <h2 className="text-xl font-bold text-white mb-2">Your Wishlist is empty</h2>
        <p className="text-gray-500 text-sm mb-5">Save items you love for later.</p>
        <Link to="/products" className="inline-flex items-center gap-2 amz-btn-orange font-bold px-6 py-2.5 rounded-lg text-sm"><FiShoppingBag size={16} /> Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">My Wishlist</h1>
      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">{wishlistItems.length} items saved</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-[#1a1a2e] rounded-lg border border-[#232F3E] overflow-hidden hover:border-[#FF9900]/30 transition-all duration-300 group animate-fade-in-up">
            <Link to={`/products/${item.id}`}>
              <div className="aspect-square overflow-hidden bg-[#232F3E]"><img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
            </Link>
            <div className="p-3">
              <Link to={`/products/${item.id}`} className="font-medium text-gray-200 hover:text-[#FF9900] line-clamp-2 transition-colors text-xs sm:text-sm">{item.name}</Link>
              <p className="text-sm sm:text-base font-bold text-[#FF9900] mt-1">₹{item.price.toLocaleString()}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleMoveToCart(item)} className="flex-1 inline-flex items-center justify-center gap-1 amz-btn-orange text-[10px] sm:text-xs font-bold py-1.5 rounded-lg"><FiShoppingCart size={12} /> Add to Cart</button>
                <button onClick={() => { removeFromWishlist(item.id); toast('Removed', { icon: '💔' }); }} className="p-1.5 border border-[#37475A] rounded-lg text-gray-500 hover:text-red-400 hover:border-red-500/40 transition-all"><FiTrash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
