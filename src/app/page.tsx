import Link from 'next/link';
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import PostCard from '@/components/post/PostCard';
import { CATEGORIES } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch Latest Posts
  const { data: latestPostsData } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(name, slug, icon),
      author:users(display_name, avatar_url)
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(6);

  // Fetch Featured Post (Just the newest one with a high rating for now)
  const { data: featuredPostData } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(name, slug, icon),
      author:users(display_name, avatar_url)
    `)
    .eq('status', 'published')
    .gte('rating', 4.5)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // Map database entries to Post type. Provide fallbacks since Supabase returns arrays for foreign keys sometimes depending on relationship.
  const mapPost = (p: any) => ({
    ...p,
    category: Array.isArray(p.category) ? p.category[0] : p.category,
    author: Array.isArray(p.author) ? p.author[0] : p.author,
  });

  const latestPosts = (latestPostsData || []).map(mapPost);
  const mainFeatured = featuredPostData ? mapPost(featuredPostData) : latestPosts[0];
  const mostLikedPosts = latestPosts.slice(0, 5); // Fallback for most liked until we add actual likes counts

  // Re-map colors to categories from our static constants to keep the UI colorful
  const addColorsToPosts = (posts: any[]) => posts.map(post => {
    const staticCategory = CATEGORIES.find(c => c.slug === post.category?.slug);
    if (staticCategory && post.category) {
      post.category.color = staticCategory.color;
    }
    return post;
  });

  const finalLatest = addColorsToPosts(latestPosts);
  const finalFeatured = mainFeatured ? addColorsToPosts([mainFeatured])[0] : null;

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
      {finalFeatured && (
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
            <PostCard post={finalFeatured} variant="featured" />
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
              
              {finalLatest.length > 0 ? (
                <div className="posts-grid">
                  {finalLatest.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No reviews yet</h3>
                  <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.95rem' }}>Create your first review in the admin dashboard to see it here!</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="sidebar">
              <div className="sidebar-section">
                <h3 className="sidebar-title">
                  <TrendingUp size={18} style={{ color: 'var(--color-primary)' }} />
                  Most Loved
                </h3>
                <div className="sidebar-posts">
                  {mostLikedPosts.length > 0 ? mostLikedPosts.map((post) => (
                    <PostCard key={post.id} post={post} variant="compact" />
                  )) : (
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>No trending posts yet.</p>
                  )}
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
