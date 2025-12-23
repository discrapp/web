import { render, screen } from '@testing-library/react';
import Testimonials from '@/components/landing/Testimonials';

describe('Testimonials', () => {
  it('renders section heading', () => {
    render(<Testimonials />);
    expect(
      screen.getByRole('heading', { name: /what players are saying/i })
    ).toBeInTheDocument();
  });

  it('renders three testimonials', () => {
    render(<Testimonials />);
    const blockquotes = screen.getAllByRole('blockquote');
    expect(blockquotes).toHaveLength(3);
  });

  it('renders testimonial quotes', () => {
    render(<Testimonials />);
    expect(screen.getByText(/got my favorite destroyer back/i)).toBeInTheDocument();
    expect(screen.getByText(/returned 4 discs to other players/i)).toBeInTheDocument();
    expect(screen.getByText(/stickers are durable/i)).toBeInTheDocument();
  });

  it('renders testimonial names and locations', () => {
    render(<Testimonials />);
    expect(screen.getByText(/mike t\./i)).toBeInTheDocument();
    expect(screen.getByText(/sarah k\./i)).toBeInTheDocument();
    expect(screen.getByText(/jake r\./i)).toBeInTheDocument();
  });
});
