'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-violet-900 dark:text-violet-100 mb-4">
          Something went wrong
        </h2>
        <p className="text-violet-700 dark:text-violet-300 mb-6">
          We encountered an error loading this page.
        </p>
        <button
          onClick={reset}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
