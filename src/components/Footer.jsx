import React from 'react';
import { Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Bhagvati Kirana</h3>
            <p className="text-sm">
              Your one-stop shop for daily household needs and groceries. We deliver quality at the best market prices.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>28, Yoginagar Society, Detroj Rd, Kadi, Gujarat 384440</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="space-y-1">
                  <span className="grid grid-cols-[130px_1fr] gap-4">
                    <span>+91 63515 06536</span>
                    <span>PRAVINBHHAI PATEL</span>
                  </span>
                  <span className="grid grid-cols-[130px_1fr] gap-4">
                    <span>+91 90161 04946</span>
                    <span>SACHIN PATEL</span>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Bhagvati Kirana. All rights reserved.
          </p>
          <a href="/admin/login" className="text-xs text-gray-600 hover:text-gray-300 transition-colors">
            Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
