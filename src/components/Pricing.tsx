'use client';

import React from 'react';
import Link from 'next/link';

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Pricing</h2>
          <p className="section-subtitle">
            Simple, transparent pricing. No subscriptions. No hidden fees.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-darkLight rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:p-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Custom AI Model</h3>
              
              <div className="mt-6">
                <p className="flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold text-white">$9</span>
                  <span className="ml-1 text-xl text-gray-400">USD</span>
                </p>
                <p className="text-gray-400 mt-1">One-time payment</p>
              </div>
              
              <ul className="mt-10 space-y-4 text-left">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-300">Train your personal AI model</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-300">Upload 10-15 photos</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-300">Training complete in ~10 minutes</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-300">Unlimited model access</span>
                </li>
              </ul>
              
              <div className="mt-12">
                <Link
                  href="/auth/signin"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-all"
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