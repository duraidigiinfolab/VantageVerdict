import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import PostCard from '@/components/post/PostCard';
import StarRating from '@/components/ui/StarRating';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { getPostBySlug, getPostsByCategory, getCommentsForPost } from '@/lib/demo-data';
import { formatDate, readingTime, formatNumber, getCategoryBySlug } from '@/lib/utils';
import { Heart, MessageCircle, Share2, Clock, ExternalLink, ArrowLeft, BookmarkPlus, Copy, Globe } from 'lucide-react';
import type { CategorySlug } from '@/types';

interface PostPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: [post.author?.display_name || 'VantageVerdict'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const comments = getCommentsForPost(post.id);
  const relatedPosts = getPostsByCategory(category).filter(p => p.id !== post.id).slice(0, 3);
  const cat = getCategoryBySlug(category as CategorySlug);
  const readTime = readingTime(post.content);

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author?.display_name },
    datePublished: post.published_at,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: post.rating,
      bestRating: 5,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="static-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-tertiary)', marginBottom: '24px', paddingTop: 'var(--header-height)' }}>
            <Link href="/" style={{ color: 'var(--color-text-tertiary)' }}>Home</Link>
            <span>/</span>
            <Link href={`/${category}`} style={{ color: 'var(--color-text-tertiary)' }}>{cat?.name}</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-text-primary)' }}>Review</span>
          </nav>

          {/* Post Header */}
          <div style={{ maxWidth: '800px', marginBottom: '32px' }} className="animate-fadeInUp">
            <Badge variant="category" category={category as CategorySlug} size="md">
              {cat?.icon} {cat?.name}
            </Badge>
            <h1 className="post-detail-title" style={{ marginTop: '16px' }}>{post.title}</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
              {post.excerpt}
            </p>
            <div className="post-detail-meta" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Avatar name={post.author?.display_name || 'Author'} size="md" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{post.author?.display_name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
                    {formatDate(post.published_at || post.created_at)}
                  </div>
                </div>
              </div>
              <span style={{ color: 'var(--color-border)' }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {readTime}</span>
              <StarRating rating={post.rating} size="md" showValue />
            </div>
          </div>

          {/* Cover Image */}
          <div className="post-detail-cover animate-fadeInUp" style={{
            background: `linear-gradient(135deg, ${cat?.color}33, ${cat?.color}11, var(--color-bg-card))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '100%',
          }}>
            <span style={{ fontSize: '6rem' }}>{cat?.icon}</span>
          </div>

          <div className="content-with-sidebar">
            {/* Main Content */}
            <div>
              {/* Engagement Bar */}
              <div className="engagement-bar">
                <div className="engagement-left">
                  <button className="engagement-btn" id="like-btn">
                    <Heart size={16} /> {formatNumber(post.like_count || 0)} Likes
                  </button>
                  <button className="engagement-btn" id="comment-jump-btn">
                    <MessageCircle size={16} /> {comments.length} Comments
                  </button>
                  <button className="engagement-btn" id="bookmark-btn">
                    <BookmarkPlus size={16} /> Save
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="engagement-btn" title="Copy link" id="share-copy-btn">
                    <Copy size={14} />
                  </button>
                  <button className="engagement-btn" title="Share on Twitter" id="share-twitter-btn">
                    <Globe size={14} />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="prose post-detail-content" style={{ maxWidth: '100%' }}>
                {post.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <h3 key={i}>{paragraph.replace(/\*\*/g, '')}</h3>;
                  }
                  return <p key={i}>{paragraph}</p>;
                })}
              </div>

              {/* Affiliate Links */}
              {post.affiliate_links.length > 0 && (
                <div className="post-detail-affiliate-section">
                  <h3 className="affiliate-section-title">
                    <ExternalLink size={18} style={{ color: 'var(--color-primary)' }} />
                    Where to Buy
                  </h3>
                  <div className="affiliate-links-grid">
                    {post.affiliate_links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="affiliate-link-btn"
                        id={`affiliate-link-${i}`}
                      >
                        {link.label}
                        <ExternalLink size={14} />
                      </a>
                    ))}
                  </div>
                  <p className="affiliate-disclosure">
                    💡 Disclosure: Some links above are affiliate links. We may earn a small commission at no extra cost to you.{' '}
                    <Link href="/privacy#affiliate-disclosure" style={{ color: 'var(--color-primary)' }}>Learn more</Link>
                  </p>
                </div>
              )}

              {/* Rating Summary */}
              <div className="card-elevated" style={{ padding: '28px', margin: '32px 0', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Our Verdict</h3>
                <StarRating rating={post.rating} size="lg" showValue />
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-tertiary)', marginTop: '10px' }}>
                  {post.rating >= 4.5 ? 'Exceptional — Highly Recommended' :
                   post.rating >= 4.0 ? 'Excellent — Well Worth It' :
                   post.rating >= 3.5 ? 'Good — Solid Choice' :
                   post.rating >= 3.0 ? 'Decent — With Some Caveats' :
                   'Below Average'}
                </p>
              </div>

              {/* Comments Section */}
              <div className="comments-section" style={{ maxWidth: '100%' }} id="comments">
                <h3 className="comments-title">
                  <MessageCircle size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                  Comments ({comments.length})
                </h3>

                {/* Comment Form */}
                <form className="comment-form" action="#">
                  <textarea
                    className="textarea-field"
                    placeholder="Share your thoughts on this review..."
                    rows={3}
                    id="comment-input"
                  />
                  <button type="submit" className="btn btn-primary btn-md" style={{ alignSelf: 'flex-end' }}>
                    Post Comment
                  </button>
                </form>

                {/* Comment List */}
                <div className="comment-list">
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                      <Avatar name={comment.user?.display_name || 'User'} size="sm" />
                      <div className="comment-body">
                        <div className="comment-header">
                          <span className="comment-author">{comment.user?.display_name}</span>
                          <span className="comment-time">{formatDate(comment.created_at)}</span>
                        </div>
                        <p className="comment-content">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                  {comments.length === 0 && (
                    <p style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', padding: '32px 0' }}>
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="sidebar">
              {/* Author Card */}
              <div className="sidebar-section" style={{ textAlign: 'center' }}>
                <Avatar name={post.author?.display_name || 'Author'} size="xl" />
                <h4 style={{ marginTop: '12px', fontSize: '1rem' }}>{post.author?.display_name}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-tertiary)' }}>
                  {post.author?.role === 'admin' ? 'Founder & Editor' : 'Contributing Writer'}
                </p>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="sidebar-section">
                  <h3 className="sidebar-title">More in {cat?.name}</h3>
                  <div className="sidebar-posts">
                    {relatedPosts.map((rp) => (
                      <PostCard key={rp.id} post={rp} variant="compact" />
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Back to Category */}
          <div style={{ marginTop: '48px' }}>
            <Link href={`/${category}`} className="btn btn-secondary btn-md">
              <ArrowLeft size={16} />
              Back to {cat?.name} Reviews
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
