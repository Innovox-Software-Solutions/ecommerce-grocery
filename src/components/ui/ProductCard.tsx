'use client';

import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Check, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

interface ProductCardProps {
  id: number;
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  bgColor: string;
}

export default function ProductCard({
  id,
  name,
  weight,
  price,
  originalPrice,
  image,
  rating,
  bgColor,
}: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    
    const cart = JSON.parse(localStorage.getItem('cart_store') || '[]');
    const existing = cart.find((item: any) => item.id === id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ id, name, weight, price: `₹${price}`, image, quantity: 1 });
    }
    localStorage.setItem('cart_store', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));

    setTimeout(() => setIsAdded(false), 2000);
  };

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const isLowStock = id % 3 === 0; // Mock logic for "Only X left"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)' }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(31, 61, 43, 0.03)'
      }}
      className="product-card"
    >
      {/* Badges Overlay */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 5 }}>
        {discount > 0 && (
          <div style={{ background: 'var(--primary)', color: 'white', padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontWeight: '800', letterSpacing: '0.5px' }}>
            {discount}% OFF
          </div>
        )}
        {id === 1 && (
          <div style={{ background: 'var(--accent)', color: 'var(--primary)', padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontWeight: '800' }}>
            BEST SELLER
          </div>
        )}
      </div>

      {/* Wishlist Icon */}
      <button 
        onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: isLiked ? '#FEE2E2' : 'white',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isLiked ? '#EF4444' : 'var(--primary)',
          cursor: 'pointer',
          zIndex: 5,
          boxShadow: 'var(--shadow-sm)',
          transition: 'var(--transition)'
        }}
      >
        <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
      </button>

      {/* Image Container */}
      <div style={{
        height: '160px',
        background: bgColor || 'var(--bg-soft)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <OptimizedImage 
          src={image} 
          alt={name} 
          fill 
          objectFit="contain" 
          style={{ 
            transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)',
            mixBlendMode: 'multiply'
          }} 
          className="product-img"
        />
      </div>

      {/* Product Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={14} fill="#F59E0B" color="#F59E0B" />
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)' }}>{rating}</span>
          </div>
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{weight}</span>
        </div>

        <h3 style={{ 
          fontSize: '1.05rem', 
          fontWeight: '800', 
          color: 'var(--primary)', 
          lineHeight: '1.3',
          fontFamily: 'var(--font-body)', // Body font for product names as requested
          height: '2.6rem',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>{name}</h3>

        {/* Status indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', height: '14px' }}>
          {isLowStock ? (
            <span style={{ fontSize: '11px', color: '#B45309', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Zap size={10} fill="currentColor" /> Only 4 left!
            </span>
          ) : (
            <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: '700' }}>Fresh Today</span>
          )}
        </div>

        {/* Pricing & CTA */}
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {originalPrice > price && (
              <span style={{ fontSize: '12px', color: 'var(--text-light)', textDecoration: 'line-through', fontWeight: '600' }}>₹{originalPrice}</span>
            )}
            <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-0.5px' }}>₹{price}</span>
          </div>

          <button 
            onClick={handleAddToCart}
            style={{
              height: '44px',
              padding: '0 20px',
              borderRadius: '14px',
              background: isAdded ? 'var(--success)' : 'var(--primary)',
              color: 'white',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'var(--transition)',
              fontWeight: '700',
              fontSize: '14px',
              boxShadow: isAdded ? '0 4px 12px rgba(16, 185, 129, 0.2)' : '0 4px 12px rgba(31, 61, 43, 0.1)'
            }}
          >
            {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
            {isAdded ? 'Added' : 'Add'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-card:hover .product-img {
          transform: scale(1.1);
        }
      `}</style>
    </motion.div>
  );
}
