'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Filter, X } from 'lucide-react';

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>Product Management</h1>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>Manage your inventory, prices and product status.</p>
        </div>
        <button className="btn-primary" style={{ borderRadius: '8px' }} onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '15px' }}>
          <div style={{ flex: '1', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input 
              type="text" 
              placeholder="Search products..." 
              style={{ width: '100%', padding: '10px 10px 10px 40px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none' }} 
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px', color: '#374151' }}>PRODUCT NAME</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px', color: '#374151' }}>CATEGORY</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px', color: '#374151' }}>PRICE</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px', color: '#374151' }}>STOCK</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px', color: '#374151' }}>STATUS</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px', color: '#374151' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#F3F4F6', overflow: 'hidden', display: 'flex', alignItems:'center', justifyContent:'center' }}>
                         {product.image && <img src={product.image} alt={product.name} style={{ width: '100%', height:'100%', objectFit: 'contain' }} />}
                      </div>
                      <div>
                        <p style={{ fontWeight: '600', fontSize: '14px' }}>{product.name}</p>
                        <p style={{ fontSize: '12px', color: '#6B7280' }}>{product.weight}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px' }}>{product.category}</td>
                  <td style={{ padding: '16px 24px', fontWeight: '600', fontSize: '14px' }}>₹{product.price}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px' }}>{product.stock} pcs</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '99px', 
                      fontSize: '12px', 
                      fontWeight: '500',
                      backgroundColor: product.status === 'Active' ? '#DEF7EC' : '#FDE8E8',
                      color: product.status === 'Active' ? '#03543F' : '#9B1C1C'
                    }}>
                      {product.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="action-icon"><Edit2 size={16} /></button>
                      <button className="action-icon" style={{ color: '#EF4444' }} onClick={() => handleDelete(product.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', width: '400px', maxWidth: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem' }}>Add Product</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="Product Name" className="modal-input" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
              <input type="text" placeholder="Category" className="modal-input" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
              <input type="text" placeholder="Weight/Quantity (e.g. 500gm)" className="modal-input" value={newProduct.weight} onChange={e => setNewProduct({...newProduct, weight: e.target.value})} />
              <input type="number" placeholder="Price (₹)" className="modal-input" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
              <input type="number" placeholder="Stock" className="modal-input" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
              <select className="modal-input" value={newProduct.status} onChange={e => setNewProduct({...newProduct, status: e.target.value})}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input type="text" placeholder="Image URL (optional)" className="modal-input" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
              
              <button 
                onClick={handleSaveProduct}
                style={{ backgroundColor: '#16A34A', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '600', marginTop: '10px' }}>
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .action-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6B7280;
          transition: var(--transition);
        }
        .action-icon:hover {
          background-color: #F9FAFB;
          border-color: #D1D5DB;
        }
        .modal-input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          outline: none;
        }
      `}</style>
    </div>
  );
}
