import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Discr',
  description: 'Privacy Policy for Discr - the disc golf disc recovery app.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-violet-600 dark:text-violet-400 hover:underline mb-8"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
          Privacy Policy
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Effective Date: December 28, 2025
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-zinc-700 dark:text-zinc-300">
            Discr (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
            committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you use our mobile application and website (collectively, the
            &quot;Service&quot;).
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Information We Collect
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            We collect information you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2">
            <li>
              <strong>Account Information:</strong> When you create an account,
              we collect your email address and display name.
            </li>
            <li>
              <strong>Disc Information:</strong> Details about your registered
              discs, including disc name, manufacturer, color, and optional
              photos.
            </li>
            <li>
              <strong>QR Code Data:</strong> Unique codes associated with your
              disc stickers for identification purposes.
            </li>
            <li>
              <strong>Contact Information:</strong> If you choose to be
              contactable, we store the contact method you provide (e.g., phone
              number).
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2">
            <li>Provide, maintain, and improve our Service</li>
            <li>
              Facilitate disc recovery by connecting finders with disc owners
            </li>
            <li>
              Display disc owner information to users who scan QR codes on found
              discs
            </li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>
              Monitor and analyze trends, usage, and activities in connection
              with our Service
            </li>
            <li>Detect, investigate, and prevent fraudulent or unauthorized activity</li>
          </ul>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Information Sharing
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            We share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2">
            <li>
              <strong>Disc Recovery:</strong> When someone scans your
              disc&apos;s QR code, they will see your display name and disc
              information to facilitate return of your disc.
            </li>
            <li>
              <strong>Service Providers:</strong> We may share information with
              third-party vendors who perform services on our behalf, such as
              hosting (Supabase, Cloudflare) and error monitoring (Sentry).
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information
              if required by law or in response to valid legal requests.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Data Security
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            We implement appropriate technical and organizational security
            measures to protect your personal information. However, no method of
            transmission over the Internet or electronic storage is 100% secure.
            While we strive to protect your information, we cannot guarantee its
            absolute security.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Your Rights
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your account and associated data</li>
            <li>Opt out of promotional communications</li>
            <li>
              Export your data in a portable format (available in app settings)
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Children&apos;s Privacy
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Our Service is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13. If you are a parent or guardian and believe your child has
            provided us with personal information, please contact us.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Changes to This Policy
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Effective Date&quot; above.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Contact Us
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            If you have any questions about this Privacy Policy, please contact
            us at:{' '}
            <a
              href="mailto:privacy@discrapp.com"
              className="text-violet-600 dark:text-violet-400 hover:underline"
            >
              privacy@discrapp.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
