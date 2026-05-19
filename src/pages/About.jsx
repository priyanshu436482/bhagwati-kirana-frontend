import React from 'react';
import { Shield, Clock, HeartHandshake } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">About Bhagvati Kirana</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted local provision store dedicated to bringing you the best quality groceries and daily essentials at unbeatable market prices.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Established with a vision to revolutionize the local grocery shopping experience, Bhagvati Kirana has been serving the community with dedication and trust. We understand that your family deserves the best, which is why we meticulously source our products from trusted suppliers.
              </p>
              <p>
                What started as a small neighborhood store has now embraced technology to make your shopping easier. Through our digital storefront and WhatsApp ordering system, we bridge the gap between traditional reliability and modern convenience.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-3xl h-[400px] flex items-center justify-center overflow-hidden relative">
            {/* Abstract placeholder for store image */}
            <div className="absolute inset-0 bg-primary-100 opacity-50 mix-blend-multiply"></div>
            <div className="text-center z-10 p-8">
              <h3 className="text-2xl font-bold text-primary-800 mb-2">Quality First</h3>
              <p className="text-primary-600">Always fresh, always pure.</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Transparency</h3>
            <p className="text-gray-600">We clearly display our price versus the market price so you always know exactly how much you are saving.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartHandshake className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
            <p className="text-gray-600">Your satisfaction is our priority. We are always ready to assist you and ensure a seamless shopping experience.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Convenience</h3>
            <p className="text-gray-600">Order from the comfort of your home via WhatsApp and get your daily needs sorted in minutes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
