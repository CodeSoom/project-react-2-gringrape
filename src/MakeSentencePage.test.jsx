import React from 'react';

import { render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import MakeSentencePage from './MakeSentencePage';

jest.mock('react-redux');
jest.mock('./services/speechRecognitionService.js');

describe('MakeSentencePage', () => {
  const prompt = '사과';
  const explanation = '제시어를 보고 문장을 만들어 보세요!';

  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      prompt,
      spokenSentence: '',
      answers: [],
    }));
  });

  it('get first prompt on mount', () => {
    render(<MakeSentencePage />);

    expect(dispatch).toBeCalled();
  });

  it('renders prompt', () => {
    const { queryByText } = render(<MakeSentencePage />);

    expect(queryByText(prompt)).not.toBeNull();
  });

  it('renders text contents', () => {
    const { container } = render(<MakeSentencePage />);

    expect(container).toHaveTextContent(explanation);
  });
});
