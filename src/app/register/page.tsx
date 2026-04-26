'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { PrimaryButton } from '@/components/ui/Buttons';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/login');
  };

  const calculateStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    if (pass.length < 6) return 33;
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) return 100;
    return 66;
  };

  const strength = calculateStrength(password);
  const strengthColor = strength === 0 ? '#E5E7EB' : strength <= 33 ? '#EF4444' : strength <= 66 ? '#F59E0B' : '#10B981';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FDF5EC',
      padding: '40px 24px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '40px',
          borderRadius: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', color: '#1A1A1A', marginBottom: '8px' }}>Create Account 🌿</h1>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>Join us and start shopping fresh</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ position: 'relative' }}>
            <User size={20} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" placeholder="Full Name" required className="input-field" />
          </div>

          <div style={{ position: 'relative' }}>
            <Mail size={20} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="email" placeholder="Email address" required className="input-field" />
          </div>

          <div style={{ position: 'relative', display: 'flex', gap: '10px' }}>
            <div style={{ 
              width: '100px', 
              borderRadius: '50px', 
              border: '1px solid rgba(0,0,0,0.1)', 
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '15px'
            }}>
              🇮🇳 +91
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <Phone size={20} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="tel" placeholder="Phone Number" required className="input-field" />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={20} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '-10px', padding: '0 16px' }}>
            <div style={{ height: '4px', flex: 1, borderRadius: '4px', background: strength > 0 ? strengthColor : '#E5E7EB', transition: 'background 0.3s' }} />
            <div style={{ height: '4px', flex: 1, borderRadius: '4px', background: strength > 33 ? strengthColor : '#E5E7EB', transition: 'background 0.3s' }} />
            <div style={{ height: '4px', flex: 1, borderRadius: '4px', background: strength > 66 ? strengthColor : '#E5E7EB', transition: 'background 0.3s' }} />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={20} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" required className="input-field" />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '10px' }}>
            <input 
              type="checkbox" 
              id="terms" 
              required 
              style={{ 
                marginTop: '4px', 
                width: '18px', 
                height: '18px', 
                accentColor: '#16A34A',
                cursor: 'pointer' 
              }} 
            />
            <label htmlFor="terms" style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.5' }}>
              I agree to the <span style={{ color: '#16A34A', fontWeight: '500' }}>Terms</span> and <span style={{ color: '#16A34A', fontWeight: '500' }}>Privacy Policy</span>
            </label>
          </div>

          <PrimaryButton className="w-full justify-center" icon={<ArrowRight size={18} />}>
            Create Account
          </PrimaryButton>
        </form>



        <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '14px', color: '#6B7280' }}>
          Already have an account? <Link href="/login" style={{ color: '#16A34A', fontWeight: 'bold' }}>Login</Link>
        </p>
      </motion.div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 16px 16px 16px 48px;
          border-radius: 50px;
          border: 1px solid rgba(0,0,0,0.1);
          background: white;
          outline: none;
          font-size: 15px;
          transition: all 0.3s ease;
        }
        .input-field:focus {
          border-color: #16A34A;
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.1);
        }
        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          border-radius: 50px;
          border: 1px solid #E5E7EB;
          background: white;
          font-weight: 600;
          color: #374151;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .social-btn:hover {
          background: #F9FAFB;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
