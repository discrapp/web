import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Discr',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-violet-600 dark:text-violet-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Page Not Found
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
