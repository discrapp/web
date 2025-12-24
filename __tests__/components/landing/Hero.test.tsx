import { render, screen } from '@testing-library/react';
import Hero from '@/components/landing/Hero';

describe('Hero', () => {
  it('renders the logo', () => {
    render(<Hero />);
    expect(screen.getByAltText('Discr')).toBeInTheDocument();
  });

  it('has a hero section with proper structure', () => {
    render(<Hero />);
    const section = screen.getByRole('region', { name: /hero/i });
    expect(section).toBeInTheDocument();
  });

  it('renders the subtitle description', () => {
    render(<Hero />);
    expect(
      screen.getByText(/qr code stickers for disc golf disc recovery/i)
    ).toBeInTheDocument();
  });

  it('renders app store badges', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /app store/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /google play/i })
    ).toBeInTheDocument();
  });

  it('renders learn more link', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /learn more/i })).toBeInTheDocument();
  });

  it('learn more link scrolls to how-it-works section', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute(
      'href',
      '#how-it-works'
    );
  });

  it('has proper section id for navigation', () => {
    render(<Hero />);
    const section = screen.getByRole('region', { name: /hero/i });
    expect(section).toHaveAttribute('id', 'hero');
  });
});
