import { render, screen } from '@testing-library/react';
import AppScreenshots from '@/components/landing/AppScreenshots';

describe('AppScreenshots', () => {
  it('renders section heading', () => {
    render(<AppScreenshots />);
    expect(
      screen.getByRole('heading', { name: /see discr. in action/i })
    ).toBeInTheDocument();
  });

  it('renders screenshot descriptions', () => {
    render(<AppScreenshots />);
    expect(screen.getByText(/home screen/i)).toBeInTheDocument();
    expect(screen.getByText(/add disc/i)).toBeInTheDocument();
    expect(screen.getByText(/qr scanner/i)).toBeInTheDocument();
    expect(screen.getByText(/my bag/i)).toBeInTheDocument();
  });

  it('has proper section id', () => {
    render(<AppScreenshots />);
    const section = screen.getByRole('region', { name: /see discr. in action/i });
    expect(section).toHaveAttribute('id', 'screenshots');
  });
});
