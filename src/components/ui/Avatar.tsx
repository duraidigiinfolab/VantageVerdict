import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const fontSizeMap = {
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1.125rem',
  xl: '1.5rem',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getColorFromName(name: string): string {
  const colors = ['#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#3b82f6', '#ec4899', '#14b8a6'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const dimension = sizeMap[size];
  const initials = getInitials(name);
  const bgColor = getColorFromName(name);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width={dimension}
        height={dimension}
        className={cn(className)}
        style={{
          width: dimension,
          height: dimension,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid var(--color-border)',
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      className={cn(className)}
      style={{
        width: dimension,
        height: dimension,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${bgColor}, ${bgColor}cc)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: fontSizeMap[size],
        fontWeight: 700,
        color: '#fff',
        flexShrink: 0,
        border: '2px solid var(--color-border)',
      }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
