/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

// Mock global fetch
global.fetch = jest.fn();

// Test environment variables
const TEST_SENTRY_HOST = 'o4510563703193600.ingest.us.sentry.io';
const TEST_SENTRY_PROJECT_ID = '4510563738124288';
const TEST_SENTRY_PUBLIC_KEY = 'd49a3b76211657acb27bae4a1dcadbca';

describe('/api/sentry-tunnel', () => {
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
  let originalEnv: NodeJS.ProcessEnv;

  beforeAll(() => {
    originalEnv = { ...process.env };
    // Set environment variables for tests
    process.env.SENTRY_HOST = TEST_SENTRY_HOST;
    process.env.SENTRY_PROJECT_ID = TEST_SENTRY_PROJECT_ID;
    process.env.SENTRY_PUBLIC_KEY = TEST_SENTRY_PUBLIC_KEY;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  beforeEach(() => {
    mockFetch.mockClear();
    // Reset module to pick up fresh env vars
    jest.resetModules();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('POST', () => {
    it('forwards request to Sentry with correct URL', async () => {
      const { POST } = await import('@/app/api/sentry-tunnel/route');
      const requestBody = JSON.stringify({
        event_id: 'test-event-123',
        message: 'Test error',
      });

      mockFetch.mockResolvedValueOnce({
        status: 200,
        ok: true,
      } as Response);

      const request = new NextRequest('http://localhost:3000/api/sentry-tunnel', {
        method: 'POST',
        body: requestBody,
      });

      await POST(request);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `https://${TEST_SENTRY_HOST}/api/${TEST_SENTRY_PROJECT_ID}/store/?sentry_key=${TEST_SENTRY_PUBLIC_KEY}&sentry_version=7`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
          },
          body: requestBody,
        })
      );
    });

    it('forwards request body to Sentry', async () => {
      const { POST } = await import('@/app/api/sentry-tunnel/route');
      const requestBody = JSON.stringify({
        event_id: 'test-event-456',
        exception: {
          values: [{ type: 'Error', value: 'Test exception' }],
        },
      });

      mockFetch.mockResolvedValueOnce({
        status: 200,
        ok: true,
      } as Response);

      const request = new NextRequest('http://localhost:3000/api/sentry-tunnel', {
        method: 'POST',
        body: requestBody,
      });

      await POST(request);

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1]?.body).toBe(requestBody);
    });

    it('returns Sentry response status on success', async () => {
      const { POST } = await import('@/app/api/sentry-tunnel/route');
      mockFetch.mockResolvedValueOnce({
        status: 200,
        ok: true,
      } as Response);

      const request = new NextRequest('http://localhost:3000/api/sentry-tunnel', {
        method: 'POST',
        body: 'test body',
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(await response.text()).toBe('');
    });

    it('returns Sentry response status when Sentry returns error', async () => {
      const { POST } = await import('@/app/api/sentry-tunnel/route');
      mockFetch.mockResolvedValueOnce({
        status: 400,
        ok: false,
      } as Response);

      const request = new NextRequest('http://localhost:3000/api/sentry-tunnel', {
        method: 'POST',
        body: 'invalid body',
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it('returns 500 on network error', async () => {
      const { POST } = await import('@/app/api/sentry-tunnel/route');
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const request = new NextRequest('http://localhost:3000/api/sentry-tunnel', {
        method: 'POST',
        body: 'test body',
      });

      const response = await POST(request);

      expect(response.status).toBe(500);
      expect(await response.text()).toBe('');
    });

    it('returns 500 on fetch timeout', async () => {
      const { POST } = await import('@/app/api/sentry-tunnel/route');
      mockFetch.mockRejectedValueOnce(new Error('Request timeout'));

      const request = new NextRequest('http://localhost:3000/api/sentry-tunnel', {
        method: 'POST',
        body: 'test body',
      });

      const response = await POST(request);

      expect(response.status).toBe(500);
    });

    it('handles empty request body', async () => {
      const { POST } = await import('@/app/api/sentry-tunnel/route');
      mockFetch.mockResolvedValueOnce({
        status: 200,
        ok: true,
      } as Response);

      const request = new NextRequest('http://localhost:3000/api/sentry-tunnel', {
        method: 'POST',
        body: '',
      });

      const response = await POST(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: '',
        })
      );
      expect(response.status).toBe(200);
    });

    it('uses correct Sentry project configuration', async () => {
      const { POST } = await import('@/app/api/sentry-tunnel/route');
      mockFetch.mockResolvedValueOnce({
        status: 200,
        ok: true,
      } as Response);

      const request = new NextRequest('http://localhost:3000/api/sentry-tunnel', {
        method: 'POST',
        body: 'test',
      });

      await POST(request);

      const sentryUrl = mockFetch.mock.calls[0][0] as string;

      // Verify the URL contains the correct components
      expect(sentryUrl).toContain(TEST_SENTRY_HOST);
      expect(sentryUrl).toContain(TEST_SENTRY_PROJECT_ID);
      expect(sentryUrl).toContain(TEST_SENTRY_PUBLIC_KEY);
      expect(sentryUrl).toContain('sentry_version=7');
    });

    it('returns 500 when configuration is missing', async () => {
      // Clear environment variables
      const savedHost = process.env.SENTRY_HOST;
      const savedProjectId = process.env.SENTRY_PROJECT_ID;
      const savedKey = process.env.SENTRY_PUBLIC_KEY;

      delete process.env.SENTRY_HOST;
      delete process.env.SENTRY_PROJECT_ID;
      delete process.env.SENTRY_PUBLIC_KEY;

      // Reset modules to pick up missing env vars
      jest.resetModules();
      const { POST } = await import('@/app/api/sentry-tunnel/route');

      const request = new NextRequest('http://localhost:3000/api/sentry-tunnel', {
        method: 'POST',
        body: 'test',
      });

      const response = await POST(request);

      expect(response.status).toBe(500);
      expect(mockFetch).not.toHaveBeenCalled();

      // Restore environment variables
      process.env.SENTRY_HOST = savedHost;
      process.env.SENTRY_PROJECT_ID = savedProjectId;
      process.env.SENTRY_PUBLIC_KEY = savedKey;
    });
  });
});
