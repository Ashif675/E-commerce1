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
      className={i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}
    />
  ));

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="product-card bg-gray-900 rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 border border-gray-800 hover:border-emerald-500/30">

        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />

          {/* Stock Badge */}
          {product.stock < 10 && (
            <span className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
              Only {product.stock} left
            </span>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full shadow-md backdrop-blur-sm transition-colors ${
                wishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-900/80 text-gray-300 hover:bg-red-500/90 hover:text-white'
              }`}
            >
              <FiHeart size={16} className={wishlisted ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs font-medium text-emerald-400 mb-1">{product.category}</p>
          <h3 className="font-semibold text-gray-100 line-clamp-1 mb-1">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">{stars}<span className="text-xs text-gray-500 ml-1">({product.rating})</span></div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-white">₹{product.price.toLocaleString()}</span>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
            >
              <FiShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
