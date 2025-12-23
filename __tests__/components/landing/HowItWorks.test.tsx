import { render, screen } from '@testing-library/react';
import HowItWorks from '@/components/landing/HowItWorks';

describe('HowItWorks', () => {
  it('renders section heading', () => {
    render(<HowItWorks />);
    expect(
      screen.getByRole('heading', { name: /how it works/i })
    ).toBeInTheDocument();
  });

  it('renders three steps', () => {
    render(<HowItWorks />);
    expect(screen.getByText(/order stickers/i)).toBeInTheDocument();
    expect(screen.getByText(/attach & register/i)).toBeInTheDocument();
    expect(screen.getByText(/get them back/i)).toBeInTheDocument();
  });

  it('renders step descriptions', () => {
    render(<HowItWorks />);
    expect(
      screen.getByText(/qr code stickers delivered to your door/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/apply to discs, register in the app/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/finders scan the code and contact you/i)
    ).toBeInTheDocument();
  });

  it('has proper section id for navigation', () => {
    render(<HowItWorks />);
    const section = screen.getByRole('region', { name: /how it works/i });
    expect(section).toHaveAttribute('id', 'how-it-works');
  });

  it('renders step numbers', () => {
    render(<HowItWorks />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
