// ─── Checkout (Amazon-style) ─────────────────────────────────────────

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
  const [form, setForm] = useState({ name: user?.displayName || '', email: user?.email || '', phone: '', address: '', city: '', state: '', pincode: '' });

  const shipping = cartTotal >= 999 ? 0 : 99;
  const tax = Math.round(cartTotal * 0.18);
  const total = cartTotal + tax + shipping;

  function handleChange(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); }

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
    for (const field of ['name', 'phone', 'address', 'city', 'state', 'pincode']) {
      if (!form[field].trim()) return toast.error(`Please fill in ${field}`);
    }
    if (cartItems.length === 0) return toast.error('Your cart is empty');
    setLoading(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) { toast.error('Payment gateway failed to load.'); setLoading(false); return; }
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: total * 100, currency: 'INR', name: 'Shop.in',
        description: `Order - ${cartItems.length} items`,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#FF9900' },
        handler: async function (response) {
          try {
            await addDoc(collection(db, 'orders'), {
              userId: user.uid, userEmail: user.email, items: cartItems,
              subtotal: cartTotal, shipping, tax, total,
              shippingAddress: { name: form.name, phone: form.phone, address: form.address, city: form.city, state: form.state, pincode: form.pincode },
              paymentId: response.razorpay_payment_id, status: 'confirmed', createdAt: new Date().toISOString(),
            });
            clearCart(); toast.success('Order placed successfully! 🎉'); navigate('/orders');
          } catch { clearCart(); navigate('/orders'); }
        },
        modal: { ondismiss: function () { setLoading(false); toast('Payment cancelled', { icon: '⚠️' }); } },
      };
      new window.Razorpay(options).open();
    } catch { toast.error('Something went wrong.'); }
    setLoading(false);
  }

  if (cartItems.length === 0) { navigate('/cart'); return null; }

  const inputClass = "w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-[#0F1111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]";

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Checkout</h1>
      <form onSubmit={handlePayment}>
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Shipping */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-5">
              <h2 className="text-base font-bold text-[#0F1111] mb-4">📦 Delivery Address</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold text-[#0F1111] mb-1">Full Name *</label><input type="text" name="name" value={form.name} onChange={handleChange} required className={inputClass} /></div>
                <div><label className="block text-xs font-bold text-[#0F1111] mb-1">Email</label><input type="email" name="email" value={form.email} onChange={handleChange} className={`${inputClass} opacity-60`} readOnly /></div>
                <div><label className="block text-xs font-bold text-[#0F1111] mb-1">Phone *</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="10-digit number" className={inputClass} /></div>
                <div><label className="block text-xs font-bold text-[#0F1111] mb-1">Pincode *</label><input type="text" name="pincode" value={form.pincode} onChange={handleChange} required placeholder="6-digit" className={inputClass} /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-bold text-[#0F1111] mb-1">Address *</label><textarea name="address" value={form.address} onChange={handleChange} required rows={2} placeholder="House/Flat, Street, Landmark" className={`${inputClass} resize-none`} /></div>
                <div><label className="block text-xs font-bold text-[#0F1111] mb-1">City *</label><input type="text" name="city" value={form.city} onChange={handleChange} required className={inputClass} /></div>
                <div><label className="block text-xs font-bold text-[#0F1111] mb-1">State *</label><input type="text" name="state" value={form.state} onChange={handleChange} required className={inputClass} /></div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-[#1a1a2e] rounded-lg border border-[#232F3E] p-4 sm:p-5 h-fit sticky top-36">
            <h3 className="text-base font-bold text-white mb-3">Order Summary</h3>
            <div className="space-y-2 mb-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-2">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                  <div className="flex-1 min-w-0"><p className="text-xs font-medium text-gray-300 line-clamp-1">{item.name}</p><p className="text-[10px] text-gray-500">{item.qty} × ₹{item.price.toLocaleString()}</p></div>
                  <p className="text-xs font-semibold text-gray-200">₹{(item.qty * item.price).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <hr className="my-3 border-[#232F3E]" />
            <div className="space-y-1.5 mb-3 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-medium text-gray-300">₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="text-[#FF9900] font-medium">{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">GST (18%)</span><span className="font-medium text-gray-300">₹{tax.toLocaleString()}</span></div>
            </div>
            <hr className="my-3 border-[#232F3E]" />
            <div className="flex justify-between mb-4">
              <span className="font-bold text-white text-sm">Order Total</span>
              <span className="text-lg font-bold text-[#FF9900]">₹{total.toLocaleString()}</span>
            </div>
            <button type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 amz-btn-orange font-bold py-2.5 rounded-lg text-sm disabled:opacity-60">
              {loading ? <>Processing...</> : <><FiCreditCard size={14} /> Place Order</>}
            </button>
            <p className="text-[10px] text-gray-600 mt-2 flex items-center justify-center gap-1"><FiLock size={10} /> Secured by Razorpay</p>
          </div>
        </div>
      </form>
    </div>
  );
}
