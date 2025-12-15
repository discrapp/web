import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home (Splash Page)', () => {
  it('renders the AceBack name', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('AceBack');
  });

  it('renders the tagline', () => {
    render(<Home />);
    expect(screen.getByText('Get Yours Back')).toBeInTheDocument();
  });

  it('displays content centered on the page', () => {
    render(<Home />);
    const container = screen.getByRole('main');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
  });
});
