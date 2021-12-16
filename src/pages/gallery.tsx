import React, { useCallback, useMemo, useState } from 'react';
import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import Template from 'components/common/Template';
import ImageViewer from 'components/main/ImageViewer';
import GalleryList from 'components/main/GalleryList';
import { ImageItem } from 'lib/useInfinityScroll';

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

const GalleryPage = ({
  data: {
    allFile: { edges },
  },
}: GalleryPageProps) => {
  const data = useMemo<ImageItem[]>(
    () =>
      edges.map(
        ({
          node: {
            id,
            childImageSharp: { gatsbyImageData },
            name,
          },
        }) => ({ image: gatsbyImageData, alt: name, id }),
      ),
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(-1);
  const openImage = useCallback((index: number) => setCurrentIndex(index), []);
  const closeImage = () => setCurrentIndex(-1);
  const increaseIndex = () =>
    setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
  const decreaseIndex = () =>
    setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);

  return (
    <>
      <ImageViewer
        data={data}
        currentIndex={currentIndex}
        closeImage={closeImage}
        increaseIndex={increaseIndex}
        decreaseIndex={decreaseIndex}
      />
      <Template>
        <GalleryList data={data} openImage={openImage} />
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
