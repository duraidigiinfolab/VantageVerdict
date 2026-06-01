'use client';

import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import StarRating from '@/components/ui/StarRating';
import { CATEGORIES } from '@/lib/utils';
import { Save, Eye, Plus, X, Image as ImageIcon } from 'lucide-react';

export default function NewPostPage() {
  const [rating, setRating] = useState(0);
  const [affiliateLinks, setAffiliateLinks] = useState([{ label: '', url: '' }]);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  const addAffiliateLink = () => {
    setAffiliateLinks([...affiliateLinks, { label: '', url: '' }]);
  };

  const removeAffiliateLink = (index: number) => {
    setAffiliateLinks(affiliateLinks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Create New Post</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-md" onClick={() => setStatus('draft')}>
            <Save size={16} />
            Save Draft
          </button>
          <button className="btn btn-primary btn-md" onClick={() => setStatus('published')}>
            <Eye size={16} />
            Publish
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Title */}
            <div className="card-elevated" style={{ padding: '24px' }}>
              <Input
                label="Post Title"
                placeholder="Enter a compelling title..."
                id="post-title"
              />
            </div>

            {/* Cover Image */}
            <div className="card-elevated" style={{ padding: '24px' }}>
              <label className="input-label" style={{ marginBottom: '8px', display: 'block' }}>Cover Image</label>
              <div style={{
                border: '2px dashed var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '40px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}>
                <ImageIcon size={36} style={{ color: 'var(--color-text-tertiary)', marginBottom: '12px' }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)' }}>
                  Click to upload or drag and drop
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
                  PNG, JPG, WebP up to 5MB
                </p>
              </div>
            </div>

            {/* Excerpt */}
            <div className="card-elevated" style={{ padding: '24px' }}>
              <Textarea
                label="Excerpt"
                placeholder="Write a brief summary (shown in post cards and SEO)..."
                rows={3}
                id="post-excerpt"
              />
            </div>

            {/* Content Editor */}
            <div className="card-elevated" style={{ padding: '24px' }}>
              <label className="input-label" style={{ marginBottom: '8px', display: 'block' }}>Content</label>
              <div style={{
                background: 'var(--color-bg-tertiary)',
                border: '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '4px',
                marginBottom: '8px',
                display: 'flex',
                gap: '2px',
                flexWrap: 'wrap',
              }}>
                {['B', 'I', 'U', 'H2', 'H3', '• List', '1. List', '" Quote', '🔗 Link', '📷 Image'].map((btn) => (
                  <button key={btn} type="button" className="btn btn-ghost btn-sm" style={{ minWidth: 'auto', padding: '6px 10px', fontSize: '0.78rem' }}>
                    {btn}
                  </button>
                ))}
              </div>
              <textarea
                className="textarea-field"
                placeholder="Write your review content here... (Rich text editor will be integrated with Tiptap)"
                rows={16}
                style={{ minHeight: '400px' }}
                id="post-content"
              />
            </div>

            {/* Affiliate Links */}
            <div className="card-elevated" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <label className="input-label">Affiliate Links</label>
                <button type="button" className="btn btn-ghost btn-sm" onClick={addAffiliateLink}>
                  <Plus size={14} /> Add Link
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {affiliateLinks.map((link, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                      <Input placeholder="Label (e.g., Buy on Amazon)" id={`affiliate-label-${i}`} />
                    </div>
                    <div style={{ flex: 2 }}>
                      <Input placeholder="URL (e.g., https://amazon.com/...)" id={`affiliate-url-${i}`} />
                    </div>
                    <button
                      type="button"
                      className="header-action-btn"
                      onClick={() => removeAffiliateLink(i)}
                      style={{ color: 'var(--color-error)', width: '36px', height: '36px', flexShrink: 0 }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Publish Settings */}
            <div className="card-elevated" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Publish Settings</h4>
              <div className="input-group" style={{ marginBottom: '12px' }}>
                <label className="input-label" htmlFor="post-status">Status</label>
                <select
                  className="input-field"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  id="post-status"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div className="card-elevated" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Category</h4>
              <div className="input-group">
                <select className="input-field" id="post-category">
                  <option value="">Select category...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rating */}
            <div className="card-elevated" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Rating</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StarRating
                  rating={rating}
                  size="lg"
                  interactive
                  onChange={setRating}
                  showValue
                />
              </div>
            </div>

            {/* SEO Settings */}
            <div className="card-elevated" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '16px' }}>SEO Settings</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Input label="SEO Title" placeholder="Custom title for search engines" id="seo-title" />
                <Textarea label="Meta Description" placeholder="Brief description for search results..." rows={3} id="seo-description" />
                <Input label="Keywords" placeholder="comma, separated, keywords" id="seo-keywords" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
