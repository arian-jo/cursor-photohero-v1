'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ModelTraining from '@/components/ModelTraining';
import { useAuthContext } from '@/context/AuthContext';

export default function TrainPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  // Protect this page - only authenticated users can access
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // This will be redirected by the useEffect hook
  }

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Train Your Custom AI Model</h1>
          
          <div className="mb-8 text-center">
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Upload 4-15 photos of yourself or your subject. Our AI will analyze them and create a custom model trained specifically on your images.
            </p>
          </div>
          
          <ModelTraining />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
