import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const marketPrice = Number(product.marketPrice) || 0;
  const ourPrice = Number(product.ourPrice) || 0;
  const discountPercentage = marketPrice > 0 ? Math.round(((marketPrice - ourPrice) / marketPrice) * 100) : 0;

  return (
    <Link to={`/product/${product._id}`} className="card group flex flex-col h-full bg-white relative rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-red-500 text-white text-[10px] sm:text-xs font-extrabold px-2 sm:px-2.5 py-1 rounded-lg shadow-md tracking-wider">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-2 sm:p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content Container */}
      <div className="p-3 sm:p-5 flex flex-col flex-grow">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto">
          <div className="flex flex-col gap-1 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-medium text-gray-400">બજાર ભાવ:</span>
              <span className="text-xs text-gray-400 line-through">₹{marketPrice}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-gray-900">આપણો ભાવ:</span>
              <span className="text-lg sm:text-xl font-extrabold text-primary-600">₹{ourPrice}</span>
            </div>
            {discountPercentage > 0 && (
              <div className="text-[10px] sm:text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded w-max mt-1">
                બચત ₹{(marketPrice - ourPrice).toFixed(0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
