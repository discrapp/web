import { render, screen } from '@testing-library/react';
import Footer from '@/components/landing/Footer';

describe('Footer', () => {
  it('renders the logo', () => {
    render(<Footer />);
    expect(screen.getByAltText('Discr')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Footer />);
    expect(screen.getByText('Get Yours Back')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /how it works/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /features/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^order$/i })).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /terms of service/i })).toBeInTheDocument();
  });

  it('renders copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/© \d{4} discr™/i)).toBeInTheDocument();
  });

  it('has contentinfo landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
