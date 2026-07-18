import { fireEvent, render, screen } from '@testing-library/react';
import ErrorPage from '@/app/error';
import { reportError } from '@/lib/error-reporter';

jest.mock('@/lib/error-reporter');

describe('Error component', () => {
  const mockReset = jest.fn();
  const mockError = { message: 'Test error', name: 'Error' } as Error;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders error message', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('We encountered an error loading this page.')).toBeInTheDocument();
  });

  it('renders try again button', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  it('calls reset when try again is clicked', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('reports error to Sentry', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    expect(reportError).toHaveBeenCalledWith(
      mockError,
      expect.objectContaining({
        boundary: 'page',
      })
    );
  });
});
