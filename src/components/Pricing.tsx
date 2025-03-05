'use client';

import React from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const Pricing = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
            Simple, transparent pricing. No subscriptions. No hidden fees.
          </p>
        </div>

        <div className="max-w-lg mx-auto" ref={ref}>
          <div 
            className={`card-with-glow border-pulse ${inView ? 'fade-in-up' : ''}`}
            style={{ 
              boxShadow: '0 0 25px rgba(127, 86, 217, 0.4)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            <div className="px-6 py-12 sm:p-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-4 hover-scale inline-block">Custom AI Model</h3>
              
              <div className="mt-6">
                <p className="flex items-baseline justify-center">
                  <span 
                    className="text-5xl font-extrabold text-white hover-scale inline-block" 
                    style={{ textShadow: '0 0 15px rgba(127, 86, 217, 0.5)' }}
                  >
                    $9
                  </span>
                  <span className="ml-1 text-xl text-gray-400">USD</span>
                </p>
                <p className="text-gray-400 mt-1">One-time payment</p>
              </div>

              <ul className="mt-8 space-y-4">
                <li className="flex items-start fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <svg 
                    className="flex-shrink-0 h-6 w-6 text-primary float" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    style={{ filter: 'drop-shadow(0 0 3px rgba(127, 86, 217, 0.5))' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-300">Train your custom AI model</span>
                </li>
                <li className="flex items-start fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <svg 
                    className="flex-shrink-0 h-6 w-6 text-primary float" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    style={{ filter: 'drop-shadow(0 0 3px rgba(127, 86, 217, 0.5))' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-300">Ready in ~10 minutes</span>
                </li>
                <li className="flex items-start fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <svg 
                    className="flex-shrink-0 h-6 w-6 text-primary float" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    style={{ filter: 'drop-shadow(0 0 3px rgba(127, 86, 217, 0.5))' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-300">Unlimited model access</span>
                </li>
              </ul>
              
              <div className="mt-12 fade-in-up" style={{ animationDelay: '0.5s' }}>
                <Link
                  href="/auth/signin"
                  className="w-full hero-button-primary block text-center hover-scale"
                >
                  Sign Up Now
                </Link>
                <p className="text-gray-500 text-sm mt-3">
                  One-time payment to train your custom AI model. Unlimited usage afterwards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 