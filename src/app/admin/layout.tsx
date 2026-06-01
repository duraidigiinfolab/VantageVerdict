'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  MessageCircle,
  MessageSquare,
  Users,
  Bell,
  Settings,
  PlusCircle,
} from 'lucide-react';

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { href: '/admin/posts', label: 'Posts', icon: <FileText size={18} /> },
  { href: '/admin/posts/new', label: 'New Post', icon: <PlusCircle size={18} /> },
  { href: '/admin/comments', label: 'Comments', icon: <MessageCircle size={18} /> },
  { href: '/admin/feedback', label: 'Feedback', icon: <MessageSquare size={18} /> },
  { href: '/admin/users', label: 'Users', icon: <Users size={18} /> },
  { href: '/admin/notifications', label: 'Notifications', icon: <Bell size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div style={{ padding: '0 8px 16px', borderBottom: '1px solid var(--color-border)', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Admin Panel
          </h3>
        </div>
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`admin-sidebar-link ${pathname === link.href ? 'active' : ''}`}
          >
            {link.icon}
            {link.label}
            {link.label === 'Notifications' && (
              <span className="notification-badge" style={{ marginLeft: 'auto' }}>3</span>
            )}
            {link.label === 'Comments' && (
              <span className="notification-badge" style={{ marginLeft: 'auto', background: 'var(--color-warning)' }}>5</span>
            )}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
          <Link href="/" className="admin-sidebar-link" style={{ fontSize: '0.82rem' }}>
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}
