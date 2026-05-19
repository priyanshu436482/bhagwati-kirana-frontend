import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="card group flex flex-col h-full bg-white relative">
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        
        <div className="mt-auto">
          <div className="flex flex-col gap-1 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">બજાર ભાવ:</span>
              <span className="text-sm text-gray-500">₹{product.marketPrice}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">આપણી ભાવ:</span>
              <span className="text-2xl font-bold text-gray-900">₹{product.ourPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
