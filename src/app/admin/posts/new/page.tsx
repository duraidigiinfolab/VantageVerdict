'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import StarRating from '@/components/ui/StarRating';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { createClient } from '@/lib/supabase/client';
import { Save, Eye, Plus, X, Image as ImageIcon } from 'lucide-react';

export default function NewPostPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [categoryId, setCategoryId] = useState('');
  const [affiliateLinks, setAffiliateLinks] = useState([{ label: '', url: '' }]);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase.from('categories').select('id, name, slug').order('name');
      if (data) setCategories(data);
    }
    loadCategories();
  }, [supabase]);

  const addAffiliateLink = () => {
    setAffiliateLinks([...affiliateLinks, { label: '', url: '' }]);
  };

  const removeAffiliateLink = (index: number) => {
    setAffiliateLinks(affiliateLinks.filter((_, i) => i !== index));
  };

  const handleSave = async (saveStatus: 'draft' | 'published') => {
    setIsLoading(true);
    setError(null);
    setStatus(saveStatus);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Generate slug from title
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      
      // Clean up affiliate links (remove empty ones)
      const cleanedLinks = affiliateLinks.filter(link => link.label && link.url);

      const { error: dbError } = await supabase.from('posts').insert({
        title,
        slug,
        excerpt,
        content,
        rating,
        status: saveStatus,
        category_id: categoryId || null,
        author_id: user.id,
        affiliate_links: cleanedLinks,
      });

      if (dbError) throw dbError;

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Create New Post</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-md" onClick={() => handleSave('draft')} disabled={isLoading}>
            <Save size={16} />
            {isLoading && status === 'draft' ? 'Saving...' : 'Save Draft'}
          </button>
          <button className="btn btn-primary btn-md" onClick={() => handleSave('published')} disabled={isLoading}>
            <Eye size={16} />
            {isLoading && status === 'published' ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', borderRadius: 'var(--radius-md)', marginBottom: '24px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <strong>Error: </strong> {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Title */}
            <div className="card-elevated" style={{ padding: '24px' }}>
              <Input
                label="Post Title"
                placeholder="Enter a compelling title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="post-title"
              />
            </div>

            {/* Excerpt */}
            <div className="card-elevated" style={{ padding: '24px' }}>
              <Textarea
                label="Excerpt"
                placeholder="Write a brief summary (shown in post cards and SEO)..."
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                id="post-excerpt"
              />
            </div>

            {/* Content Editor */}
            <div className="card-elevated" style={{ padding: '24px' }}>
              <label className="input-label" style={{ marginBottom: '8px', display: 'block' }}>Content</label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>

            {/* Affiliate Links */}
            <div className="card-elevated" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <label className="input-label" style={{ margin: 0 }}>Affiliate Links</label>
                <button type="button" className="btn btn-ghost btn-sm" onClick={addAffiliateLink}>
                  <Plus size={14} /> Add Link
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {affiliateLinks.map((link, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                      <Input 
                        placeholder="Label (e.g., Buy on Amazon)" 
                        value={link.label}
                        onChange={(e) => {
                          const newLinks = [...affiliateLinks];
                          newLinks[i].label = e.target.value;
                          setAffiliateLinks(newLinks);
                        }}
                        id={`affiliate-label-${i}`} 
                      />
                    </div>
                    <div style={{ flex: 2 }}>
                      <Input 
                        placeholder="URL (e.g., https://amazon.com/...)" 
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = [...affiliateLinks];
                          newLinks[i].url = e.target.value;
                          setAffiliateLinks(newLinks);
                        }}
                        id={`affiliate-url-${i}`} 
                      />
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
            {/* Category */}
            <div className="card-elevated" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Category</h4>
              <div className="input-group">
                <select 
                  className="input-field" 
                  id="post-category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
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
          </div>
        </div>
      </div>
    </div>
  );
}
