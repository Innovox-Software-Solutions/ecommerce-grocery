'use client';

import React from 'react';
import { Send, ArrowUp } from 'lucide-react';

const SocialIcon = ({ path, color }: { path: string; color: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="20" 
    height="20" 
    fill="currentColor" 
    style={{ transition: 'var(--transition)' }}
  >
    <path d={path} />
  </svg>
);

const SOCIAL_PATHS = {
  facebook: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  twitter: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  linkedin: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ 
      backgroundColor: '#0F172A', 
      color: 'white', 
      padding: '80px 0 30px',
      borderTop: '1px solid rgba(22, 163, 74, 0.2)',
      boxShadow: 'inset 0 20px 40px -20px rgba(22, 163, 74, 0.15)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Brand Logos Auto Marquee */}
        <div style={{ marginBottom: '60px' }}>
          <div className="marquee-container" style={{ padding: '20px 0' }}>
            <div className="marquee-content" style={{ animationDuration: '30s' }}>
              {[1,2,3,4,5].map((set) => (
                <div key={set} style={{ display: 'flex', gap: '80px', paddingRight: '80px' }}>
                  <span className="brand-logo">ADIDAS</span>
                  <span className="brand-logo">CORSAIR</span>
                  <span className="brand-logo">DISNEY</span>
                  <span className="brand-logo">GOOGLE</span>
                  <span className="brand-logo">MICROSOFT</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient Divider */}
          <div style={{ 
            height: '2px', 
            width: '100%', 
            background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
            opacity: 0.5,
            marginTop: '20px'
          }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px', marginBottom: '80px' }}>
          {/* About */}
          <div>
            <h4 style={{ fontSize: '1.4rem', marginBottom: '25px' }} className="text-gradient">eGrocery</h4>
            <p style={{ color: '#94A3B8', marginBottom: '25px', lineHeight: '1.6' }}>
              Your one-stop shop for fresh and organic groceries. We deliver quality at your doorstep in 10 minutes.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" className="social-icon"><SocialIcon path={SOCIAL_PATHS.facebook} color="#1877F2" /></a>
              <a href="#" className="social-icon"><SocialIcon path={SOCIAL_PATHS.twitter} color="#1DA1F2" /></a>
              <a href="#" className="social-icon"><SocialIcon path={SOCIAL_PATHS.instagram} color="#E4405F" /></a>
              <a href="#" className="social-icon"><SocialIcon path={SOCIAL_PATHS.linkedin} color="#0A66C2" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '25px' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="#" className="footer-link">Categories</a></li>
              <li><a href="#" className="footer-link">Our Packages</a></li>
              <li><a href="#" className="footer-link">Our App</a></li>
            </ul>
          </div>

          {/* Delivery */}
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '25px' }}>Delivery</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li><a href="#" className="footer-link">Shipping Policy</a></li>
              <li><a href="#" className="footer-link">Track Order</a></li>
              <li><a href="#" className="footer-link">Free Returns</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '25px' }}>Newsletter</h4>
            <p style={{ color: '#94A3B8', marginBottom: '20px' }}>Subscribe to get latest updates and offers.</p>
            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="glass-input"
              />
              <button style={{ 
                position: 'absolute', 
                right: '6px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                background: 'var(--primary-gradient)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(22, 163, 74, 0.3)'
              }}>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
          <p>© 2026 eGrocery. All rights reserved. Designed with ❤️ by Innovox.</p>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button 
        onClick={scrollToTop} 
        className="back-to-top"
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </button>

      <style jsx>{`
        .brand-logo {
          font-size: 2rem;
          font-weight: 800;
          color: white;
          opacity: 0.3;
          transition: var(--transition);
          letter-spacing: 2px;
        }
        .brand-logo:hover {
          opacity: 1;
          text-shadow: 0 0 20px rgba(255,255,255,0.5);
        }

        .footer-link {
          color: #94A3B8;
          transition: var(--transition);
        }
        .footer-link:hover {
          color: var(--primary);
          padding-left: 8px;
          text-shadow: 0 0 10px rgba(22, 163, 74, 0.4);
        }

        .social-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }
        .social-icon:hover {
          background: var(--primary-gradient);
          color: white;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(22, 163, 74, 0.4);
          border-color: transparent;
        }

        .glass-input {
          width: 100%;
          padding: 14px 50px 14px 20px;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          outline: none;
          transition: var(--transition);
        }
        .glass-input::placeholder {
          color: #64748B;
        }
        .glass-input:focus {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.2);
        }

        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--primary-gradient);
          color: white;
          display: flex;
          alignItems: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(22, 163, 74, 0.4);
          z-index: 99;
          transition: var(--transition);
        }
        .back-to-top:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(22, 163, 74, 0.6);
        }
        @media (max-width: 768px) {
          .back-to-top {
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </footer>
  );
}
