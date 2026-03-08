// ─── Product Details Page ─────────────────────────────────────────────

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar, FiChevronLeft, FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import sampleProducts from '../data/sampleProducts';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { id } = useParams();
  const product = sampleProducts.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState(product?.reviews || []);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
        <Link to="/products" className="text-emerald-400 hover:underline">← Back to Products</Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  function handleAddToCart() { for (let i = 0; i < qty; i++) addToCart(product); toast.success(`${qty} × ${product.name} added to cart`); }
  function handleToggleWishlist() {
    if (wishlisted) { removeFromWishlist(product.id); toast('Removed from wishlist', { icon: '💔' }); }
    else { addToWishlist(product); toast.success('Added to wishlist'); }
  }
  function handleReviewSubmit(review) { setReviews(prev => [review, ...prev]); }

  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : product.rating;
  const stars = Array.from({ length: 5 }, (_, i) => (
    <FiStar key={i} size={18} className={i < Math.round(avgRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-600'} />
  ));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-400 mb-6 transition-colors"><FiChevronLeft size={16} /> Back to Products</Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
          <img src={product.image} alt={product.name} className="w-full h-[400px] md:h-[500px] object-cover" />
        </div>
        <div>
          <span className="inline-block bg-emerald-500/15 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/20 mb-3">{product.category}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4"><div className="flex gap-0.5">{stars}</div><span className="text-sm text-gray-500">({avgRating}) · {reviews.length} reviews</span></div>
          <p className="text-3xl font-bold text-emerald-400 mb-4">₹{product.price.toLocaleString()}</p>
          <p className="text-gray-400 leading-relaxed mb-6">{product.description}</p>
          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (<><FiCheck className="text-emerald-400" /><span className="text-sm font-medium text-emerald-400">In Stock ({product.stock} available)</span></>) : (<span className="text-sm font-medium text-red-400">Out of Stock</span>)}
          </div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-400">Quantity:</span>
            <div className="flex items-center border border-gray-700 rounded-xl overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-800 text-gray-400 transition-colors"><FiMinus size={16} /></button>
              <span className="px-4 py-2 font-semibold text-white min-w-[40px] text-center">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2 hover:bg-gray-800 text-gray-400 transition-colors"><FiPlus size={16} /></button>
            </div>
          </div>
          <div className="flex gap-3 mb-8">
            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/20">
              <FiShoppingCart size={18} /> Add to Cart
            </button>
            <button onClick={handleToggleWishlist}
              className={`p-3 rounded-xl border-2 transition-all ${wishlisted ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-gray-700 text-gray-500 hover:border-red-500/40 hover:text-red-400'}`}>
              <FiHeart size={18} className={wishlisted ? 'fill-current' : ''} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center"><p className="text-xs text-gray-500">Free Shipping</p><p className="text-sm font-semibold text-gray-300">Above ₹999</p></div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center"><p className="text-xs text-gray-500">Easy Returns</p><p className="text-sm font-semibold text-gray-300">30 Days</p></div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-2 gap-8"><ReviewForm onSubmit={handleReviewSubmit} /><ReviewList reviews={reviews} /></div>
      </div>
    </div>
  );
}
