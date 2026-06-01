'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/utils';
import { Heart, Globe, MessageCircle, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span className="header-logo-icon">V</span>
              <span className="header-logo-text">
                Vantage<span className="header-logo-accent">Verdict</span>
              </span>
            </Link>
            <p className="footer-tagline">
              Honest reviews that help you make better decisions. Exploring products, places, events, recipes, and culture — one verdict at a time.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <Globe size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="GitHub">
                <Globe size={18} />
              </a>
              <a href="mailto:hello@vantageverdict.com" className="footer-social-link" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Categories Column */}
          <div className="footer-column">
            <h4 className="footer-column-title">Categories</h4>
            <ul className="footer-links">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`} className="footer-link">
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-links">
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
              <li><Link href="/feedback" className="footer-link">Feedback</Link></li>
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-column">
            <h4 className="footer-column-title">Stay Updated</h4>
            <p className="footer-newsletter-text">
              Get the latest reviews delivered to your inbox weekly.
            </p>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="footer-newsletter-input"
                id="footer-newsletter-email"
              />
              <button type="submit" className="footer-newsletter-btn" id="footer-newsletter-submit">
                <ArrowUpRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="divider" />

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} VantageVerdict. All rights reserved.
          </p>
          <p className="footer-made-with">
            Made with <Heart size={14} className="footer-heart" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
