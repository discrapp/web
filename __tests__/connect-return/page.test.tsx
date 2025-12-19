/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import ConnectReturnPage from '@/app/connect-return/page';

// We can't easily test window.location.href changes in jsdom
// Focus on testing the rendered content

describe('ConnectReturnPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
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
});
