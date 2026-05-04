'use client';

import React, { useRef } from 'react';
import { Fish, Leaf, Pill, Baby, Briefcase, Sparkles, Sprout, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Fresh Meat', icon: <Fish size={28} />, color: '#EAE3D2', stroke: '#1F3D2B' },
  { name: 'Organic Veg', icon: <Leaf size={28} />, color: '#D8E2DC', stroke: '#4A7C59' },
  { name: 'Wellness', icon: <Pill size={28} />, color: '#E9EDC9', stroke: '#1F3D2B' },
  { name: 'Baby Care', icon: <Baby size={28} />, color: '#F0EAD6', stroke: '#4A7C59' },
  { name: 'Office Pantry', icon: <Briefcase size={28} />, color: '#F5F1E8', stroke: '#1F3D2B' },
  { name: 'Beauty', icon: <Sparkles size={28} />, color: '#EAE3D2', stroke: '#4A7C59' },
  { name: 'Home Garden', icon: <Sprout size={28} />, color: '#D8E2DC', stroke: '#1F3D2B' },
  { name: 'Bakery', icon: <Fish size={28} />, color: '#EAE3D2', stroke: '#4A7C59' },
];

export default function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 400;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
          <div style={{ maxWidth: '500px' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              fontWeight: '800', 
              fontFamily: 'var(--font-heading)',
              color: 'var(--primary)',
              marginBottom: '15px' 
            }}>Shop by Category</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '1.1rem' }}>
              Handpicked categories for your healthy lifestyle.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
            <button onClick={() => scroll('left')} className="nav-btn" style={navBtnStyle}>
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="nav-btn" style={navBtnStyle}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          style={{ 
            display: 'flex', 
            gap: '24px', 
            overflowX: 'auto', 
            padding: '10px 10px 40px',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="hide-scrollbar"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -12, boxShadow: '0 20px 40px rgba(31, 61, 43, 0.1)' }}
              style={{
                flex: '0 0 auto',
                width: '160px',
                height: '200px',
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                cursor: 'pointer',
                transition: 'var(--transition)',
                boxShadow: 'var(--shadow-sm)',
                scrollSnapAlign: 'start',
                border: '1px solid rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '30px', 
                background: cat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: cat.stroke,
                boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)',
                transition: 'var(--transition)'
              }} className="cat-icon-box">
                {cat.icon}
              </div>
              <span style={{ fontWeight: '800', fontSize: '15px', color: 'var(--primary)', letterSpacing: '0.2px' }}>{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .cat-icon-box:hover {
          transform: rotate(10deg) scale(1.1);
        }
      `}</style>
    </section>
  );
}

const navBtnStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: 'white',
  border: '1px solid rgba(31, 61, 43, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'var(--transition)',
  color: 'var(--primary)',
  boxShadow: 'var(--shadow-sm)'
};
