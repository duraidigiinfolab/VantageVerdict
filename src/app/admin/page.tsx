'use client';

import React from 'react';
import Link from 'next/link';
import { DEMO_POSTS, DEMO_COMMENTS, DEMO_USERS } from '@/lib/demo-data';
import { formatDate, CATEGORIES } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import {
  FileText,
  MessageCircle,
  Users,
  Heart,
  TrendingUp,
  Eye,
  PlusCircle,
  ArrowUpRight,
  Bell,
  MessageSquare,
} from 'lucide-react';
import type { CategorySlug } from '@/types';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Posts', value: DEMO_POSTS.length, icon: <FileText size={20} />, change: '+3 this month', positive: true, color: '#f59e0b' },
    { label: 'Comments', value: DEMO_COMMENTS.length, icon: <MessageCircle size={20} />, change: '+12 this week', positive: true, color: '#8b5cf6' },
    { label: 'Total Users', value: DEMO_USERS.length, icon: <Users size={20} />, change: '+5 this week', positive: true, color: '#10b981' },
    { label: 'Total Likes', value: DEMO_POSTS.reduce((sum, p) => sum + (p.like_count || 0), 0), icon: <Heart size={20} />, change: '+89 this week', positive: true, color: '#ef4444' },
  ];

  const recentNotifications = [
    { id: 1, type: 'comment', message: 'Arjun Patel commented on "Sony WH-1000XM5"', time: '2 hours ago' },
    { id: 2, type: 'feedback', message: 'New feedback submitted: "Feature suggestion"', time: '5 hours ago' },
    { id: 3, type: 'like', message: 'Your post "Butter Chicken Recipe" received 15 new likes', time: '1 day ago' },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="admin-page-title" style={{ marginBottom: '4px' }}>Dashboard</h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.9rem' }}>Welcome back! Here&apos;s what&apos;s happening on VantageVerdict.</p>
        </div>
        <Link href="/admin/posts/new" className="btn btn-primary btn-md">
          <PlusCircle size={16} />
          New Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="admin-stat-label">{stat.label}</span>
              <span style={{ color: stat.color }}>{stat.icon}</span>
            </div>
            <span className="admin-stat-value">{stat.value.toLocaleString()}</span>
            <span className={`admin-stat-change ${stat.positive ? 'positive' : 'negative'}`}>
              <TrendingUp size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '2px' }} />
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* Notifications Panel */}
        <div className="card-elevated" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={18} style={{ color: 'var(--color-primary)' }} />
              Recent Notifications
              <span className="notification-badge">3</span>
            </h3>
            <Link href="/admin/notifications" className="section-link" style={{ fontSize: '0.82rem' }}>
              View All <ArrowUpRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentNotifications.map((notif) => (
              <div key={notif.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: 'var(--color-bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
              }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: notif.type === 'comment' ? 'rgba(139, 92, 246, 0.1)' :
                              notif.type === 'feedback' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: notif.type === 'comment' ? '#8b5cf6' :
                         notif.type === 'feedback' ? '#f59e0b' : '#ef4444',
                  flexShrink: 0,
                }}>
                  {notif.type === 'comment' ? <MessageCircle size={16} /> :
                   notif.type === 'feedback' ? <MessageSquare size={16} /> : <Heart size={16} />}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>{notif.message}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Posts Table */}
        <div className="card-elevated" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Recent Posts</h3>
            <Link href="/admin/posts" className="section-link" style={{ fontSize: '0.82rem' }}>
              Manage All <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Rating</th>
                  <th>Engagement</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_POSTS.slice(0, 6).map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '200px' }}>
                        <Avatar name={post.author?.display_name || 'A'} size="sm" />
                        <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
                          {post.title.length > 40 ? post.title.slice(0, 40) + '...' : post.title}
                        </span>
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
                    <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{post.rating}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.82rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Heart size={12} /> {post.like_count}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MessageCircle size={12} /> {post.comment_count}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      {formatDate(post.published_at || post.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {CATEGORIES.map((cat) => {
            const catPosts = DEMO_POSTS.filter(p => p.category?.slug === cat.slug);
            const totalLikes = catPosts.reduce((sum, p) => sum + (p.like_count || 0), 0);
            return (
              <div key={cat.slug} className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>{cat.icon}</span>
                <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>{cat.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.82rem', color: 'var(--color-text-tertiary)' }}>
                  <span><strong style={{ color: 'var(--color-text-primary)' }}>{catPosts.length}</strong> posts</span>
                  <span><strong style={{ color: 'var(--color-text-primary)' }}>{totalLikes}</strong> likes</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
