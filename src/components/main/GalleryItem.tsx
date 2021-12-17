import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

const GalleryItemBlock = styled(GatsbyImage)<{ title: string }>`
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

type GalleryItemProps = {
  title: string;
  image: IGatsbyImageData;
  alt: string;
  openImage: (index: number) => void;
  index: number;
};

const GalleryItem = ({
  title,
  image,
  alt,
  openImage,
  index,
}: GalleryItemProps) => {
  return (
    <GalleryItemBlock
      className="item"
      title={title}
      image={image}
      alt={alt}
      objectFit="cover"
      onClick={() => openImage(index)}
    />
  );
};

export default React.memo(GalleryItem);
