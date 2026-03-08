// ─── Wishlist Page ────────────────────────────────────────────────────
// Grid of wishlisted products with "move to cart" and remove actions.

import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  function handleMoveToCart(item) {
    addToCart(item);
    removeFromWishlist(item.id);
    toast.success('Moved to cart');
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <FiHeart size={48} className="mx-auto text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
        <p className="text-slate-500 mb-6">Save items you love for later.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <FiShoppingBag /> Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">My Wishlist</h1>
      <p className="text-slate-500 mb-8">{wishlistItems.length} items saved</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 group animate-fade-in-up">
            <Link to={`/products/${item.id}`}>
              <div className="aspect-square overflow-hidden bg-slate-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/products/${item.id}`} className="font-semibold text-slate-800 hover:text-indigo-600 line-clamp-1 transition-colors">
                {item.name}
              </Link>
              <p className="text-lg font-bold text-indigo-600 mt-1">₹{item.price.toLocaleString()}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                >
                  <FiShoppingCart size={14} /> Move to Cart
                </button>
                <button
                  onClick={() => { removeFromWishlist(item.id); toast('Removed', { icon: '💔' }); }}
                  className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-red-500 hover:border-red-300 transition-all"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
