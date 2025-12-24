import { render, screen, act } from '@testing-library/react';
import CheckoutCancelPage from '@/app/checkout-cancel/page';

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

describe('CheckoutCancelPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockSearchParams.delete('order_id');
    jest.spyOn(window, 'close').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('renders payment cancelled message', () => {
    render(<CheckoutCancelPage />);
    expect(screen.getByText('Payment Cancelled')).toBeInTheDocument();
  });

  it('renders cancellation description', () => {
    render(<CheckoutCancelPage />);
    expect(
      screen.getByText('Your payment was cancelled. No charges were made.')
    ).toBeInTheDocument();
  });

  it('renders close window instruction', () => {
    render(<CheckoutCancelPage />);
    expect(
      screen.getByText('You can close this window and return to the app.')
    ).toBeInTheDocument();
  });

  it('displays order ID when provided in search params', () => {
    mockSearchParams.set('order_id', 'order_123');
    render(<CheckoutCancelPage />);
    expect(screen.getByText('Order ID: order_123')).toBeInTheDocument();
  });

  it('does not display order ID when not provided', () => {
    render(<CheckoutCancelPage />);
    expect(screen.queryByText(/Order ID:/)).not.toBeInTheDocument();
  });

  it('renders cancel emoji', () => {
    render(<CheckoutCancelPage />);
    expect(screen.getByText('❌')).toBeInTheDocument();
  });

  it('attempts to close window after 3 seconds', () => {
    render(<CheckoutCancelPage />);

    expect(window.close).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(window.close).toHaveBeenCalled();
  });

  it('clears timeout on unmount', () => {
    const { unmount } = render(<CheckoutCancelPage />);

    unmount();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(window.close).not.toHaveBeenCalled();
  });
});
