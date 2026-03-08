// ─── Admin Dashboard ──────────────────────────────────────────────────
// Overview page with stats and quick links to admin features.

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
        const [prodSnap, orderSnap, userSnap] = await Promise.all([
          getDocs(collection(db, 'products')),
          getDocs(collection(db, 'orders')),
          getDocs(collection(db, 'users')),
        ]);

        const revenue = orderSnap.docs.reduce((sum, doc) => sum + (doc.data().total || 0), 0);
        setStats({
          products: prodSnap.size,
          orders: orderSnap.size,
          revenue,
          users: userSnap.size,
        });
      } catch {
        // Firestore not configured yet — show demo stats
        setStats({ products: 12, orders: 0, revenue: 0, users: 0 });
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: <FiBox />, color: 'from-indigo-500 to-indigo-600' },
    { label: 'Total Orders', value: stats.orders, icon: <FiShoppingCart />, color: 'from-green-500 to-green-600' },
    { label: 'Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: <FiDollarSign />, color: 'from-amber-500 to-orange-500' },
    { label: 'Users', value: stats.users, icon: <FiUsers />, color: 'from-purple-500 to-pink-500' },
  ];

  const actions = [
    { to: '/admin/add', icon: <FiPlus size={24} />, label: 'Add Product', desc: 'Add a new product to the store' },
    { to: '/admin/products', icon: <FiList size={24} />, label: 'Manage Products', desc: 'Edit or delete products' },
    { to: '/admin/orders', icon: <FiPackage size={24} />, label: 'Manage Orders', desc: 'View and update order status' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Manage your store from here</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map(card => (
          <div key={card.label} className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/80 text-sm font-medium">{card.label}</span>
              <span className="text-white/60">{card.icon}</span>
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Action Cards */}
      <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {actions.map(action => (
          <Link
            key={action.to}
            to={action.to}
            className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              {action.icon}
            </div>
            <h3 className="font-bold text-slate-800">{action.label}</h3>
            <p className="text-sm text-slate-500 mt-1">{action.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
