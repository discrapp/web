import { render } from '@testing-library/react';
import { ErrorReporterInit } from '@/components/ErrorReporterInit';
import { setupErrorReporting } from '@/lib/error-reporter';

// Mock the error-reporter module
jest.mock('@/lib/error-reporter');

describe('ErrorReporterInit', () => {
  const mockSetupErrorReporting = setupErrorReporting as jest.MockedFunction<
    typeof setupErrorReporting
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls setupErrorReporting on mount', () => {
    render(<ErrorReporterInit />);

    expect(mockSetupErrorReporting).toHaveBeenCalledTimes(1);
  });

  it('only calls setupErrorReporting once (not on re-renders)', () => {
    const { rerender } = render(<ErrorReporterInit />);

    expect(mockSetupErrorReporting).toHaveBeenCalledTimes(1);

    // Re-render the component
    rerender(<ErrorReporterInit />);

    // Should still only be called once
    expect(mockSetupErrorReporting).toHaveBeenCalledTimes(1);
  });

  it('renders nothing (returns null)', () => {
    const { container } = render(<ErrorReporterInit />);

    // Should render nothing
    expect(container.firstChild).toBeNull();
  });

  it('does not render any visible elements', () => {
    const { container } = render(<ErrorReporterInit />);

    // Should not have any HTML content
    expect(container.innerHTML).toBe('');
  });
});
