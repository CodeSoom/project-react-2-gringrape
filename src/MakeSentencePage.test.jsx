import React from 'react';

import { render } from '@testing-library/react';

import MakeSentencePage from './MakeSentencePage';

describe('MakeSentencePage', () => {
  const prompt = '사과';
  const heading = '문장 만들기';
  const explanation = '제시어를 보고 문장을 만들어 보세요!';

  it('renders prompt', () => {
    const { queryByText } = render(<MakeSentencePage />);

    expect(queryByText(prompt)).not.toBeNull();
  });

  it('renders text contents', () => {
    const { container } = render(<MakeSentencePage />);

    [heading, explanation].forEach((textContent) => {
      expect(container).toHaveTextContent(textContent);
    });
  });
});