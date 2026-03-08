// ─── Admin Add / Edit Product ─────────────────────────────────────────

import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { FiUpload, FiSave, FiArrowLeft } from 'react-icons/fi';
import sampleProducts from '../../data/sampleProducts';
import toast from 'react-hot-toast';

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const existing = editId ? sampleProducts.find(p => p.id === editId) : null;
  const [form, setForm] = useState({ name: existing?.name || '', description: existing?.description || '', price: existing?.price || '', category: existing?.category || 'Electronics', stock: existing?.stock || '', image: existing?.image || '' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return toast.error('Please fill all required fields');
    setLoading(true);
    try {
      let imageUrl = form.image;
      if (imageFile) { const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`); const snapshot = await uploadBytes(storageRef, imageFile); imageUrl = await getDownloadURL(snapshot.ref); }
      const productData = { name: form.name, description: form.description, price: Number(form.price), category: form.category, stock: Number(form.stock), image: imageUrl, rating: existing?.rating || 0, reviews: existing?.reviews || [], updatedAt: new Date().toISOString() };
      if (editId) { await updateDoc(doc(db, 'products', editId), productData); toast.success('Product updated!'); }
      else { productData.createdAt = new Date().toISOString(); await addDoc(collection(db, 'products'), productData); toast.success('Product added!'); }
      navigate('/admin/products');
    } catch { toast.error('Failed to save. Make sure Firebase is configured.'); }
    setLoading(false);
  }

  const inputClass = "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-400 mb-6 transition-colors"><FiArrowLeft size={16} /> Back</button>
      <h1 className="text-3xl font-bold text-white mb-8">{editId ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
        <div className="space-y-6">
          <div><label className="block text-sm font-medium text-gray-400 mb-1">Product Name *</label><input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="e.g., Wireless Headphones" className={inputClass} /></div>
          <div><label className="block text-sm font-medium text-gray-400 mb-1">Description</label><textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Product description..." className={`${inputClass} resize-none`} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-400 mb-1">Price (₹) *</label><input type="number" name="price" value={form.price} onChange={handleChange} required min="0" placeholder="999" className={inputClass} /></div>
            <div><label className="block text-sm font-medium text-gray-400 mb-1">Stock *</label><input type="number" name="stock" value={form.stock} onChange={handleChange} required min="0" placeholder="50" className={inputClass} /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-400 mb-1">Category</label><select name="category" value={form.category} onChange={handleChange} className={inputClass}><option>Electronics</option><option>Clothing</option><option>Home</option><option>Books</option></select></div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Product Image</label>
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-emerald-500/40 transition-colors">
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer"><FiUpload size={24} className="mx-auto text-gray-500 mb-2" /><p className="text-sm text-gray-500">{imageFile ? imageFile.name : 'Click to upload image'}</p></label>
            </div>
            {form.image && !imageFile && (<div className="mt-3"><p className="text-xs text-gray-500 mb-1">Current image:</p><img src={form.image} alt="preview" className="w-20 h-20 object-cover rounded-lg" /></div>)}
          </div>
          <div><label className="block text-sm font-medium text-gray-400 mb-1">Or Image URL</label><input type="url" name="image" value={form.image} onChange={handleChange} placeholder="https://example.com/image.jpg" className={inputClass} /></div>
          <button type="submit" disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-600/20">
            {loading ? 'Saving...' : <><FiSave /> {editId ? 'Update Product' : 'Add Product'}</>}
          </button>
        </div>
      </form>
    </div>
  );
}
