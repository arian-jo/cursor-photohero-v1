'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { useHasActiveSubscription } from '@/context/AuthContext';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signInWithGoogle, user, loading } = useAuthContext();
  const hasActiveSubscription = useHasActiveSubscription();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Iniciar sesión con Google
      await signInWithGoogle();

      // Si el inicio de sesión es exitoso, el usuario será actualizado en el contexto
      // Ahora redirigimos a la página de suscripción
      router.push('/subscription');
      
    } catch (err: any) {
      console.error('Error during sign in:', err);
      setError(err.message || 'An error occurred during sign in');
      setIsLoading(false);
    }
  };

  const handleGetStarted = () => {
    if (user) {
      // Si el usuario ya tiene una suscripción activa, redirigir a la página de modelos
      if (hasActiveSubscription) {
        router.push('/train');
      } else {
        // Si el usuario está autenticado pero no tiene suscripción, redirigir a la página de suscripción
        router.push('/subscription');
      }
    } else {
      // Si el usuario no está autenticado, iniciar el proceso de autenticación
      handleSignIn();
    }
  };

  useEffect(() => {
    // If user is logged in, redirect to subscription page instead of payment
    if (user && !loading) {
      router.push('/subscription');
    }
  }, [user, loading, router]);

  return (
    <div className="relative overflow-hidden bg-dark">
      {/* Fondo con efecto de desplazamiento */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 to-dark"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The Ultimate AI Photo <span className="text-primary">Generation Suite</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl mb-8">
            Create stunning, personalized photos of yourself or any subject in unlimited styles. 
            Our advanced AI generates professional quality images in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <button
              onClick={handleGetStarted}
              disabled={isLoading}
              className="px-8 py-3 bg-primary text-white rounded-xl font-medium text-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center glow-button"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : user ? (
                hasActiveSubscription ? 'Go to Models' : 'Choose Plan'
              ) : (
                'Get Started'
              )}
            </button>
            
            <a
              href="#how-it-works"
              className="px-8 py-3 bg-dark border border-gray-700 text-white rounded-xl font-medium text-lg hover:bg-darkLight transition-all duration-300"
            >
              How It Works
            </a>
          </div>
          
          {error && (
            <div className="max-w-md mx-auto mb-8 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-darkLight rounded-full px-4 py-2 text-sm text-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Professional Quality
            </div>
            <div className="bg-darkLight rounded-full px-4 py-2 text-sm text-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              Unlimited Styles
            </div>
            <div className="bg-darkLight rounded-full px-4 py-2 text-sm text-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
              Privacy Protected
            </div>
            <div className="bg-darkLight rounded-full px-4 py-2 text-sm text-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Instant Generation
            </div>
          </div>
        </div>
        
        {/* Muestras de imágenes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden aspect-square shadow-lg transform transition-transform hover:scale-105">
            <Image src="/images/sample-1.jpg" alt="AI Generated Photo" fill className="object-cover" />
          </div>
          <div className="relative rounded-xl overflow-hidden aspect-square shadow-lg transform transition-transform hover:scale-105">
            <Image src="/images/sample-2.jpg" alt="AI Generated Photo" fill className="object-cover" />
          </div>
          <div className="relative rounded-xl overflow-hidden aspect-square shadow-lg transform transition-transform hover:scale-105">
            <Image src="/images/sample-3.jpg" alt="AI Generated Photo" fill className="object-cover" />
          </div>
          <div className="relative rounded-xl overflow-hidden aspect-square shadow-lg transform transition-transform hover:scale-105">
            <Image src="/images/sample-4.jpg" alt="AI Generated Photo" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;