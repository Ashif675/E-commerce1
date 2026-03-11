// ─── Order History (Amazon-style) ────────────────────────────────────

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import Loader from '../components/Loader';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const q = query(collection(db, 'orders'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch { setOrders([]); }
      setLoading(false);
    }
    fetchOrders();
  }, [user]);

  const statusColors = {
    confirmed: 'bg-green-500/15 text-green-400 border border-green-500/20',
    processing: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
    shipped: 'bg-teal-500/15 text-teal-400 border border-teal-500/20',
    delivered: 'bg-[#FF9900]/15 text-[#FF9900] border border-[#FF9900]/20',
    cancelled: 'bg-red-500/15 text-red-400 border border-red-500/20',
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-16">
          <FiPackage size={40} className="mx-auto text-gray-700 mb-3" />
          <h3 className="text-lg font-semibold text-gray-300 mb-1">No orders yet</h3>
          <p className="text-gray-500 text-sm mb-5">Start shopping to see your orders here.</p>
          <Link to="/products" className="inline-flex items-center gap-2 amz-btn-orange font-bold px-6 py-2.5 rounded-lg text-sm"><FiShoppingBag size={16} /> Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="bg-[#1a1a2e] rounded-lg border border-[#232F3E] overflow-hidden animate-fade-in-up">
              {/* Order header */}
              <div className="bg-[#232F3E] px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex gap-4 sm:gap-6">
                  <div><span className="text-gray-400 uppercase">Order placed</span><p className="font-medium text-gray-200">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p></div>
                  <div><span className="text-gray-400 uppercase">Total</span><p className="font-bold text-[#FF9900]">₹{order.total?.toLocaleString()}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusColors[order.status] || 'bg-gray-800 text-gray-400'}`}>{order.status}</span>
                  <span className="text-gray-500 font-mono">#{order.id.slice(0, 8)}</span>
                </div>
              </div>
              {/* Items */}
              <div className="px-3 sm:px-4 py-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#232F3E] rounded-lg px-2 py-1.5 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <p className="text-xs font-medium text-gray-300 line-clamp-1 max-w-[120px]">{item.name}</p>
                        <p className="text-[10px] text-gray-500">×{item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {order.shippingAddress && (
                  <div className="mt-2 pt-2 border-t border-[#232F3E]">
                    <p className="text-[10px] text-gray-500">Ship to: <span className="text-gray-400">{order.shippingAddress.name}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</span></p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
