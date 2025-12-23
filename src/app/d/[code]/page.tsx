'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { reportError } from '@/lib/error-reporter';

interface DiscData {
  found: boolean;
  disc?: {
    name: string;
    manufacturer: string;
    color?: string;
    photo_url?: string;
  };
  owner_display_name?: string;
  is_claimable?: boolean;
}

const API_URL =
  'https://xhaogdigrsiwxdjmjzgx.supabase.co/functions/v1/lookup-qr-code';

// Color map matching the mobile app
const COLOR_MAP: Record<string, string> = {
  Red: '#E74C3C',
  Orange: '#E67E22',
  Yellow: '#F1C40F',
  Green: '#2ECC71',
  Blue: '#3498DB',
  Purple: '#9B59B6',
  Pink: '#E91E63',
  White: '#ECF0F1',
  Black: '#2C3E50',
  Gray: '#95A5A6',
  Multi: 'rainbow',
};

function ColorDot({ color }: { color: string }) {
  const colorValue = COLOR_MAP[color];

  if (colorValue === 'rainbow') {
    return (
      <span
        className="inline-block w-4 h-4 rounded-full mr-2 align-middle"
        style={{
          background:
            'conic-gradient(#E74C3C 0deg 90deg, #F1C40F 90deg 180deg, #2ECC71 180deg 270deg, #3498DB 270deg 360deg)',
        }}
      />
    );
  }

  if (colorValue) {
    return (
      <span
        className="inline-block w-4 h-4 rounded-full mr-2 align-middle border border-gray-300"
        style={{ backgroundColor: colorValue }}
      />
    );
  }

  return null;
}

export default function DiscLandingPage() {
  const params = useParams();
  const code = params?.code as string;
  const [data, setData] = useState<DiscData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Copy code to clipboard for deferred deep linking
  const copyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code.toUpperCase());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code.toUpperCase();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (!code) return;

    // Store code for potential same-browser return
    localStorage.setItem('discr_deferred_code', code.toUpperCase());

    // Auto-copy to clipboard for deferred deep linking
    navigator.clipboard.writeText(code.toUpperCase()).catch(() => {
      // Silently fail if clipboard access is denied
    });

    const fetchDisc = async () => {
      try {
        const response = await fetch(`${API_URL}?code=${code}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        reportError(err instanceof Error ? err : new Error(String(err)), {
          code,
          operation: 'lookup-qr-code',
        });
        setError('Failed to load disc information');
      } finally {
        setLoading(false);
      }
    };

    fetchDisc();
  }, [code]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
          <p className="text-lg text-violet-700 dark:text-violet-300">
            Looking up disc...
          </p>
        </div>
      </main>
    );
  }

  if (error || !data?.found) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-4 p-8">
          <h1 className="text-2xl font-bold text-violet-900 dark:text-violet-100">
            Disc Not Found
          </h1>
          <p className="text-violet-700 dark:text-violet-300">
            This QR code doesn&apos;t match any registered disc.
          </p>
        </div>
      </main>
    );
  }

  const { disc, owner_display_name } = data;

  return (
    <main className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900 p-4">
      <div className="flex flex-col items-center gap-6 max-w-md w-full">
        {/* Header */}
        <h1 className="text-3xl tracking-tight text-violet-900 dark:text-violet-100">
          <span className="font-black">Ace</span>
          <span className="font-light text-violet-600 dark:text-violet-400">Back</span>
        </h1>

        {/* Disc Photo */}
        {disc?.photo_url && (
          <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg">
            <Image
              src={disc.photo_url}
              alt={disc.name || 'Disc'}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Disc Info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-violet-900 dark:text-violet-100">
            {disc?.name}
          </h2>
          <p className="text-lg text-violet-700 dark:text-violet-300">
            {disc?.manufacturer}
          </p>
          {disc?.color && (
            <span className="inline-flex items-center mt-2 px-3 py-1 bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-100 rounded-full text-sm">
              <ColorDot color={disc.color} />
              {disc.color}
            </span>
          )}
        </div>

        {/* Owner Info */}
        {owner_display_name && (
          <p className="text-violet-600 dark:text-violet-400">
            Belongs to: <span className="font-semibold">{owner_display_name}</span>
          </p>
        )}

        {/* CTA */}
        <div className="bg-violet-50 dark:bg-violet-900/30 rounded-lg p-6 text-center w-full">
          <h3 className="text-xl font-semibold text-violet-900 dark:text-violet-100 mb-2">
            Found this disc?
          </h3>
          <p className="text-violet-700 dark:text-violet-300 mb-4">
            Download Discr™ to help return it to its owner!
          </p>

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <a
              href="#"
              className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Google Play
            </a>
          </div>

          {/* Deferred Deep Link Code */}
          <div className="border-t border-violet-200 dark:border-violet-700 pt-4 mt-4">
            <p className="text-sm text-violet-600 dark:text-violet-400 mb-2">
              After installing, enter this code in the app:
            </p>
            <button
              onClick={copyCodeToClipboard}
              className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-800 px-4 py-2 rounded-lg font-mono text-lg font-bold text-violet-900 dark:text-violet-100 hover:bg-violet-200 dark:hover:bg-violet-700 transition-colors"
            >
              {code.toUpperCase()}
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
            {copied && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                Code copied to clipboard!
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
