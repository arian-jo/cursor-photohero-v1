'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PayPalButton from '@/components/PayPalButton';
import { useAuthContext } from '@/context/AuthContext';

const PaymentPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    }
  }, [user, router]);

  const handlePaymentSuccess = (details: any) => {
    setLoading(true);
    console.log('Payment successful!', details);
    
    // In a real app, you would also:
    // 1. Verify the payment on your backend
    // 2. Store the payment details in your database
    // 3. Link the payment to the user account
    
    // For now, we just redirect to the upload page
    setTimeout(() => {
      router.push('/upload');
    }, 1000);
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    setPaymentError('There was a problem processing your payment. Please try again.');
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-pulse flex space-x-4 justify-center items-center">
          <div className="h-4 w-4 bg-primary rounded-full"></div>
          <div className="h-4 w-4 bg-primary rounded-full"></div>
          <div className="h-4 w-4 bg-primary rounded-full"></div>
        </div>
      </div>
    );
  }

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
              <>
                {paymentError && (
                  <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-2 rounded-lg mb-4">
                    {paymentError}
                  </div>
                )}
                <div className="bg-white rounded-lg p-4">
                  <PayPalButton 
                    amount="9.00"
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </div>
              </>
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