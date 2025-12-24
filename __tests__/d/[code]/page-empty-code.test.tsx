/**
 * @jest-environment jsdom
 */

// This test file specifically tests the empty code scenario
// which requires a different mock than the main test file

// Mock fetch
global.fetch = jest.fn();

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
  writable: true,
});

// Mock reportError
jest.mock('@/lib/error-reporter', () => ({
  reportError: jest.fn(),
}));

// Mock with empty code
jest.mock('next/navigation', () => ({
  useParams: () => ({ code: '' }),
}));

import { render } from '@testing-library/react';
import DiscLandingPage from '@/app/d/[code]/page';

describe('Disc Landing Page - empty code', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('does not fetch or store when code is empty', () => {
    render(<DiscLandingPage />);

    // fetch should not be called when code is empty
    expect(global.fetch).not.toHaveBeenCalled();

    // localStorage should not be set
    expect(localStorage.getItem('discr_deferred_code')).toBeNull();
  });
});
