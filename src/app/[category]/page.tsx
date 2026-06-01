import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PostCard from '@/components/post/PostCard';
import { getCategoryBySlug, CATEGORIES } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';
import type { CategorySlug } from '@/types';

// Let's keep validCategories to restrict routes for known categories
const validCategories: CategorySlug[] = ['products', 'places', 'events', 'recipes', 'culture'];

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category as CategorySlug);
  if (!cat) return {};
  return {
    title: `${cat.name} Reviews`,
    description: cat.description,
    openGraph: {
      title: `${cat.name} Reviews | VantageVerdict`,
      description: cat.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!validCategories.includes(category as CategorySlug)) {
    notFound();
  }

  const cat = getCategoryBySlug(category as CategorySlug)!;

  const supabase = await createClient();
  const { data: dbPosts } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(name, slug, icon),
      author:users(display_name, avatar_url)
    `)
    .eq('status', 'published')
    .eq('category.slug', category) // Wait, we can't filter joined tables like this unless it's inner join.
    // Actually, we should get the category ID first, OR just filter on client, but better to use `categories!inner(...)`
    ;

  // Proper join filtering in PostgREST requires !inner
  const { data: categoryPostsData } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories!inner(name, slug, icon),
      author:users(display_name, avatar_url)
    `)
    .eq('status', 'published')
    .eq('categories.slug', category)
    .order('created_at', { ascending: false });

  // Map database entries to Post type
  const posts = (categoryPostsData || []).map((p: any) => {
    const staticCategory = CATEGORIES.find(c => c.slug === category);
    return {
      ...p,
      category: {
        ...(Array.isArray(p.category) ? p.category[0] : p.category),
        color: staticCategory?.color
      },
      author: Array.isArray(p.author) ? p.author[0] : p.author,
    };
  });

  return (
    <div className="static-page">
      <div className="container">
        {/* Category Hero */}
        <div className="category-hero animate-fadeInUp">
          <div className="category-hero-icon">{cat.icon}</div>
          <h1 className="category-hero-title">{cat.name} <span className="gradient-text">Reviews</span></h1>
          <p className="category-hero-desc">{cat.description}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', marginTop: '12px' }}>
            {posts.length} review{posts.length !== 1 ? 's' : ''} published
          </p>
        </div>

        {/* Filters */}
        <div className="category-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Newest</button>
          <button className="filter-btn">Top Rated</button>
          <button className="filter-btn">Most Liked</button>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-tertiary)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '16px' }}>{cat.icon}</p>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
              No reviews yet
            </h3>
            <p>Check back soon — we&apos;re working on exciting {cat.name.toLowerCase()} reviews!</p>
          </div>
        )}

        {/* Other Categories */}
        <div style={{ marginTop: '60px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Explore Other Categories</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {CATEGORIES.filter(c => c.slug !== category).map((c) => (
              <a
                key={c.slug}
                href={`/${c.slug}`}
                className="card"
                style={{ padding: '14px 22px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <span>{c.icon}</span>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
