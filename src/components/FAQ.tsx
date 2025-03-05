'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  delay: number;
  inView: boolean;
}

const FAQItem = ({ question, answer, isActive, onClick, delay, inView }: FAQItemProps) => {
  return (
    <div 
      className="border-b border-gray-700 fade-in-up"
      style={{ 
        animationDelay: `${delay}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <button
        className="flex justify-between items-center w-full py-5 text-left group"
        onClick={onClick}
      >
        <span 
          className={`text-lg font-medium text-white transition-all duration-300 ${
            isActive ? 'text-primary' : 'group-hover:text-primary/80'
          }`} 
          style={{ 
            textShadow: isActive ? '0 0 10px rgba(127, 86, 217, 0.4)' : 'none',
          }}
        >
          {question}
        </span>
        <svg
          className={`w-5 h-5 transition-all duration-300 ${
            isActive ? 'text-primary rotate-180' : 'text-gray-400 group-hover:text-primary/80'
          }`}
          style={{ 
            filter: isActive ? 'drop-shadow(0 0 3px rgba(127, 86, 217, 0.5))' : 'none',
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isActive ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div 
          className={`pb-5 text-gray-400 faq-answer ${
            isActive ? 'open' : 'closed'
          }`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const faqItems = [
    {
      question: "What type of photos should I upload for creating my AI model?",
      answer: (
        <>
          <p>For best results, upload 10-15 photos that:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Show a variety of expressions and angles</li>
            <li>Have good lighting and clear visibility of your face</li>
            <li>Include only yourself (avoid group photos)</li>
            <li>Include a mix of close-ups and full-body shots</li>
            <li>Are high quality (at least 1080px resolution)</li>
          </ul>
        </>
      ),
    },
    {
      question: "How long does it take to create my AI model?",
      answer: "Your custom AI model will be ready in approximately 10 minutes after you upload your photos. You'll be notified when the training is complete.",
    },
    {
      question: "How much does PhotoHero cost?",
      answer: "PhotoHero costs just $9 USD as a one-time payment to train your custom AI model. After that, you'll have unlimited access to your model to generate images.",
    },
    {
      question: "What AI technology does PhotoHero use?",
      answer: "PhotoHero uses fal.ai's 'flux' models to train your custom AI model. This advanced technology allows for high-quality, personalized image generation based on your uploaded photos.",
    },
    {
      question: "How realistic will my AI photos look?",
      answer: "The quality of your AI-generated photos depends on the quality and variety of the photos you upload. With good input photos, you can expect highly realistic results that capture your likeness while allowing creative flexibility.",
    },
    {
      question: "What file formats do you accept for photos?",
      answer: "We accept JPG, PNG, and WEBP file formats for your photos. Each photo should be less than 10MB in size for optimal processing.",
    },
    {
      question: "Can I delete my data?",
      answer: "Yes, you can request to delete all your data, including your photos and trained model, at any time through your account settings or by contacting our support team.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept payments through PayPal, which supports various payment methods including credit cards, debit cards, and PayPal balance.",
    },
    {
      question: "Can I get a refund?",
      answer: "We offer refunds within 7 days of purchase if you're not satisfied with the results of your AI model. Please contact our support team to request a refund.",
    },
    {
      question: "How do I use my AI model after it's created?",
      answer: "Once your model is trained, you'll have access to a simple interface where you can enter text prompts to generate images. You can create various scenarios, styles, and settings featuring your likeness.",
    }
  ];

  return (
    <section id="faq" className="py-20 relative" style={{ background: 'var(--violet-gradient)' }}>
      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about PhotoHero
          </p>
        </div>

        <div className="card-with-glow p-8" ref={ref}>
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              delay={index * 0.1}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 