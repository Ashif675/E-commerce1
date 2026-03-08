// ─── Product Card Component ───────────────────────────────────────────
// Displays a single product in a grid. Includes hover animation, rating stars,
// add to cart, and wishlist toggle.

import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  }

  function handleToggleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  }

  // Render rating stars
  const stars = Array.from({ length: 5 }, (_, i) => (
    <FiStar
      key={i}
      size={14}
      className={i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
    />
  ));

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100">

        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />

          {/* Stock Badge */}
          {product.stock < 10 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Only {product.stock} left
            </span>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full shadow-md transition-colors ${
                wishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <FiHeart size={16} className={wishlisted ? 'fill-current' : ''} />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs font-medium text-indigo-600 mb-1">{product.category}</p>
          <h3 className="font-semibold text-slate-800 line-clamp-1 mb-1">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">{stars}<span className="text-xs text-slate-500 ml-1">({product.rating})</span></div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-800">₹{product.price.toLocaleString()}</span>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
            >
              <FiShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
