import { render, screen } from '@testing-library/react';
import Features from '@/components/landing/Features';

describe('Features', () => {
  it('renders section heading', () => {
    render(<Features />);
    expect(
      screen.getByRole('heading', { name: /features/i })
    ).toBeInTheDocument();
  });

  describe('AI Features (highlighted)', () => {
    it('renders AI Disc Identification feature', () => {
      render(<Features />);
      expect(screen.getByText(/ai disc identification/i)).toBeInTheDocument();
      expect(
        screen.getByText(/snap a photo.*instantly identify/i)
      ).toBeInTheDocument();
    });

    it('renders AI Shot Advisor feature', () => {
      render(<Features />);
      expect(screen.getByText(/ai shot advisor/i)).toBeInTheDocument();
      expect(
        screen.getByText(/photograph any hole.*disc recommendation/i)
      ).toBeInTheDocument();
    });

    it('renders powered by AI badge', () => {
      render(<Features />);
      expect(screen.getAllByText(/powered by ai/i).length).toBeGreaterThan(0);
    });
  });

  describe('Standard Features', () => {
    it('renders six standard feature cards', () => {
      render(<Features />);
      expect(screen.getByText(/qr code scanning/i)).toBeInTheDocument();
      expect(screen.getByText(/disc inventory/i)).toBeInTheDocument();
      expect(screen.getByText(/recovery workflow/i)).toBeInTheDocument();
      expect(screen.getByText(/reward system/i)).toBeInTheDocument();
      expect(screen.getByText(/rich catalog/i)).toBeInTheDocument();
      expect(screen.getByText(/order tracking/i)).toBeInTheDocument();
    });

    it('renders feature descriptions', () => {
      render(<Features />);
      expect(
        screen.getByText(/instantly identify any registered disc/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/track your entire collection/i)
      ).toBeInTheDocument();
    });
  });

  it('has proper section id for navigation', () => {
    render(<Features />);
    const section = screen.getByRole('region', { name: /features/i });
    expect(section).toHaveAttribute('id', 'features');
  });
});
