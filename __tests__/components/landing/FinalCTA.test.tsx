import { render, screen } from '@testing-library/react';
import FinalCTA from '@/components/landing/FinalCTA';

describe('FinalCTA', () => {
  it('renders section heading', () => {
    render(<FinalCTA />);
    expect(
      screen.getByRole('heading', { name: /ready to protect your discs/i })
    ).toBeInTheDocument();
  });

  it('renders subtitle text', () => {
    render(<FinalCTA />);
    expect(
      screen.getByText(/join thousands of disc golfers/i)
    ).toBeInTheDocument();
  });

  it('renders app store badges', () => {
    render(<FinalCTA />);
    expect(screen.getByRole('link', { name: /app store/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /google play/i })
    ).toBeInTheDocument();
  });

  it('has proper section id', () => {
    render(<FinalCTA />);
    const section = screen.getByRole('region', { name: /final call to action/i });
    expect(section).toHaveAttribute('id', 'final-cta');
  });
});
