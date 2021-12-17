import React from 'react';
import styled from '@emotion/styled';
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from 'react-icons/ai';
import { GatsbyImage } from 'gatsby-plugin-image';
import { ImageItem } from 'pages/gallery';

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
    position: fixed;
    z-index: 300;
    padding: 0.5rem;
    border-radius: 50%;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    font-size: 3rem;
    cursor: pointer;
    &:hover {
      opacity: 0.75;
    }
    &:active {
      opacity: 0.5;
    }
  }
  h4 {
    position: fixed;
    bottom: 1rem;
    padding: 0.25rem;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    font-size: 1.5rem;
  }
`;

const Prev = styled(AiOutlineLeft)`
  left: 0.5rem;
`;
const Next = styled(AiOutlineRight)`
  right: 0.5rem;
`;
const Close = styled.div`
  z-index: 300;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
  &:active {
    opacity: 0.5;
  }
`;

type ImageViewerProps = {
  images: ImageItem[];
  currentIndex: number;
  closeImage: () => void;
  increaseIndex: () => void;
  decreaseIndex: () => void;
};

const ImageViewer = ({
  images,
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
        image={images[currentIndex].image}
        alt={images[currentIndex].alt}
      />
      <Next className="arrow" onClick={increaseIndex} />
      <h4>{images[currentIndex].alt}</h4>
    </ImageViewerBlock>
  );
};

export default ImageViewer;
