'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, ShoppingBag, ChevronDown, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const updateCart = () => {
      const items = JSON.parse(localStorage.getItem('cart_store') || '[]');
      setCartCount(items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0));
    };

    updateCart();
    window.addEventListener('cart-update', updateCart);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cart-update', updateCart);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '#products' },
    { name: 'Categories', href: '#categories' },
    { name: 'Bundles', href: '#packages' },
  ];

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        {/* Announcement Bar */}
        <div style={{ 
          background: 'var(--primary)', 
          color: 'white', 
          padding: '8px 0', 
          fontSize: '13px', 
          textAlign: 'center',
          fontWeight: '600'
        }} className="shimmer-bg">
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <span style={{ background: '#4ADE80', color: 'var(--primary)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '10px', fontWeight: '800' }} className="pulse">NEW</span>
            Farm fresh delivery in 10 mins!
          </div>
        </div>

        {/* Main Navbar */}
        <nav style={{
          backgroundColor: isScrolled ? 'rgba(245, 240, 232, 0.9)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(15px)' : 'none',
          height: isScrolled ? '70px' : '90px',
          borderBottom: isScrolled ? '1px solid rgba(27, 67, 50, 0.08)' : 'none',
          transition: 'var(--transition)',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                fontSize: '1.8rem', 
                fontWeight: '900', 
                color: 'var(--primary)', 
                fontFamily: 'var(--font-heading)',
                letterSpacing: '-1px'
              }}>eGrocery</span>
            </Link>

            {/* Desktop Center Links */}
            <div className="desktop-menu" style={{ display: 'flex', gap: '30px' }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  style={{ 
                    color: 'var(--primary)', 
                    fontWeight: '600', 
                    textDecoration: 'none',
                    fontSize: '15px',
                    position: 'relative'
                  }}
                  className="nav-link"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }} className="desktop-menu">
                <Search size={22} />
              </button>
              
              <div style={{ position: 'relative', cursor: 'pointer' }} className="desktop-menu">
                <ShoppingCart size={22} color="var(--primary)" />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
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
                    border: '2px solid var(--bg-main)'
                  }}>
                    {cartCount}
                  </span>
                )}
              </div>

              <Link 
                href="/login" 
                style={{ 
                  background: 'var(--primary)', 
                  color: 'white', 
                  padding: '12px 28px', 
                  borderRadius: 'var(--radius-full)', 
                  fontWeight: '700', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'var(--transition)'
                }}
                className="desktop-menu signin-btn"
              >
                Sign In
              </Link>

              <button 
                className="mobile-menu" 
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setIsOpen(true)}
              >
                <Menu size={28} color="var(--primary)" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(27, 67, 50, 0.4)', backdropFilter: 'blur(5px)', zIndex: 2000 }}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '280px', background: 'var(--bg-main)', zIndex: 2001, padding: '40px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none' }}><X size={32} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {navLinks.map(link => (
                  <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}>{link.name}</Link>
                ))}
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
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent);
          transition: var(--transition);
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .signin-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
