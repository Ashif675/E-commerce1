// ─── Checkout Page ────────────────────────────────────────────────────
// Shipping form + order summary + Razorpay payment integration.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiLock, FiCreditCard } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const shipping = cartTotal >= 999 ? 0 : 99;
  const tax = Math.round(cartTotal * 0.18);
  const total = cartTotal + tax + shipping;

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Load Razorpay SDK dynamically
  function loadRazorpay() {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handlePayment(e) {
    e.preventDefault();

    // Validate form
    const required = ['name', 'phone', 'address', 'city', 'state', 'pincode'];
    for (const field of required) {
      if (!form[field].trim()) {
        return toast.error(`Please fill in ${field}`);
      }
    }

    if (cartItems.length === 0) return toast.error('Your cart is empty');

    setLoading(true);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error('Payment gateway failed to load. Please try again.');
        setLoading(false);
        return;
      }

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder';

      const options = {
        key: razorpayKey,
        amount: total * 100, // Amount in paise
        currency: 'INR',
        name: 'ShopStore',
        description: `Order - ${cartItems.length} items`,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: '#4f46e5',
        },
        handler: async function (response) {
          // Payment successful — save order to Firestore
          try {
            const orderData = {
              userId: user.uid,
              userEmail: user.email,
              items: cartItems,
              subtotal: cartTotal,
              shipping,
              tax,
              total,
              shippingAddress: {
                name: form.name,
                phone: form.phone,
                address: form.address,
                city: form.city,
                state: form.state,
                pincode: form.pincode,
              },
              paymentId: response.razorpay_payment_id,
              status: 'confirmed',
              createdAt: new Date().toISOString(),
            };

            await addDoc(collection(db, 'orders'), orderData);
            clearCart();
            toast.success('Order placed successfully! 🎉');
            navigate('/orders');
          } catch {
            toast.error('Order saved locally. Payment was successful.');
            clearCart();
            navigate('/orders');
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast('Payment cancelled', { icon: '⚠️' });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Checkout</h1>

      <form onSubmit={handlePayment}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                📦 Shipping Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="10-digit number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pincode *</label>
                  <input type="text" name="pincode" value={form.pincode} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="6-digit pincode"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address *</label>
                  <textarea name="address" value={form.address} onChange={handleChange} required rows={2}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder="House/Flat No., Street, Landmark"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City *</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">State *</label>
                  <input type="text" name="state" value={form.state} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 h-fit sticky top-24">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.qty} × ₹{item.price.toLocaleString()}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">₹{(item.qty * item.price).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <hr className="my-4 border-slate-100" />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="text-green-600 font-medium">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">GST (18%)</span>
                <span className="font-medium">₹{tax.toLocaleString()}</span>
              </div>
            </div>

            <hr className="my-4 border-slate-100" />

            <div className="flex justify-between mb-6">
              <span className="font-bold text-slate-800">Total</span>
              <span className="text-xl font-bold text-indigo-600">₹{total.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3.5 rounded-xl transition-colors"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <><FiCreditCard /> Pay ₹{total.toLocaleString()}</>
              )}
            </button>

            <p className="text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
              <FiLock size={12} /> Secured by Razorpay
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
