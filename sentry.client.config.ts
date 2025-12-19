import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Only enable in production
  enabled: process.env.NODE_ENV === 'production',

  // Performance monitoring - sample 20% of transactions
  tracesSampleRate: 0.2,

  // Set environment
  environment: process.env.NODE_ENV,

  // Capture unhandled promise rejections
  integrations: [Sentry.browserTracingIntegration()],

  // Don't send errors in development
  beforeSend(event) {
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    return event;
  },
});
