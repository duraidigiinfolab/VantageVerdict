'use client';

import React from 'react';
import { DEMO_COMMENTS } from '@/lib/demo-data';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { Check, X, Trash2, Search } from 'lucide-react';

export default function AdminCommentsPage() {
  return (
    <div>
      <h1 className="admin-page-title">Comments Moderation</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
          <input className="input-field input-with-icon" placeholder="Search comments..." id="admin-search-comments" />
        </div>
        <select className="input-field" style={{ width: 'auto' }} id="admin-filter-comment-status">
          <option>All Status</option>
          <option>Approved</option>
          <option>Pending</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[...DEMO_COMMENTS, ...DEMO_COMMENTS].map((comment, i) => (
          <div key={`${comment.id}-${i}`} className="card-elevated" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '14px' }}>
              <Avatar name={comment.user?.display_name || 'User'} size="md" />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{comment.user?.display_name}</span>
                    <Badge variant={comment.is_approved ? 'status' : 'default'} size="sm">
                      {comment.is_approved ? 'Approved' : 'Pending'}
                    </Badge>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-tertiary)' }}>
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
                  {comment.content}
                </p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-success)' }}>
                    <Check size={14} /> Approve
                  </button>
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-warning)' }}>
                    <X size={14} /> Reject
                  </button>
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-error)' }}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
