// ─── Cart Page (Amazon-style) ────────────────────────────────────────

import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-3">🛒</p>
        <h2 className="text-xl font-bold text-white mb-2">Your Shop.in Cart is empty</h2>
        <p className="text-gray-500 text-sm mb-5">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="inline-flex items-center gap-2 amz-btn-orange font-bold px-6 py-2.5 rounded-lg text-sm">
          <FiShoppingBag size={16} /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Shopping Cart</h1>
          <p className="text-gray-500 text-xs sm:text-sm">{cartItems.length} items</p>
        </div>
        <button onClick={clearCart} className="text-xs sm:text-sm text-red-400 hover:text-red-300 font-medium">Clear All</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-3">
          {cartItems.map(item => (
            <div key={item.id} className="bg-[#1a1a2e] rounded-lg border border-[#232F3E] p-3 sm:p-4 flex gap-3 sm:gap-4 animate-fade-in-up">
              <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.id}`} className="font-medium text-gray-200 hover:text-[#FF9900] transition-colors line-clamp-2 text-sm">{item.name}</Link>
                <p className="text-sm sm:text-base font-bold text-[#FF9900] mt-1">₹{item.price.toLocaleString()}</p>
                <p className="text-[10px] sm:text-xs text-green-400 mt-0.5">In Stock</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-[#37475A] rounded overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, item.qty - 1)} className="px-2 py-1 hover:bg-[#232F3E] text-gray-400"><FiMinus size={12} /></button>
                    <span className="px-3 py-1 text-xs font-semibold text-gray-200 bg-[#232F3E]">{item.qty}</span>
                    <button onClick={() => updateQuantity(item.id, item.qty + 1)} className="px-2 py-1 hover:bg-[#232F3E] text-gray-400"><FiPlus size={12} /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-1.5 text-gray-600 hover:text-red-400 transition-colors"><FiTrash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1a1a2e] rounded-lg border border-[#232F3E] p-4 sm:p-5 h-fit sticky top-36">
          <h3 className="text-base font-bold text-white mb-3">Order Summary</h3>
          <div className="space-y-2 mb-3 text-xs sm:text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="text-gray-300 font-medium">₹{cartTotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="text-[#FF9900] font-medium">{cartTotal >= 999 ? 'Free' : '₹99'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Tax (GST 18%)</span><span className="text-gray-300 font-medium">₹{Math.round(cartTotal * 0.18).toLocaleString()}</span></div>
          </div>
          <hr className="my-3 border-[#232F3E]" />
          <div className="flex justify-between mb-4">
            <span className="font-bold text-white text-sm">Total</span>
            <span className="text-lg font-bold text-[#FF9900]">₹{(cartTotal + Math.round(cartTotal * 0.18) + (cartTotal >= 999 ? 0 : 99)).toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="w-full inline-flex items-center justify-center gap-2 amz-btn-orange font-bold py-2.5 rounded-lg text-sm">
            Proceed to Buy <FiArrowRight size={14} />
          </Link>
          <Link to="/products" className="block text-center text-xs text-[#FF9900] hover:underline mt-3">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
