// ─── Order History Page ───────────────────────────────────────────────

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
    delivered: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
    cancelled: 'bg-red-500/15 text-red-400 border border-red-500/20',
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Order History</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <FiPackage size={48} className="mx-auto text-gray-700 mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">Start shopping to see your orders here.</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-emerald-600/20"><FiShoppingBag /> Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-gray-900 rounded-2xl border border-gray-800 p-6 animate-fade-in-up">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div><p className="text-sm text-gray-500">Order ID</p><p className="font-mono text-sm text-gray-400">{order.id.slice(0, 12)}...</p></div>
                <div><p className="text-sm text-gray-500">Date</p><p className="text-sm font-medium text-gray-300">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p></div>
                <div><p className="text-sm text-gray-500">Total</p><p className="text-lg font-bold text-emerald-400">₹{order.total?.toLocaleString()}</p></div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusColors[order.status] || 'bg-gray-800 text-gray-400'}`}>{order.status}</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" /><div><p className="text-xs font-medium text-gray-300 line-clamp-1 max-w-[120px]">{item.name}</p><p className="text-xs text-gray-500">×{item.qty}</p></div>
                  </div>
                ))}
              </div>
              {order.shippingAddress && (
                <div className="mt-4 pt-4 border-t border-gray-800"><p className="text-xs text-gray-500">Shipping to</p><p className="text-sm text-gray-400">{order.shippingAddress.name}, {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</p></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
