import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data); // Store all products
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const displayedProducts = showAll ? products : products.slice(0, 8);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTEwIDBDNC40OCAwIDAgNC40OCAwIDEwczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNS41MiAwIDEwIDB6bTAgMThDOC4wNyAxOCAzLjQyIDEzLjM1IDMuNDIgNy44MiAzLjQyIDIuMjkgOC4wNy0yLjM2IDEwLTIuMzZzNi41OCA0LjY1IDYuNTggMTAuMThTMTUuNTIgMTggMTAgMTh6IiBmaWxsPSIjRkZGRkZGIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Welcome to <span className="text-secondary-400">Bhagvati Kirana</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10">
            Your trusted neighborhood provision store. We offer the best quality daily needs at unbeatable market prices, delivered right to your door via WhatsApp.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              placeholder="Search for provision items, household items..." 
            />
            <button type="submit" className="hidden">Search</button>
          </form>

          <div className="flex justify-center gap-4">
            <Link to="/products" className="bg-white text-primary-700 hover:bg-gray-50 transition-colors font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Latest Additions</h2>
            <p className="text-gray-500 mt-2">Discover our newest high-quality products</p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {displayedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 active:scale-95 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base group"
              >
                <ShoppingBag className="h-5 w-5" />
                See More Products
                <ArrowRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </>
        )}
      </section>
      
      {/* Why Choose Us */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Shop With Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-primary-50">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">%</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">We compare our prices with the market to guarantee you the best deals and maximum savings.</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary-50">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Every product is handpicked and quality checked to ensure only the best reaches your home.</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary-50">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy WhatsApp Order</h3>
              <p className="text-gray-600">No complex checkouts. Simply browse, click the WhatsApp button, and send your order directly.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
