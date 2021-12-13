import styled from '@emotion/styled';
import Template from 'components/common/Template';
import ImageViewer from 'components/main/ImageViewer';
import { graphql } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React, { useState } from 'react';

const GalleryBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 768px;
  grid-gap: 0.25rem;
  padding: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }
`;

const ImageItem = styled(GatsbyImage)<{ title: string }>`
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

type GalleryPageProps = {
  data: {
    allFile: {
      edges: [
        {
          node: {
            id: string;
            childImageSharp: {
              gatsbyImageData: IGatsbyImageData;
            };
            name: string;
          };
        },
      ];
    };
  };
};

type State = {
  image: IGatsbyImageData;
  alt: string;
};

const GalleryPage = ({
  data: {
    allFile: { edges },
  },
}: GalleryPageProps) => {
  const [images, setImages] = useState<State[]>(
    edges.map(
      ({
        node: {
          childImageSharp: { gatsbyImageData },
          name,
        },
      }) => ({ image: gatsbyImageData, alt: name }),
    ),
  );
  const [currentIndex, setCurrentIndex] = useState(-1);

  const openImage = (index: number) => setCurrentIndex(index);
  const closeImage = () => setCurrentIndex(-1);
  const increaseIndex = () =>
    setCurrentIndex(currentIndex == images.length - 1 ? 0 : currentIndex + 1);
  const decreaseIndex = () =>
    setCurrentIndex(currentIndex == 0 ? images.length - 1 : currentIndex - 1);

  return (
    <>
      {currentIndex > -1 && (
        <ImageViewer
          image={images[currentIndex].image}
          alt={images[currentIndex].alt}
          closeImage={closeImage}
          increaseIndex={increaseIndex}
          decreaseIndex={decreaseIndex}
        />
      )}
      <Template>
        <GalleryBlock>
          {edges.map(
            (
              {
                node: {
                  childImageSharp: { gatsbyImageData },
                  name,
                },
              },
              index,
            ) => (
              <ImageItem
                className="item"
                image={gatsbyImageData}
                alt={name}
                title={name}
                onClick={() => openImage(index)}
              />
            ),
          )}
        </GalleryBlock>
      </Template>
    </>
  );
};

export default GalleryPage;

export const query = graphql`
  {
    allFile(filter: { relativeDirectory: { eq: "gallery" } }) {
      edges {
        node {
          id
          childImageSharp {
            gatsbyImageData(width: 768)
          }
          name
        }
      }
    }
  }
`;
