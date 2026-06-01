// VantageVerdict — TypeScript Type Definitions

export type CategorySlug = 'products' | 'places' | 'events' | 'recipes' | 'culture';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  icon: string;
  color: string;
  postCount?: number;
}

export interface User {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  role: 'admin' | 'editor' | 'user';
  created_at: string;
}

export interface AffiliateLink {
  label: string;
  url: string;
  platform?: string;
}

export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  og_image?: string;
}

export interface Post {
  id: string;
  author_id: string;
  category_id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  status: 'draft' | 'published' | 'archived';
  rating: number;
  affiliate_links: AffiliateLink[];
  seo_meta: SeoMeta;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  author?: User;
  category?: Category;
  like_count?: number;
  comment_count?: number;
  is_liked?: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  is_approved: boolean;
  created_at: string;
  // Joined
  user?: User;
}

export interface Like {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  user_id: string | null;
  subject: string;
  message: string;
  status: 'new' | 'reviewed' | 'resolved';
  created_at: string;
  user?: User;
}

// UI Helper Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}
