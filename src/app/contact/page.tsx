'use client';

import React, { useState } from 'react';
import type { Metadata } from 'next';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="static-page">
      <div className="container">
        <div className="static-page-header animate-fadeInUp">
          <h1 className="static-page-title">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="static-page-subtitle">
            Have a question, suggestion, or want to collaborate? We&apos;d love to hear from you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', maxWidth: '900px', margin: '0 auto' }}>
          {/* Contact Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0 }}>
                <Mail size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '2px' }}>Email</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>hello@vantageverdict.com</p>
              </div>
            </div>
            <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                <MapPin size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '2px' }}>Location</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>India</p>
              </div>
            </div>
            <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', flexShrink: 0 }}>
                <Phone size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '2px' }}>Social</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>@vantageverdict</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-elevated" style={{ padding: '36px' }}>
            {submitted ? (
              <div className="animate-scaleIn" style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle size={56} style={{ color: 'var(--color-success)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Message Sent!</h3>
                <p style={{ color: 'var(--color-text-tertiary)' }}>We&apos;ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Send us a message</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <Input label="Your Name" placeholder="John Doe" required id="contact-name" />
                  <Input label="Email" type="email" placeholder="john@example.com" required id="contact-email" />
                </div>
                <Input label="Subject" placeholder="What's this about?" required id="contact-subject" />
                <Textarea label="Message" placeholder="Tell us what's on your mind..." rows={5} required id="contact-message" />
                <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
