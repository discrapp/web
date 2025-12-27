/**
 * @jest-environment node
 */

// This file tests error-reporter behavior in Node.js environment (no window)

// Need to unmock for this test file since we're testing the actual implementation
jest.unmock('@/lib/error-reporter');

describe('error-reporter in Node environment', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('setupErrorReporting returns early when window is undefined', async () => {
    // Set valid DSN
    process.env.NEXT_PUBLIC_SENTRY_DSN = 'https://publickey@sentry.io/123';

    const { setupErrorReporting } = await import('@/lib/error-reporter');

    // In Node environment, window is undefined, so this should return early
    // without throwing or setting up handlers
    expect(() => setupErrorReporting()).not.toThrow();
  });

  it('reportError logs to console when window is undefined', async () => {
    const mockConsoleError = jest.fn();
    console.error = mockConsoleError;

    // Set valid DSN
    process.env.NEXT_PUBLIC_SENTRY_DSN = 'https://publickey@sentry.io/123';

    const { reportError } = await import('@/lib/error-reporter');

    const error = new Error('Test error');
    await reportError(error, { context: 'test' });

    // Should log to console since window is undefined
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Error (Sentry disabled):',
      error,
      { context: 'test' }
    );
  });
});
