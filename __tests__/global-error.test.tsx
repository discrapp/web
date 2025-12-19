import { render, screen, fireEvent } from '@testing-library/react';
import * as Sentry from '@sentry/nextjs';
import GlobalError from '@/app/global-error';

describe('GlobalError component', () => {
  const mockReset = jest.fn();
  const mockError = new Error('Test global error');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders error message', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText('We encountered an unexpected error.')
    ).toBeInTheDocument();
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

  it('captures exception with Sentry', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(Sentry.captureException).toHaveBeenCalledWith(mockError);
  });
});
