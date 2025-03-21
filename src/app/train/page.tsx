'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ModelTraining from '@/components/ModelTraining';
import { useAuthContext } from '@/context/AuthContext';
import { useHasActiveSubscription } from '@/context/AuthContext';
import { useSubscriptionManagement } from '@/hooks/useSubscription';
import Link from 'next/link';

export default function TrainPage() {
  const { user, loading, subscription } = useAuthContext();
  const hasActiveSubscription = useHasActiveSubscription();
  const { checkCanCreateModel } = useSubscriptionManagement();
  const [canCreateModel, setCanCreateModel] = React.useState<boolean | null>(null);
  const router = useRouter();

  // Protect this page - only authenticated users can access
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // Check if the user can create a model
  useEffect(() => {
    if (user && hasActiveSubscription) {
      const checkModelLimit = async () => {
        const result = await checkCanCreateModel();
        setCanCreateModel(result);
      };
      checkModelLimit();
    }
  }, [user, hasActiveSubscription, checkCanCreateModel]);

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

  // If the user doesn't have an active subscription, show subscription options
  if (!hasActiveSubscription) {
    return (
      <main className="min-h-screen bg-dark">
        <Navbar />
        
        <div className="pt-28 pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-darkLight p-8 rounded-xl shadow-lg text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Subscription Required</h1>
              <p className="text-gray-300 text-lg mb-6">
                You need an active subscription to train custom AI models.
              </p>
              <Link 
                href="/subscription" 
                className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300"
              >
                View Subscription Options
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    );
  }

  // If the user has reached their model limit
  if (canCreateModel === false) {
    return (
      <main className="min-h-screen bg-dark">
        <Navbar />
        
        <div className="pt-28 pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-darkLight p-8 rounded-xl shadow-lg text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Model Limit Reached</h1>
              <p className="text-gray-300 text-lg mb-6">
                You have reached the maximum number of models allowed in your current plan ({subscription?.planId}).
                Upgrade your subscription to create more models.
              </p>
              <Link 
                href="/subscription" 
                className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300"
              >
                Upgrade Subscription
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    );
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
            
            {subscription && (
              <div className="mt-4 p-3 bg-darkLight rounded-lg inline-block">
                <p className="text-primary font-medium">
                  Your plan: <span className="capitalize">{subscription.planId}</span> • 
                  Available credits: <span className="text-white">{subscription.availableCredits}</span>
                </p>
              </div>
            )}
          </div>
          
          <ModelTraining />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
