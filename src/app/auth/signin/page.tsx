'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Note: In a real app, you would initialize the Google OAuth client properly
const SignIn = () => {
  const router = useRouter();

  // Mock function to simulate Google authentication
  const handleGoogleSignIn = () => {
    // In a real app, this would use the actual Google OAuth flow
    console.log('Signing in with Google...');
    // Simulate successful authentication and redirect to payment
    setTimeout(() => {
      router.push('/payment');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto bg-darkLight rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Sign In to PhotoHero</h1>
          
          <p className="text-gray-300 mb-8 text-center">
            Create your account to get started with your custom AI model
          </p>
          
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              ></path>
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              ></path>
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              ></path>
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              ></path>
            </svg>
            Sign in with Google
          </button>
          
          <p className="text-gray-500 text-sm mt-8 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SignIn; 