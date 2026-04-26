'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Clock, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const mockOrders = [
  {
    id: 'ORD-89234',
    date: 'April 25, 2026',
    status: 'Processing',
    total: '₹450',
    items: [
      { name: 'Fresh Cabbage', qty: 1, image: '/images/cabbage.png' },
      { name: 'Organic Potato', qty: 2, image: '/images/potato.png' },
    ]
  },
  {
    id: 'ORD-89102',
    date: 'April 20, 2026',
    status: 'Delivered',
    total: '₹1230',
    items: [
      { name: 'Oreo Biscuit', qty: 3, image: '/images/oreo.png' },
      { name: "Perry's Ice Cream", qty: 1, image: '/images/icecream.png' },
      { name: 'Fresh Papaya', qty: 1, image: '/images/papaya.png' },
    ]
  },
  {
    id: 'ORD-88950',
    date: 'April 15, 2026',
    status: 'Delivered',
    total: '₹85',
    items: [
      { name: 'Big Pack Bundle', qty: 1, image: '/images/bundle-big.png' },
    ]
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const localOrders = JSON.parse(localStorage.getItem('orders_store') || '[]');
    setOrders([...localOrders, ...mockOrders]);
  }, []);

  return (
    <div style={{ backgroundColor: '#FDF5EC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '40px 20px' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <Link href="/" style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: 'white', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)', color: '#4B5563' 
            }}>
              <ArrowLeft size={20} />
            </Link>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>My Orders</h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '24px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}
              >
                {/* Order Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #E5E7EB', paddingBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1A1A1A', marginBottom: '4px' }}>{order.id}</h3>
                    <p style={{ color: '#6B7280', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} /> {order.date}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', margin: '0 0 6px 0' }}>{order.total}</p>
                    <span style={{ 
                      padding: '6px 12px', 
                      borderRadius: '50px', 
                      fontSize: '12px', 
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: order.status === 'Delivered' ? '#DEF7EC' : '#FEF3C7',
                      color: order.status === 'Delivered' ? '#03543F' : '#92400E'
                    }}>
                      {order.status === 'Delivered' ? <CheckCircle2 size={14} /> : <Package size={14} />}
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {order.items.map((item: any, i: number) => (
                      <div key={i} style={{ 
                        width: '60px', height: '60px', borderRadius: '12px', background: '#F3F4F6', 
                        padding: '6px', position: 'relative' 
                      }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                        <span style={{ 
                          position: 'absolute', top: '-6px', right: '-6px', 
                          background: '#1A1A1A', color: 'white', fontSize: '10px', 
                          width: '18px', height: '18px', borderRadius: '50%', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' 
                        }}>
                          {item.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <button style={{ 
                    display: 'flex', alignItems: 'center', gap: '6px', 
                    background: 'transparent', border: 'none', color: 'var(--primary)', 
                    fontWeight: '600', cursor: 'pointer', fontSize: '14px' 
                  }}>
                    View Details <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
