'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function QuantitySelector() {
  const [count, setCount] = useState(1);

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '50px',
      padding: '4px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      border: '1px solid #E5E7EB'
    }}>
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => setCount(Math.max(1, count - 1))}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: '#F3F4F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#374151'
        }}
      >
        <Minus size={14} />
      </motion.button>

      <div style={{
        width: '40px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '16px',
        overflow: 'hidden',
        position: 'relative',
        height: '24px'
      }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ display: 'block' }}
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => setCount(count + 1)}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: '#16A34A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white'
        }}
      >
        <Plus size={14} />
      </motion.button>
    </div>
  );
}
