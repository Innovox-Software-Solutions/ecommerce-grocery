'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, ShoppingBasket, LogOut, Heart, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    const handleAuthChange = () => setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    window.addEventListener('auth-change', handleAuthChange);
    
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart_store') || '[]');
      setCartCount(cart.reduce((acc: number, item: any) => acc + item.quantity, 0));
      setCartItems(cart);
    };
    updateCartCount();
    window.addEventListener('cart-update', updateCartCount);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('cart-update', updateCartCount);
    }
  }, []);

  const handleUpdateCartObj = (id: string, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.id === id) return { ...item, quantity: item.quantity + delta };
      return item;
    }).filter(item => item.quantity > 0);
    localStorage.setItem('cart_store', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-update'));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    router.push('/');
  };

  const handleProtectedAction = (path: string) => {
    if (isAuthenticated) {
      router.push(path);
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      {/* Top Offer Bar Marquee */}
      <div style={{ 
        background: 'var(--primary-gradient)', 
        color: 'white', 
        fontSize: '13px', 
        padding: '8px 0', 
        fontWeight: '600',
        letterSpacing: '0.5px'
      }} className="marquee-container">
        <div className="marquee-content">
          {[1,2,3,4].map((i) => (
            <span key={i} style={{ paddingRight: '50px' }}>
              🚚 Free Delivery on orders above ₹499 • Use code <span style={{ textDecoration: 'underline' }}>FIRST50</span> ✨
            </span>
          ))}
        </div>
      </div>

      <div style={{ 
        position: 'sticky', 
        top: '16px', 
        zIndex: 1000, 
        padding: '0 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        transition: 'var(--transition)'
      }}>
        <nav className="glass-nav-float" style={{ 
          opacity: isScrolled ? 0.95 : 1,
          transition: 'var(--transition)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', height: '70px', padding: '0 24px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'var(--primary-gradient)', padding: '8px', borderRadius: '50%', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)' }}>
                  <ShoppingBasket color="white" size={20} />
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>eGrocery</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div style={{ display: 'none', alignItems: 'center', gap: '24px', justifyContent: 'center', flexWrap: 'nowrap', flex: 1 }} className="desktop-menu">
              <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
              
              {/* Categories Dropdown */}
              <div 
                style={{ position: 'relative' }}
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} className="nav-link">
                  Categories <span style={{ fontSize: '10px', transition: '0.3s', transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0)', display: 'inline-block', marginLeft: '4px' }}>▼</span>
                </div>
                
                <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="glass-panel" 
                    style={{ 
                      position: 'absolute', 
                      top: '100%', 
                      left: '0', 
                      width: '220px', 
                      padding: '12px', 
                      marginTop: '10px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      zIndex: '1001'
                    }}
                  >
                    {['Meat & Fish', 'Vegetables', 'Medicine', 'Baby Care', 'Office Supplies'].map((cat) => (
                      <Link key={cat} href={`#${cat.toLowerCase().replace(' & ', '-')}`} className="dropdown-link">{cat}</Link>
                    ))}
                  </motion.div>
                )}
                </AnimatePresence>
              </div>

              <Link href="#packages" className="nav-link">Our Packages</Link>
            </div>

            {/* Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              <button className="icon-btn tooltip-container desktop-menu">
                <Search size={20} />
              </button>
              
              <div style={{ position: 'relative' }}>
                <button onClick={() => setIsCartOpen(true)} className="icon-btn" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                  <ShoppingCart size={20} />
                </button>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </div>
              
              <div style={{ position: 'relative' }} className="desktop-menu">
                {isAuthenticated ? (
                  <>
                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="icon-btn" style={{ padding: 0, overflow: 'hidden' }}>
                       <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="glass-panel"
                          style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '200px',
                            padding: '8px',
                            borderRadius: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                          }}
                        >
                          <Link href="/profile" className="dropdown-link" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><User size={16} /> My Profile</Link>
                          <Link href="/orders" className="dropdown-link" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Package size={16} /> My Orders</Link>
                          <Link href="/wishlist" className="dropdown-link" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Heart size={16} /> Wishlist</Link>
                          <div style={{ height: '1px', background: '#E5E7EB', margin: '4px 0' }} />
                          <button onClick={handleLogout} className="dropdown-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#DC2626', textAlign: 'left', width: '100%' }}><LogOut size={16} /> Logout</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link href="/login" className="icon-btn tooltip-container">
                    <User size={20} />
                  </Link>
                )}
              </div>
              
              <button className="mobile-toggle icon-btn" onClick={() => setIsMenuOpen(true)}>
                <Menu size={20} />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex' }}>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} 
          />
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ 
              position: 'relative', 
              width: '80%', 
              maxWidth: '300px', 
              background: '#FDF5EC', 
              height: '100%', 
              padding: '24px',
              display: 'flex', 
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'var(--primary-gradient)', padding: '6px', borderRadius: '50%' }}>
                  <ShoppingBasket color="white" size={16} />
                </div>
                <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)' }}>eGrocery</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} style={{ 
                width: '36px', height: '36px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E5E7EB'
              }}>
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="drawer-link active">Home</Link>
              <Link href="#categories" onClick={() => setIsMenuOpen(false)} className="drawer-link">Categories</Link>
              <Link href="#packages" onClick={() => setIsMenuOpen(false)} className="drawer-link">Our Packages</Link>
              
              <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '16px 0' }} />
              
              {isAuthenticated ? (
                <>
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="drawer-link"><User size={18} /> My Profile</Link>
                  <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="drawer-link"><Package size={18} /> My Orders</Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="drawer-link" style={{ color: '#DC2626', width: '100%', textAlign: 'left' }}><LogOut size={18} /> Logout</button>
                </>
              ) : (
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} style={{
                    padding: '14px', borderRadius: '50px', background: 'var(--primary-gradient)', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'center', transition: 'transform 0.3s'
                  }}>Login / Sign Up</Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Cart Drawer Output */}
      <AnimatePresence>
      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }}>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} 
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '400px', 
              background: '#FDF5EC', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <ShoppingCart size={22} color="var(--primary)" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>My Cart <span style={{ fontSize: '1rem', color: '#6B7280' }}>({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span></h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} color="#6B7280" />
              </button>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
                  <ShoppingCart size={48} style={{ margin: '0 auto 16px', opacity: 0.2 }} />
                  <p>Your cart is empty!</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '16px', background: 'white', padding: '16px', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                    <div style={{ width: '70px', height: '70px', background: '#F3F4F6', borderRadius: '12px', padding: '8px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: '700', fontSize: '15px' }}>{item.name}</h4>
                      <p style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '16px', margin: '4px 0' }}>{item.price}</p>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                        <button onClick={() => handleUpdateCartObj(item.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4B5563', fontWeight: 'bold' }}>-</button>
                        <span style={{ fontWeight: '600' }}>{item.quantity}</span>
                        <button onClick={() => handleUpdateCartObj(item.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Checkout */}
            {cartItems.length > 0 && (
              <div style={{ padding: '24px', background: 'white', borderTop: '1px solid #E5E7EB', boxShadow: '0 -10px 20px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  <span>Total Due:</span>
                  <span style={{ color: 'var(--primary)' }}>₹{cartItems.reduce((acc, item) => acc + (parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity), 0)}</span>
                </div>
                <button onClick={() => { setIsCartOpen(false); handleProtectedAction('/checkout'); }} style={{ width: '100%', padding: '16px', background: 'var(--primary-gradient)', color: 'white', fontWeight: 'bold', fontSize: '16px', borderRadius: '14px', border: 'none', boxShadow: '0 8px 20px rgba(22,163,74,0.3)', cursor: 'pointer' }}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
      </AnimatePresence>

      <style jsx>{`
        .nav-link {
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-weight: 500;
          color: var(--text-muted);
          transition: var(--transition);
          white-space: nowrap;
        }
        .nav-link:hover, .nav-link.active {
          background-color: var(--primary-light);
          color: var(--primary-dark);
        }
        
        .icon-btn {
          color: var(--text-muted);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: var(--transition);
        }
        .icon-btn:hover {
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          color: var(--primary);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        
        .cart-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--primary-gradient);
          color: white;
          font-size: 10px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(22, 163, 74, 0.4);
          animation: pulse-soft 2s infinite;
        }
        
        .dropdown-link {
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          transition: var(--transition);
          background: transparent;
          border: none;
        }
        .dropdown-link:hover {
          background-color: var(--primary-light);
          color: var(--primary);
          padding-left: 18px;
        }

        .drawer-link {
          padding: 14px 16px;
          border-radius: 12px;
          font-weight: 600;
          color: #4B5563;
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          border: 1px solid rgba(0,0,0,0.05);
          transition: 0.3s;
        }
        .drawer-link:hover, .drawer-link.active {
          background: var(--primary-light);
          color: var(--primary-dark);
          border-color: rgba(22, 163, 74, 0.1);
        }

        @media (min-width: 1024px) {
          .desktop-menu { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  );
}
