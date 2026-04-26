'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';

const PASTEL_COLORS = ['#FFE0C2', '#FFD6D6', '#D6F5DF', '#E8DEFF', '#FFF5CC', '#D6EEFF'];

const PRODUCTS = [
  { id: 1, name: "Fresh Cabbage", weight: "green leaves, 1kg", price: "₹130", image: "/images/cabbage.png", badge: "15% off" },
  { id: 2, name: "Fresh Potato", weight: "organic, 500gm", price: "₹120", image: "/images/potato.png", badge: "New" },
  { id: 3, name: "Fresh Papaya", weight: "tropical fruit, 1kg", price: "₹100", image: "/images/papaya.png" },
  { id: 4, name: "Oreo Biscuit", weight: "chocolate, 280gm", price: "₹200", image: "/images/oreo.png" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
};

export default function ProductRow() {
  const [displayProducts, setDisplayProducts] = React.useState(PRODUCTS);

  React.useEffect(() => {
    const saved = localStorage.getItem('products_store');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          const formatted = parsed.slice(0, 4).map((p: any) => ({
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

  return (
    <section style={{ backgroundColor: '#FDF5EC', padding: '60px 0' }}>
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
            Featured Deals
          </h2>
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

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'flex',
            gap: 20,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {displayProducts.map((product: any, index: number) => (
            <motion.div key={product.id} variants={itemVariants}>
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
