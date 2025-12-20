'use client';

import { reportError } from '@/lib/error-reporter';

const DSN_STATUS = process.env.NEXT_PUBLIC_SENTRY_DSN ? 'configured' : 'missing';

export default function TestSentryPage() {
  const triggerError = async () => {
    try {
      throw new Error(`Test Sentry Error from Web ${Date.now()}`);
    } catch (error) {
      if (error instanceof Error) {
        await reportError(error, { page: 'test-sentry', action: 'button-click' });
      }
      alert(`Error sent! DSN status: ${DSN_STATUS}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="mb-8 text-2xl font-bold">Sentry Test Page</h1>
      <p className="mb-4 text-sm text-gray-600">DSN Status: {DSN_STATUS}</p>
      <button
        onClick={triggerError}
        className="rounded-lg bg-red-500 px-6 py-3 text-white hover:bg-red-600"
      >
        Trigger Test Error
      </button>
    </div>
  );
}
