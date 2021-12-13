import styled from '@emotion/styled';
import Template from 'components/common/Template';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { DictionaryFrontmatter, MarkdownNode } from 'lib/types';
import React from 'react';
import DictionaryList from 'components/main/DictionaryList';
import PostBody from 'components/common/PostBody';

const DictionaryBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const DictionaryContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`;

const InfoBlock = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  width: 320px;
  td {
    padding: 0.5rem;
    border: 1px solid #cccccc;
  }
`;

type DictionaryContentProps = {
  data: {
    mdx: MarkdownNode<DictionaryFrontmatter>;
  };
};

const DictionaryTemplate = ({
  data: {
    mdx: {
      body,
      id,
      frontmatter: {
        title,
        species,
        height,
        weight,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          name,
        },
      },
    },
  },
}: DictionaryContentProps) => {
  return (
    <Template>
      <DictionaryBlock>
        <DictionaryList />
        <DictionaryContent>
          <h1>{title}</h1>
          <InfoBlock>
            <tbody>
              <tr>
                <td>학명</td>
                <td>{species}</td>
              </tr>
              <tr>
                <td>높이</td>
                <td>{height}</td>
              </tr>
              <tr>
                <td>무게</td>
                <td>{weight}</td>
              </tr>
            </tbody>
          </InfoBlock>
          <GatsbyImage image={gatsbyImageData} alt={name} />
          <PostBody body={body} />
        </DictionaryContent>
      </DictionaryBlock>
    </Template>
  );
};

export default DictionaryTemplate;

export const query = graphql`
  query ($slugs: String) {
    mdx(fields: { slugs: { eq: $slugs } }) {
      body
      frontmatter {
        height
        species
        title
        weight
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 768)
          }
          name
        }
      }
    }
  }
`;
