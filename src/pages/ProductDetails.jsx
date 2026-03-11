// ─── Product Details (Amazon-style) ──────────────────────────────────

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar, FiChevronLeft, FiMinus, FiPlus, FiCheck, FiTruck } from 'react-icons/fi';
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
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-white mb-3">Product Not Found</h2>
        <Link to="/products" className="text-[#FF9900] hover:underline text-sm">← Back to Products</Link>
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
    <FiStar key={i} size={16} className={i < Math.round(avgRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-600'} />
  ));
  const mrp = Math.round(product.price * 1.4);
  const discount = Math.round(((mrp - product.price) / mrp) * 100);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <Link to="/products" className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-[#FF9900] mb-4 transition-colors"><FiChevronLeft size={14} /> Back to Products</Link>
      <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
        {/* Image */}
        <div className="bg-[#1a1a2e] rounded-lg overflow-hidden border border-[#232F3E]">
          <img src={product.image} alt={product.name} className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover" />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-white mb-2 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">{stars}</div>
            <span className="text-xs sm:text-sm text-[#FF9900]">{avgRating}</span>
            <span className="text-xs text-gray-500">({reviews.length} reviews)</span>
          </div>

          <hr className="border-[#232F3E] mb-3" />

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-[#CC0C39] text-sm font-medium">-{discount}%</span>
              <span className="text-xl sm:text-2xl font-bold text-white">₹{product.price.toLocaleString()}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">M.R.P.: <span className="line-through">₹{mrp.toLocaleString()}</span></p>
            <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">{product.description}</p>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-4">
            {product.stock > 0 ? (
              <><FiCheck className="text-green-400" size={16} /><span className="text-sm font-medium text-green-400">In Stock</span></>
            ) : (
              <span className="text-sm font-medium text-red-400">Out of Stock</span>
            )}
          </div>

          {/* Delivery info */}
          <div className="flex items-center gap-2 mb-4 bg-[#1a1a2e] border border-[#232F3E] rounded-lg p-3">
            <FiTruck className="text-[#FF9900]" size={16} />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-200">FREE Delivery on orders above ₹999</p>
              <p className="text-[10px] sm:text-xs text-gray-500">Usually delivered in 3-5 business days</p>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-gray-400">Qty:</span>
            <div className="flex items-center border border-[#37475A] rounded-lg overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-[#232F3E] text-gray-400"><FiMinus size={14} /></button>
              <span className="px-4 py-2 font-semibold text-white bg-[#232F3E] min-w-[40px] text-center text-sm">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2 hover:bg-[#232F3E] text-gray-400"><FiPlus size={14} /></button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className="flex-1 inline-flex items-center justify-center gap-2 amz-btn py-2.5 rounded-lg text-sm disabled:opacity-50">
              <FiShoppingCart size={16} /> Add to Cart
            </button>
            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className="flex-1 inline-flex items-center justify-center gap-2 amz-btn-orange py-2.5 rounded-lg text-sm disabled:opacity-50">
              Buy Now
            </button>
          </div>
          <button onClick={handleToggleWishlist}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm ${
              wishlisted ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-[#37475A] text-gray-500 hover:border-red-500/40 hover:text-red-400'
            }`}>
            <FiHeart size={16} className={wishlisted ? 'fill-current' : ''} />
            {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10 sm:mt-16">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Customer Reviews</h2>
        <div className="grid md:grid-cols-2 gap-6"><ReviewForm onSubmit={handleReviewSubmit} /><ReviewList reviews={reviews} /></div>
      </div>
    </div>
  );
}
