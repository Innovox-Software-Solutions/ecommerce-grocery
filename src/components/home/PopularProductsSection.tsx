'use client';

import React from 'react';
import ProductCard from '../ui/ProductCard';

const PRODUCTS = [
  { id: 1, name: 'Fresh Red Tomato', weight: '500g', price: 45, originalPrice: 60, image: '/images/tomato.png', rating: 4.8, bgColor: '#EAE3D2', category: 'Organic Veg' },
  { id: 2, name: 'Organic Cabbage', weight: '1kg', price: 35, originalPrice: 50, image: '/images/cabbage.png', rating: 4.5, bgColor: '#D8E2DC', category: 'Organic Veg' },
  { id: 3, name: 'Fresh Cauliflower', weight: '1pc', price: 40, originalPrice: 55, image: '/images/cauliflower.png', rating: 4.7, bgColor: '#E9EDC9', category: 'Organic Veg' },
  { id: 4, name: 'Red Chili', weight: '200g', price: 25, originalPrice: 35, image: '/images/chili.png', rating: 4.9, bgColor: '#F0EAD6', category: 'Fresh Meat' },
  { id: 5, name: 'Purple Eggplant', weight: '500g', price: 30, originalPrice: 45, image: '/images/eggplant.png', rating: 4.4, bgColor: '#F5F1E8', category: 'Organic Veg' },
  { id: 6, name: 'Fresh Cucumber', weight: '1kg', price: 28, originalPrice: 40, image: '/images/cucumber.png', rating: 4.6, bgColor: '#EBE6D9', category: 'Organic Veg' },
  { id: 7, name: 'Red Bell Pepper', weight: '500g', price: 80, originalPrice: 100, image: '/images/pepper.png', rating: 4.8, bgColor: '#EAE3D2', category: 'Organic Veg' },
  { id: 8, name: 'Green Lettuce', weight: '250g', price: 45, originalPrice: 65, image: '/images/lettuce.png', rating: 4.7, bgColor: '#D8E2DC', category: 'Organic Veg' },
];

export default function PopularProductsSection() {
  const [allProducts, setAllProducts] = React.useState(PRODUCTS);
  const [displayProducts, setDisplayProducts] = React.useState(PRODUCTS);
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const saved = localStorage.getItem('products_store');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllProducts(parsed);
          setDisplayProducts(parsed);
        }
      } catch (e) {
        console.error('Failed to load products', e);
      }
    }

    const handleSearch = (e: any) => setSearchTerm(e.detail || '');
    const handleCategory = (e: any) => setActiveCategory(e.detail || 'All');

    window.addEventListener('search-update', handleSearch);
    window.addEventListener('category-update', handleCategory);
    
    return () => {
      window.removeEventListener('search-update', handleSearch);
      window.removeEventListener('category-update', handleCategory);
    };
  }, []);

  React.useEffect(() => {
    let filtered = allProducts;
    
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setDisplayProducts(filtered);
  }, [searchTerm, activeCategory, allProducts]);

  return (
    <section id="products" className="section-padding">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              fontWeight: '800', 
              fontFamily: 'var(--font-heading)',
              color: 'var(--primary)',
              marginBottom: '15px' 
            }}>Popular Products</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '1.1rem' }}>Our most loved fresh picks this week</p>
          </div>
          <button style={{ 
            color: 'var(--primary)', 
            fontWeight: '700', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }} className="hover-underline">
            View All Products
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
