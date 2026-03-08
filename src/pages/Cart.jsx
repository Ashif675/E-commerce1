// ─── Cart Page ────────────────────────────────────────────────────────
// Shows cart items with qty controls, price breakdown, and checkout CTA.

import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <FiShoppingBag /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Shopping Cart</h1>
          <p className="text-slate-500">{cartItems.length} items</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-4 animate-fade-in-up">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.id}`} className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-lg font-bold text-indigo-600 mt-1">₹{item.price.toLocaleString()}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.qty - 1)}
                      className="px-2 py-1 hover:bg-slate-50 text-slate-600"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="px-3 py-1 text-sm font-semibold text-slate-800">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                      className="px-2 py-1 hover:bg-slate-50 text-slate-600"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 h-fit sticky top-24">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Order Summary</h3>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="text-slate-700 font-medium">₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Shipping</span>
              <span className="text-green-600 font-medium">{cartTotal >= 999 ? 'Free' : '₹99'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Tax (GST 18%)</span>
              <span className="text-slate-700 font-medium">₹{Math.round(cartTotal * 0.18).toLocaleString()}</span>
            </div>
          </div>

          <hr className="my-4 border-slate-100" />

          <div className="flex justify-between mb-6">
            <span className="font-bold text-slate-800">Total</span>
            <span className="text-xl font-bold text-indigo-600">
              ₹{(cartTotal + Math.round(cartTotal * 0.18) + (cartTotal >= 999 ? 0 : 99)).toLocaleString()}
            </span>
          </div>

          <Link
            to="/checkout"
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            Proceed to Checkout <FiArrowRight />
          </Link>

          <Link to="/products" className="block text-center text-sm text-indigo-600 hover:underline mt-4">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
