import { render, screen } from '@testing-library/react';
import Navigation from '@/components/landing/Navigation';

describe('Navigation', () => {
  it('renders the logo', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /discr/i })).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /how it works/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /features/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^order$/i })).toBeInTheDocument();
  });

  it('renders download CTA button', () => {
    render(<Navigation />);
    expect(
      screen.getByRole('link', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('has proper navigation landmark', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('links to correct sections', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /how it works/i })).toHaveAttribute(
      'href',
      '#how-it-works'
    );
    expect(screen.getByRole('link', { name: /features/i })).toHaveAttribute(
      'href',
      '#features'
    );
    expect(screen.getByRole('link', { name: /^order$/i })).toHaveAttribute(
      'href',
      '#order'
    );
  });

  it('logo links to home', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /discr/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
