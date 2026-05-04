'use client';

import React, { useState } from 'react';
import { ShoppingCart, Check, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import OptimizedImage from '../ui/OptimizedImage';

const bundles = [
  { id: 1, name: 'Daily Essential Box', image: '/images/bundle-medium.png', contents: 'Tomato, Cabbage, Oil, Cauliflower, Potatoes', price: 499, originalPrice: 650, bgColor: '#EAE3D2', label: 'POPULAR' },
  { id: 2, name: 'Premium Fruit Pack', image: '/images/bundle-big.png', contents: 'Apple, Banana, Orange, Grapes, Dragonfruit', price: 899, originalPrice: 1200, bgColor: '#D8E2DC', label: 'BEST VALUE' },
  { id: 3, name: 'Mini Fresh Pack', image: '/images/bundle-medium.png', contents: 'Tomato, Cabbage, Cauliflower', price: 299, originalPrice: 400, bgColor: '#E9EDC9', label: 'QUICK PICK' },
];

function BundleCard({ bundle, index }: { bundle: typeof bundles[0]; index: number }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    setIsAdded(true);
    const cart = JSON.parse(localStorage.getItem('cart_store') || '[]');
    cart.push({ ...bundle, quantity: 1, price: `₹${bundle.price}` });
    localStorage.setItem('cart_store', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        background: 'white',
        borderRadius: 'var(--radius-xl)',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(31, 61, 43, 0.05)'
      }}
    >
      <div style={{ 
        height: '220px', 
        background: bundle.bgColor, 
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        position: 'relative'
      }}>
        <div style={{ 
          position: 'absolute', 
          top: '15px', 
          right: '15px', 
          background: 'white', 
          color: 'var(--primary)', 
          padding: '6px 12px', 
          borderRadius: 'var(--radius-sm)', 
          fontSize: '11px', 
          fontWeight: '800',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {bundle.label}
        </div>
        <OptimizedImage src={bundle.image} alt={bundle.name} fill objectFit="contain" style={{ mixBlendMode: 'multiply' }} />
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '10px', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>{bundle.name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.6', height: '3rem', overflow: 'hidden' }}>{bundle.contents}</p>
        
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '14px', color: 'var(--text-light)', textDecoration: 'line-through', fontWeight: '600' }}>₹{bundle.originalPrice}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--primary)' }}>₹{bundle.price}</div>
          </div>
          <button 
            onClick={handleAdd}
            style={{
              padding: '16px 32px',
              borderRadius: '18px',
              background: isAdded ? 'var(--success)' : 'var(--primary)',
              color: 'white',
              border: 'none',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: 'var(--transition)',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
            {isAdded ? 'Added' : 'Add to Box'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function BundlePackSection() {
  return (
    <section id="packages" className="section-padding" style={{ background: 'var(--bg-soft)', borderRadius: '100px 100px 0 0' }}>
      <div className="container">
        <div style={{ marginBottom: '60px', textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontWeight: '800', fontSize: '14px', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '2px' }}
          >
            <Sparkles size={18} /> Curated for you
          </motion.div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '20px', fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>Exclusive Bundle Offers</h2>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Save more with our carefully curated daily essential bundles, 
            designed to keep your pantry full and your family healthy.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          {bundles.map((bundle, idx) => (
            <BundleCard key={bundle.id} bundle={bundle} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
