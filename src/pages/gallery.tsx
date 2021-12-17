import React, { useCallback, useMemo, useState } from 'react';
import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import Template from 'components/common/Template';
import GalleryCategory from 'components/main/GalleryCategory';
import ImageViewer from 'components/main/ImageViewer';
import GalleryList from 'components/main/GalleryList';
import useInfinityScroll from 'lib/useInfinityScroll';

export type ImageItem = {
  id: string;
  image: IGatsbyImageData;
  alt: string;
  dir: string;
};

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
            relativeDirectory: string;
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
  const [category, setCategory] = useState('all');
  const data = useMemo<ImageItem[]>(
    () =>
      edges.map(
        ({
          node: {
            id,
            childImageSharp: { gatsbyImageData },
            name,
            relativeDirectory,
          },
        }) => ({
          id,
          image: gatsbyImageData,
          alt: name,
          dir: relativeDirectory,
        }),
      ),
    [],
  );

  const {
    images,
    ref,
    currentIndex,
    actions: { openImage, closeImage, increaseIndex, decreaseIndex },
  } = useInfinityScroll(data, category);

  const changeCategory = useCallback((name: string) => setCategory(name), []);

  return (
    <>
      <ImageViewer
        images={images}
        currentIndex={currentIndex}
        closeImage={closeImage}
        increaseIndex={increaseIndex}
        decreaseIndex={decreaseIndex}
      />
      <Template>
        <GalleryCategory changeCategory={changeCategory} />
        <GalleryList images={images} innerRef={ref} openImage={openImage} />
      </Template>
    </>
  );
};

export default GalleryPage;

export const query = graphql`
  {
    allFile(filter: { relativeDirectory: { regex: "/gallery/" } }) {
      edges {
        node {
          id
          childImageSharp {
            gatsbyImageData(width: 768)
          }
          name
          relativeDirectory
        }
      }
    }
  }
`;
