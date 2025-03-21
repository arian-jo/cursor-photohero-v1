'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuthContext } from '@/context/AuthContext';

const UploadPage = () => {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  const [redirecting, setRedirecting] = useState(false);

  // Protect this page - only authenticated users can access
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/');
      } else {
        // Redirect to the new train page after a short delay
        setRedirecting(true);
        const redirectTimer = setTimeout(() => {
          router.push('/train');
        }, 2000);
        
        return () => clearTimeout(redirectTimer);
      }
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-darkLight rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-6">We've Updated Our Model Training Process</h1>
            
            {redirecting && (
              <div className="flex items-center justify-center mb-6">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mr-3"></div>
                <p className="text-gray-300">Redirecting you to our new training interface...</p>
              </div>
            )}
            
            <p className="text-gray-300 mb-4">
              We've improved our AI model training process to give you more control and better results.
            </p>
            
            <p className="text-gray-300 mb-6">
              You'll now be able to upload your photos directly to our new training interface where you can set custom parameters for your AI model.
            </p>
            
            <button
              onClick={() => router.push('/train')}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              Go to Training Interface
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UploadPage;