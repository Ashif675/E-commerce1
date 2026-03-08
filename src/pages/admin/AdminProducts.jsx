// ─── Admin Products Page ──────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { FiEdit2, FiTrash2, FiPlus, FiStar } from 'react-icons/fi';
import sampleProducts from '../../data/sampleProducts';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState(sampleProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        if (snapshot.size > 0) setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch {}
      setLoading(false);
    }
    fetchProducts();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try { await deleteDoc(doc(db, 'products', id)); setProducts(prev => prev.filter(p => p.id !== id)); toast.success('Product deleted'); }
    catch { toast.error('Failed to delete product'); }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-bold text-white">Products</h1><p className="text-gray-500">{products.length} products</p></div>
        <Link to="/admin/add" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-emerald-600/20"><FiPlus /> Add Product</Link>
      </div>
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-800">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Product</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Price</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="font-medium text-gray-200 text-sm line-clamp-1 max-w-[200px]">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="bg-emerald-500/15 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-500/20">{product.category}</span></td>
                  <td className="px-6 py-4 font-semibold text-gray-200">₹{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4"><span className={`text-sm font-medium ${product.stock > 10 ? 'text-emerald-400' : product.stock > 0 ? 'text-amber-400' : 'text-red-400'}`}>{product.stock}</span></td>
                  <td className="px-6 py-4"><div className="flex items-center gap-1 text-sm"><FiStar size={14} className="fill-amber-400 text-amber-400" /><span className="text-gray-300">{product.rating}</span></div></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/add?edit=${product.id}`} className="p-2 text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all"><FiEdit2 size={16} /></Link>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
