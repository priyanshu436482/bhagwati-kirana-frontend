import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ProductManagement from './admin/ProductManagement';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* We only want Navbar and Footer on customer pages, but for simplicity we can render them conditionally or use layout routes. Let's use a simple conditional render based on route later, or a wrapper component. For now, we will add them to standard routes. */}
          
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<><Navbar /><main className="flex-grow"><Home /></main><Footer /></>} />
            <Route path="/products" element={<><Navbar /><main className="flex-grow"><Products /></main><Footer /></>} />
            <Route path="/product/:id" element={<><Navbar /><main className="flex-grow"><ProductDetails /></main><Footer /></>} />
            <Route path="/about" element={<><Navbar /><main className="flex-grow"><About /></main><Footer /></>} />
            <Route path="/contact" element={<><Navbar /><main className="flex-grow"><Contact /></main><Footer /></>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/products" element={
              <ProtectedRoute>
                <ProductManagement />
              </ProtectedRoute>
            } />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
