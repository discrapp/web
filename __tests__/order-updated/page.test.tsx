import { render, screen } from '@testing-library/react';
import OrderUpdatedPage from '@/app/order-updated/page';

// Mock next/navigation
const mockSearchParams = new URLSearchParams();
jest.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
}));

describe('OrderUpdatedPage', () => {
  beforeEach(() => {
    mockSearchParams.delete('order');
    mockSearchParams.delete('status');
    mockSearchParams.delete('error');
  });

  describe('success state', () => {
    it('renders order updated message', () => {
      render(<OrderUpdatedPage />);
      expect(screen.getByText('Order Updated!')).toBeInTheDocument();
    });

    it('renders default status when not provided', () => {
      render(<OrderUpdatedPage />);
      expect(screen.getByText(/Status:/)).toBeInTheDocument();
      expect(screen.getByText('Updated')).toBeInTheDocument();
    });

    it('renders custom status when provided', () => {
      mockSearchParams.set('status', 'shipped');
      render(<OrderUpdatedPage />);
      expect(screen.getByText('Shipped')).toBeInTheDocument();
    });

    it('capitalizes status correctly', () => {
      mockSearchParams.set('status', 'processing');
      render(<OrderUpdatedPage />);
      expect(screen.getByText('Processing')).toBeInTheDocument();
    });

    it('displays order number when provided', () => {
      mockSearchParams.set('order', 'ORD-12345');
      render(<OrderUpdatedPage />);
      expect(screen.getByText('ORD-12345')).toBeInTheDocument();
    });

    it('does not display order number when not provided', () => {
      render(<OrderUpdatedPage />);
      expect(screen.queryByText(/ORD-/)).not.toBeInTheDocument();
    });

    it('renders close window instruction', () => {
      render(<OrderUpdatedPage />);
      expect(screen.getByText('You can close this window.')).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('renders error message when error param is present', () => {
      mockSearchParams.set('error', 'Something went wrong');
      render(<OrderUpdatedPage />);
      expect(screen.getByText('Update Failed')).toBeInTheDocument();
    });

    it('displays decoded error message', () => {
      mockSearchParams.set('error', 'Order%20not%20found');
      render(<OrderUpdatedPage />);
      expect(screen.getByText('Order not found')).toBeInTheDocument();
    });

    it('renders close window instruction in error state', () => {
      mockSearchParams.set('error', 'Some error');
      render(<OrderUpdatedPage />);
      expect(screen.getByText('You can close this window.')).toBeInTheDocument();
    });

    it('does not show order updated message in error state', () => {
      mockSearchParams.set('error', 'Some error');
      render(<OrderUpdatedPage />);
      expect(screen.queryByText('Order Updated!')).not.toBeInTheDocument();
    });
  });

  describe('with all params', () => {
    it('shows error state even when other params are present', () => {
      mockSearchParams.set('order', 'ORD-999');
      mockSearchParams.set('status', 'shipped');
      mockSearchParams.set('error', 'Failed to update');
      render(<OrderUpdatedPage />);
      expect(screen.getByText('Update Failed')).toBeInTheDocument();
      expect(screen.queryByText('Order Updated!')).not.toBeInTheDocument();
    });
  });
});
