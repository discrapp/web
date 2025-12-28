import { render, screen } from '@testing-library/react';
import AIFeature from '@/components/landing/AIFeature';

describe('AIFeature', () => {
  describe('Disc Identification Feature', () => {
    it('renders the disc identification heading', () => {
      render(<AIFeature />);
      expect(
        screen.getByRole('heading', { name: /identify any disc/i })
      ).toBeInTheDocument();
    });

    it('renders the powered by AI badge', () => {
      render(<AIFeature />);
      expect(screen.getAllByText(/powered by ai/i).length).toBeGreaterThan(0);
    });

    it('renders the disc identification description', () => {
      render(<AIFeature />);
      expect(
        screen.getByText(/snap a photo and let our ai instantly identify/i)
      ).toBeInTheDocument();
    });

    it('renders disc identification feature bullet points', () => {
      render(<AIFeature />);
      expect(
        screen.getByText(/recognizes stamps, logos, and text/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/auto-fills flight numbers/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/works even with worn or faded stamps/i)
      ).toBeInTheDocument();
    });

    it('renders the identification result mockup', () => {
      render(<AIFeature />);
      expect(screen.getByText(/innova destroyer/i)).toBeInTheDocument();
      expect(screen.getByText(/identified/i)).toBeInTheDocument();
    });

    it('has proper section id for navigation', () => {
      render(<AIFeature />);
      const section = screen.getByRole('region', { name: /ai-powered features/i });
      expect(section).toHaveAttribute('id', 'ai-feature');
    });
  });

  describe('Shot Advisor Feature', () => {
    it('renders the shot advisor heading', () => {
      render(<AIFeature />);
      expect(
        screen.getByRole('heading', { name: /shot advisor/i })
      ).toBeInTheDocument();
    });

    it('renders the shot advisor description', () => {
      render(<AIFeature />);
      expect(
        screen.getByText(/photograph any hole.*recommend the perfect disc/i)
      ).toBeInTheDocument();
    });

    it('renders shot advisor feature bullet points', () => {
      render(<AIFeature />);
      expect(
        screen.getByText(/estimates distance from your photo/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/recommends the best disc from your bag/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/suggests throw type and power/i)
      ).toBeInTheDocument();
    });

    it('renders the shot advisor result mockup', () => {
      render(<AIFeature />);
      expect(screen.getByText(/recommended/i)).toBeInTheDocument();
      expect(screen.getByText(/hyzer/i)).toBeInTheDocument();
    });
  });
});
