'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthContext } from '@/context/AuthContext';
import { SUBSCRIPTION_LIMITS } from '@/types/subscription';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, subscription, signOut } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav 
      className={`fixed w-full z-20 top-0 left-0 transition-all duration-300 ${
        scrolled ? 'bg-dark/90 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 hover-scale">
              <Image 
                src="/images/photohero-logo.png" 
                alt="PhotoHero Logo" 
                width={140} 
                height={40} 
                className="h-10 w-auto"
                priority
                unoptimized
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/#pricing"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover-scale"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('pricing');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Pricing
              </Link>
              <Link
                href="/#how-it-works"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover-scale"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('how-it-works');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                How It Works
              </Link>
              <Link
                href="/#faq"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover-scale"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('faq');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                FAQ
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  {subscription && (
                    <div className="bg-darkLight rounded-full px-3 py-1 flex items-center space-x-2">
                      <span className="text-primary text-xs font-semibold capitalize">{subscription.planId}</span>
                      <div className="h-3 border-l border-gray-600"></div>
                      <span className="text-gray-300 text-xs">{subscription.availableCredits} credits</span>
                    </div>
                  )}
                  <Link
                    href="/train"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover-scale"
                  >
                    Train Model
                  </Link>
                  <div className="relative group">
                    {user.photoURL && (
                      <Image 
                        src={user.photoURL} 
                        alt={user.displayName || 'User'} 
                        width={32} 
                        height={32} 
                        className="rounded-full cursor-pointer border-2 border-transparent hover:border-primary transition-all"
                      />
                    )}
                    
                    <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-darkLight border border-gray-700 rounded-lg shadow-lg z-30">
                      <div className="p-3 border-b border-gray-700">
                        <p className="text-sm font-medium text-white">{user.displayName}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                      
                      {subscription && (
                        <div className="p-3 border-b border-gray-700">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-xs text-gray-400">Plan:</p>
                            <p className="text-xs font-medium text-primary capitalize">{subscription.planId}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-400">Credits:</p>
                            <p className="text-xs font-medium text-white">{subscription.availableCredits}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-2">
                        <Link
                          href="/subscription"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                        >
                          Manage Subscription
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-scale glow-border"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-all duration-300 hover-scale"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-dark/95 backdrop-blur-sm border-b border-gray-800">
          <Link
            href="/#pricing"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover-scale"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              const section = document.getElementById('pricing');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Pricing
          </Link>
          <Link
            href="/#how-it-works"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover-scale"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              const section = document.getElementById('how-it-works');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            How It Works
          </Link>
          <Link
            href="/#faq"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover-scale"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              const section = document.getElementById('faq');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            FAQ
          </Link>
          
          {user ? (
            <>
              {subscription && (
                <div className="px-3 py-2">
                  <div className="bg-darkLight rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400">Subscription Plan:</span>
                      <span className="text-sm font-medium text-primary capitalize">{subscription.planId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Available Credits:</span>
                      <span className="text-sm font-medium text-white">{subscription.availableCredits}</span>
                    </div>
                  </div>
                </div>
              )}
              <Link
                href="/train"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover-scale"
                onClick={() => setIsMenuOpen(false)}
              >
                Train Model
              </Link>
              <Link
                href="/subscription"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover-scale"
                onClick={() => setIsMenuOpen(false)}
              >
                Manage Subscription
              </Link>
              <div className="flex items-center space-x-2 px-3 py-2">
                {user.photoURL && (
                  <Image 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    width={28} 
                    height={28} 
                    className="rounded-full"
                  />
                )}
                <span className="text-gray-300">{user.displayName}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover-scale"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-primary hover:bg-primary/90 text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover-scale"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;