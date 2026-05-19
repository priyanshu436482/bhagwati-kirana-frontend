import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import api from '../api/axios';

const ProductForm = ({ product, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    ourPrice: '',
    marketPrice: '',
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        ourPrice: product.ourPrice,
        marketPrice: product.marketPrice,
      });
      setImagePreview(product.image);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    if (!product) {
      setImagePreview('');
    } else {
      setImagePreview(product.image);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    
    setUploading(true);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        setUploading(false);
        resolve({ url: reader.result });
      };
      reader.onerror = (error) => {
        setUploading(false);
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let imageData = null;

      if (imageFile) {
        imageData = await uploadImage();
      }

      const finalProductData = {
        name: formData.name,
        ourPrice: Number(formData.ourPrice),
        marketPrice: Number(formData.marketPrice),
        ...(imageData && { 
          image: imageData.url,
          cloudinaryPublicId: 'local-base64' // Placeholder since we don't use Cloudinary anymore
        }),
      };

      // If it's a new product and no image is uploaded
      if (!product && !imageData) {
        setError('Please upload a product image.');
        return;
      }

      await onSubmit(finalProductData);
    } catch (err) {
      setError(err.message || 'An error occurred while saving the product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g. Aashirvaad Atta 5kg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">આપણી ભાવ (₹)</label>
          <input
            type="number"
            name="ourPrice"
            required
            min="0"
            step="0.01"
            value={formData.ourPrice}
            onChange={handleChange}
            className="input-field"
            placeholder="Selling Price"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">બજાર ભાવ (₹)</label>
          <input
            type="number"
            name="marketPrice"
            required
            min="0"
            step="0.01"
            value={formData.marketPrice}
            onChange={handleChange}
            className="input-field"
            placeholder="MRP"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
        
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-500 transition-colors bg-gray-50 relative overflow-hidden">
          {imagePreview ? (
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="h-40 object-contain" />
              <button
                type="button"
                onClick={clearImage}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                  <span>Upload a file</span>
                  <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          disabled={isLoading || uploading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || uploading}
          className="btn-primary flex items-center gap-2"
        >
          {isLoading || uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {uploading ? 'Uploading Image...' : 'Saving...'}
            </>
          ) : (
            product ? 'Update Product' : 'Add Product'
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
