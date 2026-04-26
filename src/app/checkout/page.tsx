'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Wallet, Truck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart_store') || '[]');
    if (items.length === 0) {
      router.push('/');
    } else {
      setCartItems(items);
    }
  }, [router]);

  const subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity), 0);
  const delivery = subtotal > 499 ? 0 : 50;
  const total = subtotal + delivery;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate placing order
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      const newOrder = {
        id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        status: 'Processing',
        total: `₹${total.toFixed(0)}`,
        items: cartItems.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.image
        }))
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders_store') || '[]');
      localStorage.setItem('orders_store', JSON.stringify([newOrder, ...existingOrders]));

      localStorage.setItem('cart_store', '[]'); // clear cart
      window.dispatchEvent(new Event('cart-update'));
      
      // Auto redirect to orders
      setTimeout(() => {
        router.push('/orders');
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FDF5EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ 
            background: 'white', padding: '40px', borderRadius: '30px', 
            textAlign: 'center', maxWidth: '400px', width: '90%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            style={{ width: '80px', height: '80px', background: '#DEF7EC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#16A34A' }}
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1A1A1A', marginBottom: '10px' }}>Order Confirmed!</h2>
          <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: '1.5', marginBottom: '30px' }}>
            Your grocery order has been successfully placed. We're packing it fresh for you.
          </p>
          <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Redirecting to your orders...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FDF5EC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '40px 20px' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <button onClick={() => router.back()} style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: 'white', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)', color: '#4B5563' 
            }}>
              <ArrowLeft size={20} />
            </button>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>Checkout</h1>
          </div>

          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            {/* Left Column: Form */}
            <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={{ background: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={20} color="var(--primary)" /> Delivery Details
                </h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input type="text" placeholder="First Name" required style={inputStyle} />
                    <input type="text" placeholder="Last Name" required style={inputStyle} />
                  </div>
                  <input type="text" placeholder="Phone Number" required style={inputStyle} />
                  <input type="text" placeholder="Full Delivery Address" required style={inputStyle} />
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <input type="text" placeholder="City" required style={inputStyle} />
                    <input type="text" placeholder="Pincode" required style={inputStyle} />
                  </div>
                </form>
              </div>

              <div style={{ background: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CreditCard size={20} color="var(--primary)" /> Payment Method
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={paymentLabelStyle(paymentMethod === 'cod')} onClick={() => setPaymentMethod('cod')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Truck size={20} color={paymentMethod === 'cod' ? 'var(--primary)' : '#9CA3AF'} />
                      <span style={{ fontWeight: '600' }}>Cash on Delivery</span>
                    </div>
                    <input type="radio" checked={paymentMethod === 'cod'} readOnly style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} />
                  </label>
                  
                  <label style={paymentLabelStyle(paymentMethod === 'upi')} onClick={() => setPaymentMethod('upi')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Wallet size={20} color={paymentMethod === 'upi' ? 'var(--primary)' : '#9CA3AF'} />
                      <span style={{ fontWeight: '600' }}>UPI / Card</span>
                    </div>
                    <input type="radio" checked={paymentMethod === 'upi'} readOnly style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} />
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ background: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Order Summary</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', paddingRight: '10px' }}>
                  {cartItems.map((item) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '10px', background: '#F3F4F6', padding: '6px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#1A1A1A' }}>{item.name}</p>
                        <p style={{ fontSize: '12px', color: '#6B7280' }}>Qty: {item.quantity}</p>
                      </div>
                      <div style={{ fontWeight: '700', fontSize: '14px' }}>
                        ₹{parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px 0', borderTop: '1px dashed #E5E7EB', borderBottom: '1px dashed #E5E7EB', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#4B5563' }}>
                    <span>Subtotal</span>
                    <span style={{ fontWeight: '600' }}>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#4B5563' }}>
                    <span>Delivery Fee</span>
                    <span style={{ fontWeight: '600', color: delivery === 0 ? 'var(--primary)' : 'inherit' }}>
                      {delivery === 0 ? 'Free' : `₹${delivery.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '700' }}>Total Amount</span>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)' }}>₹{total.toFixed(2)}</span>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  style={{ 
                    width: '100%', padding: '16px', 
                    background: isProcessing ? '#9CA3AF' : 'var(--primary-gradient)', 
                    color: 'white', fontWeight: 'bold', fontSize: '16px', 
                    borderRadius: '14px', border: 'none', cursor: isProcessing ? 'not-allowed' : 'pointer',
                    boxShadow: isProcessing ? 'none' : '0 8px 20px rgba(22,163,74,0.3)',
                    transition: 'all 0.3s'
                  }}
                >
                  {isProcessing ? 'Processing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '1px solid #E5E7EB',
  outline: 'none',
  fontSize: '15px',
  transition: 'border-color 0.3s'
};

const paymentLabelStyle = (isActive: boolean) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
  borderRadius: '12px',
  border: `2px solid ${isActive ? 'var(--primary)' : '#E5E7EB'}`,
  background: isActive ? '#F0FDF4' : 'transparent',
  cursor: 'pointer',
  transition: 'all 0.3s'
});
