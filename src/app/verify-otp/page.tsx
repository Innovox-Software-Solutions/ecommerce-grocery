'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (timer > 0 && !isSuccess) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isSuccess]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    // Fake success simulation
    setIsSuccess(true);
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/');
      window.dispatchEvent(new Event('auth-change'));
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDF5EC' }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ textAlign: 'center' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ type: 'spring', damping: 10, mass: 0.75, stiffness: 100 }}
            style={{ width: '80px', height: '80px', background: '#16A34A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', boxShadow: '0 10px 30px rgba(22,163,74,0.3)' }}
          >
            <Check size={40} strokeWidth={3} />
          </motion.div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A1A1A', marginBottom: '8px' }}>Account Created Successfully!</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#6B7280' }}>
            <span className="jumping-dots">Redirecting to home</span>
          </div>
        </motion.div>
        <style jsx>{`
          .jumping-dots::after {
            content: '.';
            animation: dots 1.5s steps(5, end) infinite;
          }
          @keyframes dots {
            0%, 20% { content: '.'; }
            40% { content: '..'; }
            60% { content: '...'; }
            80%, 100% { content: ''; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FDF5EC',
      padding: '24px'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px',
          borderRadius: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}
      >
        <h1 style={{ fontSize: '24px', color: '#1A1A1A', marginBottom: '12px' }}>Verify Your Account ✅</h1>
        <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '30px' }}>
          Enter the 6 digit OTP sent to your email
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '30px' }}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="otp-input"
            />
          ))}
        </div>

        <button 
          onClick={verifyOtp}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '50px',
            border: 'none',
            background: '#16A34A',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(22, 163, 74, 0.3)',
            transition: 'all 0.3s ease',
            marginBottom: '20px'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
        >
          Verify OTP
        </button>

        <p style={{ fontSize: '14px', color: '#6B7280' }}>
          Didn't receive code?{' '}
          {timer > 0 ? (
            <span style={{ fontWeight: '500' }}>Resend in 00:{timer.toString().padStart(2, '0')}</span>
          ) : (
            <button onClick={() => setTimer(30)} style={{ color: '#16A34A', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Resend OTP
            </button>
          )}
        </p>
      </motion.div>

      <style jsx>{`
        .otp-input {
          width: 45px;
          height: 55px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.1);
          background: white;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          color: #1A1A1A;
          outline: none;
          transition: all 0.3s ease;
        }
        .otp-input:focus {
          border-color: #16A34A;
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.1);
          transform: translateY(-2px);
        }

        @media (max-width: 400px) {
          .otp-input {
            width: 38px;
            height: 48px;
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}
