'use client';

import React, { useState } from 'react';
import { Search, MapPin, ShoppingBag, ArrowRight, Leaf, ChevronDown, User, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    window.dispatchEvent(new CustomEvent('search-update', { detail: searchTerm }));
    const productSection = document.getElementById('products');
    if (productSection) productSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{ 
      position: 'relative', 
      padding: '180px 0 100px',
      background: 'var(--bg-main)',
      overflow: 'hidden'
    }}>
      {/* Subtle organic background decoration */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(163,147,106,0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(27,67,50,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }} />

      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', 
              fontWeight: '900', 
              fontFamily: 'var(--font-heading)',
              color: 'var(--primary)',
              lineHeight: '1.1',
              marginBottom: '10px',
              letterSpacing: '-2px'
            }}>
              Organic Groceries
            </h1>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 6vw, 4.5rem)', 
              fontWeight: '800', 
              fontFamily: 'var(--font-heading)',
              color: 'var(--accent)',
              lineHeight: '1.1',
              marginBottom: '30px',
              letterSpacing: '-1px'
            }}>
              At Your Doorstep
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px', fontWeight: '500' }}
          >
            Experience the farm-to-table luxury with hand-selected organic produce <br className="desktop-menu" /> 
            delivered fresh in just 10 minutes.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '20px', 
              marginBottom: '60px' 
            }}
          >
            <div style={{ 
              background: 'white', 
              padding: '8px', 
              borderRadius: 'var(--radius-full)', 
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: '800px',
              gap: '5px'
            }} className="search-container">
              {/* Location Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 20px', borderRight: '1px solid #eee', cursor: 'pointer' }} className="desktop-menu">
                <MapPin size={18} color="var(--accent)" />
                <span style={{ fontSize: '14px', fontWeight: '700', whiteSpace: 'nowrap' }}>New Delhi, IN</span>
                <ChevronDown size={14} />
              </div>

              {/* Input */}
              <input 
                type="text" 
                placeholder="Search fresh organic vegetables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                style={{ 
                  flex: 1, 
                  border: 'none', 
                  outline: 'none', 
                  padding: '0 20px', 
                  fontSize: '16px', 
                  fontWeight: '500',
                  minWidth: '200px'
                }}
              />

              {/* Button */}
              <button 
                onClick={handleSearch}
                style={{ 
                background: 'var(--primary)', 
                color: 'white', 
                border: 'none', 
                padding: '14px 35px', 
                borderRadius: 'var(--radius-full)', 
                fontWeight: '800', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'var(--transition)'
              }} className="search-btn">
                Search <ArrowRight size={18} />
              </button>
            </div>

            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ 
              background: 'none', 
              border: '2px solid var(--primary)', 
              color: 'var(--primary)', 
              padding: '12px 35px', 
              borderRadius: 'var(--radius-full)', 
              fontWeight: '800', 
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'var(--transition)'
            }} className="shop-now-btn">
              Shop Now
            </button>
          </motion.div>

          {/* Stat Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            marginTop: '40px'
          }}>
            {[
              { label: '50k+ Happy Customers', icon: <ShoppingBag size={24} /> },
              { label: '1000+ Fresh Products', icon: <Leaf size={24} /> },
              { label: '15+ Cities Covered', icon: <Globe size={24} /> }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (idx * 0.1) }}
                whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}
                style={{ 
                  background: 'white', 
                  padding: '25px', 
                  borderRadius: 'var(--radius-md)', 
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  textAlign: 'left',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '16px', 
                  background: 'var(--bg-main)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--primary)'
                }}>
                  {stat.icon}
                </div>
                <span style={{ fontWeight: '800', fontSize: '15px', color: 'var(--primary)' }}>{stat.label}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .search-container {
            flex-direction: column;
            border-radius: 24px !important;
            padding: 15px !important;
            gap: 15px !important;
          }
          .search-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
        .search-btn:hover { background: var(--primary-dark); }
        .shop-now-btn:hover { background: var(--primary); color: white; }
      `}</style>
    </section>
  );
}
