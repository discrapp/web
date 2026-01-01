/**
 * @jest-environment node
 */

// Mock global fetch
global.fetch = jest.fn();

describe('/api/gofundme', () => {
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    mockFetch.mockClear();
    jest.resetModules();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET', () => {
    it('fetches GoFundMe page and returns campaign data', async () => {
      const { GET } = await import('@/app/api/gofundme/route');

      const mockHtml = `
        <html>
          <head>
            <meta property="og:title" content="Help Launch Discr - GoFundMe" />
          </head>
          <body>
            <div>$50 raised of $450 goal</div>
            <div>1 donation</div>
          </body>
        </html>
      `;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml),
      } as Response);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toMatchObject({
        title: 'Help Launch Discr',
        url: expect.stringContaining('gofundme.com'),
      });
    });

    it('includes cache control headers', async () => {
      const { GET } = await import('@/app/api/gofundme/route');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<html></html>'),
      } as Response);

      const response = await GET();

      expect(response.headers.get('Cache-Control')).toContain('s-maxage=600');
      expect(response.headers.get('Cache-Control')).toContain(
        'stale-while-revalidate'
      );
    });

    it('returns default values when page has no matching data', async () => {
      const { GET } = await import('@/app/api/gofundme/route');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<html>no campaign data here</html>'),
      } as Response);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      // Parser returns default values when no data found
      expect(data.title).toBe('Help Launch Discr');
      expect(data.amountRaised).toBe(0);
      expect(data.goalAmount).toBe(450); // Default goal
      expect(data.url).toContain('gofundme.com');
    });

    it('returns fallback data on network error', async () => {
      const { GET } = await import('@/app/api/gofundme/route');

      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200); // Still returns 200 with fallback
      expect(data.error).toBe(true);
      expect(data.title).toBe('Help Launch Discr');
    });

    it('returns fallback data when GoFundMe returns error status', async () => {
      const { GET } = await import('@/app/api/gofundme/route');

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200); // Still returns 200 with fallback
      expect(data.error).toBe(true);
    });

    it('fetches with correct headers', async () => {
      const { GET } = await import('@/app/api/gofundme/route');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<html></html>'),
      } as Response);

      await GET();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('gofundme.com'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'User-Agent': expect.stringContaining('DiscrBot'),
            Accept: 'text/html',
          }),
        })
      );
    });

    it('parses donation count from page', async () => {
      const { GET } = await import('@/app/api/gofundme/route');

      const mockHtml = `
        <html>
          <body>
            <div>$100 raised of $500 goal</div>
            <div>5 donations</div>
          </body>
        </html>
      `;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml),
      } as Response);

      const response = await GET();
      const data = await response.json();

      expect(data.donationCount).toBe(5);
    });

    it('calculates percent complete correctly', async () => {
      const { GET } = await import('@/app/api/gofundme/route');

      const mockHtml = `
        <html>
          <body>
            <div>$200 raised of $400 goal</div>
          </body>
        </html>
      `;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml),
      } as Response);

      const response = await GET();
      const data = await response.json();

      expect(data.percentComplete).toBe(50);
    });

    it('handles amounts with commas', async () => {
      const { GET } = await import('@/app/api/gofundme/route');

      const mockHtml = `
        <html>
          <body>
            <div>$1,500 raised of $10,000 goal</div>
          </body>
        </html>
      `;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml),
      } as Response);

      const response = await GET();
      const data = await response.json();

      expect(data.amountRaised).toBe(1500);
      expect(data.goalAmount).toBe(10000);
    });
  });
});
