import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { FaKiwiBird } from 'react-icons/fa';
import palette from 'lib/palette';

const HeaderBlock = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  width: 100%;
  margin-bottom: 2rem;
  background: linear-gradient(
    ${palette.green[300]},
    ${palette.lightgreen[200]}
  );
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);
  @media (max-width: 430px) {
    position: sticky;
    top: 0;
  }
`;

const LogoBlock = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 0.125rem;
  font-family: 'Jua', sans-serif;
  font-size: 3rem;
  *:first-of-type {
    margin-right: 0.5rem;
  }
  @media (max-width: 430px) {
    font-size: 2.5rem;
  }
`;

const NavBlock = styled.nav`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 1fr);
  width: 430px;
  border-radius: 0.5rem 0.5rem 0 0;
  background: ${palette.yellow[50]};
  overflow: hidden;
  @media (max-width: 430px) {
    width: 100%;
    border-radius: 0;
  }
`;

const NavItemBlock = styled(Link)<{ isActive?: boolean }>`
  display: grid;
  place-items: center;
  padding: 0.25rem;
  font-size: 1.125rem;
  &:active {
    opacity: 0.5;
  }
  background: ${props => (props.isActive ? palette.lightgreen[100] : '')};
`;

const isPartiallyActive = ({
  isPartiallyCurrent,
}: {
  isPartiallyCurrent: boolean;
}) => {
  return isPartiallyCurrent
    ? { style: { background: palette.lightgreen[100] } }
    : {};
};

NavItemBlock.defaultProps = {
  activeStyle: {
    background: palette.lightgreen[100],
  },
};

const Header = () => {
  return (
    <HeaderBlock>
      <LogoBlock to="/">
        <FaKiwiBird />
        키위가든
      </LogoBlock>
      <NavBlock>
        <NavItemBlock to="/">홈</NavItemBlock>
        <NavItemBlock to="/dictionary" getProps={isPartiallyActive}>
          도감
        </NavItemBlock>
        <NavItemBlock to="/gallery">갤러리</NavItemBlock>
        <NavItemBlock to="/about">정보</NavItemBlock>
      </NavBlock>
    </HeaderBlock>
  );
};

export default React.memo(Header);
