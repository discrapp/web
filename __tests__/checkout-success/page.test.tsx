import { render, screen } from '@testing-library/react';
import CheckoutSuccessPage from '@/app/checkout-success/page';

// Mock next/navigation
const mockSearchParams = new URLSearchParams();
jest.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
}));

// Suppress the jsdom navigation error
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'object' &&
      args[0] !== null &&
      'type' in args[0] &&
      (args[0] as { type: string }).type === 'not implemented'
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe('CheckoutSuccessPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockSearchParams.delete('order_id');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders payment successful message', () => {
    render(<CheckoutSuccessPage />);
    expect(screen.getByText('Payment Successful!')).toBeInTheDocument();
  });

  it('renders success description', () => {
    render(<CheckoutSuccessPage />);
    expect(
      screen.getByText('Your order has been placed successfully.')
    ).toBeInTheDocument();
  });

  it('renders close window instruction', () => {
    render(<CheckoutSuccessPage />);
    expect(
      screen.getByText('You can close this window and return to the app.')
    ).toBeInTheDocument();
  });

  it('displays order ID when provided in search params', () => {
    mockSearchParams.set('order_id', 'order_789');
    render(<CheckoutSuccessPage />);
    expect(screen.getByText('Order ID: order_789')).toBeInTheDocument();
  });

  it('does not display order ID when not provided', () => {
    render(<CheckoutSuccessPage />);
    expect(screen.queryByText(/Order ID:/)).not.toBeInTheDocument();
  });

  it('renders success emoji', () => {
    render(<CheckoutSuccessPage />);
    expect(screen.getByText('✅')).toBeInTheDocument();
  });
});
