'use client';

import React, { useRef } from 'react';
import { Fish, Leaf, Pill, Baby, Briefcase, Sparkles, Sprout, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Meat & Fish', icon: <Fish size={28} />, color: '#FFF1F2', stroke: '#E11D48' },
  { name: 'Vegetables', icon: <Leaf size={28} />, color: '#F0FDF4', stroke: '#16A34A' },
  { name: 'Medicine', icon: <Pill size={28} />, color: '#EFF6FF', stroke: '#2563EB' },
  { name: 'Baby Care', icon: <Baby size={28} />, color: '#FDF4FF', stroke: '#C026D3' },
  { name: 'Office', icon: <Briefcase size={28} />, color: '#F8FAFC', stroke: '#475569' },
  { name: 'Beauty', icon: <Sparkles size={28} />, color: '#FFF1F2', stroke: '#E11D48' },
  { name: 'Gardening', icon: <Sprout size={28} />, color: '#F0FDF4', stroke: '#16A34A' },
  { name: 'Meat & Fish', icon: <Fish size={28} />, color: '#FFF1F2', stroke: '#E11D48' },
];

export default function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      if (direction === 'left') {
        current.scrollBy({ left: -300, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="categories" className="section-padding bg-dot-pattern" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Shop by Category</h2>
            <p style={{ color: 'var(--text-muted)' }}>Find everything you need in one place.</p>
          </div>
          
          <div className="desktop-arrows" style={{ display: 'flex', gap: '12px' }}>
            <button className="nav-arrow glass-panel" onClick={() => scroll('left')}>
              <ChevronLeft size={20} />
            </button>
            <button className="nav-arrow btn-primary-arrow" onClick={() => scroll('right')}>
              <ChevronRight size={20} color="white" />
            </button>
          </div>
        </div>

        {/* Horizontal draggable area */}
        <div 
          ref={scrollRef}
          className="category-scroll no-scrollbar" 
          style={{ 
            display: 'flex', 
            gap: '24px', 
            overflowX: 'auto', 
            paddingBottom: '30px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {categories.map((cat, index) => (
            <motion.div 
              key={index}
              className="category-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ 
                minWidth: '140px', 
                height: '140px', 
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: 'pointer',
                scrollSnapAlign: 'start',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: cat.color,
                border: '1px solid rgba(255,255,255,0.8)'
              }}
            >
              <div 
                className="icon-wrapper"
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: cat.stroke,
                  transition: 'var(--transition)'
                }}
              >
                {cat.icon}
              </div>
              <span style={{ fontWeight: '600', fontSize: '14px', textAlign: 'center', color: 'var(--text-main)' }}>{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .nav-arrow {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          color: var(--text-main);
        }
        .nav-arrow:hover {
          background: rgba(255,255,255,1);
          transform: scale(1.05);
        }
        .btn-primary-arrow {
          background: var(--primary-gradient);
          color: white;
          border: none;
          box-shadow: var(--shadow-glow);
        }
        .btn-primary-arrow:hover {
          box-shadow: var(--shadow-glow-hover);
        }

        .category-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(22, 163, 74, 0.15), 0 0 0 2px var(--primary);
        }

        /* Hover fill effect for SVGs */
        .category-card:hover .icon-wrapper svg {
          fill: currentColor;
          transform: scale(1.1);
        }
        
        .icon-wrapper svg {
          transition: var(--transition);
        }

        @media (max-width: 768px) {
          .desktop-arrows {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
