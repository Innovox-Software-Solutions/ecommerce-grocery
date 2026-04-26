'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Check } from 'lucide-react';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export const PrimaryButton = ({ children, onClick, className = "", icon = <ShoppingCart size={18} /> }: ButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F97316',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '50px',
        padding: '6px 32px 6px 6px',
        boxShadow: '0 8px 24px rgba(249,115,22,0.4)',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        gap: '20px'
      }}
    >
      <div style={{
        backgroundColor: 'white',
        borderRadius: '50%',
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#F97316',
        boxShadow: '2px 0 10px rgba(0,0,0,0.05)'
      }}>
        {icon}
      </div>
      <span style={{ fontSize: '1.2rem', letterSpacing: '-0.5px' }}>{children}</span>
    </motion.button>
  );
};

export const SecondaryButton = ({ children, onClick }: ButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      style={{
        padding: '12px 32px',
        borderRadius: '50px',
        border: '2px solid #16A34A',
        color: '#16A34A',
        fontWeight: '600',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.05 }
      }}
    >
      <motion.div
        variants={{
          initial: { y: '100%' },
          hover: { y: 0 }
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #16A34A, #22C55E)',
          zIndex: 0
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        variants={{
          initial: { color: '#16A34A' },
          hover: { color: '#FFFFFF' }
        }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export const AddToCartBtn = ({ onClick, isAdded = false }: { onClick?: () => void, isAdded?: boolean }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ rotate: 15 }}
      whileTap={{ scale: 1.2 }}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isAdded ? '#15803D' : '#16A34A',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'background-color 0.3s ease'
      }}
    >
      <motion.div
        animate={isAdded ? { scale: [1, 1.5, 1] } : {}}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        {isAdded ? <Check size={20} /> : <Plus size={20} />}
      </motion.div>
    </motion.button>
  );
};
