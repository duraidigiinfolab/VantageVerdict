'use client';

import React from 'react';
import { DEMO_USERS } from '@/lib/demo-data';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { Shield, ShieldCheck, User, Search, MoreVertical } from 'lucide-react';

const roleConfig = {
  admin: { label: 'Admin', icon: <ShieldCheck size={12} />, color: '#f59e0b' },
  editor: { label: 'Editor', icon: <Shield size={12} />, color: '#8b5cf6' },
  user: { label: 'User', icon: <User size={12} />, color: '#10b981' },
};

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="admin-page-title">Users Management</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
          <input className="input-field input-with-icon" placeholder="Search users..." id="admin-search-users" />
        </div>
        <select className="input-field" style={{ width: 'auto' }} id="admin-filter-role">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Editor</option>
          <option>User</option>
        </select>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...DEMO_USERS, ...DEMO_USERS].map((user, i) => {
              const rc = roleConfig[user.role];
              return (
                <tr key={`${user.id}-${i}`}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Avatar name={user.display_name} size="md" />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                        {user.display_name}
                      </span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{user.email}</td>
                  <td>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: rc.color,
                      background: `${rc.color}18`,
                    }}>
                      {rc.icon} {rc.label}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--color-text-tertiary)' }}>
                    {formatDate(user.created_at)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <select
                        className="input-field"
                        defaultValue={user.role}
                        style={{ width: 'auto', padding: '4px 8px', fontSize: '0.78rem' }}
                      >
                        <option value="user">User</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
