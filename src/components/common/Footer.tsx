import styled from '@emotion/styled';
import React from 'react';
import palette from 'lib/palette';

const FooterBlock = styled.footer`
  width: 50%;
  padding: 1rem;
  border-top: 1px solid #cccccc;
  text-align: center;
  font-size: 0.75rem;
  color: ${palette.grey[600]};
`;

const Footer = () => {
  return (
    <FooterBlock>
      kiwi-garden
      <br />
      @js43o
    </FooterBlock>
  );
};

export default Footer;
