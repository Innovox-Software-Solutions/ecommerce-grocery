'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  weight: string;
  price: string;
  image: string;
  badge?: string;
  bgColor: string;
}

export default function ProductCard({
  id,
  name,
  weight,
  price,
  image,
  badge,
  bgColor,
}: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    
    // Add to cart logic
    const cart = JSON.parse(localStorage.getItem('cart_store') || '[]');
    const existing = cart.find((item: any) => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, name, price, image, quantity: 1 });
    }
    localStorage.setItem('cart_store', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));

    setTimeout(() => setIsAdded(false), 2000);
  };

  const badgeColor =
    badge === 'New'
      ? '#3B82F6'
      : badge?.includes('%')
        ? '#F97316'
        : '#16A34A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        width: 190,
        borderRadius: 28,
        padding: '10px 10px 16px 10px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isHovered
          ? '0 16px 40px rgba(0,0,0,0.12)'
          : '0 4px 16px rgba(0,0,0,0.06)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
        flexShrink: 0,
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        background: '#fff',
      }}
    >
      {/* Top: Pastel Image Area (Nested with full rounded corners) */}
      <div
        style={{
          backgroundColor: bgColor,
          borderRadius: 20,
          padding: '24px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          minHeight: 140,
        }}
      >
        {/* Badge */}
        {badge && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: '#ffffff',
              padding: '4px 10px',
              borderRadius: 50,
              fontSize: 10,
              fontWeight: 800,
              zIndex: 5,
              color: '#1A1A1A',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {badge}
          </div>
        )}

        {/* Product Image */}
        <motion.img
          src={image}
          alt={name}
          animate={{ y: isHovered ? -6 : 0, scale: isHovered ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          style={{
            width: 100,
            height: 100,
            objectFit: 'contain',
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      {/* Bottom: Content Area */}
      <div
        style={{
          padding: '16px 6px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h3
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: '#1A1A1A',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {name}
          </h3>
          <p
            style={{
              fontSize: 11,
              color: '#9CA3AF',
              margin: '4px 0 0',
              fontWeight: 600,
            }}
          >
            {weight}
          </p>
        </div>

        {/* Price + Add Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 4,
          }}
        >
          <span
            style={{
              color: '#1A1A1A',
              fontWeight: 800,
              fontSize: 16,
              paddingLeft: 4,
            }}
          >
            {price}
          </span>

          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.8 }}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: isAdded ? '#15803D' : 'transparent',
              color: isAdded ? '#fff' : '#1A1A1A',
              border: isAdded ? 'none' : '1.5px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isAdded ? (
              <Check size={14} strokeWidth={3} />
            ) : (
              <Plus size={14} strokeWidth={2.5} />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
