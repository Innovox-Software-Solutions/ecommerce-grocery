'use client';

import React, { useState, useEffect } from 'react';
import { Send, ArrowUp, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ 
      backgroundColor: 'var(--primary)', 
      color: 'white', 
      padding: '100px 0 40px',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', marginBottom: '80px' }}>
          
          {/* Brand */}
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', fontFamily: 'var(--font-heading)', marginBottom: '25px', color: 'var(--accent)' }}>eGrocery</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '30px', lineHeight: '1.8', fontSize: '15px' }}>
              We bring the finest organic produce and grocery essentials from local farms 
              straight to your kitchen, ensuring health and quality in every bite.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {[Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="social-link" style={socialLinkStyle}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={footerTitleStyle}>Quick Links</h4>
            <ul style={footerListStyle}>
              <li><a href="#" style={footerLinkStyle}>Our Story</a></li>
              <li><a href="#" style={footerLinkStyle}>Product Categories</a></li>
              <li><a href="#" style={footerLinkStyle}>Special Bundles</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={footerTitleStyle}>Stay Connected</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
              <div style={contactItemStyle}><Mail size={16} color="var(--accent)" /> contact@egrocery.com</div>
              <div style={contactItemStyle}><Phone size={16} color="var(--accent)" /> +91 98765 43210</div>
              <div style={contactItemStyle}><MapPin size={16} color="var(--accent)" /> New Delhi, IN</div>
            </div>
            
            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                placeholder="Join our newsletter" 
                style={{
                  width: '100%',
                  padding: '15px 50px 15px 20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  outline: 'none'
                }}
              />
              <button style={{ 
                position: 'absolute', 
                right: '8px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                background: 'var(--accent)', 
                color: 'white', 
                border: 'none', 
                width: '34px', 
                height: '34px', 
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '40px', 
          textAlign: 'center',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '14px'
        }}>
          <p>© 2026 eGrocery. All rights reserved.</p>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showScroll && (
        <button 
          onClick={scrollToTop} 
          style={{ 
            position: 'fixed', 
            bottom: '40px', 
            right: '40px', 
            width: '56px', 
            height: '56px', 
            borderRadius: '50%', 
            background: 'var(--primary)', 
            color: 'white', 
            border: '2px solid var(--accent)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 1000,
            transition: 'var(--transition)'
          }}
          className="back-to-top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      <style jsx>{`
        .social-link:hover { background: var(--accent) !important; transform: translateY(-3px); }
        .back-to-top:hover { transform: scale(1.1) translateY(-5px); background: var(--primary-dark); }
      `}</style>
    </footer>
  );
}

const footerTitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  fontWeight: '800',
  marginBottom: '25px',
  fontFamily: 'var(--font-heading)'
};

const footerListStyle: React.CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const footerLinkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.6)',
  textDecoration: 'none',
  fontSize: '15px',
  transition: 'var(--transition)'
};

const socialLinkStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  background: 'rgba(255,255,255,0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  transition: 'var(--transition)'
};

const contactItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: 'rgba(255,255,255,0.8)',
  fontSize: '14px'
};
