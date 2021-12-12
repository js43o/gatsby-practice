import React from 'react';
import { css, Global } from '@emotion/react';

const defaultStyle = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`;

const GlobalStyle = () => {
  return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
