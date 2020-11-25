import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { getNext } from './redux/slice';

import MakeSentenceContainer from './MakeSentenceContainer';

const HeadingBox = styled.div({
  textAlign: 'center',
});

const Paragraph = styled.p({
  fontSize: '.8rem',
  marginBottom: '1rem',
});

export default function MakeSentencePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNext());
  }, []);

  return (
    <div>
      <HeadingBox>
        <Paragraph>
          제시어를 보고 문장을 만들어 보세요!
        </Paragraph>
      </HeadingBox>
      <MakeSentenceContainer />
    </div>
  );
}