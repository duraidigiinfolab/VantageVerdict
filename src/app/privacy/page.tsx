import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & Affiliate Disclosure',
  description: 'VantageVerdict\'s privacy policy, cookie policy, and affiliate link disclosure.',
};

export default function PrivacyPage() {
  return (
    <div className="static-page">
      <div className="container">
        <div className="static-page-header animate-fadeInUp">
          <h1 className="static-page-title">Privacy Policy</h1>
          <p className="static-page-subtitle">
            Your privacy matters to us. Here&apos;s how we handle your data.
          </p>
        </div>

        <div className="prose" style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div className="card-elevated" style={{ padding: '40px' }}>

            <h2 id="affiliate-disclosure">Affiliate Disclosure</h2>
            <p>
              VantageVerdict is a participant in various affiliate advertising programs. Some of the links on our site are affiliate links, meaning we may earn a small commission if you click through and make a purchase — at no additional cost to you.
            </p>
            <p>
              Our reviews are always honest and independent. Affiliate partnerships never influence our ratings or opinions. We only recommend products and services we genuinely believe in.
            </p>

            <h2>Information We Collect</h2>
            <p>
              When you create an account on VantageVerdict, we collect your email address, display name, and profile information. When you interact with our content (likes, comments, feedback), we store that activity linked to your account.
            </p>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To provide and maintain our service</li>
              <li>To personalize your experience</li>
              <li>To communicate with you about your account or submissions</li>
              <li>To improve our platform based on usage patterns</li>
              <li>To display relevant content and recommendations</li>
            </ul>

            <h2>Cookies</h2>
            <p>
              We use cookies to maintain your session, remember your preferences (such as theme selection), and understand how visitors use our site. We also use third-party cookies from Google Analytics to track anonymous usage statistics.
            </p>

            <h2>Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Supabase</strong> — Authentication and data storage</li>
              <li><strong>Vercel</strong> — Website hosting and deployment</li>
              <li><strong>Google Analytics</strong> — Anonymous usage statistics</li>
              <li><strong>Affiliate networks</strong> — Product link tracking</li>
            </ul>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Withdraw consent for data processing</li>
              <li>Export your data in a portable format</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We take data security seriously. All data is transmitted over HTTPS. Passwords are hashed and never stored in plain text. We regularly review our security practices to ensure your information remains protected.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@vantageverdict.com">privacy@vantageverdict.com</a>.
            </p>

            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-tertiary)', marginTop: '2em', fontStyle: 'italic' }}>
              Last updated: January 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
