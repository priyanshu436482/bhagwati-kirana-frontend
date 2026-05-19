import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import ProductForm from '../components/ProductForm';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../api/axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product.");
      }
    }
  };

  const handleSubmitForm = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
      } else {
        await api.post('/products', formData);
      }
      setIsFormOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      const detailedError = err.response?.data?.error ? `: ${err.response.data.error}` : '';
      throw new Error((err.response?.data?.message || "Failed to save product") + detailedError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen w-full overflow-hidden">
      <AdminSidebar />
      
      <main className="flex-1 p-4 pb-24 md:p-8 min-w-0 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Products</h1>
          {!isFormOpen && (
            <button onClick={handleAddNew} className="btn-primary flex items-center gap-2">
              <Plus className="h-5 w-5" /> Add New Product
            </button>
          )}
        </div>

        {isFormOpen ? (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <ProductForm 
              product={editingProduct} 
              onSubmit={handleSubmitForm} 
              onCancel={() => setIsFormOpen(false)}
              isLoading={isSubmitting}
            />
          </div>
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                      <th className="px-6 py-4 font-medium border-b border-gray-100">Image</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100">Name</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100">આપણો ભાવ</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100">બજાર ભાવ</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover bg-gray-100" />
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">{product.name}</td>
                          <td className="px-6 py-4 font-bold text-primary-600">₹{product.ourPrice}</td>
                          <td className="px-6 py-4 text-gray-500">₹{product.marketPrice}</td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => handleEdit(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2"
                              title="Edit"
                            >
                              <Edit2 className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(product._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          No products found. Start by adding one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card List View */}
            <div className="space-y-4 md:hidden">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={product.image} alt={product.name} className="h-14 w-14 rounded-xl object-cover bg-gray-100 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                        <div className="mt-1 flex flex-col gap-0.5 text-xs text-gray-500">
                          <span className="font-bold text-primary-600 text-sm">આપણો ભાવ: ₹{product.ourPrice}</span>
                          <span>બજાર ભાવ: ₹{product.marketPrice}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center text-gray-500">
                  No products found. Start by adding one.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;
