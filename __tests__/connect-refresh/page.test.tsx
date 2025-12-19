/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import ConnectRefreshPage from '@/app/connect-refresh/page';

// We can't easily test window.location.href changes in jsdom
// Focus on testing the rendered content

describe('ConnectRefreshPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
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
});
