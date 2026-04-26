'use client';

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import { PrimaryButton } from '../ui/Buttons';

export default function HeroSection() {
  const [placeholder, setPlaceholder] = useState('');
  const fullPlaceholder = "search 'fresh milk', 'organic eggs'...";

  // Typewriter effect logic
  useEffect(() => {
    let i = 0;
    const typingTimer = setInterval(() => {
      if (i <= fullPlaceholder.length) {
        setPlaceholder(fullPlaceholder.slice(0, i));
        i++;
      } else {
        clearInterval(typingTimer);
      }
    }, 100);
    return () => clearInterval(typingTimer);
  }, [fullPlaceholder]);

  return (
    <section style={{ 
      position: 'relative', 
      padding: '20px 0 100px',
      overflow: 'hidden',
      background: 'radial-gradient(circle at 80% -20%, #DCFCE7 0%, var(--bg-main) 70%)',
      zIndex: 1 // Lower than navbar
    }}>
      {/* Mesh Background blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '300px', height: '300px', background: '#D1FAE5', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0, opacity: 0.6 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: '#BBF7D0', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0, opacity: 0.4 }} />

      <div className="container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        flexDirection: 'row', 
        flexWrap: 'wrap-reverse',
        minHeight: '75vh',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Left Content */}
        <div style={{ flex: '1', minWidth: '350px' }}>
          <motion.div 
            initial={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="glass-panel"
            style={{ 
              padding: '40px', 
              borderRadius: 'var(--radius-lg)', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', gap: '12px', marginBottom: '25px', flexWrap: 'wrap' }}>
              <span className="badge-pill" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)' }}>#Free Delivery</span>
              <span className="badge-pill" style={{ background: '#FEF3C7', color: '#92400E', boxShadow: 'var(--shadow-gold)' }}>⭐ 4.9 Rated</span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', 
              color: 'var(--text-main)', 
              marginBottom: '20px',
              letterSpacing: '-1px'
            }}>
              Order your <br />
              <span className="text-gradient">Daily Groceries</span>
            </h1>
            
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '45px', maxWidth: '540px', lineHeight: '1.6' }}>
              Experience the future of grocery shopping with <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>10 minute delivery</span>. Fresh from the farm directly to your doorstep.
            </p>
            
            <div className="search-container" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: 'rgba(255, 255, 255, 0.65)', 
              backdropFilter: 'blur(20px)',
              padding: '8px 8px 8px 24px', 
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              maxWidth: '100%',
              border: '1px solid rgba(255,255,255,0.8)',
              transition: 'var(--transition)'
            }}>
              <div className="desktop-cat-dropdown" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid rgba(0,0,0,0.1)', paddingRight: '15px', marginRight: '10px', cursor: 'pointer' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>All Categories</span>
                <ChevronDown size={14} />
              </div>
              <Search size={20} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder={placeholder} 
                className="typewriter"
                style={{ 
                  flex: '1', 
                  border: 'none', 
                  background: 'transparent',
                  padding: '12px', 
                  fontSize: '16px', 
                  outline: 'none',
                  minWidth: '100px',
                  color: 'var(--text-main)'
                }} 
              />
              <PrimaryButton onClick={() => {}} className="desktop-search-btn">
                Search
              </PrimaryButton>
            </div>

            <div style={{ marginTop: '35px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ display: 'flex' }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid white', marginLeft: i > 1 ? '-12px' : '0', backgroundColor: '#ddd', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Trusted by <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>10,000+</span> happy customers
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Content / Image */}
        <div style={{ flex: '1', minWidth: '350px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {/* Glowing Green Circle behind Bag */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '60%',
            background: 'var(--primary-gradient)',
            borderRadius: '50%',
            filter: 'blur(70px)',
            opacity: 0.3,
            zIndex: 0
          }} />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
            style={{ position: 'relative', zIndex: '1', width: '100%', maxWidth: '650px' }}
          >
            {/* Top Right Sale Pill Badge */}
            <div style={{ 
              position: 'absolute', 
              top: '10%', 
              right: '10%', 
              background: 'white', 
              padding: '8px 20px', 
              borderRadius: '50px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              zIndex: 10,
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <span style={{ fontSize: '18px' }}>🥦</span>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#6B7280', textTransform: 'uppercase' }}>Current Offer</div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#16A34A' }}>15% OFF!</div>
              </div>
            </div>

            <div className="delivery-tag animate-float" style={{ animationDelay: '1s' }}>
              <div className="glass-panel" style={{ 
                color: 'var(--text-main)', 
                padding: '12px 24px', 
                borderRadius: '50px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                background: 'rgba(255,255,255,0.85)'
              }}>
                <div style={{ background: '#FEF2F2', padding: '6px', borderRadius: '50%', color: '#DC2626' }}>
                  <Timer size={18} />
                </div>
                <span style={{ fontWeight: '700', fontSize: '15px' }}>10 Min Delivery</span>
              </div>
            </div>
            
            <img 
              src="/images/hero.png" 
              alt="Fresh Groceries" 
              loading="eager"
              style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto', filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.1))' }}
              className="animate-float"
            />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .badge-pill {
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          display: inline-block;
          backdrop-filter: blur(10px);
        }
        .delivery-tag {
          position: absolute;
          bottom: 15%;
          left: -5%;
          z-index: 10;
        }
        .search-container:focus-within {
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.15), 0 10px 40px rgba(0,0,0,0.1) !important;
          border-color: rgba(22, 163, 74, 0.4) !important;
        }
        input.typewriter::placeholder {
          animation: blinking-cursor 1s infinite alternate;
          border-right: 2px solid;
          color: var(--text-muted);
          padding-right: 4px;
        }

        @media (max-width: 900px) {
          .delivery-tag {
            left: 0;
            bottom: 5%;
          }
          .desktop-cat-dropdown {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column-reverse;
            text-align: center;
          }
          section {
            padding: 40px 0 80px !important;
          }
          .delivery-tag {
            bottom: -20px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: fit-content;
          }
        }
      `}</style>
    </section>
  );
}
