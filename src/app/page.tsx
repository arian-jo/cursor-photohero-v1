import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  );
} 