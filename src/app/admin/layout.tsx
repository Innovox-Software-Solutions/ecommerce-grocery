'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingCart, 
  Users, 
  Image as ImageIcon, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  ShoppingBasket
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // If it's the login page, don't show the sidebar
  if (pathname === '/admin/login') return <>{children}</>;

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'Categories', icon: <Layers size={20} />, path: '/admin/categories' },
    { name: 'Orders', icon: <ShoppingCart size={20} />, path: '/admin/orders' },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
    { name: 'Banners & Offers', icon: <ImageIcon size={20} />, path: '/admin/banners' },
    { name: 'Revenue', icon: <BarChart3 size={20} />, path: '/admin/revenue' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      {/* Sidebar Backdrop for Mobile */}
      {isSidebarOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            display: 'none' // Controlled by CSS media query
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${!isSidebarOpen ? 'closed' : ''}`} style={{ 
        width: '260px', 
        backgroundColor: 'var(--primary)', 
        color: 'rgba(255,255,255,0.7)', 
        padding: '30px 20px',
        position: 'fixed',
        height: '100vh',
        transition: 'var(--transition)',
        zIndex: '1000',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'var(--primary)', padding: '6px', borderRadius: '8px' }}>
            <ShoppingBasket size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'white' }}>AdminPanel</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                padding: '12px 16px', 
                borderRadius: '8px',
                backgroundColor: pathname === item.path ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                color: pathname === item.path ? 'var(--primary)' : 'inherit',
                fontWeight: pathname === item.path ? '600' : '400',
                transition: 'var(--transition)'
              }}
              className="nav-item"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 16px', 
            color: '#EF4444',
            width: '100%' 
          }}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content" style={{ 
        flex: '1', 
        marginLeft: isSidebarOpen ? '260px' : '0',
        transition: 'var(--transition)',
        minHeight: '100vh' 
      }}>
        {/* Header */}
        <header style={{ 
          height: '70px', 
          backgroundColor: 'white', 
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(16px, 3vw, 30px)',
          position: 'sticky',
          top: '0',
          zIndex: '99'
        }}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="toggle-btn">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: '600', fontSize: '14px' }}>Admin User</p>
              <p style={{ fontSize: '12px', color: '#6B7280' }}>Super Admin</p>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E5E7EB' }}></div>
          </div>
        </header>

        <div style={{ padding: 'clamp(16px, 3vw, 30px)' }}>
          {children}
        </div>
      </main>

      <style jsx>{`
        .closed {
          transform: translateX(-100%);
        }
        .nav-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: white;
        }
        @media (max-width: 768px) {
          .sidebar-backdrop {
            display: block !important;
          }
          aside {
            transform: ${isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
            width: min(90vw, 280px) !important;
          }
          main {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
