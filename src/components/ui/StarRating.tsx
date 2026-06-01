'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 14,
  md: 18,
  lg: 24,
};

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  showValue = false,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState(0);
  const displayRating = hoverRating || rating;
  const starSize = sizeMap[size];

  return (
    <div className={cn('star-rating', className)} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= Math.floor(displayRating);
        const isHalf = !isFilled && starValue - 0.5 <= displayRating;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            style={{
              background: 'none',
              border: 'none',
              padding: '1px',
              cursor: interactive ? 'pointer' : 'default',
              display: 'flex',
              transition: 'transform 150ms ease',
              transform: hoverRating === starValue ? 'scale(1.2)' : 'scale(1)',
            }}
            aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
          >
            <Star
              size={starSize}
              fill={isFilled || isHalf ? '#f59e0b' : 'transparent'}
              color={isFilled || isHalf ? '#f59e0b' : 'var(--color-text-tertiary)'}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
      {showValue && (
        <span style={{
          marginLeft: '6px',
          fontSize: size === 'sm' ? '0.8rem' : size === 'md' ? '0.9rem' : '1rem',
          fontWeight: 600,
          color: 'var(--color-primary)',
        }}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
