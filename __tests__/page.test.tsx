import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home (Landing Page)', () => {
  it('renders the Discr logo', () => {
    render(<Home />);
    // Logo appears in Navigation, Hero, and Footer
    const logos = screen.getAllByAltText('Discr');
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the tagline', () => {
    render(<Home />);
    // Tagline appears in both hero and footer
    const taglines = screen.getAllByText('Get Yours Back');
    expect(taglines.length).toBeGreaterThanOrEqual(1);
  });

  it('renders navigation', () => {
    render(<Home />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders all main sections', () => {
    render(<Home />);
    expect(screen.getByRole('region', { name: /hero/i })).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: /how it works/i })
    ).toBeInTheDocument();
    // Multiple sections contain "features" - AI-Powered Features and Features
    expect(
      screen.getAllByRole('region', { name: /features/i }).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole('region', { name: /see discr. in action/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: /protect your discs today/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: /final call to action/i })
    ).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<Home />);
    // There's a main footer and blockquote footers in testimonials
    const footers = screen.getAllByRole('contentinfo');
    expect(footers.length).toBeGreaterThanOrEqual(1);
  });

  it('renders app store badges', () => {
    render(<Home />);
    const appStoreLinks = screen.getAllByRole('link', { name: /app store/i });
    expect(appStoreLinks.length).toBeGreaterThanOrEqual(2);
  });
});
