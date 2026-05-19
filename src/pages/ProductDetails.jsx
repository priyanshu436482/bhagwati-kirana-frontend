import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError('Product not found or error loading details.');
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner /></div>;
  if (error || !product) return <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4 text-center px-4"><p className="text-xl text-red-500 font-medium">{error}</p><Link to="/products" className="btn-primary">Back to Products</Link></div>;

  const marketPrice = Number(product.marketPrice) || 0;
  const ourPrice = Number(product.ourPrice) || 0;
  const discountPercentage = marketPrice > 0 ? Math.round(((marketPrice - ourPrice) / marketPrice) * 100) : 0;

  const handleWhatsAppOrder = () => {
    const phoneNumber = "916351506536"; // Using the primary WhatsApp number
    const message = `Hello Bhagvati Kirana, I want to order ${product.name}. Our Price: ₹${product.ourPrice}. Market Price: ₹${product.marketPrice}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
 
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            
            {/* Product Image Section */}
            <div className="p-8 lg:p-12 bg-gray-50 flex items-center justify-center relative min-h-[400px]">
              {discountPercentage > 0 && (
                <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  {discountPercentage}% OFF
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-full max-h-[500px] object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Product Info Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex flex-wrap items-baseline gap-4 mb-8">
                <span className="text-4xl font-extrabold text-primary-600">₹{product.ourPrice}</span>
                <span className="text-xl text-gray-400 line-through">₹{product.marketPrice}</span>
                {discountPercentage > 0 && (
                  <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                    You save ₹{(marketPrice - ourPrice).toFixed(0)}
                  </span>
                )}
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-gray-600">
                  <ShieldCheck className="h-5 w-5 text-primary-600" />
                  <span>100% Authentic Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Truck className="h-5 w-5 text-primary-600" />
                  <span>Fast delivery directly via WhatsApp</span>
                </div>
              </div>

              <button 
                onClick={handleWhatsAppOrder}
                className="btn-whatsapp w-full sm:w-auto text-lg py-3 px-8 justify-center shadow-md hover:shadow-lg"
              >
                <MessageCircle className="h-6 w-6" />
                Order on WhatsApp
              </button>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProductDetails;
