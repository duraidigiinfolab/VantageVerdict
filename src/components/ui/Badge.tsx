import React from 'react';
import { cn } from '@/lib/utils';
import type { CategorySlug } from '@/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'category' | 'status' | 'outline';
  category?: CategorySlug;
  color?: string;
  size?: 'sm' | 'md';
  className?: string;
}

const categoryColors: Record<CategorySlug, string> = {
  products: 'badge-products',
  places: 'badge-places',
  events: 'badge-events',
  recipes: 'badge-recipes',
  culture: 'badge-culture',
};

export default function Badge({
  children,
  variant = 'default',
  category,
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        `badge-${size}`,
        variant === 'category' && category ? categoryColors[category] : `badge-${variant}`,
        className
      )}
    >
      {children}
    </span>
  );
}
