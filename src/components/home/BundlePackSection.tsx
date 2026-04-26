'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';

const bundles = [
  { id: 1, name: 'Medium Box', image: '/images/bundle-medium.png', contents: 'Tomato, Cabbage, Oil, Cauliflower', price: 55, bgColor: '#FFE8D6' },
  { id: 2, name: 'Big Pack', image: '/images/bundle-big.png', contents: 'Tomato, Cabbage, Oil, Cauliflower', price: 85, bgColor: '#D6F5E3' },
  { id: 3, name: 'Small Pack', image: '/images/bundle-medium.png', contents: 'Tomato, Cabbage, Oil, Cauliflower', price: 35, bgColor: '#EDE0FF' },
  { id: 4, name: 'Medium Box', image: '/images/bundle-medium.png', contents: 'Tomato, Cabbage, Oil, Cauliflower', price: 55, bgColor: '#FFD6D6' },
  { id: 5, name: 'Big Pack', image: '/images/bundle-big.png', contents: 'Tomato, Cabbage, Oil, Cauliflower', price: 85, bgColor: '#FFF5CC' },
  { id: 6, name: 'Small Pack', image: '/images/bundle-medium.png', contents: 'Tomato, Cabbage, Oil, Cauliflower', price: 35, bgColor: '#D6EEFF' },
];

function BundleCard({ bundle, index }: { bundle: typeof bundles[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    setIsAdded(true);
    
    const cart = JSON.parse(localStorage.getItem('cart_store') || '[]');
    const existing = cart.find((item: any) => item.id === `bundle-${bundle.id}`);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: `bundle-${bundle.id}`, name: bundle.name, price: bundle.price, image: bundle.image, quantity: 1 });
    }
    localStorage.setItem('cart_store', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));

    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        backgroundColor: bundle.bgColor,
        borderRadius: 24,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: isHovered ? '0 16px 40px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        marginTop: 50,
        cursor: 'pointer',
        overflow: 'visible',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
    >
      {/* Image Overflow Container */}
      <div style={{
        position: 'absolute',
        top: -35,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 5,
      }}>
        <motion.img
          src={bundle.image}
          alt={bundle.name}
          animate={{ y: isHovered ? -6 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          style={{
            width: '70%',
            maxWidth: 180,
            objectFit: 'contain',
            background: 'transparent',
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      {/* Spacer for image */}
      <div style={{ height: 130 }} />

      {/* Content */}
      <div style={{ textAlign: 'center', padding: '10px 16px' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{bundle.name}</h3>
        <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.4, fontWeight: 500 }}>{bundle.contents}</p>
      </div>

      {/* Price + Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        marginTop: 'auto',
      }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#16A34A' }}>₹{bundle.price}</div>
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.85 }}
          style={{
            background: isAdded ? '#15803D' : '#16A34A',
            color: 'white',
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          {isAdded ? <Check size={18} strokeWidth={3} /> : <Plus size={22} strokeWidth={2.5} />}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function BundlePackSection() {
  return (
    <section style={{ backgroundColor: '#FDF5EC', padding: '60px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#1A1A1A' }}>Popular Bundle Pack</h2>
          <button
            style={{
              color: '#16A34A', fontWeight: 600, padding: '10px 28px',
              border: '2px solid #16A34A', borderRadius: 50,
              background: 'transparent', cursor: 'pointer', fontSize: 14,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#16A34A'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#16A34A'; }}
          >
            See All
          </button>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
          overflow: 'visible',
        }}>
          {bundles.map((bundle, index) => (
            <BundleCard key={bundle.id} bundle={bundle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
