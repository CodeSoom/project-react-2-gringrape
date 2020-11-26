import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SpeakSentenceForm from './SpeakSentenceForm';

describe('SpeakSentenceForm', () => {
  const spokenSentence = '사과가 맛있네요';
  const micButton = 'mic';
  const loadingSign = '...';
  const defaultSentence = '문장을 소리내어 말해보세요';

  const handleClick = jest.fn();

  const renderSpeakSentenceForm = ({ sentence, speakStatus } = {}) => render(
    <SpeakSentenceForm
      spokenSentence={sentence}
      onClick={handleClick}
      speakStatus={speakStatus}
    />,
  );

  beforeEach(() => {
    handleClick.mockClear();
  });

  it('renders spoken sentence with sentence', () => {
    const { container } = renderSpeakSentenceForm({
      sentence: spokenSentence,
    });

    expect(container).toHaveTextContent(spokenSentence);
  });

  it('renders default sentence without sentence', () => {
    [null, undefined].forEach((notExist) => {
      const { container } = renderSpeakSentenceForm({
        sentence: notExist,
      });

      expect(container).toHaveTextContent(defaultSentence);
    });
  });

  it('renders loading sign while mic is on', () => {
    const { container } = renderSpeakSentenceForm({
      speakStatus: 'MIC_ON',
    });

    expect(container).toHaveTextContent(loadingSign);
  });

  it('renders speak sentence button', () => {
    const { getByTitle } = renderSpeakSentenceForm();

    fireEvent.click(getByTitle(micButton));

    expect(handleClick).toBeCalled();
  });
});
