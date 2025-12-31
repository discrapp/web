import { NextRequest, NextResponse } from 'next/server';

const SENTRY_HOST = process.env.SENTRY_HOST;
const SENTRY_PROJECT_ID = process.env.SENTRY_PROJECT_ID;
const SENTRY_KEY = process.env.SENTRY_PUBLIC_KEY;

export async function POST(request: NextRequest) {
  if (!SENTRY_HOST || !SENTRY_PROJECT_ID || !SENTRY_KEY) {
    console.error('Sentry tunnel configuration missing');
    return new NextResponse(null, { status: 500 });
  }

  try {
    const body = await request.text();

    // Forward to Sentry
    const sentryResponse = await fetch(
      `https://${SENTRY_HOST}/api/${SENTRY_PROJECT_ID}/store/?sentry_key=${SENTRY_KEY}&sentry_version=7`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
        },
        body,
      }
    );

    return new NextResponse(null, { status: sentryResponse.status });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
