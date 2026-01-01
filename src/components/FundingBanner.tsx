'use client';

import { useState, useEffect } from 'react';

interface CampaignData {
  title: string;
  amountRaised: number;
  goalAmount: number;
  donationCount: number;
  percentComplete: number;
  url: string;
  fallback?: boolean;
  error?: boolean;
}

const STORAGE_KEY = 'discr-funding-banner-dismissed';
const DISMISS_DURATION_DAYS = 7;

export function FundingBanner() {
  const [data, setData] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(true); // Start dismissed to prevent flash

  useEffect(() => {
    // Check if banner was dismissed
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const dismissedDate = new Date(dismissedAt);
      const daysSinceDismissed =
        (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < DISMISS_DURATION_DAYS) {
        setDismissed(true);
        setLoading(false);
        return;
      }
    }
    setDismissed(false);

    // Fetch campaign data
    const fetchData = async () => {
      try {
        const response = await fetch('/api/gofundme');
        const result = await response.json();
        setData(result);
      } catch {
        // On error, show basic banner with link
        setData({
          title: 'Help Launch Discr',
          amountRaised: 0,
          goalAmount: 450,
          donationCount: 0,
          percentComplete: 0,
          url: 'https://www.gofundme.com/f/help-launch-discr-lost-disc-recovery-app-7s6kw',
          error: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setDismissed(true);
  };

  if (dismissed || loading) {
    return null;
  }

  if (!data) {
    return null;
  }

  const isComplete = data.percentComplete >= 100;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-violet-900/95 backdrop-blur-sm border-t border-violet-700 shadow-lg"
      role="banner"
      aria-label="Funding campaign"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Message and Progress */}
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
            <div className="flex items-center gap-2 text-white">
              <span className="text-lg" role="img" aria-label="heart">
                ❤️
              </span>
              <span className="font-semibold text-sm sm:text-base">
                {isComplete ? 'Goal Reached!' : 'Help Launch Discr!'}
              </span>
            </div>

            {/* Progress section */}
            {!data.error && !data.fallback && (
              <div className="flex items-center gap-3">
                <span className="text-violet-200 text-sm">
                  ${data.amountRaised.toLocaleString()} of $
                  {data.goalAmount.toLocaleString()} raised
                </span>
                <div className="w-24 sm:w-32 h-2 bg-violet-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(data.percentComplete, 100)}%` }}
                    role="progressbar"
                    aria-valuenow={data.percentComplete}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${data.percentComplete}% funded`}
                  />
                </div>
                <span className="text-violet-300 text-sm font-medium">
                  {data.percentComplete}%
                </span>
              </div>
            )}
          </div>

          {/* CTA and Dismiss */}
          <div className="flex items-center gap-3">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-violet-900 font-semibold text-sm rounded-lg hover:bg-violet-100 transition-colors"
            >
              Support on GoFundMe
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <button
              onClick={handleDismiss}
              className="p-2 text-violet-300 hover:text-white transition-colors"
              aria-label="Dismiss banner"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
