'use client';

import React from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <footer className="bg-darkLight py-12 border-t border-gray-800 relative overflow-hidden">
      {/* Partículas decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <svg width="6" height="6" viewBox="0 0 6 6">
              <circle cx="3" cy="3" r="3" fill="rgba(127, 86, 217, 0.1)" />
            </svg>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <div className="col-span-1 md:col-span-2 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-bold text-white mb-4 hover-scale inline-block">PhotoHero</h2>
            <p className="text-gray-400 mb-4 max-w-md">
              Create your own AI model in minutes. Upload 10-15 photos and get stunning AI-generated images personalized to you.
            </p>
          </div>
          <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#how-it-works" className="text-gray-400 hover:text-white transition-all duration-300 hover-scale inline-block">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-400 hover:text-white transition-all duration-300 hover-scale inline-block">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-gray-400 hover:text-white transition-all duration-300 hover-scale inline-block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover-scale inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover-scale inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover-scale inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover-scale inline-block">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div 
          className="mt-12 pt-8 border-t border-gray-800 text-center fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PhotoHero. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 