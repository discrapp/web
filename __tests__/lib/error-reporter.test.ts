/**
 * @jest-environment jsdom
 */

// Need to unmock for this test file since we're testing the actual implementation
jest.unmock('@/lib/error-reporter');

type ReportErrorFn = (error: Error, context?: Record<string, unknown>) => Promise<void>;
type SetupErrorReportingFn = () => void;

let reportError: ReportErrorFn;
let setupErrorReporting: SetupErrorReportingFn;

// Dynamically import after setting environment variable
beforeAll(async () => {
  // Set environment before importing to ensure DSN is available
  process.env.NEXT_PUBLIC_SENTRY_DSN = 'https://publickey@sentry.io/123';

  // Reset modules to force re-import with new env variable
  jest.resetModules();

  // Now import the functions
  const errorReporterModule = await import('@/lib/error-reporter');
  reportError = errorReporterModule.reportError;
  setupErrorReporting = errorReporterModule.setupErrorReporting;
});

// Mock PromiseRejectionEvent for jsdom
class MockPromiseRejectionEvent extends Event {
  promise: Promise<unknown>;
  reason: unknown;

  constructor(type: string, init: { promise: Promise<unknown>; reason: unknown }) {
    super(type);
    this.promise = init.promise;
    this.reason = init.reason;
  }
}

(global as unknown as { PromiseRejectionEvent: typeof MockPromiseRejectionEvent }).PromiseRejectionEvent = MockPromiseRejectionEvent;

describe('error-reporter', () => {
  const mockFetch = jest.fn();
  const mockConsoleError = jest.fn();

  beforeEach(() => {
    // Mock fetch globally
    global.fetch = mockFetch;

    // Mock console.error to avoid cluttering test output
    console.error = mockConsoleError;

    // Reset mocks
    mockFetch.mockClear();
    mockConsoleError.mockClear();

    // Reset window event handlers
    window.onerror = null;
    window.onunhandledrejection = null;

    // Mock crypto.randomUUID
    Object.defineProperty(global, 'crypto', {
      value: {
        randomUUID: jest.fn(() => '12345678-1234-1234-1234-123456789012'),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('reportError', () => {
    it('reports error to /api/sentry-tunnel when DSN is set', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      const error = new Error('Test error');
      error.stack = 'Error: Test error\n    at testFunc (file.js:10:5)';

      await reportError(error, { customKey: 'customValue' });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/sentry-tunnel',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
          },
        })
      );

      const callArgs = mockFetch.mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);

      expect(payload).toMatchObject({
        event_id: expect.any(String),
        timestamp: expect.any(String),
        platform: 'javascript',
        level: 'error',
        environment: expect.any(String),
        exception: {
          values: [
            {
              type: 'Error',
              value: 'Test error',
              stacktrace: {
                frames: expect.any(Array),
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
        extra: { customKey: 'customValue' },
        tags: {
          source: 'discr-web',
        },
      });
    });

    it('includes context in extra field', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      const error = new Error('Test error');
      const context = { userId: '123', action: 'button-click' };

      await reportError(error, context);

      const callArgs = mockFetch.mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);

      expect(payload.extra).toEqual(context);
    });

    it('handles fetch errors gracefully', async () => {
      const fetchError = new Error('Network error');
      mockFetch.mockRejectedValueOnce(fetchError);

      const error = new Error('Test error');
      await reportError(error);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Failed to report error to Sentry:',
        fetchError
      );
    });

    it('parses stack trace correctly', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      const error = new Error('Test error');
      error.stack = `Error: Test error
    at functionName (http://localhost:3000/file.js:10:5)
    at anotherFunction (http://localhost:3000/other.js:20:15)
    at <anonymous> (http://localhost:3000/main.js:30:25)`;

      await reportError(error);

      const callArgs = mockFetch.mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);

      expect(payload.exception.values[0].stacktrace.frames).toEqual([
        {
          function: '<anonymous>',
          filename: 'http://localhost:3000/main.js',
          lineno: 30,
          colno: 25,
        },
        {
          function: 'anotherFunction',
          filename: 'http://localhost:3000/other.js',
          lineno: 20,
          colno: 15,
        },
        {
          function: 'functionName',
          filename: 'http://localhost:3000/file.js',
          lineno: 10,
          colno: 5,
        },
      ]);
    });

    it('handles errors with no stack trace', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      const error = new Error('Test error');
      delete error.stack;

      await reportError(error);

      const callArgs = mockFetch.mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);

      expect(payload.exception.values[0].stacktrace.frames).toEqual([]);
    });

    it('handles Chrome stack trace format', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      const error = new Error('Test error');
      error.stack = `Error: Test error
    at Object.fn (webpack-internal:///./src/file.ts:45:23)`;

      await reportError(error);

      const callArgs = mockFetch.mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);

      expect(payload.exception.values[0].stacktrace.frames[0]).toMatchObject({
        function: 'Object.fn',
        filename: 'webpack-internal:///./src/file.ts',
        lineno: 45,
        colno: 23,
      });
    });
  });

  describe('setupErrorReporting', () => {
    it('sets up window.onerror handler', () => {
      expect(window.onerror).toBeNull();

      setupErrorReporting();

      expect(window.onerror).toBeInstanceOf(Function);
    });

    it('sets up window.onunhandledrejection handler', () => {
      expect(window.onunhandledrejection).toBeNull();

      setupErrorReporting();

      expect(window.onunhandledrejection).toBeInstanceOf(Function);
    });

    it('catches unhandled errors via window.onerror', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      setupErrorReporting();

      const error = new Error('Unhandled error');
      window.onerror!('Unhandled error', 'file.js', 10, 5, error);

      // Wait for async reportError
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const callArgs = mockFetch.mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);

      expect(payload.exception.values[0].value).toBe('Unhandled error');
      expect(payload.extra).toMatchObject({
        source: 'file.js',
        lineno: 10,
        colno: 5,
      });
    });

    it('creates error from message when error object is missing', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      setupErrorReporting();

      window.onerror!('Error message', 'file.js', 10, 5, undefined);

      // Wait for async reportError
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const callArgs = mockFetch.mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);

      expect(payload.exception.values[0].value).toBe('Error message');
    });

    it('catches unhandled promise rejections', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      setupErrorReporting();

      const error = new Error('Promise rejection');
      // Create a resolved promise to avoid unhandled rejection warnings
      const dummyPromise = Promise.resolve();
      const event = new MockPromiseRejectionEvent('unhandledrejection', {
        promise: dummyPromise,
        reason: error,
      });

      window.onunhandledrejection!(event as PromiseRejectionEvent);

      // Wait for async reportError
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const callArgs = mockFetch.mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);

      expect(payload.exception.values[0].value).toBe('Promise rejection');
      expect(payload.extra).toMatchObject({
        type: 'unhandledrejection',
      });
    });

    it('converts non-Error rejections to Error objects', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      setupErrorReporting();

      // Create a resolved promise to avoid unhandled rejection warnings
      const dummyPromise = Promise.resolve();
      const event = new MockPromiseRejectionEvent('unhandledrejection', {
        promise: dummyPromise,
        reason: 'String rejection',
      });

      window.onunhandledrejection!(event as PromiseRejectionEvent);

      // Wait for async reportError
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const callArgs = mockFetch.mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);

      expect(payload.exception.values[0].value).toBe('String rejection');
    });
  });
});

describe('error-reporter without DSN', () => {
  const mockConsoleError = jest.fn();

  beforeAll(() => {
    console.error = mockConsoleError;
  });

  beforeEach(() => {
    mockConsoleError.mockClear();
  });

  it('logs error when Sentry DSN is not set', async () => {
    // Reset modules and clear DSN
    jest.resetModules();
    delete process.env.NEXT_PUBLIC_SENTRY_DSN;

    const { reportError: reportErrorNoDsn } = await import(
      '@/lib/error-reporter'
    );

    const error = new Error('Test error');
    await reportErrorNoDsn(error, { context: 'test' });

    expect(mockConsoleError).toHaveBeenCalledWith(
      'Error (Sentry disabled):',
      error,
      { context: 'test' }
    );
  });

  it('logs error when DSN is invalid', async () => {
    // Reset modules and set invalid DSN
    jest.resetModules();
    process.env.NEXT_PUBLIC_SENTRY_DSN = 'not-a-valid-url';

    const { reportError: reportErrorInvalidDsn } = await import(
      '@/lib/error-reporter'
    );

    const error = new Error('Test error');
    await reportErrorInvalidDsn(error);

    expect(mockConsoleError).toHaveBeenCalledWith('Invalid Sentry DSN:', error);
  });
});

describe('error-reporter NODE_ENV fallback', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
    mockFetch.mockClear();

    Object.defineProperty(global, 'crypto', {
      value: {
        randomUUID: jest.fn(() => '12345678-1234-1234-1234-123456789012'),
      },
      writable: true,
    });
  });

  it('uses production as default environment when NODE_ENV is undefined', async () => {
    // Reset modules
    jest.resetModules();

    // Save original NODE_ENV
    const originalNodeEnv = process.env.NODE_ENV;

    // Delete NODE_ENV to test fallback
    delete process.env.NODE_ENV;

    // Set valid DSN
    process.env.NEXT_PUBLIC_SENTRY_DSN = 'https://publickey@sentry.io/123';

    const { reportError: reportErrorNoEnv } = await import(
      '@/lib/error-reporter'
    );

    mockFetch.mockResolvedValueOnce({ ok: true });

    const error = new Error('Test error');
    await reportErrorNoEnv(error);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const callArgs = mockFetch.mock.calls[0];
    const payload = JSON.parse(callArgs[1].body);

    expect(payload.environment).toBe('production');

    // Restore NODE_ENV
    process.env.NODE_ENV = originalNodeEnv;
  });
});
