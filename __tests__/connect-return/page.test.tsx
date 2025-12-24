/**
 * @jest-environment jsdom
 */
import { render, screen, act } from '@testing-library/react';
import ConnectReturnPage from '@/app/connect-return/page';

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

describe('ConnectReturnPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(window, 'close').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('renders the success title', () => {
    render(<ConnectReturnPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Payout Setup Complete!'
    );
  });

  it('renders the success message', () => {
    render(<ConnectReturnPage />);
    expect(
      screen.getByText('You can now receive reward payments via credit card.')
    ).toBeInTheDocument();
  });

  it('renders the returning to app message', () => {
    render(<ConnectReturnPage />);
    expect(screen.getByText('Returning to the app...')).toBeInTheDocument();
  });

  it('renders the fallback instruction', () => {
    render(<ConnectReturnPage />);
    expect(
      screen.getByText(
        "If the app doesn't open, you can close this window and return manually."
      )
    ).toBeInTheDocument();
  });

  it('renders the success emoji', () => {
    render(<ConnectReturnPage />);
    expect(screen.getByText('✅')).toBeInTheDocument();
  });

  it('attempts to close window after 3 seconds', () => {
    render(<ConnectReturnPage />);

    expect(window.close).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(window.close).toHaveBeenCalled();
  });

  it('clears timeout on unmount', () => {
    const { unmount } = render(<ConnectReturnPage />);

    unmount();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(window.close).not.toHaveBeenCalled();
  });
});
