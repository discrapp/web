/**
 * Lightweight error reporter for Sentry
 * Uses Sentry's HTTP API directly instead of the heavy SDK
 */

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

interface ErrorContext {
  [key: string]: unknown;
}

/**
 * Parse the Sentry DSN to get the project ID and public key
 */
function parseDsn(dsn: string): { publicKey: string; projectId: string; host: string } | null {
  try {
    // DSN format: https://<public_key>@<host>/<project_id>
    const url = new URL(dsn);
    const publicKey = url.username;
    const projectId = url.pathname.slice(1);
    const host = url.host;
    return { publicKey, projectId, host };
  } catch {
    return null;
  }
}

/**
 * Report an error to Sentry
 */
export async function reportError(error: Error, context?: ErrorContext): Promise<void> {
  if (!SENTRY_DSN || typeof window === 'undefined') {
    console.error('Error (Sentry disabled):', error, context);
    return;
  }

  const parsed = parseDsn(SENTRY_DSN);
  if (!parsed) {
    console.error('Invalid Sentry DSN:', error);
    return;
  }

  // Use tunnel to bypass ad blockers
  const endpoint = '/api/sentry-tunnel';

  const payload = {
    event_id: crypto.randomUUID().replace(/-/g, ''),
    timestamp: new Date().toISOString(),
    platform: 'javascript',
    level: 'error',
    environment: process.env.NODE_ENV || 'production',
    exception: {
      values: [
        {
          type: error.name,
          value: error.message,
          stacktrace: {
            frames: parseStackTrace(error.stack),
          },
        },
      ],
    },
    request: {
      url: window.location.href,
      headers: {
        'User-Agent': navigator.userAgent,
      },
    },
    extra: context,
    tags: {
      source: 'discr-web',
    },
  };

  try {
    // Use text/plain to avoid CORS preflight
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error('Failed to report error to Sentry:', e);
  }
}

/**
 * Parse a stack trace string into Sentry frame format
 */
function parseStackTrace(stack?: string): Array<{ filename: string; function: string; lineno?: number; colno?: number }> {
  if (!stack) return [];

  const lines = stack.split('\n').slice(1); // Skip the error message line
  return lines
    .map((line) => {
      // Match patterns like "at functionName (filename:line:col)" or "at filename:line:col"
      const match = line.match(/at\s+(?:(.+?)\s+\()?(.+?):(\d+):(\d+)\)?/);
      if (match) {
        return {
          function: match[1] || '<anonymous>',
          filename: match[2],
          lineno: parseInt(match[3], 10),
          colno: parseInt(match[4], 10),
        };
      }
      return null;
    })
    .filter((frame): frame is NonNullable<typeof frame> => frame !== null)
    .reverse(); // Sentry expects frames in reverse order (oldest first)
}

/**
 * Set up global error handlers
 */
export function setupErrorReporting(): void {
  if (typeof window === 'undefined') return;

  // Catch unhandled errors
  window.onerror = (message, source, lineno, colno, error) => {
    if (error) {
      reportError(error, { source, lineno, colno });
    } else {
      reportError(new Error(String(message)), { source, lineno, colno });
    }
  };

  // Catch unhandled promise rejections
  window.onunhandledrejection = (event) => {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    reportError(error, { type: 'unhandledrejection' });
  };
}
