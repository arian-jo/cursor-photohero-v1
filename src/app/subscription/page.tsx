'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuthContext } from '@/context/AuthContext';
import { useSubscriptionManagement } from '@/hooks/useSubscription';
import { SubscriptionTier, BillingCycle } from '@/types/subscription';
import SubscriptionStatus from '@/components/SubscriptionStatus';

// Subscription plan details matching pricing component
const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    monthlyText: '$19 per month',
    yearlyText: '$171 per year (save $57)',
    isPopular: false,
    features: [
      'Take 50 AI Photos (credits)',
      'Create 1 AI Model per month',
      'Run "1+1" photorealistic model',
      'Low quality photos',
      'Low resemblance',
      'Take 1 photo at a time',
      'Use any photo pack'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    monthlyText: '$49 per month',
    yearlyText: '$441 per year (save $147)',
    isPopular: false,
    features: [
      'Take 1,000 AI Photos (credits)',
      'Create 3 AI Models per month',
      'Run "1+1" photorealistic model',
      'Medium quality photos',
      'Passable resemblance',
      'Take up to 4 photos in parallel',
      'Write your own prompts'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    monthlyText: '$99 per month',
    yearlyText: '$891 per year (save $297)',
    isPopular: true,
    features: [
      'Take 3,000 AI Photos (credits)',
      'Create 10 AI Models per month',
      'Run "1+1" photorealistic model',
      'High quality photos',
      'High resemblance',
      'Take up to 8 photos in parallel',
      'Zoom out photos'
    ]
  },
  {
    id: 'ultra',
    name: 'Ultra',
    price: 199,
    monthlyText: '$199 per month',
    yearlyText: '$1,791 per year (save $597)',
    isPopular: false,
    features: [
      'Take 10,000 AI Photos (credits)',
      'Create 50 AI Models per month',
      'Run "1+1" photorealistic model',
      'Ultra-high quality photos',
      'Ultra high resemblance',
      'Take up to 16 photos in parallel',
      'Unlimited photo storage'
    ]
  }
];

const SubscriptionPage = () => {
  const router = useRouter();
  const { user, subscription } = useAuthContext();
  const { subscribe, changePlan, cancelSubscription, loading: subscriptionLoading, error: subscriptionError } = useSubscriptionManagement();
  
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  // Preseleccionar el plan actual si existe
  useEffect(() => {
    if (subscription) {
      setSelectedPlan(subscription.planId);
      setBillingCycle(subscription.billingCycle);
    }
  }, [subscription]);

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    setError(null);
  };

  const handleSubscription = async () => {
    if (!selectedPlan) {
      setError('Por favor selecciona un plan de suscripción');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Si ya tiene una suscripción, cambiar de plan
      if (subscription) {
        await changePlan(selectedPlan as SubscriptionTier, billingCycle);
        setSuccess('¡Tu plan ha sido actualizado con éxito!');
      } else {
        // Si no tiene suscripción, crear una nueva
        await subscribe(selectedPlan as SubscriptionTier, billingCycle);
        setSuccess('¡Te has suscrito con éxito!');
      }
      
      // Después de un breve retraso, redirigir a la página de entrenamiento
      setTimeout(() => {
        router.push('/train');
      }, 2000);
    } catch (err: any) {
      console.error('Error en la suscripción:', err);
      setError(err.message || 'Hubo un problema al procesar tu suscripción. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;

    if (window.confirm('¿Estás seguro de que deseas cancelar tu suscripción? Tu suscripción seguirá activa hasta el final del período de facturación actual.')) {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      try {
        await cancelSubscription();
        setSuccess('Tu suscripción ha sido cancelada. Seguirá activa hasta el final del período actual.');
      } catch (err: any) {
        console.error('Error al cancelar suscripción:', err);
        setError(err.message || 'Hubo un problema al cancelar tu suscripción. Por favor intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    }
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            {subscription ? 'Gestiona tu suscripción' : 'Elige tu plan de suscripción'}
          </h1>
          
          {/* Mostrar el estado de la suscripción actual si existe */}
          {subscription && (
            <div className="mb-10">
              <SubscriptionStatus />
            </div>
          )}
          
          <div className="flex justify-center mb-8">
            <div className="bg-darkLight rounded-full p-1 inline-flex">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  billingCycle === 'monthly' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setBillingCycle('monthly')}
              >
                Mensual
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  billingCycle === 'yearly' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setBillingCycle('yearly')}
              >
                Anual (Ahorra 25%)
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`card-with-glow cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id 
                    ? 'border-primary border-2 transform scale-105' 
                    : 'hover:scale-102'
                } ${plan.isPopular ? 'relative' : ''}`}
                onClick={() => handlePlanSelection(plan.id)}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-0 right-0 -mt-4 text-center">
                    <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                      Más popular
                    </span>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-2xl font-bold text-white mb-1">
                    {billingCycle === 'monthly' ? plan.monthlyText : plan.yearlyText}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    {billingCycle === 'yearly' && 'Ahorra con el pago anual'}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-primary flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {subscription && subscription.planId === plan.id && (
                    <div className="bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full text-center">
                      Plan actual
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {error && (
            <div className="mt-8 bg-red-900/30 border border-red-800 text-red-200 p-4 rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mt-8 bg-green-900/30 border border-green-800 text-green-200 p-4 rounded-lg">
              {success}
            </div>
          )}
          
          <div className="mt-10 flex justify-center flex-col md:flex-row gap-4">
            <button
              onClick={handleSubscription}
              disabled={loading || !selectedPlan}
              className="px-8 py-3 bg-primary text-white rounded-xl font-medium text-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                subscription 
                  ? subscription.planId === selectedPlan
                    ? 'Mantener plan actual' 
                    : 'Cambiar plan' 
                  : 'Suscribirse'
              )}
            </button>
            
            {subscription && (
              <button
                onClick={handleCancelSubscription}
                disabled={loading || subscription.status === 'cancelling'}
                className="px-8 py-3 bg-transparent border border-red-500 text-red-500 rounded-xl font-medium text-lg hover:bg-red-500/10 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {subscription.status === 'cancelling' 
                  ? 'Suscripción cancelada' 
                  : 'Cancelar suscripción'}
              </button>
            )}
          </div>
          
          <p className="mt-6 text-center text-sm text-gray-400">
            Al suscribirte, aceptas nuestros <a href="#" className="text-primary hover:underline">Términos de servicio</a> y <a href="#" className="text-primary hover:underline">Política de privacidad</a>.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SubscriptionPage;
