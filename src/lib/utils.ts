// VantageVerdict — Utility Functions

import { type CategorySlug, type Category } from '@/types';

/**
 * Format a date string to a human-readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function timeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 30) return `${diffDay}d ago`;
  if (diffMonth < 12) return `${diffMonth}mo ago`;
  return `${diffYear}y ago`;
}

/**
 * Estimate reading time for content
 */
export function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

/**
 * Generate a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Truncate text to a specified length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + '…';
}

/**
 * Get category configuration with colors and icons
 */
export const CATEGORIES: Category[] = [
  {
    id: 'cat-products',
    name: 'Products',
    slug: 'products',
    description: 'In-depth reviews of the latest tech, gadgets, and everyday products worth your investment.',
    icon: '📦',
    color: '#f59e0b',
  },
  {
    id: 'cat-places',
    name: 'Places',
    slug: 'places',
    description: 'Discover hidden gems and popular destinations through our honest travel reviews.',
    icon: '🌍',
    color: '#10b981',
  },
  {
    id: 'cat-events',
    name: 'Events',
    slug: 'events',
    description: 'Coverage and reviews of concerts, festivals, conferences, and cultural happenings.',
    icon: '🎪',
    color: '#8b5cf6',
  },
  {
    id: 'cat-recipes',
    name: 'Recipes',
    slug: 'recipes',
    description: 'Tried-and-tested recipes with honest ratings on taste, difficulty, and presentation.',
    icon: '🍳',
    color: '#ef4444',
  },
  {
    id: 'cat-culture',
    name: 'Culture',
    slug: 'culture',
    description: 'Books, films, art, music, and everything that shapes our cultural landscape.',
    icon: '🎭',
    color: '#3b82f6',
  },
];

/**
 * Get a single category by slug
 */
export function getCategoryBySlug(slug: CategorySlug): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}

/**
 * Format a number with compact notation (e.g., 1.2K)
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * cn - merge class names, filtering falsy values
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
