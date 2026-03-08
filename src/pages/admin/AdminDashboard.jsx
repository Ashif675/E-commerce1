// ─── Admin Dashboard ──────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { FiBox, FiShoppingCart, FiDollarSign, FiUsers, FiPlus, FiList, FiPackage } from 'react-icons/fi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, users: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [prodSnap, orderSnap, userSnap] = await Promise.all([getDocs(collection(db, 'products')), getDocs(collection(db, 'orders')), getDocs(collection(db, 'users'))]);
        setStats({ products: prodSnap.size, orders: orderSnap.size, revenue: orderSnap.docs.reduce((sum, doc) => sum + (doc.data().total || 0), 0), users: userSnap.size });
      } catch { setStats({ products: 20, orders: 0, revenue: 0, users: 0 }); }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: <FiBox />, gradient: 'from-emerald-600 to-green-500' },
    { label: 'Total Orders', value: stats.orders, icon: <FiShoppingCart />, gradient: 'from-teal-600 to-emerald-500' },
    { label: 'Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: <FiDollarSign />, gradient: 'from-green-600 to-teal-500' },
    { label: 'Users', value: stats.users, icon: <FiUsers />, gradient: 'from-cyan-600 to-teal-500' },
  ];

  const actions = [
    { to: '/admin/add', icon: <FiPlus size={24} />, label: 'Add Product', desc: 'Add a new product to the store' },
    { to: '/admin/products', icon: <FiList size={24} />, label: 'Manage Products', desc: 'Edit or delete products' },
    { to: '/admin/orders', icon: <FiPackage size={24} />, label: 'Manage Orders', desc: 'View and update order status' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8"><h1 className="text-3xl font-bold text-white">Admin Dashboard</h1><p className="text-gray-500 mt-1">Manage your store from here</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map(card => (
          <div key={card.label} className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-6 text-white shadow-lg`}>
            <div className="flex items-center justify-between mb-3"><span className="text-white/80 text-sm font-medium">{card.label}</span><span className="text-white/60">{card.icon}</span></div>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {actions.map(action => (
          <Link key={action.to} to={action.to} className="bg-gray-900 rounded-2xl border border-gray-800 p-6 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-gray-950 transition-all">{action.icon}</div>
            <h3 className="font-bold text-gray-200">{action.label}</h3>
            <p className="text-sm text-gray-500 mt-1">{action.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
