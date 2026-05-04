'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  ShoppingBasket,
  Search,
  Bell,
  ChevronRight
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

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

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            display: 'none'
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        backgroundColor: 'var(--primary)', 
        color: 'white', 
        padding: '32px 20px',
        position: 'fixed',
        height: '100vh',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1000,
        boxShadow: '4px 0 30px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        overflowY: 'auto'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '48px', padding: '0 16px' }}>
          <div style={{ 
            width: '42px', height: '42px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '14px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            <ShoppingBasket size={22} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: '900', letterSpacing: '-0.5px' }}>eGrocery Admin</span>
        </div>

        {/* Nav Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  gap: '14px', 
                  padding: '14px 20px', 
                  borderRadius: '16px',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  borderLeft: isActive ? '4px solid var(--secondary)' : '4px solid transparent',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
                  fontWeight: isActive ? '800' : '500',
                  fontSize: '15px',
                  transition: 'var(--transition)',
                  textDecoration: 'none'
                }}
                className="nav-item"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} color="var(--secondary)" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ paddingTop: '24px', marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '14px', 
              padding: '14px 20px', width: '100%', 
              borderRadius: '16px', border: 'none', 
              background: 'rgba(239,68,68,0.1)', 
              color: '#FCA5A5', fontWeight: '700', fontSize: '15px',
              cursor: 'pointer', transition: 'var(--transition)'
            }}
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        marginLeft: isSidebarOpen ? '280px' : '0',
        transition: 'margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <header style={{ 
          height: '78px', 
          backgroundColor: 'white', 
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 99,
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{ 
                width: '42px', height: '42px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '12px', border: '1px solid #F1F5F9',
                background: 'white', cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 20px', background: '#F8FAFC', borderRadius: '14px',
              border: '1px solid #F1F5F9', width: '320px'
            }}>
              <Search size={16} color="#94A3B8" />
              <input 
                type="text" 
                placeholder="Quick search..." 
                style={{ 
                  border: 'none', outline: 'none', background: 'transparent', 
                  width: '100%', fontSize: '14px', fontWeight: '500', color: '#1E293B' 
                }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              position: 'relative', width: '42px', height: '42px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '12px', border: '1px solid #F1F5F9', cursor: 'pointer'
            }}>
              <Bell size={18} color="#64748B" />
              <span style={{ 
                position: 'absolute', top: '8px', right: '8px', 
                width: '8px', height: '8px', background: '#EF4444', 
                borderRadius: '50%', border: '2px solid white' 
              }} />
            </div>

            <div style={{ width: '1px', height: '32px', background: '#F1F5F9', margin: '0 8px' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: '800', fontSize: '14px', color: '#1E293B' }}>Admin User</p>
                <p style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Super Admin</p>
              </div>
              <div style={{ 
                width: '42px', height: '42px', borderRadius: '14px', 
                background: 'var(--primary)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '900', fontSize: '16px'
              }}>A</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: '32px', flex: 1 }}>
          {children}
        </div>
      </main>

      <style jsx>{`
        .nav-item:hover {
          background-color: rgba(255,255,255,0.08) !important;
          color: white !important;
        }
        @media (max-width: 1024px) {
          .sidebar-backdrop {
            display: block !important;
          }
          aside {
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
