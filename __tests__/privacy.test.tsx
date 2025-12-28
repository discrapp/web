import { render, screen } from '@testing-library/react';
import PrivacyPage, { metadata } from '@/app/privacy/page';

describe('Privacy Policy Page', () => {
  it('renders the page title', () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole('heading', { name: /privacy policy/i, level: 1 })
    ).toBeInTheDocument();
  });

  it('renders the effective date', () => {
    render(<PrivacyPage />);
    expect(
      screen.getByText(/effective date: december 28, 2025/i)
    ).toBeInTheDocument();
  });

  it('renders information collection section', () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole('heading', { name: /information we collect/i })
    ).toBeInTheDocument();
  });

  it('renders how we use information section', () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole('heading', { name: /how we use your information/i })
    ).toBeInTheDocument();
  });

  it('renders data sharing section', () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole('heading', { name: /information sharing/i })
    ).toBeInTheDocument();
  });

  it('renders data security section', () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole('heading', { name: /data security/i })
    ).toBeInTheDocument();
  });

  it('renders user rights section', () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole('heading', { name: /your rights/i })
    ).toBeInTheDocument();
  });

  it('renders contact section', () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole('heading', { name: /contact us/i })
    ).toBeInTheDocument();
  });

  it('renders back to home link', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('has main landmark', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('exports correct metadata', () => {
    expect(metadata.title).toBe('Privacy Policy | Discr');
    expect(metadata.description).toContain('Privacy Policy');
  });
});
