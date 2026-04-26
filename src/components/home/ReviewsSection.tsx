'use client';

import React, { useState, useEffect } from 'react';
import { Star, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'James Bond',
    role: 'CEO of Alerado',
    text: 'Extremely good service and the quality of products is always top-notch. Highly recommended!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=james'
  },
  {
    name: 'Real Sun',
    role: 'CEO of Flower',
    text: 'I love how easy it is to order my daily groceries. The delivery is always on time.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?u=sunny'
  },
  {
    name: 'Sarah Connor',
    role: 'Home Maker',
    text: 'The bundle packs are a lifesaver. I get everything I need in one go at a great price.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    name: 'Michael Chen',
    role: 'Fitness Coach',
    text: 'Getting my organic proteins and fresh greens in 10 minutes changed my whole routine.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=mike'
  }
];

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % (reviews.length - 2)); // Keep at least 3 visible when sliding
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding" style={{ 
      textAlign: 'center', 
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at 10% 90%, #DCFCE7 0%, var(--bg-main) 60%)'
    }}>
      {/* Background Decorators */}
      <div style={{ position: 'absolute', top: '20%', right: '-5%', width: '300px', height: '300px', background: '#D1FAE5', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0, opacity: 0.6 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '15px' }}>What Our Clients Say</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '60px', fontSize: '1.1rem' }}>Thousands of happy customers trusting us every day.</p>
        </motion.div>
        
        <div style={{ overflow: 'hidden', padding: '20px 0' }}>
          <motion.div 
            style={{ 
              display: 'flex', 
              gap: '30px', 
              width: 'max-content'
            }}
            animate={{ x: `calc(-${index * (100 / (reviews.length / 1))}%)` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            {reviews.map((review, i) => (
              <div 
                key={i}
                className="glass-panel glass-card-hover"
                style={{ 
                  width: '350px',
                  padding: '40px 30px', 
                  textAlign: 'left',
                  borderRadius: 'var(--radius-md)',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}
              >
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[...Array(5)].map((_, idx) => (
                    <Star 
                      key={idx} 
                      size={20} 
                      fill={idx < review.rating ? "#FFD700" : "none"} 
                      color={idx < review.rating ? "#FFD700" : "#E5E7EB"} 
                      style={{ filter: idx < review.rating ? 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))' : 'none' }}
                    />
                  ))}
                </div>

                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-main)', flexGrow: 1 }}>
                  "{review.text}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {review.name}
                      <BadgeCheck size={16} color="var(--primary)" style={{ filter: 'drop-shadow(0 0 4px rgba(22, 163, 74, 0.4))' }}/>
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
          {Array.from({ length: reviews.length - 2 }).map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              style={{ 
                width: i === index ? '24px' : '8px', 
                height: '8px', 
                borderRadius: '4px', 
                background: i === index ? 'var(--primary-gradient)' : '#E5E7EB',
                transition: 'var(--transition)'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
