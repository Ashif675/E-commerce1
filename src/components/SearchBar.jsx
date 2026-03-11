// ─── Search Bar (Amazon-style) ───────────────────────────────────────

import { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ onSearch, placeholder = "Search products..." }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 bg-[#232F3E] border border-[#37475A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900] text-sm text-gray-200 placeholder-gray-500 transition-all"
      />
      {query && (
        <button onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
          <FiX size={14} />
        </button>
      )}
    </div>
  );
}
