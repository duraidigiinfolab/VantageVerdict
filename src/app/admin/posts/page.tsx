'use client';

import React from 'react';
import Link from 'next/link';
import { DEMO_POSTS } from '@/lib/demo-data';
import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { PlusCircle, Search, Heart, MessageCircle, Edit, Trash2, Eye } from 'lucide-react';
import type { CategorySlug } from '@/types';

export default function AdminPostsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Manage Posts</h1>
        <Link href="/admin/posts/new" className="btn btn-primary btn-md">
          <PlusCircle size={16} />
          New Post
        </Link>
      </div>

      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
          <input className="input-field input-with-icon" placeholder="Search posts..." id="admin-search-posts" />
        </div>
        <select className="input-field" style={{ width: 'auto', minWidth: '140px' }} id="admin-filter-category">
          <option>All Categories</option>
          <option>Products</option>
          <option>Places</option>
          <option>Events</option>
          <option>Recipes</option>
          <option>Culture</option>
        </select>
        <select className="input-field" style={{ width: 'auto', minWidth: '120px' }} id="admin-filter-status">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>
      </div>

      {/* Posts Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Category</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Engagement</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_POSTS.map((post) => (
              <tr key={post.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '250px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-sm)',
                      background: `linear-gradient(135deg, ${post.category?.color}33, ${post.category?.color}11)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span>{post.category?.icon}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
                        {post.title.length > 45 ? post.title.slice(0, 45) + '...' : post.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Avatar name={post.author?.display_name || 'A'} size="sm" />
                        {post.author?.display_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge variant="category" category={post.category?.slug as CategorySlug} size="sm">
                    {post.category?.name}
                  </Badge>
                </td>
                <td>
                  <Badge variant={post.status === 'published' ? 'status' : 'default'} size="sm">
                    {post.status}
                  </Badge>
                </td>
                <td>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{post.rating}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>/5</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.82rem', color: 'var(--color-text-tertiary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Heart size={12} /> {post.like_count}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MessageCircle size={12} /> {post.comment_count}</span>
                  </div>
                </td>
                <td style={{ fontSize: '0.82rem', whiteSpace: 'nowrap', color: 'var(--color-text-tertiary)' }}>
                  {formatDate(post.published_at || post.created_at)}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <Link href={`/${post.category?.slug}/${post.slug}`} className="header-action-btn" title="View" style={{ width: '32px', height: '32px' }}>
                      <Eye size={14} />
                    </Link>
                    <button className="header-action-btn" title="Edit" style={{ width: '32px', height: '32px' }}>
                      <Edit size={14} />
                    </button>
                    <button className="header-action-btn" title="Delete" style={{ width: '32px', height: '32px', color: 'var(--color-error)' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
