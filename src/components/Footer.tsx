'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-darkLight py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">PhotoHero</h2>
            <p className="text-gray-400 mb-4 max-w-md">
              Create your own AI model in minutes. Upload 10-15 photos and get stunning AI-generated images personalized to you.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#how-it-works" className="text-gray-400 hover:text-white transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-400 hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} PhotoHero. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 