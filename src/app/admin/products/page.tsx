'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';

const mockProducts = [
  { id: '1', name: 'Fresh Cabbage', category: 'Vegetables', weight: '1 KG', price: 130, stock: 45, status: 'Active', image: '/images/cabbage.png' },
  { id: '2', name: "Perry's Ice Cream", category: 'Dairy', weight: '1 KG', price: 230, stock: 12, status: 'Active', image: '/images/icecream.png' },
  { id: '3', name: 'Organic Potato', category: 'Vegetables', weight: '1 KG', price: 170, stock: 89, status: 'Inactive', image: '/images/potato.png' },
  { id: '4', name: 'Oreo Biscuit', category: 'Packaged', weight: '280 GM', price: 200, stock: 150, status: 'Active', image: '/images/oreo.png' },
];

export default function ProductManagement() {
  const [products, setProducts] = useState(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', category: '', weight: '', price: '', stock: '', status: 'Active', image: ''
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem('products_store');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      localStorage.setItem('products_store', JSON.stringify(mockProducts));
    }
  }, []);

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.price) return alert("Name and price required!");

    const productToAdd = {
      id: Date.now().toString(),
      name: newProduct.name,
      category: newProduct.category || 'General',
      weight: newProduct.weight || '1 unit',
      price: Number(newProduct.price),
      stock: Number(newProduct.stock) || 0,
      status: newProduct.status,
      image: newProduct.image || '/images/papaya.png' // Default image
    };

    const updatedProducts = [productToAdd, ...products];
    setProducts(updatedProducts);
    localStorage.setItem('products_store', JSON.stringify(updatedProducts));
    
    // reset
    setNewProduct({ name: '', category: '', weight: '', price: '', stock: '', status: 'Active', image: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products_store', JSON.stringify(updatedProducts));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary)', fontWeight: '900', fontFamily: 'var(--font-heading)' }}>Product Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Manage your inventory, prices and product status.</p>
        </div>
        <button 
          style={{ 
            background: 'var(--primary)', 
            color: 'white', 
            padding: '12px 24px', 
            borderRadius: '12px', 
            border: 'none', 
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-glow)'
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          <span className="btn-label">Add New Product</span>
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden', boxShadow: 'var(--shadow-glow)' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', gap: '15px' }}>
          <div style={{ flex: '1', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input 
              type="text" 
              placeholder="Search products..." 
              style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', outline: 'none', background: 'var(--bg-main)', fontWeight: '500' }} 
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '640px' }}>
            <thead style={{ backgroundColor: 'var(--bg-soft)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <tr>
                <th style={{ padding: '16px 24px', fontWeight: '800', fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase' }}>PRODUCT NAME</th>
                <th style={{ padding: '16px 24px', fontWeight: '800', fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase' }}>CATEGORY</th>
                <th style={{ padding: '16px 24px', fontWeight: '800', fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase' }}>PRICE</th>
                <th style={{ padding: '16px 24px', fontWeight: '800', fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase' }}>STOCK</th>
                <th style={{ padding: '16px 24px', fontWeight: '800', fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase' }}>STATUS</th>
                <th style={{ padding: '16px 24px', fontWeight: '800', fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '45px', height: '45px', borderRadius: '12px', backgroundColor: 'var(--bg-soft)', overflow: 'hidden', display: 'flex', alignItems:'center', justifyContent:'center', position: 'relative', padding: '5px' }}>
                         {product.image && <OptimizedImage src={product.image} alt={product.name} fill objectFit="contain" style={{ mixBlendMode: 'multiply' }} />}
                      </div>
                      <div>
                        <p style={{ fontWeight: '800', fontSize: '14px', color: 'var(--primary)' }}>{product.name}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>{product.weight}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>{product.category}</td>
                  <td style={{ padding: '16px 24px', fontWeight: '800', fontSize: '14px', color: 'var(--primary)' }}>₹{product.price}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>{product.stock} pcs</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '6px 14px', 
                      borderRadius: '12px', 
                      fontSize: '12px', 
                      fontWeight: '800',
                      backgroundColor: product.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                      color: product.status === 'Active' ? '#065F46' : '#991B1B'
                    }}>
                      {product.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--bg-soft)', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Edit2 size={16} /></button>
                      <button style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#FEE2E2', border: 'none', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => handleDelete(product.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(31, 61, 43, 0.4)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', width: 'min(90vw, 450px)', boxShadow: 'var(--shadow-glow)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)' }}>Add Product</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><X size={24} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input type="text" placeholder="Product Name" style={modalInputStyle} value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
              <input type="text" placeholder="Category" style={modalInputStyle} value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" placeholder="Weight/Qty" style={modalInputStyle} value={newProduct.weight} onChange={e => setNewProduct({...newProduct, weight: e.target.value})} />
                <input type="number" placeholder="Price (₹)" style={modalInputStyle} value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
              </div>
              <input type="number" placeholder="Stock" style={modalInputStyle} value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
              <select style={modalInputStyle} value={newProduct.status} onChange={e => setNewProduct({...newProduct, status: e.target.value})}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input type="text" placeholder="Image URL (optional)" style={modalInputStyle} value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
              
              <button 
                onClick={handleSaveProduct}
                style={{ background: 'var(--primary-gradient)', color: 'white', padding: '18px', borderRadius: '16px', border: 'none', fontWeight: '800', marginTop: '10px', cursor: 'pointer', boxShadow: 'var(--shadow-glow)' }}>
                Save Product
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

const modalInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 18px',
  border: '1px solid rgba(31, 61, 43, 0.1)',
  borderRadius: '14px',
  background: 'var(--bg-main)',
  outline: 'none',
  fontSize: '15px',
  fontWeight: '600'
};
