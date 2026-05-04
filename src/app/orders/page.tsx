'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ChevronRight, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders_store') || '[]');
    setOrders(savedOrders);
  }, []);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '10px' }}>My Orders</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Track and manage your organic deliveries</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {orders.length > 0 ? orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'white',
                borderRadius: '30px',
                padding: '30px',
                boxShadow: 'var(--shadow-glow)',
                display: 'flex',
                flexDirection: 'column',
                gap: '25px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <Package size={30} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>{order.id}</h3>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>
                        <Clock size={16} /> {order.date}
                      </span>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '50px', 
                        background: '#FEF3C7', 
                        color: '#D97706', 
                        fontSize: '12px', 
                        fontWeight: '800' 
                      }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)' }}>{order.total}</div>
                  <button style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
                    View Details <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }} className="hide-scrollbar">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} style={{ flex: '0 0 auto', width: '80px', height: '80px', background: 'var(--bg-soft)', borderRadius: '15px', padding: '10px' }}>
                    <OptimizedImage src={item.image} alt={item.name} width={60} height={60} objectFit="contain" />
                  </div>
                ))}
              </div>
            </motion.div>
          )) : (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <div style={{ width: '120px', height: '120px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', color: 'var(--primary)', boxShadow: 'var(--shadow-glow)' }}>
                <ShoppingBag size={60} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '15px' }}>No orders yet</h2>
              <Link href="/" style={{ padding: '15px 40px', background: 'var(--primary)', color: 'white', borderRadius: '15px', fontWeight: '800', textDecoration: 'none', display: 'inline-block' }}>
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function ShoppingBag({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  );
}
