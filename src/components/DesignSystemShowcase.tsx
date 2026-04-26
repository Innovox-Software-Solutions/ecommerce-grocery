'use client';

import React from 'react';
import { PrimaryButton, SecondaryButton } from './ui/Buttons';
import ProductRow from './home/ProductRow';
import QuantitySelector from './ui/QuantitySelector';

export default function DesignSystemShowcase() {
  return (
    <section style={{ padding: '100px 0', backgroundColor: '#FDF5EC' }}>
      <div className="container">
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>
            New <span className="text-gradient">Design System</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Premium Gen-Z aesthetic with pill shapes, pastel colors, and smooth spring animations.
          </p>
        </div>

        {/* Buttons Showcase */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '40px',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          marginBottom: '80px'
        }}>
          <h3 style={{ fontSize: '1.5rem', borderBottom: '2px solid #FDF5EC', paddingBottom: '15px' }}>Buttons & Interactions</h3>
          
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '600' }}>PRIMARY CTA</span>
              <PrimaryButton onClick={() => {}}>Shop Now</PrimaryButton>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '600' }}>SECONDARY OUTLINED</span>
              <SecondaryButton onClick={() => {}}>Explore More</SecondaryButton>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '600' }}>QUANTITY SELECTOR</span>
              <QuantitySelector />
            </div>
          </div>
        </div>

        {/* Product Cards Row */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Product Card System (Scrollable)</h3>
          <ProductRow />
        </div>
      </div>
    </section>
  );
}
