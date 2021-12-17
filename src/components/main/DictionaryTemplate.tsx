import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import Template from 'components/common/Template';
import DictionaryList from 'components/main/DictionaryList';
import PostBody from 'components/common/PostBody';
import { DictionaryFrontmatter, MarkdownNode } from 'lib/types';
import palette from 'lib/palette';

const DictionaryBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const DictionaryContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h2 {
    color: ${palette.bluegrey[400]};
  }
`;

const InfoBlock = styled.table`
  border: 1px solid #cccccc;
  border-radius: 0.25rem;
  margin: 1rem 0;
  align-self: flex-start;
  th {
    padding: 0.5rem;
    color: ${palette.bluegrey[500]};
    font-weight: normal;
  }
  td {
    min-width: 8rem;
    padding: 0.5rem;
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
      frontmatter: {
        title_kr,
        title_en,
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
          <h1>{title_kr}</h1>
          <h2>{title_en}</h2>
          <InfoBlock>
            <tbody>
              <tr>
                <th>학명</th>
                <td>{species}</td>
              </tr>
              <tr>
                <th>키</th>
                <td>{height}</td>
              </tr>
              <tr>
                <th>무게</th>
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
        title_kr
        title_en
        species
        height
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
