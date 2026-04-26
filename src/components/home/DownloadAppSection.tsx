'use client';

import React from 'react';
import { Apple, PlayCircle } from 'lucide-react';

export default function DownloadAppSection() {
  return (
    <section id="app" className="section-padding">
      <div className="container">
        <div style={{ 
          backgroundColor: '#F0FDF4', 
          borderRadius: 'var(--radius-lg)', 
          padding: '80px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '30px'
        }}>
          <h2 style={{ fontSize: '2.5rem', maxWidth: '600px' }}>Download Our Mobile App for Better Experience</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px' }}>
            Get exclusive offers, faster checkout, and real-time order tracking on your mobile device. Available on both App Store and Google Play.
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            <button className="download-btn">
              <Apple size={24} />
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '10px', display: 'block', opacity: '0.8' }}>Download on the</span>
                <span style={{ fontSize: '18px', fontWeight: '700' }}>App Store</span>
              </div>
            </button>
            
            <button className="download-btn">
              <PlayCircle size={24} />
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '10px', display: 'block', opacity: '0.8' }}>GET IT ON</span>
                <span style={{ fontSize: '18px', fontWeight: '700' }}>Google Play</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .download-btn {
          background-color: var(--text-main);
          color: white;
          padding: 12px 24px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 15px;
          transition: var(--transition);
        }
        .download-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  );
}
