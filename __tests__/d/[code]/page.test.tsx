import { render, screen, waitFor } from '@testing-library/react';

// Mock fetch
global.fetch = jest.fn();

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
  writable: true,
});

// Mock the page component - we need to test it with mocked data
jest.mock('next/navigation', () => ({
  useParams: () => ({ code: 'TEST123' }),
}));

// Import after mocks
import DiscLandingPage from '@/app/d/[code]/page';

describe('Disc Landing Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('shows loading state initially', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<DiscLandingPage />);
    expect(screen.getByText(/looking up disc/i)).toBeInTheDocument();
  });

  it('displays disc information when found', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        found: true,
        disc: {
          name: 'Destroyer',
          manufacturer: 'Innova',
          color: 'Blue',
        },
        owner_display_name: 'John D',
      }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByText('Destroyer')).toBeInTheDocument();
    });
    expect(screen.getByText('Innova')).toBeInTheDocument();
  });

  it('shows "Found this disc?" message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        found: true,
        disc: { name: 'Test Disc', manufacturer: 'Test' },
      }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByText(/found this disc/i)).toBeInTheDocument();
    });
  });

  it('shows app store buttons', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        found: true,
        disc: { name: 'Test Disc', manufacturer: 'Test' },
      }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByText(/app store/i)).toBeInTheDocument();
      expect(screen.getByText(/google play/i)).toBeInTheDocument();
    });
  });

  it('shows error when disc not found', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        found: false,
      }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });

  it('stores code in localStorage for deferred deep linking', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        found: true,
        disc: { name: 'Test Disc', manufacturer: 'Test' },
      }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(localStorage.getItem('aceback_deferred_code')).toBe('TEST123');
    });
  });
});
