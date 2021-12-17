import React, { MutableRefObject } from 'react';
import styled from '@emotion/styled';
import GalleryItem from './GalleryItem';
import { ImageItem } from 'pages/gallery';

const GalleryListBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 180px;
  width: 768px;
  grid-gap: 0.25rem;
  padding: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }
  @media (max-width: 430px) {
    grid-auto-rows: 90px;
  }
`;

type GalleryListProps = {
  images: ImageItem[];
  innerRef: MutableRefObject<HTMLDivElement | null>;
  openImage: (index: number) => void;
};

const GalleryList = ({ images, innerRef, openImage }: GalleryListProps) => {
  if (!images) return null;

  return (
    <GalleryListBlock ref={innerRef}>
      {images.map(({ image, alt, id }, index) => (
        <GalleryItem
          key={id}
          title={alt}
          image={image}
          alt={alt}
          openImage={openImage}
          index={index}
        />
      ))}
    </GalleryListBlock>
  );
};

export default React.memo(GalleryList);
