import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FundingBanner } from '@/components/FundingBanner';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock localStorage
interface LocalStorageMock {
  store: Record<string, string>;
  getItem: jest.Mock;
  setItem: jest.Mock;
  removeItem: jest.Mock;
  clear: jest.Mock;
}

const localStorageMock: LocalStorageMock = {
  store: {} as Record<string, string>,
  getItem: jest.fn((key: string): string | null => localStorageMock.store[key] || null),
  setItem: jest.fn((key: string, value: string): void => {
    localStorageMock.store[key] = value;
  }),
  removeItem: jest.fn((key: string): void => {
    delete localStorageMock.store[key];
  }),
  clear: jest.fn((): void => {
    localStorageMock.store = {};
  }),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockCampaignData = {
  title: 'Help Launch Discr',
  amountRaised: 50,
  goalAmount: 450,
  donationCount: 1,
  percentComplete: 11,
  url: 'https://www.gofundme.com/f/help-launch-discr-lost-disc-recovery-app-7s6kw',
};

describe('FundingBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.store = {};
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(mockCampaignData),
    });
  });

  describe('rendering', () => {
    it('renders banner with campaign data', async () => {
      render(<FundingBanner />);

      await waitFor(() => {
        expect(screen.getByText('Help Launch Discr!')).toBeInTheDocument();
      });

      expect(screen.getByText(/\$50 of \$450 raised/)).toBeInTheDocument();
      expect(screen.getByText('11%')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders GoFundMe link', async () => {
      render(<FundingBanner />);

      await waitFor(() => {
        expect(
          screen.getByRole('link', { name: /support on gofundme/i })
        ).toBeInTheDocument();
      });

      const link = screen.getByRole('link', { name: /support on gofundme/i });
      expect(link).toHaveAttribute('href', mockCampaignData.url);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders dismiss button', async () => {
      render(<FundingBanner />);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /dismiss banner/i })
        ).toBeInTheDocument();
      });
    });

    it('has correct aria attributes', async () => {
      render(<FundingBanner />);

      await waitFor(() => {
        expect(
          screen.getByRole('banner', { name: /funding campaign/i })
        ).toBeInTheDocument();
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '11');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });
  });

  describe('progress bar', () => {
    it('displays correct percentage width', async () => {
      render(<FundingBanner />);

      await waitFor(() => {
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveStyle({ width: '11%' });
      });
    });

    it('caps width at 100% when goal exceeded', async () => {
      mockFetch.mockResolvedValue({
        json: () =>
          Promise.resolve({
            ...mockCampaignData,
            amountRaised: 500,
            percentComplete: 111,
          }),
      });

      render(<FundingBanner />);

      await waitFor(() => {
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveStyle({ width: '100%' });
      });
    });

    it('shows "Goal Reached!" when 100% funded', async () => {
      mockFetch.mockResolvedValue({
        json: () =>
          Promise.resolve({
            ...mockCampaignData,
            amountRaised: 450,
            percentComplete: 100,
          }),
      });

      render(<FundingBanner />);

      await waitFor(() => {
        expect(screen.getByText('Goal Reached!')).toBeInTheDocument();
      });
    });
  });

  describe('dismiss functionality', () => {
    it('hides banner when dismiss button is clicked', async () => {
      render(<FundingBanner />);

      await waitFor(() => {
        expect(screen.getByText('Help Launch Discr!')).toBeInTheDocument();
      });

      const dismissButton = screen.getByRole('button', {
        name: /dismiss banner/i,
      });
      fireEvent.click(dismissButton);

      expect(screen.queryByText('Help Launch Discr!')).not.toBeInTheDocument();
    });

    it('stores dismiss timestamp in localStorage', async () => {
      render(<FundingBanner />);

      await waitFor(() => {
        expect(screen.getByText('Help Launch Discr!')).toBeInTheDocument();
      });

      const dismissButton = screen.getByRole('button', {
        name: /dismiss banner/i,
      });
      fireEvent.click(dismissButton);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'discr-funding-banner-dismissed',
        expect.any(String)
      );
    });

    it('does not show banner if dismissed within 7 days', async () => {
      // Set dismiss time to 3 days ago
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      localStorageMock.store['discr-funding-banner-dismissed'] =
        threeDaysAgo.toISOString();

      render(<FundingBanner />);

      // Give it time to check localStorage and potentially render
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(screen.queryByText('Help Launch Discr!')).not.toBeInTheDocument();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('shows banner if dismissed more than 7 days ago', async () => {
      // Set dismiss time to 10 days ago
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      localStorageMock.store['discr-funding-banner-dismissed'] =
        tenDaysAgo.toISOString();

      render(<FundingBanner />);

      await waitFor(() => {
        expect(screen.getByText('Help Launch Discr!')).toBeInTheDocument();
      });
    });
  });

  describe('error handling', () => {
    it('shows basic banner with link when API fails', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      render(<FundingBanner />);

      await waitFor(() => {
        expect(
          screen.getByRole('link', { name: /support on gofundme/i })
        ).toBeInTheDocument();
      });
    });

    it('hides progress bar when data has error flag', async () => {
      mockFetch.mockResolvedValue({
        json: () =>
          Promise.resolve({
            ...mockCampaignData,
            error: true,
          }),
      });

      render(<FundingBanner />);

      await waitFor(() => {
        expect(screen.getByText('Help Launch Discr!')).toBeInTheDocument();
      });

      // Progress bar should not be rendered when error is true
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('hides progress bar when data is fallback', async () => {
      mockFetch.mockResolvedValue({
        json: () =>
          Promise.resolve({
            ...mockCampaignData,
            fallback: true,
          }),
      });

      render(<FundingBanner />);

      await waitFor(() => {
        expect(screen.getByText('Help Launch Discr!')).toBeInTheDocument();
      });

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('does not render while loading', () => {
      // Make fetch never resolve
      mockFetch.mockReturnValue(new Promise(() => {}));

      render(<FundingBanner />);

      expect(screen.queryByText('Help Launch Discr!')).not.toBeInTheDocument();
      expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    });
  });

  describe('null data handling', () => {
    it('does not render when API returns null data', async () => {
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(null),
      });

      render(<FundingBanner />);

      // Wait for fetch to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(screen.queryByText('Help Launch Discr!')).not.toBeInTheDocument();
      expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    });
  });
});
