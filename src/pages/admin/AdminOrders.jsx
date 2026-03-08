// ─── Admin Orders Page ────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { FiPackage } from 'react-icons/fi';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try { const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc')); const snapshot = await getDocs(q); setOrders(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))); }
      catch { setOrders([]); }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  async function handleStatusChange(orderId, newStatus) {
    try { await updateDoc(doc(db, 'orders', orderId), { status: newStatus }); setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)); toast.success(`Status updated to ${newStatus}`); }
    catch { toast.error('Failed to update status'); }
  }

  const statusColors = {
    confirmed: 'bg-green-500/15 text-green-400',
    processing: 'bg-blue-500/15 text-blue-400',
    shipped: 'bg-teal-500/15 text-teal-400',
    delivered: 'bg-emerald-500/15 text-emerald-400',
    cancelled: 'bg-red-500/15 text-red-400',
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Manage Orders</h1>
      <p className="text-gray-500 mb-8">{orders.length} total orders</p>
      {orders.length === 0 ? (
        <div className="text-center py-20"><FiPackage size={48} className="mx-auto text-gray-700 mb-4" /><h3 className="text-xl font-semibold text-gray-300 mb-2">No orders yet</h3><p className="text-gray-500">Orders will appear here when customers make purchases.</p></div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div><p className="text-xs text-gray-500">Order ID</p><p className="font-mono text-sm text-gray-400">{order.id}</p></div>
                <div><p className="text-xs text-gray-500">Customer</p><p className="text-sm font-medium text-gray-300">{order.shippingAddress?.name || order.userEmail}</p></div>
                <div><p className="text-xs text-gray-500">Date</p><p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p></div>
                <div><p className="text-xs text-gray-500">Total</p><p className="text-lg font-bold text-emerald-400">₹{order.total?.toLocaleString()}</p></div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <select value={order.status} onChange={e => handleStatusChange(order.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border-0 bg-gray-800 focus:ring-2 focus:ring-emerald-500 ${statusColors[order.status] || 'text-gray-400'}`}>
                    <option value="confirmed">Confirmed</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-800 rounded-lg px-2 py-1 flex-shrink-0"><img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" /><span className="text-xs text-gray-400 max-w-[100px] truncate">{item.name} ×{item.qty}</span></div>
                ))}
              </div>
              {order.paymentId && <p className="text-xs text-gray-600 mt-3">Payment ID: {order.paymentId}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
