import { render, screen } from '@testing-library/react';
import NotFound, { metadata } from '@/app/not-found';

describe('NotFound (404 Page)', () => {
  describe('metadata', () => {
    it('has correct title', () => {
      expect(metadata.title).toBe('404 - Page Not Found | Discr');
    });

    it('has correct description', () => {
      expect(metadata.description).toBe(
        'The page you are looking for could not be found.'
      );
    });
  });

  it('renders the 404 heading', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  });

  it('renders a page not found message', () => {
    render(<NotFound />);
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it('renders a descriptive message', () => {
    render(<NotFound />);
    expect(
      screen.getByText(/the page you're looking for doesn't exist/i)
    ).toBeInTheDocument();
  });

  it('renders a link to go back home', () => {
    render(<NotFound />);
    const homeLink = screen.getByRole('link', { name: /go back home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('has proper accessibility structure', () => {
    render(<NotFound />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
