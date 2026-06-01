'use client';

import React from 'react';
import Badge from '@/components/ui/Badge';
import { MessageSquare, CheckCircle, Clock, Eye } from 'lucide-react';

const demoFeedback = [
  { id: 1, subject: 'Add dark mode toggle to mobile', message: 'It would be great to have a dark mode toggle accessible from the mobile menu as well.', status: 'new' as const, category: 'feature', created_at: '2025-11-20T10:00:00Z' },
  { id: 2, subject: 'Broken link on Kyoto review', message: 'The affiliate link on the Kyoto autumn review page leads to a 404 page.', status: 'reviewed' as const, category: 'bug', created_at: '2025-11-18T14:30:00Z' },
  { id: 3, subject: 'More recipe reviews please!', message: 'Love the butter chicken review! Would love to see more Indian cuisine recipes reviewed.', status: 'resolved' as const, category: 'content', created_at: '2025-11-15T09:00:00Z' },
  { id: 4, subject: 'Newsletter not working', message: 'I tried subscribing to the newsletter but did not receive any confirmation email.', status: 'new' as const, category: 'bug', created_at: '2025-11-22T16:00:00Z' },
];

const statusConfig = {
  new: { label: 'New', color: 'var(--color-info)', icon: <Clock size={14} /> },
  reviewed: { label: 'Reviewed', color: 'var(--color-warning)', icon: <Eye size={14} /> },
  resolved: { label: 'Resolved', color: 'var(--color-success)', icon: <CheckCircle size={14} /> },
};

export default function AdminFeedbackPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Feedback Inbox</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge variant="default" size="md">{demoFeedback.filter(f => f.status === 'new').length} New</Badge>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {demoFeedback.map((fb) => {
          const sc = statusConfig[fb.status];
          return (
            <div key={fb.id} className="card-elevated" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <MessageSquare size={16} style={{ color: 'var(--color-primary)' }} />
                    <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)' }}>{fb.subject}</h3>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Badge variant="outline" size="sm">{fb.category}</Badge>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-tertiary)' }}>
                      {new Date(fb.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 600, color: sc.color, background: `${sc.color}18`, border: `1px solid ${sc.color}33` }}>
                  {sc.icon} {sc.label}
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
                {fb.message}
              </p>
              <div style={{ display: 'flex', gap: '6px' }}>
                {fb.status !== 'reviewed' && (
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-warning)' }}>
                    <Eye size={14} /> Mark Reviewed
                  </button>
                )}
                {fb.status !== 'resolved' && (
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-success)' }}>
                    <CheckCircle size={14} /> Mark Resolved
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
