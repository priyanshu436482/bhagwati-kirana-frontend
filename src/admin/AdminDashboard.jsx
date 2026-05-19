import React, { useState, useEffect } from 'react';
import { PackageSearch, TrendingUp } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    recentProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/products');
        setStats({
          totalProducts: res.data.length,
          recentProducts: res.data.slice(0, 5) // Get latest 5
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen w-full overflow-hidden">
      <AdminSidebar />
      
      <main className="flex-1 p-4 pb-24 md:p-8 min-w-0 overflow-y-auto overflow-x-hidden">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Dashboard Overview</h1>
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="bg-primary-100 p-4 rounded-xl text-primary-600">
                  <PackageSearch className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Store Status</p>
                  <p className="text-xl font-bold text-gray-900">Active & Live</p>
                </div>
              </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900">Recently Added Products</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                      <th className="px-6 py-4 font-medium border-b border-gray-100">Product</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100">આપણો ભાવ</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100">બજાર ભાવ</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100">Discount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.recentProducts.length > 0 ? (
                      stats.recentProducts.map((product) => {
                        const discount = Math.round(((product.marketPrice - product.ourPrice) / product.marketPrice) * 100);
                        return (
                          <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 flex items-center gap-3">
                              <img src={product.image} alt={product.name} className="h-10 w-10 rounded-lg object-cover bg-gray-100" />
                              <span className="font-medium text-gray-900">{product.name}</span>
                            </td>
                            <td className="px-6 py-4 font-bold text-primary-600">₹{product.ourPrice}</td>
                            <td className="px-6 py-4 text-gray-500">₹{product.marketPrice}</td>
                            <td className="px-6 py-4">
                              <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-bold">
                                {discount}%
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                          No products added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
