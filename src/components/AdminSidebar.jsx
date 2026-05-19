import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PackageSearch, LogOut, Home } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: PackageSearch },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Admin Panel
          </h2>
          <p className="text-gray-400 text-sm mt-1">Bhagvati Kirana</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active 
                    ? 'bg-primary-600 text-white shadow-sm' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-400'}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link 
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <Home className="h-5 w-5 text-gray-400" />
            <span className="font-medium">Go to Store</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 text-white flex justify-around items-center h-16 md:hidden z-50 shadow-lg">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full text-[10px] uppercase font-bold tracking-wider transition-colors ${
                active ? 'text-primary-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon className={`h-5 w-5 mb-0.5 ${active ? 'text-primary-400' : 'text-gray-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
        
        <Link 
          to="/"
          className="flex flex-col items-center justify-center flex-1 h-full text-[10px] uppercase font-bold tracking-wider text-gray-400 hover:text-white"
        >
          <Home className="h-5 w-5 mb-0.5 text-gray-400" />
          <span>Store</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center flex-1 h-full text-[10px] uppercase font-bold tracking-wider text-red-400 hover:text-red-300"
        >
          <LogOut className="h-5 w-5 mb-0.5" />
          <span>Logout</span>
        </button>
      </nav>
    </>
  );
};

export default AdminSidebar;
