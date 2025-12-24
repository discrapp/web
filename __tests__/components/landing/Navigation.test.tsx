import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/components/landing/Navigation';

describe('Navigation', () => {
  it('renders the logo', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /discr/i })).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navigation />);
    expect(
      screen.getByRole('link', { name: /how it works/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /features/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^order$/i })).toBeInTheDocument();
  });

  it('renders download CTA button', () => {
    render(<Navigation />);
    expect(
      screen.getByRole('link', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('has proper navigation landmark', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('links to correct sections', () => {
    render(<Navigation />);
    expect(
      screen.getByRole('link', { name: /how it works/i })
    ).toHaveAttribute('href', '#how-it-works');
    expect(screen.getByRole('link', { name: /features/i })).toHaveAttribute(
      'href',
      '#features'
    );
    expect(screen.getByRole('link', { name: /^order$/i })).toHaveAttribute(
      'href',
      '#order'
    );
  });

  it('logo links to home', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /discr/i })).toHaveAttribute(
      'href',
      '/'
    );
  });

  describe('mobile menu', () => {
    it('renders mobile menu button', () => {
      render(<Navigation />);
      expect(
        screen.getByRole('button', { name: /open menu/i })
      ).toBeInTheDocument();
    });

    it('opens mobile menu when button clicked', () => {
      render(<Navigation />);
      const menuButton = screen.getByRole('button', { name: /open menu/i });

      fireEvent.click(menuButton);

      // Menu should now be open - button changes to "Close menu"
      expect(
        screen.getByRole('button', { name: /close menu/i })
      ).toBeInTheDocument();
    });

    it('shows mobile navigation links when menu is open', () => {
      render(<Navigation />);
      const menuButton = screen.getByRole('button', { name: /open menu/i });

      fireEvent.click(menuButton);

      // Should see navigation links in mobile menu (duplicates of desktop)
      const howItWorksLinks = screen.getAllByRole('link', {
        name: /how it works/i,
      });
      expect(howItWorksLinks.length).toBeGreaterThan(1);
    });

    it('closes mobile menu when link is clicked', () => {
      render(<Navigation />);
      const menuButton = screen.getByRole('button', { name: /open menu/i });

      // Open menu
      fireEvent.click(menuButton);
      expect(
        screen.getByRole('button', { name: /close menu/i })
      ).toBeInTheDocument();

      // Click a mobile link
      const mobileLinks = screen.getAllByRole('link', {
        name: /how it works/i,
      });
      fireEvent.click(mobileLinks[mobileLinks.length - 1]); // Click the mobile one

      // Menu should be closed
      expect(
        screen.getByRole('button', { name: /open menu/i })
      ).toBeInTheDocument();
    });

    it('closes mobile menu when Download App is clicked', () => {
      render(<Navigation />);
      const menuButton = screen.getByRole('button', { name: /open menu/i });

      // Open menu
      fireEvent.click(menuButton);

      // Click Download App in mobile menu
      const downloadLinks = screen.getAllByRole('link', { name: /download/i });
      fireEvent.click(downloadLinks[downloadLinks.length - 1]); // Click the mobile one

      // Menu should be closed
      expect(
        screen.getByRole('button', { name: /open menu/i })
      ).toBeInTheDocument();
    });

    it('toggles menu closed when clicking button again', () => {
      render(<Navigation />);
      const menuButton = screen.getByRole('button', { name: /open menu/i });

      // Open menu
      fireEvent.click(menuButton);
      expect(
        screen.getByRole('button', { name: /close menu/i })
      ).toBeInTheDocument();

      // Close menu by clicking button again
      fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
      expect(
        screen.getByRole('button', { name: /open menu/i })
      ).toBeInTheDocument();
    });

    it('has aria-expanded attribute on menu button', () => {
      render(<Navigation />);
      const menuButton = screen.getByRole('button', { name: /open menu/i });

      expect(menuButton).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(menuButton);

      expect(
        screen.getByRole('button', { name: /close menu/i })
      ).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
