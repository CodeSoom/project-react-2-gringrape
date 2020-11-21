import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import AnswersContainer from './AnswersContainer';

jest.mock('react-redux');
jest.mock('./services/speechRecognition.js');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('AnswersContainer', () => {
  const goHomeButton = '처음으로';

  const answers = [
    { prompt: '사과', spokenSentence: '사과는 맛있다' },
    { prompt: '양파', spokenSentence: '양파는 맛없다' },
  ];

  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      answers,
    }));
  });

  it('renders answers', () => {
    const { container } = render(<AnswersContainer />);

    answers.forEach(({ prompt, spokenSentence }) => {
      expect(container).toHaveTextContent(prompt);
      expect(container).toHaveTextContent(spokenSentence);
    });
  });

  it('renders go home button', () => {
    const { getByText } = render(<AnswersContainer />);

    fireEvent.click(getByText(goHomeButton));

    expect(dispatch).toBeCalled();
    expect(mockPush).toBeCalledWith('/');
  });
});
