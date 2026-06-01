'use client';

import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function FeedbackPage() {
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
            <MessageSquare size={36} style={{ display: 'inline', color: 'var(--color-primary)', verticalAlign: 'middle', marginRight: '12px' }} />
            Share Your <span className="gradient-text">Feedback</span>
          </h1>
          <p className="static-page-subtitle">
            Your feedback helps us improve. Tell us what you love, what could be better, or suggest content you&apos;d like to see.
          </p>
        </div>

        <div className="feedback-form-wrapper">
          {submitted ? (
            <div className="card-elevated animate-scaleIn" style={{ textAlign: 'center', padding: '60px 32px' }}>
              <CheckCircle size={64} style={{ color: 'var(--color-success)', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Thank You!</h3>
              <p style={{ color: 'var(--color-text-tertiary)', marginBottom: '24px' }}>
                Your feedback has been received. We genuinely appreciate you taking the time to help us improve.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn btn-secondary btn-md"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="feedback-form animate-fadeInUp">
              <h3 style={{ fontSize: '1.25rem' }}>We&apos;re All Ears</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-tertiary)', marginTop: '-8px' }}>
                All fields are required. Your feedback is reviewed by our team.
              </p>

              <Input
                label="Subject"
                placeholder="e.g., Feature suggestion, Bug report, Content request"
                required
                id="feedback-subject"
              />

              <div className="input-group">
                <label className="input-label" htmlFor="feedback-category">Category</label>
                <select
                  id="feedback-category"
                  className="input-field"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>Select a category</option>
                  <option value="general">General Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="content">Content Suggestion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <Textarea
                label="Your Message"
                placeholder="Tell us what's on your mind..."
                rows={6}
                required
                id="feedback-message"
              />

              <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>
                <Send size={16} />
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
