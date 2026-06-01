'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Input from '@/components/ui/Input';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const displayName = formData.get('displayName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: displayName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-scaleIn">
        <div className="auth-header">
          <Link href="/" className="header-logo" style={{ justifyContent: 'center', marginBottom: '20px' }}>
            <span className="header-logo-icon">V</span>
            <span className="header-logo-text">
              Vantage<span className="header-logo-accent">Verdict</span>
            </span>
          </Link>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join VantageVerdict and start engaging with reviews</p>
        </div>

        {/* Google OAuth */}
        <button type="button" className="auth-google-btn" id="google-signup">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="auth-divider">
          <span className="auth-divider-line" />
          <span className="auth-divider-text">or sign up with email</span>
          <span className="auth-divider-line" />
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              {error}
            </div>
          )}
          <Input
            label="Display Name"
            name="displayName"
            type="text"
            placeholder="Your Name"
            icon={<User size={16} />}
            required
            id="signup-name"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            icon={<Mail size={16} />}
            required
            id="signup-email"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Min. 8 characters"
            icon={<Lock size={16} />}
            required
            minLength={8}
            id="signup-password"
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Repeat password"
            icon={<Lock size={16} />}
            required
            minLength={8}
            id="signup-confirm-password"
          />

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--color-text-tertiary)', cursor: 'pointer' }}>
            <input type="checkbox" required style={{ marginTop: '3px', accentColor: 'var(--color-primary)' }} />
            <span>
              I agree to the{' '}
              <Link href="/privacy" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Privacy Policy</Link>
              {' '}and{' '}
              <Link href="/privacy" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Terms of Service</Link>
            </span>
          </label>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="btn-spinner" viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" />
              </svg>
            ) : (
              <UserPlus size={16} />
            )}
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link href="/auth/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
