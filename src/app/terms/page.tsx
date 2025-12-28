import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Discr',
  description: 'Terms of Service for Discr - the disc golf disc recovery app.',
};

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Effective Date: December 28, 2025
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-zinc-700 dark:text-zinc-300">
            Welcome to Discr. By accessing or using our mobile application and
            website (collectively, the &quot;Service&quot;), you agree to be
            bound by these Terms of Service (&quot;Terms&quot;). Please read
            them carefully.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Acceptance of Terms
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            By creating an account or using the Service, you agree to these
            Terms and our Privacy Policy. If you do not agree to these Terms, do
            not use the Service.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Description of Service
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Discr is a disc golf disc recovery service that uses QR code
            stickers to help reunite lost discs with their owners. The Service
            allows users to register their discs, attach QR code stickers, and
            be contacted when someone finds their lost disc. Discr facilitates
            connection between disc owners and finders but does not guarantee
            the return of any lost disc.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            User Responsibilities
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            When using the Service, you agree to:
          </p>
          <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2">
            <li>Provide accurate and complete information when registering</li>
            <li>
              Keep your account credentials secure and not share them with
              others
            </li>
            <li>Only register discs that you own or are authorized to register</li>
            <li>
              Use the Service in good faith to facilitate disc recovery, not for
              harassment or other harmful purposes
            </li>
            <li>
              Not attempt to reverse engineer, decompile, or otherwise tamper
              with the Service
            </li>
            <li>
              Comply with all applicable laws and regulations when using the
              Service
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            QR Code Stickers
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            QR code stickers purchased through Discr are intended for use on
            disc golf discs only. While we strive to provide durable stickers,
            we cannot guarantee they will remain readable under all conditions.
            Stickers are non-refundable once shipped.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Intellectual Property
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            The Service and its original content, features, and functionality
            are owned by Discr and are protected by international copyright,
            trademark, and other intellectual property laws. The Discr name,
            logo, and all related marks are trademarks of Discr.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            User Content
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            You retain ownership of any content you submit to the Service (such
            as disc photos). By submitting content, you grant Discr a
            non-exclusive, worldwide, royalty-free license to use, display, and
            distribute that content solely for the purpose of operating and
            improving the Service.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Limitation of Liability
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, DISCR SHALL NOT BE LIABLE
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR
            OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
            DISCR DOES NOT GUARANTEE THE RETURN OF ANY LOST DISC AND IS NOT
            RESPONSIBLE FOR THE ACTIONS OF OTHER USERS.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Disclaimer
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
            AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
            SECURE, OR ERROR-FREE.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Termination
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            We may terminate or suspend your account and access to the Service
            immediately, without prior notice, for conduct that we believe
            violates these Terms or is harmful to other users, us, or third
            parties, or for any other reason at our sole discretion. You may
            also delete your account at any time through the app settings.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Changes to Terms
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            We reserve the right to modify these Terms at any time. We will
            notify users of any material changes by posting the updated Terms on
            this page and updating the &quot;Effective Date.&quot; Your
            continued use of the Service after such changes constitutes
            acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Governing Law
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            These Terms shall be governed by and construed in accordance with
            the laws of the United States, without regard to its conflict of law
            provisions.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">
            Contact Us
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            If you have any questions about these Terms, please contact us at:{' '}
            <a
              href="mailto:legal@discrapp.com"
              className="text-violet-600 dark:text-violet-400 hover:underline"
            >
              legal@discrapp.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
