import React from 'react';
import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';
import useInfinityScroll, { ImageItem } from 'lib/useInfinityScroll';

const GalleryListBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  width: 768px;
  grid-gap: 0.25rem;
  padding: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }
`;

const ImageBlock = styled(GatsbyImage)<{ title: string }>`
  display: grid;
  place-items: center;
  cursor: pointer;
  &:hover {
    img {
      transition: all 0.25s;
      filter: brightness(0.5);
    }
    &::after {
      z-index: 5;
      position: absolute;
      color: white;
      content: '${props => props.title}';
    }
  }
`;

type GalleryListProps = {
  data: ImageItem[];
  openImage: (index: number) => void;
};

const GalleryList = ({ data, openImage }: GalleryListProps) => {
  const { images, ref } = useInfinityScroll(data);

  if (!images) return null;

  return (
    <GalleryListBlock ref={ref}>
      {images.map(({ image, alt, id }, index) => (
        <ImageBlock
          title={alt}
          key={id}
          className="item"
          image={image}
          alt={alt}
          onClick={() => openImage(index)}
          objectFit="cover"
        />
      ))}
    </GalleryListBlock>
  );
};

export default React.memo(GalleryList);
