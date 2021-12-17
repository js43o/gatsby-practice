import React, { useState } from 'react';
import styled from '@emotion/styled';
import palette from 'lib/palette';

const CategoryListBlock = styled.ul`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 1fr);
  border-radius: 0.5rem;
  border: 1px solid ${palette.bluegrey[100]};
  overflow: hidden;
  margin-bottom: 1rem;
`;

const CategoryItemBlock = styled.li<{ isSelected: boolean }>`
  display: grid;
  place-items: center;
  padding: 0.25rem 0.5rem;
  background: ${props => props.isSelected && palette.bluegrey[100]};
`;

type GalleryCategoryProps = {
  changeCategory: (name: string) => void;
};

const GalleryCategory = ({ changeCategory }: GalleryCategoryProps) => {
  const [selected, setSelected] = useState('all');
  const onClick = (name: string) => {
    changeCategory(name);
    setSelected(name);
  };
  return (
    <CategoryListBlock>
      <CategoryItemBlock
        onClick={() => onClick('all')}
        isSelected={selected === 'all'}
      >
        전체
      </CategoryItemBlock>
      <CategoryItemBlock
        onClick={() => onClick('brown')}
        isSelected={selected === 'brown'}
      >
        브라운
      </CategoryItemBlock>
      <CategoryItemBlock
        onClick={() => onClick('white')}
        isSelected={selected === 'white'}
      >
        화이트
      </CategoryItemBlock>
      <CategoryItemBlock
        onClick={() => onClick('fruit')}
        isSelected={selected === 'fruit'}
      >
        과일
      </CategoryItemBlock>
    </CategoryListBlock>
  );
};

export default GalleryCategory;
