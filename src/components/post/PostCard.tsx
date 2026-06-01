'use client';

import React from 'react';
import Link from 'next/link';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { Heart, MessageCircle, Clock } from 'lucide-react';
import { readingTime, formatDate, formatNumber } from '@/lib/utils';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
}

export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  const categorySlug = post.category?.slug || 'products';
  const readTime = readingTime(post.content);

  if (variant === 'compact') {
    return (
      <Link href={`/${categorySlug}/${post.slug}`} className="post-card-compact">
        <div className="post-card-compact-image">
          <div className="post-card-image-placeholder" style={{ background: `linear-gradient(135deg, ${post.category?.color}33, ${post.category?.color}11)` }}>
            <span style={{ fontSize: '2rem' }}>{post.category?.icon}</span>
          </div>
        </div>
        <div className="post-card-compact-content">
          <Badge variant="category" category={categorySlug} size="sm">
            {post.category?.name}
          </Badge>
          <h4 className="post-card-compact-title">{post.title}</h4>
          <div className="post-card-compact-meta">
            <StarRating rating={post.rating} size="sm" />
            <span className="post-card-meta-dot">·</span>
            <span>{formatNumber(post.like_count || 0)} likes</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/${categorySlug}/${post.slug}`} className="post-card-featured">
        <div className="post-card-featured-image">
          <div className="post-card-image-placeholder post-card-image-placeholder-large" style={{ background: `linear-gradient(135deg, ${post.category?.color}44, ${post.category?.color}11, var(--color-bg-card))` }}>
            <span style={{ fontSize: '4rem' }}>{post.category?.icon}</span>
          </div>
          <div className="post-card-featured-overlay">
            <Badge variant="category" category={categorySlug}>{post.category?.name}</Badge>
          </div>
        </div>
        <div className="post-card-featured-content">
          <h2 className="post-card-featured-title">{post.title}</h2>
          <p className="post-card-featured-excerpt">{post.excerpt}</p>
          <div className="post-card-featured-footer">
            <div className="post-card-author">
              <Avatar name={post.author?.display_name || 'Author'} size="sm" />
              <span>{post.author?.display_name}</span>
            </div>
            <div className="post-card-stats">
              <StarRating rating={post.rating} size="sm" showValue />
              <span className="post-card-meta-dot">·</span>
              <span className="post-card-stat"><Heart size={14} /> {formatNumber(post.like_count || 0)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/${categorySlug}/${post.slug}`} className="post-card">
      <div className="post-card-image">
        <div className="post-card-image-placeholder" style={{ background: `linear-gradient(135deg, ${post.category?.color}33, ${post.category?.color}11, var(--color-bg-card))` }}>
          <span style={{ fontSize: '2.5rem' }}>{post.category?.icon}</span>
        </div>
        <div className="post-card-image-overlay">
          <Badge variant="category" category={categorySlug}>{post.category?.name}</Badge>
        </div>
      </div>
      <div className="post-card-body">
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <div className="post-card-footer">
          <div className="post-card-author">
            <Avatar name={post.author?.display_name || 'Author'} size="sm" />
            <div className="post-card-author-info">
              <span className="post-card-author-name">{post.author?.display_name}</span>
              <span className="post-card-date">{formatDate(post.published_at || post.created_at)}</span>
            </div>
          </div>
          <div className="post-card-meta">
            <StarRating rating={post.rating} size="sm" />
            <div className="post-card-stats-row">
              <span className="post-card-stat"><Heart size={13} /> {formatNumber(post.like_count || 0)}</span>
              <span className="post-card-stat"><MessageCircle size={13} /> {post.comment_count || 0}</span>
              <span className="post-card-stat"><Clock size={13} /> {readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
