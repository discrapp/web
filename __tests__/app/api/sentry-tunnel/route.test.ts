/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/sentry-tunnel/route';

// Mock global fetch
global.fetch = jest.fn();

describe('/api/sentry-tunnel', () => {
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('POST', () => {
    it('forwards request to Sentry with correct URL', async () => {
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
        'https://o4510563703193600.ingest.us.sentry.io/api/4510563738124288/store/?sentry_key=d49a3b76211657acb27bae4a1dcadbca&sentry_version=7',
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
      mockFetch.mockRejectedValueOnce(new Error('Request timeout'));

      const request = new NextRequest('http://localhost:3000/api/sentry-tunnel', {
        method: 'POST',
        body: 'test body',
      });

      const response = await POST(request);

      expect(response.status).toBe(500);
    });

    it('handles empty request body', async () => {
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
      expect(sentryUrl).toContain('o4510563703193600.ingest.us.sentry.io');
      expect(sentryUrl).toContain('4510563738124288'); // Project ID
      expect(sentryUrl).toContain('d49a3b76211657acb27bae4a1dcadbca'); // Sentry key
      expect(sentryUrl).toContain('sentry_version=7');
    });
  });
});
