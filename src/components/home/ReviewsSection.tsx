'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '../ui/OptimizedImage';

const reviews = [
  {
    id: 1,
    name: 'Anjali Sharma',
    role: 'Organic Food Enthusiast',
    content: 'The quality of vegetables is amazing. They stay fresh for almost a week! Highly recommended for families who value nutrition.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=1'
  },
  {
    id: 2,
    name: 'Rahul Varma',
    role: 'Fitness Coach',
    content: 'I love their organic selection. The delivery is always on time, and the eco-friendly packaging is a huge plus for me.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=2'
  },
  {
    id: 3,
    name: 'Sneha Kapur',
    role: 'Professional Chef',
    content: 'As a chef, I am very picky about my ingredients. eGrocery never disappoints with their freshness and diverse variety.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=3'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    role: 'Tech Lead',
    content: 'The app is so smooth and the 10-minute delivery is a lifesaver when I forget to buy essentials during work.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?u=4'
  }
];

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % (reviews.length - 2));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="section-padding" style={{ background: 'var(--bg-main)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '70px', maxWidth: '700px', margin: '0 auto 70px' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: '800', 
            fontFamily: 'var(--font-heading)',
            color: 'var(--primary)',
            marginBottom: '20px' 
          }}>Trusted by thousands</h2>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '1.1rem' }}>
            Join our community of over 50,000 happy families enjoying 
            farm-fresh goodness every single day.
          </p>
        </div>

        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', overflow: 'hidden' }}>
          <AnimatePresence mode="popLayout">
            {reviews.slice(index, index + 3).map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  background: 'white',
                  padding: '40px',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-md)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  border: '1px solid rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ position: 'absolute', top: '30px', right: '40px', color: 'var(--bg-soft)', opacity: 0.5 }}>
                  <Quote size={50} />
                </div>

                <div style={{ display: 'flex', gap: '4px', color: '#F59E0B' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < review.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>

                <p style={{ 
                  fontSize: '1.15rem', 
                  lineHeight: '1.8', 
                  color: 'var(--text-main)', 
                  fontWeight: '500',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-body)'
                }}>
                  "{review.content}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '10px' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    overflow: 'hidden', 
                    border: '3px solid var(--bg-soft)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <OptimizedImage src={review.avatar} alt={review.name} width={60} height={60} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1.1rem' }}>{review.name}</h4>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{review.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
