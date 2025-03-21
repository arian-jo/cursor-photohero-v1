'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import { SubscriptionTier, SUBSCRIPTION_LIMITS } from '@/types/subscription';

const SubscriptionStatus: React.FC = () => {
  const { subscription } = useAuthContext();
  
  if (!subscription) {
    return (
      <div className="card-with-glow p-6">
        <p className="text-center text-gray-400">No tienes una suscripción activa</p>
      </div>
    );
  }
  
  const { planId, availableCredits, modelsCreated, currentPeriodEnd, billingCycle } = subscription;
  const limits = SUBSCRIPTION_LIMITS[planId];
  const planName = planId.charAt(0).toUpperCase() + planId.slice(1);
  const isYearly = billingCycle === 'yearly';
  
  // Format the expiration date
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(currentPeriodEnd));
  
  // Calculate credits usage percentage
  const totalCredits = limits.photoCredits;
  const usedCredits = totalCredits - availableCredits;
  const usagePercentage = Math.round((usedCredits / totalCredits) * 100);
  
  // Calculate models usage percentage
  const modelsPercentage = Math.round((modelsCreated / limits.maxModels) * 100);
  
  return (
    <div className="card-with-glow p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{planName} Plan</h3>
          <p className="text-gray-400 text-sm">
            {isYearly ? 'Anual' : 'Mensual'} • Renovación el {formattedDate}
          </p>
        </div>
        <Link
          href="/subscription"
          className="text-primary hover:text-primary-light text-sm hover:underline"
        >
          Gestionar plan
        </Link>
      </div>
      
      {/* Status pill */}
      <div className="mb-6">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
          subscription.status === 'active' 
            ? 'bg-green-900/30 text-green-400' 
            : subscription.status === 'cancelling'
              ? 'bg-yellow-900/30 text-yellow-400'
              : 'bg-red-900/30 text-red-400'
        }`}>
          {subscription.status === 'active' 
            ? 'Activa' 
            : subscription.status === 'cancelling'
              ? 'Se cancelará al finalizar el período'
              : 'Inactiva'}
        </span>
      </div>
      
      {/* Credits progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-300">Créditos disponibles</span>
          <span className="text-sm text-gray-300">
            {availableCredits} / {totalCredits}
          </span>
        </div>
        <div className="w-full bg-dark/50 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${usagePercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Models progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-300">Modelos creados</span>
          <span className="text-sm text-gray-300">
            {modelsCreated} / {limits.maxModels}
          </span>
        </div>
        <div className="w-full bg-dark/50 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              modelsPercentage > 90 ? 'bg-red-500' : 'bg-primary'
            }`}
            style={{ width: `${modelsPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-center">
        <Link 
          href="/train" 
          className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
        >
          Crear nuevo modelo
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionStatus;
