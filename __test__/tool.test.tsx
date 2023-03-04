import { tools } from '@/utils/tools';
import { cleanup, render, screen } from '@testing-library/react';
import Tool from '../pages/[tool]';

jest.mock('next/router', () => require('next-router-mock'));

describe('Tool Home Page', () => {
  afterEach(() => cleanup());

  it.each(Object.values(tools))('should renders the tool $title home page', tool => {
    render(<Tool {...tool} />);
    const heading = screen.getByRole('heading', { name: tool.title });
    const description = screen.getByText(tool.shortDescription ?? tool.description);
    const dropzoneText = screen.getByText('Drop your image here');
    const dropzoneButton = screen.getByRole('button', { name: /Choose your image/i });
    const guideTitle = screen.getByRole('heading', { name: tool.guide.title });
    const guideStep = screen.getByText(tool.guide.step);

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(dropzoneText).toBeInTheDocument();
    expect(dropzoneButton).toBeInTheDocument();
    expect(guideTitle).toBeInTheDocument();
    expect(guideStep).toBeInTheDocument();
  });
});
