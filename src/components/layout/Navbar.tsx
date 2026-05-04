'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, ShoppingBag, MapPin, User, LogOut, Package, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const cartTotal = cartItems.reduce((acc, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace('₹', '')) : item.price;
    return acc + (price * (item.quantity || 1));
  }, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    
    const updateCart = () => {
      const items = JSON.parse(localStorage.getItem('cart_store') || '[]');
      setCartItems(items);
    };

    const checkAuth = () => {
      const savedUser = localStorage.getItem('user_logged_in');
      if (savedUser) setUser(JSON.parse(savedUser));
    };

    updateCart();
    checkAuth();
    window.addEventListener('cart-update', updateCart);
    window.addEventListener('auth-change', checkAuth);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cart-update', updateCart);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const updateQuantity = (id: any, delta: number) => {
    const newItems = cartItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    setCartItems(newItems);
    localStorage.setItem('cart_store', JSON.stringify(newItems));
    window.dispatchEvent(new Event('cart-update'));
  };

  const handleLogout = () => {
    localStorage.removeItem('user_logged_in');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '#products' },
    { name: 'Categories', href: '#categories' },
    { name: 'Bundles', href: '#packages' },
  ];

  return (
    <>
      <header style={{ 
        position: 'fixed', 
        top: isScrolled ? '15px' : '0', 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: isScrolled ? '0 20px' : '0'
      }}>
        {/* Floating Pill Navbar */}
        <div style={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(245, 240, 232, 0.5)',
          backdropFilter: 'blur(20px)',
          height: isScrolled ? '64px' : '90px',
          borderRadius: isScrolled ? '100px' : '0',
          boxShadow: isScrolled ? '0 15px 35px rgba(27, 67, 50, 0.1)' : 'none',
          border: isScrolled ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
          maxWidth: isScrolled ? '1100px' : '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '0 40px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: isScrolled ? '36px' : '44px', 
                height: isScrolled ? '36px' : '44px', 
                background: 'var(--primary)', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                transition: 'all 0.4s'
              }}>
                <ShoppingBag size={isScrolled ? 18 : 22} />
              </div>
              <span style={{ 
                fontSize: isScrolled ? '1.4rem' : '1.7rem', 
                fontWeight: '900', 
                color: 'var(--primary)', 
                fontFamily: 'var(--font-heading)',
                letterSpacing: '-1px',
                transition: 'all 0.4s'
              }}>eGrocery</span>
            </Link>

            {/* Desktop Center Links */}
            <div className="desktop-menu" style={{ 
              display: 'flex', 
              gap: '30px', 
              transition: 'all 0.4s'
            }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  style={{ 
                    color: 'var(--primary)', 
                    fontWeight: '700', 
                    textDecoration: 'none',
                    fontSize: '14px',
                    position: 'relative'
                  }}
                  className="nav-link"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={actionBtnStyle} className="desktop-menu">
                <Search size={20} />
              </button>
              
              <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>
                <div style={actionBtnStyle}>
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'var(--accent)',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: '800',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid white'
                    }}>
                      {cartCount}
                    </span>
                  )}
                </div>
              </div>

              {user ? (
                <div style={{ display: 'flex', gap: '10px' }} className="desktop-menu">
                  <Link href="/orders" style={actionBtnStyle}><Package size={18} /></Link>
                  <button onClick={handleLogout} style={{ ...actionBtnStyle, background: '#FEE2E2', color: '#EF4444' }}><LogOut size={18} /></button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  style={{ 
                    background: 'var(--primary)', 
                    color: 'white', 
                    padding: isScrolled ? '10px 24px' : '12px 28px', 
                    borderRadius: '100px', 
                    fontWeight: '800', 
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'var(--transition)',
                    boxShadow: '0 4px 12px rgba(27, 67, 50, 0.2)'
                  }}
                  className="desktop-menu"
                >
                  Sign In
                </Link>
              )}

              <button 
                className="mobile-menu" 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }}
                onClick={() => setIsOpen(true)}
              >
                <Menu size={28} color="var(--primary)" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(27, 67, 50, 0.4)', backdropFilter: 'blur(10px)', zIndex: 2000 }}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              style={{ 
                position: 'fixed', 
                top: 0, 
                right: 0, 
                bottom: 0, 
                width: 'min(450px, 90vw)', 
                background: 'var(--bg-main)', 
                zIndex: 2001, 
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ padding: '30px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>Your Basket ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '80px 0' }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>🛒</div>
                    <h3 style={{ fontWeight: '800', marginBottom: '10px' }}>Your basket is empty</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Add some fresh organic items to get started!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {cartItems.map((item, idx) => (
                      <div key={idx} style={{ 
                        background: 'white', 
                        padding: '15px', 
                        borderRadius: '20px', 
                        display: 'flex', 
                        gap: '15px',
                        alignItems: 'center',
                        boxShadow: 'var(--shadow-sm)'
                      }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'var(--bg-soft)', padding: '5px' }}>
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontWeight: '800', fontSize: '14px', marginBottom: '4px' }}>{item.name}</h4>
                          <p style={{ fontWeight: '900', color: 'var(--primary)' }}>{item.price}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-soft)', padding: '6px 12px', borderRadius: '12px' }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                          <span style={{ fontWeight: '800', fontSize: '14px' }}>{item.quantity || 1}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div style={{ padding: '30px', background: 'white', borderTop: '1px solid rgba(0,0,0,0.05)', borderRadius: '32px 32px 0 0', boxShadow: '0 -10px 30px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ fontWeight: '700', color: 'var(--text-muted)' }}>Total Amount</span>
                    <span style={{ fontWeight: '900', fontSize: '1.5rem', color: 'var(--primary)' }}>₹{cartTotal}</span>
                  </div>
                  <Link 
                    href="/checkout" 
                    onClick={() => setIsCartOpen(false)}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      background: 'var(--primary)', 
                      color: 'white', 
                      padding: '18px', 
                      borderRadius: '16px', 
                      fontWeight: '800', 
                      textDecoration: 'none',
                      boxShadow: 'var(--shadow-glow)'
                    }}
                  >
                    Checkout Now
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(27, 67, 50, 0.4)', backdropFilter: 'blur(10px)', zIndex: 2000 }}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              style={{ 
                position: 'fixed', 
                top: '20px', 
                right: '20px', 
                bottom: '20px', 
                width: 'min(300px, 80vw)', 
                background: 'var(--bg-main)', 
                zIndex: 2001, 
                padding: '40px',
                borderRadius: '32px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
                <button onClick={() => setIsOpen(false)} style={{ background: 'var(--bg-soft)', border: 'none', padding: '10px', borderRadius: '50%' }}><X size={24} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {navLinks.map(link => (
                  <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', textDecoration: 'none' }}>{link.name}</Link>
                ))}
                <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '10px 0' }} />
                {!user && <Link href="/login" onClick={() => setIsOpen(false)} style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent)', textDecoration: 'none' }}>Sign In</Link>}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 960px) {
          .desktop-menu { display: none !important; }
        }
        @media (min-width: 961px) {
          .mobile-menu { display: none !important; }
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: var(--accent);
          transition: 0.3s;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
}

const actionBtnStyle: React.CSSProperties = {
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  background: 'white',
  border: '1px solid rgba(0,0,0,0.03)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: '0.3s',
  color: 'var(--primary)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
};
