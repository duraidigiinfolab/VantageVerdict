'use client';

import React from 'react';
import { Bell, MessageCircle, Heart, MessageSquare, UserPlus, Check } from 'lucide-react';

const notifications = [
  { id: 1, type: 'comment', icon: <MessageCircle size={16} />, message: 'Arjun Patel commented on "Sony WH-1000XM5 Review"', time: '2 hours ago', read: false },
  { id: 2, type: 'feedback', icon: <MessageSquare size={16} />, message: 'New feedback: "Add dark mode toggle to mobile"', time: '5 hours ago', read: false },
  { id: 3, type: 'like', icon: <Heart size={16} />, message: '"Butter Chicken Recipe" received 15 new likes', time: '1 day ago', read: false },
  { id: 4, type: 'user', icon: <UserPlus size={16} />, message: 'New user registered: sara.wilson@email.com', time: '1 day ago', read: true },
  { id: 5, type: 'comment', icon: <MessageCircle size={16} />, message: 'Priya Sharma replied to a comment on "Udaipur Review"', time: '2 days ago', read: true },
  { id: 6, type: 'like', icon: <Heart size={16} />, message: '"Interstellar IMAX Re-Release" reached 400 likes!', time: '3 days ago', read: true },
  { id: 7, type: 'feedback', icon: <MessageSquare size={16} />, message: 'New feedback: "More recipe reviews please!"', time: '4 days ago', read: true },
  { id: 8, type: 'comment', icon: <MessageCircle size={16} />, message: '3 new comments need moderation', time: '5 days ago', read: true },
];

const typeColors: Record<string, string> = {
  comment: '#8b5cf6',
  feedback: '#f59e0b',
  like: '#ef4444',
  user: '#10b981',
};

export default function AdminNotificationsPage() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="admin-page-title" style={{ marginBottom: '4px' }}>Notifications</h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-tertiary)' }}>
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="btn btn-secondary btn-md">
          <Check size={16} /> Mark All Read
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px 20px',
              background: notif.read ? 'var(--color-bg-card)' : 'rgba(245, 158, 11, 0.04)',
              border: `1px solid ${notif.read ? 'var(--color-border)' : 'var(--color-border-accent)'}`,
              borderRadius: 'var(--radius-md)',
              transition: 'all var(--transition-fast)',
            }}
          >
            {/* Unread dot */}
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: notif.read ? 'transparent' : 'var(--color-primary)',
              flexShrink: 0,
            }} />

            {/* Icon */}
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `${typeColors[notif.type]}15`,
              color: typeColors[notif.type],
              flexShrink: 0,
            }}>
              {notif.icon}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: '0.88rem',
                color: notif.read ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                fontWeight: notif.read ? 400 : 500,
              }}>
                {notif.message}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '3px' }}>
                {notif.time}
              </p>
            </div>

            {/* Mark as read */}
            {!notif.read && (
              <button
                className="header-action-btn"
                title="Mark as read"
                style={{ width: '32px', height: '32px' }}
              >
                <Check size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
