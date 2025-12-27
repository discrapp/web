import { render, screen } from '@testing-library/react';
import AIFeature from '@/components/landing/AIFeature';

describe('AIFeature', () => {
  it('renders the section heading', () => {
    render(<AIFeature />);
    expect(
      screen.getByRole('heading', { name: /identify any disc/i })
    ).toBeInTheDocument();
  });

  it('renders the powered by AI badge', () => {
    render(<AIFeature />);
    expect(screen.getByText(/powered by ai/i)).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<AIFeature />);
    expect(
      screen.getByText(/snap a photo and let our ai instantly identify/i)
    ).toBeInTheDocument();
  });

  it('renders feature bullet points', () => {
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
    const section = screen.getByRole('region', { name: /identify any disc/i });
    expect(section).toHaveAttribute('id', 'ai-feature');
  });
});
