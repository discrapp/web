import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  it('returns an array of sitemap entries', () => {
    const result = sitemap();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('includes the home page with highest priority', () => {
    const result = sitemap();
    const homePage = result.find((entry) => entry.url === 'https://discrapp.com');

    expect(homePage).toBeDefined();
    expect(homePage?.priority).toBe(1);
    expect(homePage?.changeFrequency).toBe('weekly');
  });

  it('includes checkout success page', () => {
    const result = sitemap();
    const checkoutSuccess = result.find(
      (entry) => entry.url === 'https://discrapp.com/checkout-success'
    );

    expect(checkoutSuccess).toBeDefined();
    expect(checkoutSuccess?.priority).toBe(0.3);
    expect(checkoutSuccess?.changeFrequency).toBe('monthly');
  });

  it('includes checkout cancel page', () => {
    const result = sitemap();
    const checkoutCancel = result.find(
      (entry) => entry.url === 'https://discrapp.com/checkout-cancel'
    );

    expect(checkoutCancel).toBeDefined();
    expect(checkoutCancel?.priority).toBe(0.3);
    expect(checkoutCancel?.changeFrequency).toBe('monthly');
  });

  it('includes privacy policy page', () => {
    const result = sitemap();
    const privacy = result.find(
      (entry) => entry.url === 'https://discrapp.com/privacy'
    );

    expect(privacy).toBeDefined();
    expect(privacy?.priority).toBe(0.5);
    expect(privacy?.changeFrequency).toBe('yearly');
  });

  it('includes terms of service page', () => {
    const result = sitemap();
    const terms = result.find(
      (entry) => entry.url === 'https://discrapp.com/terms'
    );

    expect(terms).toBeDefined();
    expect(terms?.priority).toBe(0.5);
    expect(terms?.changeFrequency).toBe('yearly');
  });

  it('includes lastModified date for all entries', () => {
    const result = sitemap();

    result.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
    });
  });
});
