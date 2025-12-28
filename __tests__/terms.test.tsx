import { render, screen } from '@testing-library/react';
import TermsPage, { metadata } from '@/app/terms/page';

describe('Terms of Service Page', () => {
  it('renders the page title', () => {
    render(<TermsPage />);
    expect(
      screen.getByRole('heading', { name: /terms of service/i, level: 1 })
    ).toBeInTheDocument();
  });

  it('renders the effective date', () => {
    render(<TermsPage />);
    expect(
      screen.getByText(/effective date: december 28, 2025/i)
    ).toBeInTheDocument();
  });

  it('renders acceptance of terms section', () => {
    render(<TermsPage />);
    expect(
      screen.getByRole('heading', { name: /acceptance of terms/i })
    ).toBeInTheDocument();
  });

  it('renders description of service section', () => {
    render(<TermsPage />);
    expect(
      screen.getByRole('heading', { name: /description of service/i })
    ).toBeInTheDocument();
  });

  it('renders user responsibilities section', () => {
    render(<TermsPage />);
    expect(
      screen.getByRole('heading', { name: /user responsibilities/i })
    ).toBeInTheDocument();
  });

  it('renders intellectual property section', () => {
    render(<TermsPage />);
    expect(
      screen.getByRole('heading', { name: /intellectual property/i })
    ).toBeInTheDocument();
  });

  it('renders limitation of liability section', () => {
    render(<TermsPage />);
    expect(
      screen.getByRole('heading', { name: /limitation of liability/i })
    ).toBeInTheDocument();
  });

  it('renders termination section', () => {
    render(<TermsPage />);
    expect(
      screen.getByRole('heading', { name: /termination/i })
    ).toBeInTheDocument();
  });

  it('renders contact section', () => {
    render(<TermsPage />);
    expect(
      screen.getByRole('heading', { name: /contact us/i })
    ).toBeInTheDocument();
  });

  it('renders back to home link', () => {
    render(<TermsPage />);
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('has main landmark', () => {
    render(<TermsPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('exports correct metadata', () => {
    expect(metadata.title).toBe('Terms of Service | Discr');
    expect(metadata.description).toContain('Terms of Service');
  });
});
