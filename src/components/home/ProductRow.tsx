'use client';

import React from 'react';
import ProductCard from '../ui/ProductCard';

const PRODUCTS = [
  { id: 101, name: 'Fresh Red Tomato', weight: '500g', price: 45, originalPrice: 60, image: '/images/tomato.png', rating: 4.8, bgColor: '#EAE3D2' },
  { id: 102, name: 'Organic Cabbage', weight: '1kg', price: 35, originalPrice: 50, image: '/images/cabbage.png', rating: 4.5, bgColor: '#D8E2DC' },
  { id: 103, name: 'Fresh Cauliflower', weight: '1pc', price: 40, originalPrice: 55, image: '/images/cauliflower.png', rating: 4.7, bgColor: '#E9EDC9' },
  { id: 104, name: 'Red Chili', weight: '200g', price: 25, originalPrice: 35, image: '/images/chili.png', rating: 4.9, bgColor: '#F0EAD6' },
];

interface ProductRowProps {
  title: string;
  description?: string;
}

export default function ProductRow({ title, description }: ProductRowProps) {
  const [displayProducts, setDisplayProducts] = React.useState(PRODUCTS);

  React.useEffect(() => {
    const saved = localStorage.getItem('products_store');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDisplayProducts(parsed.slice(0, 4));
        }
      } catch (e) {
        console.error('Failed to load products', e);
      }
    }
  }, []);

  return (
    <section className="section-padding" style={{ background: 'white', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              fontWeight: '800', 
              fontFamily: 'var(--font-heading)',
              color: 'var(--primary)',
              marginBottom: '15px' 
            }}>{title}</h2>
            {description && <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '1.1rem' }}>{description}</p>}
          </div>
          <button style={{ 
            color: 'var(--primary)', 
            fontWeight: '700', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '16px'
          }} className="hover-underline">
            View All
          </button>
        </div>

        <div className="products-grid">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
