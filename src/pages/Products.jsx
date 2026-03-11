// ─── Products Page (Amazon-style) ────────────────────────────────────

import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import sampleProducts, { categories } from '../data/sampleProducts';

export default function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('default');

  const handleSearch = useCallback((q) => setSearch(q), []);

  let filtered = sampleProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'All' || p.category === category;
    return matchSearch && matchCategory;
  });

  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-white">All Products</h1>
        <p className="text-gray-500 text-xs sm:text-sm">{filtered.length} results</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 mb-4 sm:mb-6">
        <SearchBar onSearch={handleSearch} />

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                category === cat
                  ? 'bg-[#FF9900] text-[#0F1111] font-bold shadow-md'
                  : 'bg-[#232F3E] text-gray-300 border border-[#37475A] hover:border-[#FF9900]/40 hover:text-[#FF9900]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="self-start px-3 py-2 bg-[#232F3E] border border-[#37475A] rounded-lg text-xs sm:text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
        >
          <option value="default">Sort by: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Avg. Customer Review</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-5xl mb-3">🔍</p>
          <h3 className="text-lg font-semibold text-gray-300 mb-1">No products found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
