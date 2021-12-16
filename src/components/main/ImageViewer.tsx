import styled from '@emotion/styled';
import React from 'react';
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from 'react-icons/ai';
import { GatsbyImage } from 'gatsby-plugin-image';
import { ImageItem } from 'lib/useInfinityScroll';

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
    z-index: 300;
    position: fixed;
    color: white;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
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
  h4 {
    position: fixed;
    color: white;
    bottom: 1rem;
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.5);
    padding: 0.25rem;
  }
`;

const Prev = styled(AiOutlineLeft)`
  left: 0.5rem;
`;
const Next = styled(AiOutlineRight)`
  right: 0.5rem;
`;
const Close = styled.div`
  position: absolute;
  color: white;
  font-size: 2rem;
  top: 0;
  right: 0;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
  &:active {
    opacity: 0.5;
  }
`;

type ImageViewerProps = {
  data: ImageItem[];
  currentIndex: number;
  closeImage: () => void;
  increaseIndex: () => void;
  decreaseIndex: () => void;
};

const ImageViewer = ({
  data,
  currentIndex,
  closeImage,
  increaseIndex,
  decreaseIndex,
}: ImageViewerProps) => {
  if (currentIndex === -1) return null;

  return (
    <ImageViewerBlock>
      <Close onClick={closeImage}>
        <AiOutlineClose />
      </Close>
      <Prev className="arrow" onClick={decreaseIndex} />
      <GatsbyImage
        image={data[currentIndex].image}
        alt={data[currentIndex].alt}
      />
      <Next className="arrow" onClick={increaseIndex} />
      <h4>{data[currentIndex].alt}</h4>
    </ImageViewerBlock>
  );
};

export default ImageViewer;
