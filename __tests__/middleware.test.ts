/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { middleware, config } from '@/middleware';

describe('middleware', () => {
  it('redirects www.discrapp.com to discrapp.com with 301 status', () => {
    const request = new NextRequest('https://www.discrapp.com/test-path?query=value', {
      headers: {
        host: 'www.discrapp.com',
      },
    });

    const response = middleware(request);

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://discrapp.com/test-path?query=value');
  });

  it('redirects www subdomain with 301 status', () => {
    const request = new NextRequest('https://www.example.com/', {
      headers: {
        host: 'www.example.com',
      },
    });

    const response = middleware(request);

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://example.com/');
  });

  it('preserves URL path during redirect', () => {
    const request = new NextRequest('https://www.discrapp.com/d/abc123', {
      headers: {
        host: 'www.discrapp.com',
      },
    });

    const response = middleware(request);

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://discrapp.com/d/abc123');
  });

  it('preserves query parameters during redirect', () => {
    const request = new NextRequest('https://www.discrapp.com/?foo=bar&baz=qux', {
      headers: {
        host: 'www.discrapp.com',
      },
    });

    const response = middleware(request);

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://discrapp.com/?foo=bar&baz=qux');
  });

  it('preserves both path and query params during redirect', () => {
    const request = new NextRequest('https://www.discrapp.com/d/abc123?ref=qr', {
      headers: {
        host: 'www.discrapp.com',
      },
    });

    const response = middleware(request);

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://discrapp.com/d/abc123?ref=qr');
  });

  it('passes through non-www domains unchanged', () => {
    const request = new NextRequest('https://discrapp.com/test-path', {
      headers: {
        host: 'discrapp.com',
      },
    });

    const response = middleware(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });

  it('handles missing host header by treating as empty string', () => {
    const request = new NextRequest('https://discrapp.com/test-path');

    const response = middleware(request);

    // Missing host should be treated as empty string, which doesn't start with 'www.'
    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });

  it('handles null host header from headers.get', () => {
    const request = new NextRequest('https://discrapp.com/test-path');
    // Mock headers.get to return null
    jest.spyOn(request.headers, 'get').mockReturnValue(null);

    const response = middleware(request);

    // Null host should fallback to empty string
    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });

  it('handles subdomain other than www', () => {
    const request = new NextRequest('https://api.discrapp.com/test', {
      headers: {
        host: 'api.discrapp.com',
      },
    });

    const response = middleware(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });
});

describe('middleware config', () => {
  it('exports a matcher for all paths', () => {
    expect(config).toBeDefined();
    expect(config.matcher).toBe('/:path*');
  });
});
