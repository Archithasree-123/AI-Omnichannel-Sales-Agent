import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';

const Home: React.FC = () => {
  const { products, addToCart, toggleChat } = useStore();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");

  const categories = useMemo(() => ["All", ...new Set(products.map(p => p.category))], [products]);
  const tags = useMemo(() => ["All", ...new Set(products.flatMap(p => p.tags))], [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesTag = selectedTag === "All" || product.tags.includes(selectedTag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [products, searchTerm, selectedCategory, selectedTag]);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero */}
      <div className="bg-gray-900 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-yellow-400 font-bold tracking-widest uppercase mb-4 text-sm">Agentic Mavericks Presents</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Redefining Retail,<br/> From Chat to Checkout.
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We've Got You Covered. Experience the seamless AI-powered omnichannel sales agent that follows you everywhere.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={toggleChat} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition transform shadow-lg">
              Start AI Chat
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('product-grid');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition"
            >
              Browse Collection
            </button>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div id="product-grid" className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Trending Footwear</h2>
        
        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex-1 w-full">
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search shoes by name or description..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
                <svg className="w-5 h-5 text-gray-400 absolute top-2.5 left-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             </div>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
             <div className="relative min-w-[150px]">
               <select 
                 value={selectedCategory} 
                 onChange={(e) => setSelectedCategory(e.target.value)}
                 className="w-full px-4 py-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm cursor-pointer"
               >
                  {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
               </select>
               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
               </div>
             </div>

             <div className="relative min-w-[150px]">
               <select 
                 value={selectedTag} 
                 onChange={(e) => setSelectedTag(e.target.value)}
                 className="w-full px-4 py-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm cursor-pointer"
               >
                  {tags.map(t => <option key={t} value={t}>{t === 'All' ? 'All Tags' : t}</option>)}
               </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
               </div>
             </div>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition group border border-transparent hover:border-gray-100 flex flex-col">
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-square bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  {product.tags.includes('pro') && <span className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">PRO SERIES</span>}
                </div>
                
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                    <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mt-1">{product.category}</p>
                  </div>
                  <span className="font-mono font-bold text-lg">${product.price}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.slice(0,3).map(tag => (
                        <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-wider">{tag}</span>
                    ))}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                
                <button 
                  onClick={() => addToCart(product.id, 9)} 
                  className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 mt-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <p className="text-gray-600 text-lg font-medium">No products match your filters.</p>
            <p className="text-gray-400 text-sm mb-6">Try adjusting your search or category selection.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedTag('All'); }} 
              className="px-6 py-2 bg-blue-50 text-blue-600 font-bold rounded-full hover:bg-blue-100 transition"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Powered By Section */}
      <div className="bg-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-8">Powered by India's Leading Enterprises</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-2xl font-bold text-gray-800">Hero</span>
                <span className="text-2xl font-bold text-gray-800">Aditya Birla Fashion</span>
                <span className="text-2xl font-bold text-gray-800">Mahindra Rise</span>
                <span className="text-2xl font-bold text-gray-800">TATA Capital</span>
                <span className="text-2xl font-bold text-gray-800">Asian Paints</span>
                <span className="text-2xl font-bold text-gray-800">Firstsource</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;