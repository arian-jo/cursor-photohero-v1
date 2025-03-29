'use client';

import React from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const Pricing = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$19',
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
      name: 'Pro',
      price: '$49',
      isPopular: false,
      features: [
        'Take 1,000 AI Photos (credits)',
        'Create 3 AI Models per month',
        'Run "1+1" photorealistic model',
        'Medium quality photos',
        'Passable resemblance',
        'Take up to 4 photos in parallel',
        'Write your own prompts'
      ],
      includesText: 'All Starter features, plus:'
    },
    {
      name: 'Premium',
      price: '$99',
      isPopular: true,
      features: [
        'Take 3,000 AI Photos (credits)',
        'Create 10 AI Models per month',
        'Run "1+1" photorealistic model',
        'High quality photos',
        'High resemblance',
        'Take up to 8 photos in parallel',
        'Zoom out photos'
      ],
      includesText: 'All Pro features, plus:'
    },
    {
      name: 'Ultra',
      price: '$199',
      isPopular: false,
      features: [
        'Take 10,000 AI Photos (credits)',
        'Create 50 AI Models per month',
        'Run "1+1" photorealistic model',
        'Ultra-high quality photos',
        'Ultra high resemblance',
        'Take up to 16 photos in parallel',
        'Unlimited photo storage'
      ],
      includesText: 'All Premium features, plus:'
    }
  ];

  const checkIcon = (
    <svg 
      className="flex-shrink-0 h-5 w-5 text-primary float" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      style={{ filter: 'drop-shadow(0 0 3px rgba(127, 86, 217, 0.5))' }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );

  const highlightFeature = (feature: string) => {
    if (feature.includes("photorealistic model")) {
      return (
        <span>
          <span className="bg-green-800/30 text-green-300 px-2 py-0.5 rounded-md mr-1">Run "1+1"</span> 
          photorealistic model
        </span>
      );
    }
    if (feature.includes("Low quality photos")) {
      return (
        <span className="bg-yellow-800/30 text-yellow-300 px-2 py-0.5 rounded-md">Low quality photos</span>
      );
    }
    if (feature.includes("Medium quality photos")) {
      return (
        <span>Medium quality photos</span>
      );
    }
    if (feature.includes("High quality photos")) {
      return (
        <span className="bg-green-800/30 text-green-300 px-2 py-0.5 rounded-md">High quality photos</span>
      );
    }
    if (feature.includes("Ultra-high quality photos")) {
      return (
        <span>Ultra-high quality photos</span>
      );
    }
    if (feature.includes("High resemblance")) {
      return (
        <span className="bg-green-800/30 text-green-300 px-2 py-0.5 rounded-md">High resemblance</span>
      );
    }
    if (feature.includes("Zoom out photos")) {
      return (
        <span className="bg-yellow-800/30 text-yellow-300 px-2 py-0.5 rounded-md">Zoom out photos</span>
      );
    }
    
    return feature;
  };

  return (
    <section id="pricing" className="py-20 relative" style={{ background: 'var(--dark-gradient)' }}>
      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="4" fill="rgba(127, 86, 217, 0.2)" />
            </svg>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="section-title">Pricing</h2>
          <p className="section-subtitle">
            Choose the perfect plan for your AI image generation needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" ref={ref}>
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`card-with-glow ${plan.isPopular ? 'border-pulse' : ''} ${inView ? 'fade-in-up' : ''}`}
              style={{ 
                boxShadow: plan.isPopular ? '0 0 25px rgba(127, 86, 217, 0.4)' : '0 0 15px rgba(127, 86, 217, 0.2)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                transitionDelay: `${index * 0.1}s`,
                position: 'relative'
              }}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 -mt-4 text-center">
                  <span className="bg-primary text-white text-sm font-medium px-4 py-1 rounded-full shadow-lg">
                    Most popular
                  </span>
                </div>
              )}
              
              <div className="px-6 py-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-2 hover-scale inline-block">{plan.name}</h3>
                
                <div className="mt-4">
                  <p className="flex items-baseline justify-center">
                    <span 
                      className="text-4xl font-extrabold text-white hover-scale inline-block" 
                      style={{ textShadow: '0 0 15px rgba(127, 86, 217, 0.5)' }}
                    >
                      {plan.price}
                    </span>
                    <span className="ml-1 text-lg text-gray-400">per month</span>
                  </p>
                </div>

                <div className="mt-4 mb-6">
                  <Link
                    href="/payment"
                    className={`w-full ${plan.isPopular ? 'hero-button-primary' : 'hero-button-secondary'} block text-center hover-scale text-sm py-2`}
                  >
                    Subscribe →
                  </Link>
                  <p className="text-gray-500 text-xs mt-2">
                    Save with yearly (6+ months free) ✓
                  </p>
                </div>

                {plan.includesText && (
                  <p className="text-sm text-gray-400 mb-3">{plan.includesText}</p>
                )}

                <ul className="mt-4 space-y-3 text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm fade-in-up" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                      {checkIcon}
                      <span className="ml-2 text-gray-300">{highlightFeature(feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;