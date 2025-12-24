import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Mock fetch
global.fetch = jest.fn();

// Mock navigator.clipboard
const mockWriteText = jest.fn();
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: mockWriteText,
  },
  writable: true,
});

// Mock reportError
jest.mock('@/lib/error-reporter', () => ({
  reportError: jest.fn(),
}));

// Mock the page component - we need to test it with mocked data
jest.mock('next/navigation', () => ({
  useParams: () => ({ code: 'TEST123' }),
}));

// Import after mocks
import DiscLandingPage from '@/app/d/[code]/page';
import { reportError } from '@/lib/error-reporter';

describe('Disc Landing Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockWriteText.mockResolvedValue(undefined);
  });

  it('shows loading state initially', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<DiscLandingPage />);
    expect(screen.getByText(/looking up disc/i)).toBeInTheDocument();
  });

  it('displays disc information when found', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
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
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText(/John D/)).toBeInTheDocument();
  });

  it('shows "Found this disc?" message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
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
      json: () =>
        Promise.resolve({
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
      json: () =>
        Promise.resolve({
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
      json: () =>
        Promise.resolve({
          found: true,
          disc: { name: 'Test Disc', manufacturer: 'Test' },
        }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(localStorage.getItem('discr_deferred_code')).toBe('TEST123');
    });
  });

  it('displays disc photo when available', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          found: true,
          disc: {
            name: 'Test Disc',
            manufacturer: 'Test',
            photo_url: 'https://example.com/photo.jpg',
          },
        }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByAltText('Test Disc')).toBeInTheDocument();
    });
  });

  it('uses fallback alt text when disc name is undefined', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          found: true,
          disc: {
            manufacturer: 'Test',
            photo_url: 'https://example.com/photo.jpg',
          },
        }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByAltText('Disc')).toBeInTheDocument();
    });
  });

  it('displays Multi color with rainbow gradient', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          found: true,
          disc: {
            name: 'Test Disc',
            manufacturer: 'Test',
            color: 'Multi',
          },
        }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByText('Multi')).toBeInTheDocument();
    });
  });

  it('handles unknown color gracefully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          found: true,
          disc: {
            name: 'Test Disc',
            manufacturer: 'Test',
            color: 'UnknownColor',
          },
        }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByText('UnknownColor')).toBeInTheDocument();
    });
  });

  it('copies code to clipboard when button clicked', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          found: true,
          disc: { name: 'Test Disc', manufacturer: 'Test' },
        }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByText('TEST123')).toBeInTheDocument();
    });

    const copyButton = screen.getByText('TEST123').closest('button');
    fireEvent.click(copyButton!);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith('TEST123');
    });
  });

  it('shows copied confirmation message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          found: true,
          disc: { name: 'Test Disc', manufacturer: 'Test' },
        }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByText('TEST123')).toBeInTheDocument();
    });

    const copyButton = screen.getByText('TEST123').closest('button');
    fireEvent.click(copyButton!);

    await waitFor(() => {
      expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument();
    });
  });

  it('uses fallback copy method when clipboard API fails', async () => {
    // Mock document.execCommand for fallback
    const mockExecCommand = jest.fn();
    document.execCommand = mockExecCommand;

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          found: true,
          disc: { name: 'Test Disc', manufacturer: 'Test' },
        }),
    });

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByText('TEST123')).toBeInTheDocument();
    });

    // Now make clipboard fail for the button click
    mockWriteText.mockRejectedValueOnce(new Error('Clipboard not available'));

    const copyButton = screen.getByText('TEST123').closest('button');
    fireEvent.click(copyButton!);

    await waitFor(() => {
      expect(mockExecCommand).toHaveBeenCalledWith('copy');
    });
  });

  it('reports error when fetch fails', async () => {
    const fetchError = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValueOnce(fetchError);

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });

    expect(reportError).toHaveBeenCalledWith(fetchError, {
      code: 'TEST123',
      operation: 'lookup-qr-code',
    });
  });

  it('handles non-Error fetch failures', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('String error');

    render(<DiscLandingPage />);

    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });

    expect(reportError).toHaveBeenCalledWith(expect.any(Error), {
      code: 'TEST123',
      operation: 'lookup-qr-code',
    });
  });
});
