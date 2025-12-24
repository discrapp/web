/**
 * @jest-environment jsdom
 */
import { render, screen, act } from '@testing-library/react';
import ConnectRefreshPage from '@/app/connect-refresh/page';

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

describe('ConnectRefreshPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(window, 'close').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('renders the session expired title', () => {
    render(<ConnectRefreshPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Session Expired'
    );
  });

  it('renders the expired message', () => {
    render(<ConnectRefreshPage />);
    expect(
      screen.getByText('Your payout setup session has expired.')
    ).toBeInTheDocument();
  });

  it('renders the returning to app message', () => {
    render(<ConnectRefreshPage />);
    expect(screen.getByText('Returning to the app...')).toBeInTheDocument();
  });

  it('renders the retry instruction', () => {
    render(<ConnectRefreshPage />);
    expect(
      screen.getByText(
        'Please try again from your profile to complete the setup.'
      )
    ).toBeInTheDocument();
  });

  it('renders the refresh emoji', () => {
    render(<ConnectRefreshPage />);
    expect(screen.getByText('🔄')).toBeInTheDocument();
  });

  it('attempts to close window after 3 seconds', () => {
    render(<ConnectRefreshPage />);

    expect(window.close).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(window.close).toHaveBeenCalled();
  });

  it('clears timeout on unmount', () => {
    const { unmount } = render(<ConnectRefreshPage />);

    unmount();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(window.close).not.toHaveBeenCalled();
  });
});
