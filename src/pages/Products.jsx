import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import { SlidersHorizontal } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter by search term
    let result = products;
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = products.filter(product => 
        product.name.toLowerCase().includes(lowercasedSearch)
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, products]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full">
              <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;
