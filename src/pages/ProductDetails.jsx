// ─── Product Details Page ─────────────────────────────────────────────
// Full product view with images, info, add to cart, wishlist, reviews.

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
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Product Not Found</h2>
        <Link to="/products" className="text-indigo-600 hover:underline">← Back to Products</Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addToCart(product);
    toast.success(`${qty} × ${product.name} added to cart`);
  }

  function handleToggleWishlist() {
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  }

  function handleReviewSubmit(review) {
    setReviews(prev => [review, ...prev]);
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating;

  const stars = Array.from({ length: 5 }, (_, i) => (
    <FiStar
      key={i}
      size={18}
      className={i < Math.round(avgRating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
    />
  ));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
        <FiChevronLeft size={16} /> Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {product.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">{stars}</div>
            <span className="text-sm text-slate-500">({avgRating}) · {reviews.length} reviews</span>
          </div>

          <p className="text-3xl font-bold text-indigo-600 mb-4">₹{product.price.toLocaleString()}</p>

          <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (
              <>
                <FiCheck className="text-green-500" />
                <span className="text-sm font-medium text-green-600">In Stock ({product.stock} available)</span>
              </>
            ) : (
              <span className="text-sm font-medium text-red-500">Out of Stock</span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-slate-700">Quantity:</span>
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <FiMinus size={16} />
              </button>
              <span className="px-4 py-2 font-semibold text-slate-800 min-w-[40px] text-center">{qty}</span>
              <button
                onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                className="px-3 py-2 hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              <FiShoppingCart size={18} /> Add to Cart
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`p-3 rounded-xl border-2 transition-all ${
                wishlisted
                  ? 'border-red-500 bg-red-50 text-red-500'
                  : 'border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-500'
              }`}
            >
              <FiHeart size={18} className={wishlisted ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Info Tags */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500">Free Shipping</p>
              <p className="text-sm font-semibold text-slate-700">Above ₹999</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500">Easy Returns</p>
              <p className="text-sm font-semibold text-slate-700">30 Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ReviewForm onSubmit={handleReviewSubmit} />
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
