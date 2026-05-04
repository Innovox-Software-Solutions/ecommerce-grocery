'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, ChevronLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerified(true);
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  if (isVerified) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'white', padding: '60px', borderRadius: '40px', textAlign: 'center', maxWidth: '500px', width: '90%', boxShadow: 'var(--shadow-glow)' }}
        >
          <div style={{ width: '80px', height: '80px', background: 'var(--bg-soft)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--secondary)' }}>
            <CheckCircle size={50} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '10px' }}>Verified!</h2>
          <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Your identity has been confirmed.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '500px',
          background: 'white',
          padding: '50px',
          borderRadius: '40px',
          boxShadow: 'var(--shadow-glow)',
          textAlign: 'center'
        }}
      >
        <Link href="/forgot-password" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', marginBottom: '30px' }}>
          <ChevronLeft size={18} /> Back
        </Link>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ width: '70px', height: '70px', background: 'var(--bg-soft)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary)' }}>
            <ShieldCheck size={36} />
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '10px' }}>Verify Code</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Enter the 4-digit code sent to your email.</p>
        </div>

        <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                style={{
                  width: '65px',
                  height: '75px',
                  borderRadius: '18px',
                  border: '2px solid rgba(31, 61, 43, 0.1)',
                  background: 'var(--bg-main)',
                  textAlign: 'center',
                  fontSize: '28px',
                  fontWeight: '900',
                  color: 'var(--primary)',
                  outline: 'none',
                  transition: '0.3s'
                }}
              />
            ))}
          </div>

          <button type="submit" style={{ 
            padding: '20px',
            background: 'var(--primary-gradient)',
            color: 'white',
            borderRadius: '18px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            Verify & Continue <ArrowRight size={20} />
          </button>
        </form>

        <p style={{ marginTop: '30px', color: 'var(--text-muted)', fontWeight: '600' }}>
          Didn't receive code? <button style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: '800', cursor: 'pointer' }}>Resend Code</button>
        </p>
      </motion.div>
    </main>
  );
}
