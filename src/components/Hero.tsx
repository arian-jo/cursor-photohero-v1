'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const FloatingParticle = ({ delay = 0 }) => {
  const style = {
    animationDelay: `${delay}s`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  };

  return (
    <div 
      className="floating-particle" 
      style={style}
    >
      <svg width="10" height="10" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="5" fill="rgba(127, 86, 217, 0.3)" />
      </svg>
    </div>
  );
};

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { signInWithGoogle, user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // If user is logged in, redirect to payment page
    if (user && !loading) {
      router.push('/payment');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    try {
      console.log('Initiating Google sign in from landing page...');
      await signInWithGoogle();
      // The redirect will happen automatically via the useEffect above
    } catch (error) {
      console.error('Error during Google sign in from landing page:', error);
    }
  };

  return (
    <section className="relative pt-28 pb-16 px-4 md:pt-36 md:pb-24 overflow-hidden" style={{ background: 'var(--dark-gradient)' }}>
      {/* Partículas decorativas */}
      {mounted && Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.2} />
      ))}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6" style={{ textShadow: '0 0 15px rgba(127, 86, 217, 0.4)' }}>
            Your Own AI Model
            <br />
            <span className="text-primary">for Just $9</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto md:mx-0 fade-in-up" style={{ animationDelay: '0.4s' }}>
            Upload 10 to 15 photos, and we&apos;ll train your custom PhotoHero AI model in about 10 minutes! Own your model and only pay for the images you generate!
          </p>
          
          <div className="flex flex-row items-center space-x-4 fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Link href="/auth/signin" className="hero-button-primary hover-scale inline-block">
              Create My Model Now
            </Link>
            
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className={`hero-button-secondary hover-scale inline-block flex items-center whitespace-nowrap ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-gray-800 rounded-full mr-2"></span>
                  Loading...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 flex-shrink-0">
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
                  Sign up with Google
                </>
              )}
            </button>
          </div>
          
          <p className="text-gray-400 mt-6 fade-in-up" style={{ animationDelay: '0.8s' }}>
            <span className="font-medium">20+ creators</span> trust PhotoHero
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="relative h-48 md:h-64 card-with-glow overflow-hidden hover-scale parallax fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Image 
                src="https://i.imgur.com/emFdCuj.jpeg"
                alt="AI Generated Portrait" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-48 md:h-64 card-with-glow overflow-hidden hover-scale parallax fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Image 
                src="https://i.imgur.com/WCK9kDd.jpeg" 
                alt="AI Generated Portrait" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="relative h-48 md:h-64 card-with-glow overflow-hidden hover-scale parallax fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Image 
                src="https://i.imgur.com/LXrLXna.jpeg" 
                alt="AI Generated Portrait" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-48 md:h-64 card-with-glow overflow-hidden hover-scale parallax fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Image 
                src="https://i.imgur.com/RZoz4wd.jpeg" 
                alt="AI Generated Portrait" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="scroll-indicator hidden md:block" />
    </section>
  );
};

export default Hero;