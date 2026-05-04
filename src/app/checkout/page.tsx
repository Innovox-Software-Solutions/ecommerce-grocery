'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, CreditCard, Truck, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import OptimizedImage from '@/components/ui/OptimizedImage';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart_store') || '[]');
    setCartItems(items);
    if (items.length === 0 && !isSuccess) {
      router.push('/');
    }
  }, [router, isSuccess]);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace('₹', ''));
    return acc + (price * (item.quantity || 1));
  }, 0);

  const deliveryFee = 40;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create order object
    const order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      total: `₹${total}`,
      status: 'Processing',
      items: cartItems
    };

    // Save to orders
    const existingOrders = JSON.parse(localStorage.getItem('orders_store') || '[]');
    localStorage.setItem('orders_store', JSON.stringify([order, ...existingOrders]));

    // Clear cart
    localStorage.removeItem('cart_store');
    window.dispatchEvent(new Event('cart-update'));

    setIsSuccess(true);
    setTimeout(() => {
      router.push('/orders');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'white', padding: '60px', borderRadius: '40px', textAlign: 'center', maxWidth: '500px', width: '90%', boxShadow: 'var(--shadow-glow)' }}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            style={{ width: '100px', height: '100px', background: 'var(--bg-soft)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', color: 'var(--secondary)' }}
          >
            <CheckCircle size={60} />
          </motion.div>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '15px' }}>Order Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
            Your organic goodies are being prepared and will be at your doorstep in 10 minutes.
          </p>
          <p style={{ color: 'var(--primary)', fontWeight: '700' }}>Redirecting to your orders...</p>
        </motion.div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '15px 20px',
    borderRadius: '16px',
    border: '1px solid rgba(31, 61, 43, 0.1)',
    background: 'var(--bg-main)',
    fontSize: '15px',
    fontWeight: '600',
    outline: 'none',
    transition: '0.3s'
  };

  const paymentLabelStyle = (method: string) => ({
    flex: 1,
    padding: '20px',
    borderRadius: '20px',
    border: `2px solid ${paymentMethod === method ? 'var(--primary)' : 'rgba(0,0,0,0.05)'}`,
    background: paymentMethod === method ? 'var(--bg-soft)' : 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    transition: '0.3s'
  });

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', marginBottom: '30px' }}>
          <ChevronLeft size={20} /> Back to Shopping
        </Link>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {/* Checkout Form */}
          <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ background: 'white', borderRadius: '30px', padding: '40px', boxShadow: 'var(--shadow-glow)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Truck size={24} color="var(--primary)" /> Delivery Details
              </h3>
              <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <input type="text" placeholder="First Name" required style={inputStyle} />
                  <input type="text" placeholder="Last Name" required style={inputStyle} />
                </div>
                <input type="email" placeholder="Email Address" required style={inputStyle} />
                <input type="tel" placeholder="Phone Number" required style={inputStyle} />
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                  <input type="text" placeholder="Full Address" required style={inputStyle} />
                  <input type="text" placeholder="Apt / House No" style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <input type="text" placeholder="City" required style={inputStyle} />
                  <input type="text" placeholder="State" required style={inputStyle} />
                  <input type="text" placeholder="Zip Code" required style={inputStyle} />
                </div>

                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CreditCard size={24} color="var(--primary)" /> Payment Method
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <label style={paymentLabelStyle('cash') as any} onClick={() => setPaymentMethod('cash')}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {paymentMethod === 'cash' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }} />}
                      </div>
                      <span style={{ fontWeight: '700' }}>Cash on Delivery</span>
                    </label>
                    <label style={paymentLabelStyle('upi') as any} onClick={() => setPaymentMethod('upi')}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {paymentMethod === 'upi' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }} />}
                      </div>
                      <span style={{ fontWeight: '700' }}>UPI / Card Online</span>
                    </label>
                  </div>
                </div>

                <button type="submit" style={{ 
                  marginTop: '30px',
                  padding: '20px',
                  background: 'var(--primary-gradient)',
                  color: 'white',
                  borderRadius: '18px',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-glow)'
                }}>
                  Place Order • ₹{total}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ flex: '1 1 350px' }}>
            <div style={{ background: 'white', borderRadius: '30px', padding: '40px', boxShadow: 'var(--shadow-glow)', position: 'sticky', top: '120px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '30px' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                {cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'var(--bg-soft)', borderRadius: '12px', padding: '5px' }}>
                      <OptimizedImage src={item.image} alt={item.name} width={40} height={40} objectFit="contain" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '700' }}>{item.name}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Qty: {item.quantity || 1}</p>
                    </div>
                    <span style={{ fontWeight: '700' }}>{item.price}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '25px 0', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontWeight: '600' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontWeight: '600' }}>
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)' }}>
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
