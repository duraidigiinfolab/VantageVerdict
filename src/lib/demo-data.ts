// VantageVerdict — Demo Data for Development
// This file provides mock data so the site looks populated without a database

import type { Post, Comment, User } from '@/types';

export const DEMO_USERS: User[] = [
  {
    id: 'user-1',
    email: 'admin@vantageverdict.com',
    display_name: 'Rakesh Kumar',
    avatar_url: '',
    role: 'admin',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    email: 'priya@vantageverdict.com',
    display_name: 'Priya Sharma',
    avatar_url: '',
    role: 'editor',
    created_at: '2025-02-15T00:00:00Z',
  },
  {
    id: 'user-3',
    email: 'arjun@email.com',
    display_name: 'Arjun Patel',
    avatar_url: '',
    role: 'user',
    created_at: '2025-03-10T00:00:00Z',
  },
];

export const DEMO_POSTS: Post[] = [
  // === PRODUCTS ===
  {
    id: 'post-1',
    author_id: 'user-1',
    category_id: 'cat-products',
    title: 'Sony WH-1000XM5: The Gold Standard of Noise Cancelling',
    slug: 'sony-wh-1000xm5-review',
    excerpt: 'After three months of daily use, here\'s why these headphones remain the undisputed champion of noise cancelling — and where they still fall short.',
    content: `The Sony WH-1000XM5 headphones represent the pinnacle of consumer noise-cancelling technology. From the moment you put them on, the world fades away into a cocoon of silence that feels almost surreal.

**Build & Design**
Sony has completely redesigned the XM5 with a minimalist aesthetic. The headband is thinner, the ear cups are more refined, and the overall look is decidedly more premium. The soft-touch materials feel luxurious against your skin. However, the new design means they no longer fold flat — a genuine downside for travelers.

**Sound Quality**
The audio performance is exceptional. Highs are crisp without being sibilant, mids are warm and full, and the bass hits with authority without ever becoming muddy. The 30mm driver unit is smaller than its predecessor but produces a wider, more spacious soundstage.

**Noise Cancellation**
This is where the XM5 truly shines. With eight microphones working in concert with Sony's V1 processor, the noise cancellation is the best I've ever experienced. Airplane cabin noise, office chatter, and city traffic all virtually disappear.

**Battery Life**
Sony quotes 30 hours with ANC on, and in my testing, that's accurate. With ANC off, you can squeeze out around 40 hours. The quick charge feature gives you three hours of playback from just three minutes of charging.

**The Verdict**
At $349, these aren't cheap, but they're worth every penny for anyone who values peace and quiet. The build quality, sound signature, and noise cancellation make these the best wireless headphones money can buy in 2025.`,
    cover_image: '/images/demo/headphones.jpg',
    status: 'published',
    rating: 4.8,
    affiliate_links: [
      { label: 'Buy on Amazon', url: 'https://amazon.com', platform: 'Amazon' },
      { label: 'Check Best Buy', url: 'https://bestbuy.com', platform: 'Best Buy' },
    ],
    seo_meta: { title: 'Sony WH-1000XM5 Review', description: 'In-depth review of Sony\'s flagship noise cancelling headphones.' },
    published_at: '2025-11-15T10:00:00Z',
    created_at: '2025-11-10T08:00:00Z',
    updated_at: '2025-11-15T10:00:00Z',
    author: DEMO_USERS[0],
    category: { id: 'cat-products', name: 'Products', slug: 'products', description: '', icon: '📦', color: '#f59e0b' },
    like_count: 234,
    comment_count: 42,
  },
  {
    id: 'post-2',
    author_id: 'user-2',
    category_id: 'cat-products',
    title: 'MacBook Pro M4: A Creative Professional\'s Dream Machine',
    slug: 'macbook-pro-m4-review',
    excerpt: 'Apple\'s latest silicon brings unprecedented performance for video editors, developers, and designers. But is the premium price justified?',
    content: 'Full review content for MacBook Pro M4...',
    cover_image: '/images/demo/laptop.jpg',
    status: 'published',
    rating: 4.5,
    affiliate_links: [{ label: 'Buy on Apple Store', url: 'https://apple.com', platform: 'Apple' }],
    seo_meta: {},
    published_at: '2025-11-12T10:00:00Z',
    created_at: '2025-11-08T08:00:00Z',
    updated_at: '2025-11-12T10:00:00Z',
    author: DEMO_USERS[1],
    category: { id: 'cat-products', name: 'Products', slug: 'products', description: '', icon: '📦', color: '#f59e0b' },
    like_count: 189,
    comment_count: 31,
  },
  {
    id: 'post-3',
    author_id: 'user-1',
    category_id: 'cat-products',
    title: 'Dyson V15 Detect: Is a $750 Vacuum Worth It?',
    slug: 'dyson-v15-detect-review',
    excerpt: 'The laser-equipped Dyson V15 Detect promises to revolutionize how you clean. We put it through rigorous testing to find out if it delivers.',
    content: 'Full review content for Dyson V15...',
    cover_image: '/images/demo/vacuum.jpg',
    status: 'published',
    rating: 4.2,
    affiliate_links: [{ label: 'Buy on Amazon', url: 'https://amazon.com', platform: 'Amazon' }],
    seo_meta: {},
    published_at: '2025-11-08T10:00:00Z',
    created_at: '2025-11-05T08:00:00Z',
    updated_at: '2025-11-08T10:00:00Z',
    author: DEMO_USERS[0],
    category: { id: 'cat-products', name: 'Products', slug: 'products', description: '', icon: '📦', color: '#f59e0b' },
    like_count: 156,
    comment_count: 28,
  },

  // === PLACES ===
  {
    id: 'post-4',
    author_id: 'user-2',
    category_id: 'cat-places',
    title: 'Udaipur: The Venice of the East Lives Up to Its Name',
    slug: 'udaipur-travel-review',
    excerpt: 'Majestic palaces reflected in still lake waters, winding streets full of art, and some of the best Rajasthani cuisine — Udaipur is a masterpiece.',
    content: 'Full review content for Udaipur...',
    cover_image: '/images/demo/udaipur.jpg',
    status: 'published',
    rating: 4.9,
    affiliate_links: [{ label: 'Book Hotels', url: 'https://booking.com', platform: 'Booking.com' }],
    seo_meta: {},
    published_at: '2025-11-10T10:00:00Z',
    created_at: '2025-11-05T08:00:00Z',
    updated_at: '2025-11-10T10:00:00Z',
    author: DEMO_USERS[1],
    category: { id: 'cat-places', name: 'Places', slug: 'places', description: '', icon: '🌍', color: '#10b981' },
    like_count: 312,
    comment_count: 56,
  },
  {
    id: 'post-5',
    author_id: 'user-1',
    category_id: 'cat-places',
    title: 'Kyoto in Autumn: A Photographer\'s Paradise',
    slug: 'kyoto-autumn-review',
    excerpt: 'Golden temples framed by crimson maples, serene zen gardens, and the quiet magic of a city that bridges ancient and modern Japan.',
    content: 'Full review content for Kyoto...',
    cover_image: '/images/demo/kyoto.jpg',
    status: 'published',
    rating: 4.7,
    affiliate_links: [{ label: 'Book Flights', url: 'https://skyscanner.com', platform: 'Skyscanner' }],
    seo_meta: {},
    published_at: '2025-11-05T10:00:00Z',
    created_at: '2025-11-01T08:00:00Z',
    updated_at: '2025-11-05T10:00:00Z',
    author: DEMO_USERS[0],
    category: { id: 'cat-places', name: 'Places', slug: 'places', description: '', icon: '🌍', color: '#10b981' },
    like_count: 278,
    comment_count: 44,
  },

  // === EVENTS ===
  {
    id: 'post-6',
    author_id: 'user-1',
    category_id: 'cat-events',
    title: 'Coldplay Music of the Spheres Tour: A Celestial Experience',
    slug: 'coldplay-concert-review',
    excerpt: 'LED wristbands, confetti cannons, and Chris Martin\'s boundless energy — this was more than a concert, it was a multi-sensory spectacle.',
    content: 'Full review content for Coldplay concert...',
    cover_image: '/images/demo/concert.jpg',
    status: 'published',
    rating: 4.6,
    affiliate_links: [],
    seo_meta: {},
    published_at: '2025-10-28T10:00:00Z',
    created_at: '2025-10-25T08:00:00Z',
    updated_at: '2025-10-28T10:00:00Z',
    author: DEMO_USERS[0],
    category: { id: 'cat-events', name: 'Events', slug: 'events', description: '', icon: '🎪', color: '#8b5cf6' },
    like_count: 445,
    comment_count: 89,
  },
  {
    id: 'post-7',
    author_id: 'user-2',
    category_id: 'cat-events',
    title: 'TechSummit 2025: The Future of AI is Already Here',
    slug: 'techsummit-2025-review',
    excerpt: 'From autonomous agents to AI-generated cinema, this year\'s TechSummit showcased innovations that feel straight out of science fiction.',
    content: 'Full review content for TechSummit...',
    cover_image: '/images/demo/techconf.jpg',
    status: 'published',
    rating: 4.3,
    affiliate_links: [],
    seo_meta: {},
    published_at: '2025-10-20T10:00:00Z',
    created_at: '2025-10-18T08:00:00Z',
    updated_at: '2025-10-20T10:00:00Z',
    author: DEMO_USERS[1],
    category: { id: 'cat-events', name: 'Events', slug: 'events', description: '', icon: '🎪', color: '#8b5cf6' },
    like_count: 198,
    comment_count: 37,
  },

  // === RECIPES ===
  {
    id: 'post-8',
    author_id: 'user-2',
    category_id: 'cat-recipes',
    title: 'The Perfect Butter Chicken: Restaurant-Quality at Home',
    slug: 'butter-chicken-recipe-review',
    excerpt: 'After testing 12 different recipes, we\'ve found the one that produces the creamiest, most flavorful butter chicken you\'ll ever make at home.',
    content: 'Full recipe review content...',
    cover_image: '/images/demo/butterchicken.jpg',
    status: 'published',
    rating: 4.9,
    affiliate_links: [{ label: 'Get the Spice Kit', url: 'https://amazon.com', platform: 'Amazon' }],
    seo_meta: {},
    published_at: '2025-11-01T10:00:00Z',
    created_at: '2025-10-28T08:00:00Z',
    updated_at: '2025-11-01T10:00:00Z',
    author: DEMO_USERS[1],
    category: { id: 'cat-recipes', name: 'Recipes', slug: 'recipes', description: '', icon: '🍳', color: '#ef4444' },
    like_count: 567,
    comment_count: 92,
  },
  {
    id: 'post-9',
    author_id: 'user-1',
    category_id: 'cat-recipes',
    title: 'Homemade Sourdough Bread: A Beginner\'s Complete Guide',
    slug: 'sourdough-bread-recipe-review',
    excerpt: 'From starter to first loaf in 7 days. This foolproof method takes the mystery out of artisan bread-making.',
    content: 'Full recipe review content...',
    cover_image: '/images/demo/sourdough.jpg',
    status: 'published',
    rating: 4.4,
    affiliate_links: [{ label: 'Get the Banneton Set', url: 'https://amazon.com', platform: 'Amazon' }],
    seo_meta: {},
    published_at: '2025-10-25T10:00:00Z',
    created_at: '2025-10-22T08:00:00Z',
    updated_at: '2025-10-25T10:00:00Z',
    author: DEMO_USERS[0],
    category: { id: 'cat-recipes', name: 'Recipes', slug: 'recipes', description: '', icon: '🍳', color: '#ef4444' },
    like_count: 389,
    comment_count: 64,
  },

  // === CULTURE ===
  {
    id: 'post-10',
    author_id: 'user-1',
    category_id: 'cat-culture',
    title: '"Interstellar" Re-Release IMAX: Still a Masterpiece a Decade Later',
    slug: 'interstellar-imax-rerelease-review',
    excerpt: 'Christopher Nolan\'s space epic returns to IMAX screens, and the experience is as awe-inspiring as ever. Here\'s why it deserves a revisit.',
    content: 'Full review content for Interstellar...',
    cover_image: '/images/demo/interstellar.jpg',
    status: 'published',
    rating: 4.8,
    affiliate_links: [{ label: 'Buy on Blu-ray', url: 'https://amazon.com', platform: 'Amazon' }],
    seo_meta: {},
    published_at: '2025-10-30T10:00:00Z',
    created_at: '2025-10-28T08:00:00Z',
    updated_at: '2025-10-30T10:00:00Z',
    author: DEMO_USERS[0],
    category: { id: 'cat-culture', name: 'Culture', slug: 'culture', description: '', icon: '🎭', color: '#3b82f6' },
    like_count: 423,
    comment_count: 78,
  },
  {
    id: 'post-11',
    author_id: 'user-2',
    category_id: 'cat-culture',
    title: '"The Midnight Library" by Matt Haig: A Soul-Stirring Read',
    slug: 'midnight-library-book-review',
    excerpt: 'What if you could live every life you never chose? Matt Haig\'s philosophical novel about regret, possibility, and the art of living.',
    content: 'Full review content for The Midnight Library...',
    cover_image: '/images/demo/book.jpg',
    status: 'published',
    rating: 4.5,
    affiliate_links: [{ label: 'Buy on Amazon', url: 'https://amazon.com', platform: 'Amazon' }],
    seo_meta: {},
    published_at: '2025-10-22T10:00:00Z',
    created_at: '2025-10-20T08:00:00Z',
    updated_at: '2025-10-22T10:00:00Z',
    author: DEMO_USERS[1],
    category: { id: 'cat-culture', name: 'Culture', slug: 'culture', description: '', icon: '🎭', color: '#3b82f6' },
    like_count: 356,
    comment_count: 61,
  },
  {
    id: 'post-12',
    author_id: 'user-1',
    category_id: 'cat-places',
    title: 'Coorg: Karnataka\'s Coffee Paradise in the Western Ghats',
    slug: 'coorg-travel-review',
    excerpt: 'Mist-covered hills, sprawling coffee plantations, and the warmth of Kodava hospitality make Coorg an unforgettable retreat.',
    content: 'Full review content for Coorg...',
    cover_image: '/images/demo/coorg.jpg',
    status: 'published',
    rating: 4.6,
    affiliate_links: [{ label: 'Book Homestays', url: 'https://airbnb.com', platform: 'Airbnb' }],
    seo_meta: {},
    published_at: '2025-10-18T10:00:00Z',
    created_at: '2025-10-15T08:00:00Z',
    updated_at: '2025-10-18T10:00:00Z',
    author: DEMO_USERS[0],
    category: { id: 'cat-places', name: 'Places', slug: 'places', description: '', icon: '🌍', color: '#10b981' },
    like_count: 267,
    comment_count: 45,
  },
];

export const DEMO_COMMENTS: Comment[] = [
  {
    id: 'comment-1',
    post_id: 'post-1',
    user_id: 'user-3',
    content: 'Great review! I\'ve been using the XM4 for years and was wondering if the upgrade is worth it. This convinced me.',
    is_approved: true,
    created_at: '2025-11-16T14:30:00Z',
    user: DEMO_USERS[2],
  },
  {
    id: 'comment-2',
    post_id: 'post-1',
    user_id: 'user-2',
    content: 'The only downside for me is that they don\'t fold anymore. For frequent travelers, that\'s a real concern.',
    is_approved: true,
    created_at: '2025-11-17T09:15:00Z',
    user: DEMO_USERS[1],
  },
  {
    id: 'comment-3',
    post_id: 'post-8',
    user_id: 'user-3',
    content: 'Made this last weekend — absolutely incredible! The tip about toasting the spices first made all the difference.',
    is_approved: true,
    created_at: '2025-11-02T18:45:00Z',
    user: DEMO_USERS[2],
  },
];

// Helper to get posts by category
export function getPostsByCategory(categorySlug: string): Post[] {
  const categoryMap: Record<string, string> = {
    products: 'cat-products',
    places: 'cat-places',
    events: 'cat-events',
    recipes: 'cat-recipes',
    culture: 'cat-culture',
  };
  return DEMO_POSTS.filter(p => p.category_id === categoryMap[categorySlug] && p.status === 'published');
}

// Helper to get a post by slug
export function getPostBySlug(slug: string): Post | undefined {
  return DEMO_POSTS.find(p => p.slug === slug);
}

// Helper to get featured posts (top rated)
export function getFeaturedPosts(count = 3): Post[] {
  return [...DEMO_POSTS]
    .filter(p => p.status === 'published')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}

// Helper to get latest posts
export function getLatestPosts(count = 6): Post[] {
  return [...DEMO_POSTS]
    .filter(p => p.status === 'published')
    .sort((a, b) => new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime())
    .slice(0, count);
}

// Helper to get most liked posts
export function getMostLikedPosts(count = 5): Post[] {
  return [...DEMO_POSTS]
    .filter(p => p.status === 'published')
    .sort((a, b) => (b.like_count || 0) - (a.like_count || 0))
    .slice(0, count);
}

// Helper to get comments for a post
export function getCommentsForPost(postId: string): Comment[] {
  return DEMO_COMMENTS.filter(c => c.post_id === postId);
}
