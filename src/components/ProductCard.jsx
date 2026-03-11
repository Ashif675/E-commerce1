// ─── Product Card (Amazon-style) ─────────────────────────────────────

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

  const stars = Array.from({ length: 5 }, (_, i) => (
    <FiStar key={i} size={12} className={i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-600'} />
  ));

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="product-card bg-[#1a1a2e] rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-[#232F3E] hover:border-[#FF9900]/30">
        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-[#232F3E]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.stock < 10 && (
            <span className="absolute top-2 left-2 bg-[#CC0C39] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded">
              Only {product.stock} left
            </span>
          )}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={handleToggleWishlist}
              className={`p-1.5 sm:p-2 rounded-full shadow-md backdrop-blur-sm transition-colors ${
                wishlisted ? 'bg-red-500 text-white' : 'bg-black/60 text-gray-200 hover:bg-red-500/90 hover:text-white'
              }`}>
              <FiHeart size={14} className={wishlisted ? 'fill-current' : ''} />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4">
          <h3 className="font-medium text-gray-100 line-clamp-2 text-xs sm:text-sm mb-1 leading-snug">{product.name}</h3>
          <div className="flex items-center gap-0.5 mb-1.5">
            {stars}
            <span className="text-[10px] sm:text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-base sm:text-lg font-bold text-white">₹{product.price.toLocaleString()}</span>
              <span className="text-[10px] sm:text-xs text-gray-500 ml-1 line-through">₹{Math.round(product.price * 1.4).toLocaleString()}</span>
            </div>
            <button onClick={handleAddToCart}
              className="p-1.5 sm:p-2 bg-[#FF9900] hover:bg-[#FFa726] text-[#0F1111] rounded-lg transition-colors">
              <FiShoppingCart size={14} />
            </button>
          </div>
          <p className="text-[10px] sm:text-xs text-[#FF9900] font-medium mt-1">Free delivery</p>
        </div>
      </div>
    </Link>
  );
}
