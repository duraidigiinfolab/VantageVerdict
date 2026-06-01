import type { Metadata } from 'next';
import { CATEGORIES } from '@/lib/utils';
import { Users, Target, Heart, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about VantageVerdict — our mission, our team, and why we believe in honest, community-driven reviews.',
};

export default function AboutPage() {
  const values = [
    { icon: <Target size={28} />, title: 'Honest First', desc: 'We never sugarcoat. Every review is our genuine, unfiltered opinion backed by thorough testing.' },
    { icon: <Users size={28} />, title: 'Community Driven', desc: 'Your comments, likes, and feedback shape what we review next. This platform is built for you.' },
    { icon: <Heart size={28} />, title: 'Passion Led', desc: 'We only review what excites us. Our curiosity across products, travel, food, and culture keeps us going.' },
    { icon: <Award size={28} />, title: 'Quality Over Quantity', desc: 'We\'d rather publish one outstanding review than ten mediocre ones. Every piece is crafted with care.' },
  ];

  return (
    <div className="static-page">
      <div className="container">
        <div className="static-page-header animate-fadeInUp">
          <h1 className="static-page-title">
            About <span className="gradient-text">VantageVerdict</span>
          </h1>
          <p className="static-page-subtitle">
            We&apos;re a team of curious minds who believe the best decisions come from honest, well-researched reviews. No fluff. No paid opinions. Just real verdicts.
          </p>
        </div>

        {/* Values Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {values.map((v, i) => (
            <div key={i} className="card animate-fadeInUp" style={{ padding: '28px', animationDelay: `${i * 100}ms` }}>
              <div style={{ color: 'var(--color-primary)', marginBottom: '14px' }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '8px' }}>{v.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* What We Cover */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>What We <span className="gradient-text-gold">Cover</span></h2>
          <p style={{ color: 'var(--color-text-tertiary)', marginBottom: '32px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            Five categories, infinite discoveries
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.slug}
                className="card animate-fadeInUp"
                style={{ padding: '24px', textAlign: 'center', animationDelay: `${i * 80}ms` }}
              >
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>{cat.icon}</span>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>{cat.name}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>{cat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card-elevated animate-fadeInUp" style={{
          textAlign: 'center',
          padding: '48px 32px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(139, 92, 246, 0.04))',
          borderColor: 'var(--color-border-accent)',
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Want to Contribute?</h2>
          <p style={{ color: 'var(--color-text-tertiary)', marginBottom: '24px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            We&apos;re always looking for passionate writers. If you love reviewing things, we&apos;d love to hear from you.
          </p>
          <a href="/contact" className="btn btn-primary btn-lg">Get in Touch</a>
        </div>
      </div>
    </div>
  );
}
