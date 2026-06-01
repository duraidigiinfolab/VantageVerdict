'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, Sun, Moon, User, LogIn, LogOut, Settings } from 'lucide-react';
import { useTheme } from '@/components/common/ThemeProvider';
import { CATEGORIES } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Get initial session
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        // Check if user is admin in DB
        const { data } = await supabase.from('users').select('role').eq('id', user.id).single();
        if (data?.role === 'admin') setIsAdmin(true);
      }
    };
    
    fetchUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase.from('users').select('role').eq('id', session.user.id).single();
        setIsAdmin(data?.role === 'admin');
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="header-logo">
            <span className="header-logo-icon">V</span>
            <span className="header-logo-text">
              Vantage<span className="header-logo-accent">Verdict</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={`header-nav-link ${pathname === `/${cat.slug}` ? 'active' : ''}`}
              >
                <span className="header-nav-icon">{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            {/* Search Toggle */}
            <button
              className="header-action-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
              id="search-toggle"
            >
              <Search size={20} />
            </button>

            {/* Theme Toggle */}
            <button
              className="header-action-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              id="theme-toggle"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {isAdmin && (
                  <Link href="/admin" className="header-action-btn" title="Admin Dashboard">
                    <Settings size={18} />
                  </Link>
                )}
                <button onClick={handleSignOut} className="header-login-btn" style={{ background: 'transparent', border: '1px solid var(--color-border)' }}>
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="header-login-btn" id="login-btn">
                <LogIn size={16} />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="header-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar (expandable) */}
        {isSearchOpen && (
          <div className="header-search animate-fadeInDown">
            <div className="header-search-inner">
              <Search size={18} className="header-search-icon" />
              <input
                type="text"
                placeholder="Search reviews, categories, topics..."
                className="header-search-input"
                autoFocus
                id="search-input"
              />
              <button
                className="header-search-close"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <nav
            className="mobile-menu animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <span className="header-logo-text">
                Vantage<span className="header-logo-accent">Verdict</span>
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="header-action-btn"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mobile-menu-links">
              {CATEGORIES.map((cat, i) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className={`mobile-menu-link ${pathname === `/${cat.slug}` ? 'active' : ''}`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <span className="mobile-menu-link-icon">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
            <div className="mobile-menu-footer">
              {user ? (
                <>
                  {isAdmin && (
                    <Link href="/admin" className="mobile-menu-auth-btn" style={{ marginBottom: '8px' }}>
                      <Settings size={18} />
                      Dashboard
                    </Link>
                  )}
                  <button onClick={handleSignOut} className="mobile-menu-auth-btn" style={{ width: '100%', background: 'var(--color-bg-tertiary)' }}>
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="mobile-menu-auth-btn">
                    <User size={18} />
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="mobile-menu-auth-btn mobile-menu-signup">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
