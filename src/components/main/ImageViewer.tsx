import styled from '@emotion/styled';
import React from 'react';
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from 'react-icons/ai';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

const ImageViewerBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 200;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  .arrow {
    color: white;
    cursor: pointer;
    font-size: 3rem;
    padding: 0.5rem;
    &:hover {
      opacity: 0.75;
    }
    &:active {
      opacity: 0.5;
    }
  }
`;

const Prev = styled(AiOutlineLeft)``;
const Next = styled(AiOutlineRight)``;
const Close = styled(AiOutlineClose)`
  position: absolute;
  color: white;
  font-size: 2rem;
  top: 0;
  right: 0;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
  &:active {
    opacity: 0.5;
  }
`;

type ImageViewerProps = {
  image?: IGatsbyImageData;
  alt?: string;
  closeImage: () => void;
  increaseIndex: () => void;
  decreaseIndex: () => void;
};

const ImageViewer = ({
  image,
  alt,
  closeImage,
  increaseIndex,
  decreaseIndex,
}: ImageViewerProps) => {
  if (!image || !alt) return null;

  return (
    <ImageViewerBlock>
      <Close onClick={closeImage} />
      <Prev className="arrow" onClick={decreaseIndex} />
      <GatsbyImage image={image} alt={alt} />
      <Next className="arrow" onClick={increaseIndex} />
    </ImageViewerBlock>
  );
};

export default ImageViewer;
