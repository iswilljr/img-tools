import { sections } from '@/utils/sections';
import { cleanup, render, screen } from '@testing-library/react';
import Home from '../pages';

describe('Home page', () => {
  beforeEach(() => render(<Home />));
  afterEach(() => cleanup());

  it('should renders home heading', () => {
    const heading = screen.getByRole('heading', { name: /Free Online Image Converter/i });

    expect(heading).toBeInTheDocument();
  });

  it('should renders home description', () => {
    const paragraph = screen.getByText(/Edit and convert image files online from your browser/i);

    expect(paragraph).toBeInTheDocument();
  });

  it.each(sections)('should renders the $title section', ({ title, description, tryItOut }) => {
    const link = screen.getByRole<HTMLAnchorElement>('link', { name: `${title} ${description}` });
    const heading = screen.getByRole('heading', { name: title });
    const paragraph = screen.getByText(description);

    expect(link).toBeInTheDocument();
    expect(link.href).toMatch(new RegExp(tryItOut));
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});
