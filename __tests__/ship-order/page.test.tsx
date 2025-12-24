import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShipOrderPage from '@/app/ship-order/page';

// Mock next/navigation
const mockSearchParams = new URLSearchParams();
jest.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
}));

describe('ShipOrderPage', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    mockSearchParams.delete('token');
    global.fetch = mockFetch;
    mockFetch.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('without token', () => {
    it('renders invalid link message', () => {
      render(<ShipOrderPage />);
      expect(screen.getByText('Invalid Link')).toBeInTheDocument();
    });

    it('explains missing token', () => {
      render(<ShipOrderPage />);
      expect(
        screen.getByText('This link is missing the required printer token.')
      ).toBeInTheDocument();
    });

    it('does not show form', () => {
      render(<ShipOrderPage />);
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /mark as shipped/i })
      ).not.toBeInTheDocument();
    });
  });

  describe('with token', () => {
    beforeEach(() => {
      mockSearchParams.set('token', 'printer_token_123');
    });

    it('renders form title', () => {
      render(<ShipOrderPage />);
      expect(screen.getByText('Mark Order as Shipped')).toBeInTheDocument();
    });

    it('renders tracking number input', () => {
      render(<ShipOrderPage />);
      expect(
        screen.getByPlaceholderText('Enter tracking number (optional)')
      ).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<ShipOrderPage />);
      expect(
        screen.getByRole('button', { name: 'Mark as Shipped' })
      ).toBeInTheDocument();
    });

    it('allows entering tracking number', () => {
      render(<ShipOrderPage />);

      const input = screen.getByPlaceholderText(
        'Enter tracking number (optional)'
      );
      fireEvent.change(input, { target: { value: 'TRACK123' } });

      expect(input).toHaveValue('TRACK123');
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      mockSearchParams.set('token', 'printer_token_123');
    });

    it('submits without tracking number', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            order: { order_number: 'ORD-001' },
          }),
      });

      render(<ShipOrderPage />);

      fireEvent.click(screen.getByRole('button', { name: 'Mark as Shipped' }));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          'https://xhaogdigrsiwxdjmjzgx.supabase.co/functions/v1/update-order-status',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              printer_token: 'printer_token_123',
              status: 'shipped',
            }),
          })
        );
      });
    });

    it('submits with tracking number', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            order: { order_number: 'ORD-001' },
          }),
      });

      render(<ShipOrderPage />);

      const input = screen.getByPlaceholderText(
        'Enter tracking number (optional)'
      );
      fireEvent.change(input, { target: { value: 'TRACK456' } });
      fireEvent.click(screen.getByRole('button', { name: 'Mark as Shipped' }));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            body: JSON.stringify({
              printer_token: 'printer_token_123',
              status: 'shipped',
              tracking_number: 'TRACK456',
            }),
          })
        );
      });
    });

    it('shows success message after successful submission', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            order: { order_number: 'ORD-002' },
          }),
      });

      render(<ShipOrderPage />);
      fireEvent.click(screen.getByRole('button', { name: 'Mark as Shipped' }));

      await waitFor(() => {
        expect(screen.getByText('Order Shipped!')).toBeInTheDocument();
      });
      expect(screen.getByText('ORD-002')).toBeInTheDocument();
      expect(screen.getByText('Order marked as shipped!')).toBeInTheDocument();
    });

    it('shows tracking number in success message when provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            order: { order_number: 'ORD-003' },
          }),
      });

      render(<ShipOrderPage />);
      const input = screen.getByPlaceholderText(
        'Enter tracking number (optional)'
      );
      fireEvent.change(input, { target: { value: 'TRACK789' } });
      fireEvent.click(screen.getByRole('button', { name: 'Mark as Shipped' }));

      await waitFor(() => {
        expect(screen.getByText('Order Shipped!')).toBeInTheDocument();
      });
      expect(screen.getByText('TRACK789')).toBeInTheDocument();
    });

    it('shows error message on API failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: 'Order not found' }),
      });

      render(<ShipOrderPage />);
      fireEvent.click(screen.getByRole('button', { name: 'Mark as Shipped' }));

      await waitFor(() => {
        expect(screen.getByText('Update Failed')).toBeInTheDocument();
      });
      expect(screen.getByText('Order not found')).toBeInTheDocument();
    });

    it('shows default error message when API returns no error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({}),
      });

      render(<ShipOrderPage />);
      fireEvent.click(screen.getByRole('button', { name: 'Mark as Shipped' }));

      await waitFor(() => {
        expect(screen.getByText('Update Failed')).toBeInTheDocument();
      });
      expect(screen.getByText('Failed to update order')).toBeInTheDocument();
    });

    it('shows network error message on fetch failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      render(<ShipOrderPage />);
      fireEvent.click(screen.getByRole('button', { name: 'Mark as Shipped' }));

      await waitFor(() => {
        expect(screen.getByText('Update Failed')).toBeInTheDocument();
      });
      expect(
        screen.getByText('Network error. Please try again.')
      ).toBeInTheDocument();
    });

    it('shows Try Again button on error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      render(<ShipOrderPage />);
      fireEvent.click(screen.getByRole('button', { name: 'Mark as Shipped' }));

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Try Again' })
        ).toBeInTheDocument();
      });
    });

    it('returns to form when Try Again is clicked', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      render(<ShipOrderPage />);
      fireEvent.click(screen.getByRole('button', { name: 'Mark as Shipped' }));

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Try Again' })
        ).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));

      expect(screen.getByText('Mark Order as Shipped')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Enter tracking number (optional)')
      ).toBeInTheDocument();
    });

    it('changes input border color on focus and blur', () => {
      render(<ShipOrderPage />);
      const input = screen.getByPlaceholderText(
        'Enter tracking number (optional)'
      );

      // Focus the input
      fireEvent.focus(input);
      expect(input).toHaveStyle({ borderColor: '#667eea' });

      // Blur the input
      fireEvent.blur(input);
      expect(input).toHaveStyle({ borderColor: '#e5e7eb' });
    });
  });
});
