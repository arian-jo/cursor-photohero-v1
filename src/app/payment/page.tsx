'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PaymentPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Mock function to simulate PayPal payment
  const handlePaymentSuccess = () => {
    setLoading(true);
    // In a real app, this would process the actual payment
    console.log('Processing payment...');
    // Simulate successful payment and redirect to upload page
    setTimeout(() => {
      router.push('/upload');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-lg mx-auto bg-darkLight rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Complete Your Payment</h1>
          
          <div className="bg-dark rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-300">Custom AI Model</span>
              <span className="text-white font-medium">$9.00</span>
            </div>
            <div className="border-t border-gray-700 my-4"></div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">Total</span>
              <span className="text-white font-bold text-xl">$9.00</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* PayPal Button Mock */}
            {loading ? (
              <div className="py-3 text-center">
                <div className="animate-pulse flex space-x-4 justify-center items-center">
                  <div className="h-4 w-4 bg-primary rounded-full"></div>
                  <div className="h-4 w-4 bg-primary rounded-full"></div>
                  <div className="h-4 w-4 bg-primary rounded-full"></div>
                </div>
                <p className="mt-2 text-gray-300">Processing your payment...</p>
              </div>
            ) : (
              <button
                onClick={handlePaymentSuccess}
                className="w-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-semibold py-3 px-4 rounded-lg transition-all"
              >
                Pay with PayPal
              </button>
            )}
            
            <p className="text-center text-gray-500 text-sm">
              By completing this payment, you agree to our Terms of Service
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-2">
              What happens next?
            </p>
            <p className="text-gray-300 text-sm">
              After payment, you'll be able to upload 10-15 photos to train your AI model.
              The training process takes approximately 10 minutes.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentPage; 