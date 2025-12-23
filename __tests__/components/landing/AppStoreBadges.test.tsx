import { render, screen } from '@testing-library/react';
import AppStoreBadges from '@/components/landing/AppStoreBadges';

describe('AppStoreBadges', () => {
  it('renders App Store link', () => {
    render(<AppStoreBadges />);
    expect(screen.getByRole('link', { name: /app store/i })).toBeInTheDocument();
  });

  it('renders Google Play link', () => {
    render(<AppStoreBadges />);
    expect(
      screen.getByRole('link', { name: /google play/i })
    ).toBeInTheDocument();
  });

  it('has correct App Store href', () => {
    render(<AppStoreBadges />);
    const appStoreLink = screen.getByRole('link', { name: /app store/i });
    expect(appStoreLink).toHaveAttribute('href', expect.stringContaining('#'));
  });

  it('has correct Google Play href', () => {
    render(<AppStoreBadges />);
    const googlePlayLink = screen.getByRole('link', { name: /google play/i });
    expect(googlePlayLink).toHaveAttribute('href', expect.stringContaining('#'));
  });

  it('opens links in new tab', () => {
    render(<AppStoreBadges />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('applies custom className when provided', () => {
    const { container } = render(<AppStoreBadges className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
