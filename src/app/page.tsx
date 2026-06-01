import Link from 'next/link';
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import PostCard from '@/components/post/PostCard';
import { CATEGORIES } from '@/lib/utils';
import { getFeaturedPosts, getLatestPosts, getMostLikedPosts } from '@/lib/demo-data';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(3);
  const latestPosts = getLatestPosts(6);
  const mostLikedPosts = getMostLikedPosts(5);
  const mainFeatured = featuredPosts[0];

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="container">
          <div className="hero-content animate-fadeInUp">
            <div className="hero-badge">
              <Sparkles size={14} />
              Trusted Reviews Since 2025
            </div>
            <h1 className="hero-title">
              Discover What&apos;s <span className="gradient-text">Truly Worth</span> Your Time
            </h1>
            <p className="hero-subtitle">
              From cutting-edge products to hidden travel gems, mouthwatering recipes to cultural deep-dives — we deliver honest, in-depth reviews that help you make better decisions.
            </p>
            <div className="hero-actions">
              <Link href="/products" className="btn btn-primary btn-lg">
                Explore Reviews
                <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn btn-secondary btn-lg">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header animate-fadeInUp">
            <div>
              <h2 className="section-title">Explore Categories</h2>
              <p className="section-subtitle">Five lenses to view the world through</p>
            </div>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="category-card animate-fadeInUp"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="category-card-icon">{cat.icon}</span>
                <span className="category-card-name">{cat.name}</span>
                <span className="category-card-desc">{cat.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED POST ===== */}
      {mainFeatured && (
        <section className="posts-section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  <span className="gradient-text-gold">Featured</span> Review
                </h2>
                <p className="section-subtitle">Our editor&apos;s top pick this month</p>
              </div>
            </div>
            <PostCard post={mainFeatured} variant="featured" />
          </div>
        </section>
      )}

      {/* ===== LATEST + SIDEBAR ===== */}
      <section className="posts-section">
        <div className="container">
          <div className="content-with-sidebar">
            {/* Main Content */}
            <div>
              <div className="section-header">
                <div>
                  <h2 className="section-title">Latest Reviews</h2>
                  <p className="section-subtitle">Fresh perspectives, delivered daily</p>
                </div>
                <Link href="/products" className="section-link">
                  View All <ArrowRight size={16} />
                </Link>
              </div>
              <div className="posts-grid">
                {latestPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="sidebar">
              <div className="sidebar-section">
                <h3 className="sidebar-title">
                  <TrendingUp size={18} style={{ color: 'var(--color-primary)' }} />
                  Most Loved
                </h3>
                <div className="sidebar-posts">
                  {mostLikedPosts.map((post) => (
                    <PostCard key={post.id} post={post} variant="compact" />
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="sidebar-section" style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(139, 92, 246, 0.05))',
                border: '1px solid var(--color-border-accent)',
              }}>
                <h3 className="sidebar-title">📬 Stay in the Loop</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', marginBottom: '12px', lineHeight: 1.6 }}>
                  Get our best reviews delivered to your inbox every week. No spam, ever.
                </p>
                <form action="#" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="input-field"
                    id="sidebar-newsletter-email"
                  />
                  <button type="submit" className="btn btn-primary btn-md" style={{ width: '100%' }}>
                    Subscribe
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
