import { render, screen } from '@testing-library/react';
import Pricing from '@/components/landing/Pricing';

describe('Pricing', () => {
  it('renders section heading', () => {
    render(<Pricing />);
    expect(
      screen.getByRole('heading', { name: /protect your discs today/i })
    ).toBeInTheDocument();
  });

  it('renders pricing tiers', () => {
    render(<Pricing />);
    // Three pricing tiers
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('$15')).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
  });

  it('renders per sticker text', () => {
    render(<Pricing />);
    // Get the price label specifically (not the feature list item)
    const priceLabels = screen.getAllByText(/per sticker/i);
    expect(priceLabels.length).toBeGreaterThanOrEqual(1);
  });

  it('renders CTA buttons', () => {
    render(<Pricing />);
    const orderButtons = screen.getAllByRole('link', { name: /order now/i });
    expect(orderButtons.length).toBe(3);
  });

  it('has proper section id for navigation', () => {
    render(<Pricing />);
    const section = screen.getByRole('region', {
      name: /protect your discs today/i,
    });
    expect(section).toHaveAttribute('id', 'order');
  });

  it('renders features list', () => {
    render(<Pricing />);
    expect(screen.getByText(/durable weatherproof stickers/i)).toBeInTheDocument();
    expect(screen.getByText(/unique qr code per sticker/i)).toBeInTheDocument();
  });
});
