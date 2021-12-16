import React from 'react';
import styled from '@emotion/styled';
import Template from 'components/common/Template';
import DictionaryList from 'components/main/DictionaryList';

const BlankBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
`;

const DictionaryPage = () => {
  return (
    <Template>
      <DictionaryList />
      <BlankBox>종류를 선택하세요.</BlankBox>
    </Template>
  );
};

export default DictionaryPage;
