'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallback?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  objectFit = 'cover',
  style,
  className,
  fallback = '/images/placeholder.png',
  ...props
}: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ position: 'relative', width: fill ? '100%' : width, height: fill ? '100%' : height, overflow: 'hidden' }} className={className}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--bg-soft)',
            animation: 'shimmer 1.5s infinite',
            zIndex: 1,
          }}
        />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => setImgSrc(fallback)}
        sizes={props.sizes || "(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"}
        style={{
          ...style,
          objectFit,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default OptimizedImage;
