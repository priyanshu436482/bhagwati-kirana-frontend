import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or want to place an order? We are here to help you. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Get In Touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary-50 p-3 rounded-full text-primary-600 mt-1">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Phone Numbers</h3>
                  <p className="text-gray-600 mt-1">+91 63515 06536<br/>+91 90161 04946</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-50 p-3 rounded-full text-primary-600 mt-1">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">WhatsApp Orders</h3>
                  <div className="mt-2 space-y-3">
                    <div>
                      <p className="text-gray-600">+91 63515 06536</p>
                      <a 
                        href="https://wa.me/916351506536" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block text-primary-600 font-medium hover:text-primary-700 text-sm"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                    <div>
                      <p className="text-gray-600">+91 90161 04946</p>
                      <a 
                        href="https://wa.me/919016104946" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block text-primary-600 font-medium hover:text-primary-700 text-sm"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-50 p-3 rounded-full text-primary-600 mt-1">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Visit Us</h3>
                  <p className="text-gray-600 mt-1">28, Yoginagar Society, Detroj Rd,<br />Kadi, Gujarat 384440</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-gray-200 rounded-3xl overflow-hidden min-h-[400px] relative border border-gray-100 shadow-sm flex items-center justify-center">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d458.0480504394866!2d72.32287332835153!3d23.30180776952559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c1804532dbbd9%3A0x14770ba0ad83d5cc!2sYoginagar%20Society!5e0!3m2!1sen!2sin!4v1779186697588!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
