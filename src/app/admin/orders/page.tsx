'use client';

import React from 'react';
import { Search, Filter, Eye, Download } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-7234', customer: 'James Bond', date: '2026-04-25', total: 120, items: 5, status: 'Delivered' },
  { id: 'ORD-7235', customer: 'Sarah Connor', date: '2026-04-25', total: 45, items: 2, status: 'Pending' },
  { id: 'ORD-7236', customer: 'John Doe', date: '2026-04-24', total: 89, items: 4, status: 'Processing' },
  { id: 'ORD-7237', customer: 'Mary Jane', date: '2026-04-24', total: 210, items: 8, status: 'Cancelled' },
];

export default function OrderManagement() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.8rem' }}>Order Management</h1>
        <button style={{ padding: '8px 16px', backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Download size={18} />
          <span>Export CSV</span>
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '15px' }}>
           <div style={{ flex: '1', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input type="text" placeholder="Search by order ID or customer..." style={{ width: '100%', padding: '10px 10px 10px 40px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none' }} />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px' }}>ORDER ID</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px' }}>CUSTOMER</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px' }}>DATE</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px' }}>ITEMS</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px' }}>TOTAL</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px' }}>STATUS</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '13px' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--primary)' }}>{order.id}</td>
                  <td style={{ padding: '16px 24px' }}>{order.customer}</td>
                  <td style={{ padding: '16px 24px' }}>{order.date}</td>
                  <td style={{ padding: '16px 24px' }}>{order.items} Items</td>
                  <td style={{ padding: '16px 24px', fontWeight: '600' }}>${order.total}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: '500',
                      backgroundColor: order.status === 'Delivered' ? '#DEF7EC' : order.status === 'Pending' ? '#FEF3C7' : order.status === 'Cancelled' ? '#FDE8E8' : '#E1EFFE',
                      color: order.status === 'Delivered' ? '#03543F' : order.status === 'Pending' ? '#92400E' : order.status === 'Cancelled' ? '#9B1C1C' : '#1E429F'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <button style={{ color: 'var(--primary)' }}><Eye size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
