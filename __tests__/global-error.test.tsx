import { fireEvent, render, screen } from '@testing-library/react';
import GlobalError from '@/app/global-error';
import { reportError } from '@/lib/error-reporter';

jest.mock('@/lib/error-reporter');

describe('GlobalError component', () => {
  const mockReset = jest.fn();
  const mockError = new Error('Test global error');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders error message', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('We encountered an unexpected error.')).toBeInTheDocument();
  });

  it('renders try again button', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  it('calls reset when try again is clicked', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('reports error to Sentry', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(reportError).toHaveBeenCalledWith(
      mockError,
      expect.objectContaining({
        boundary: 'global',
      })
    );
  });
});
