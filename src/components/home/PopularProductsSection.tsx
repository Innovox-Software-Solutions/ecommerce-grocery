'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ui/ProductCard';

const PASTEL_COLORS = ['#FFE0C2', '#FFD6D6', '#D6F5DF', '#E8DEFF', '#FFF5CC', '#D6EEFF'];

const products = [
  { id: 10, name: 'Fresh Cabbage', image: '/images/cabbage.png', weight: 'green leaves, 1kg', price: '₹130' },
  { id: 11, name: "Perry's Ice Cream", image: '/images/icecream.png', weight: 'vanilla, 1kg', price: '₹230', badge: 'New' },
  { id: 12, name: 'Organic Potato', image: '/images/potato.png', weight: 'farm fresh, 1kg', price: '₹170' },
  { id: 13, name: 'Fresh Bundle', image: '/images/bundle-big.png', weight: 'mixed veggies', price: '₹400', badge: 'Sale' },
  { id: 14, name: 'Oreo Biscuit', image: '/images/oreo.png', weight: 'chocolate, 280gm', price: '₹200' },
  { id: 15, name: 'Fresh Papaya', image: '/images/papaya.png', weight: 'tropical, 1kg', price: '₹100' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
  },
};

export default function PopularProductsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [displayProducts, setDisplayProducts] = React.useState(products);

  React.useEffect(() => {
    const saved = localStorage.getItem('products_store');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          const formatted = parsed.slice(0, 8).map((p: any) => ({
            id: p.id || Math.random(),
            name: p.name,
            weight: p.weight,
            price: `₹${p.price}`,
            image: p.image || '/images/cabbage.png',
            badge: p.status === 'Active' && Math.random() > 0.5 ? 'Sale' : undefined
          }));
          setDisplayProducts(formatted);
        }
      } catch (e) {
        console.error("Failed to parse products from local storage");
      }
    }
  }, []);

  const scroll = (dir: 'left' | 'right') =>
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -260 : 260,
      behavior: 'smooth',
    });

  return (
    <section style={{ backgroundColor: '#FDF5EC', padding: '60px 0', overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 40,
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1A1A1A' }}>
            Popular Products
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Arrows */}
            <button
              onClick={() => scroll('left')}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#fff',
                border: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#4B5563',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#16A34A',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(22,163,74,0.3)',
              }}
            >
              <ChevronRight size={18} />
            </button>
            <button
              style={{
                color: '#16A34A',
                fontWeight: 600,
                padding: '8px 24px',
                border: '2px solid #16A34A',
                borderRadius: 50,
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 14,
                marginLeft: 6,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#16A34A';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#16A34A';
              }}
            >
              See All
            </button>
          </div>
        </div>

        {/* Scrollable row */}
        <motion.div
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: 20,
            overflowX: 'auto',
            paddingBottom: 16,
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {displayProducts.map((product: any, index: number) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              style={{ scrollSnapAlign: 'start', flexShrink: 0 }}
            >
              <ProductCard
                {...product}
                bgColor={PASTEL_COLORS[index % PASTEL_COLORS.length]}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
