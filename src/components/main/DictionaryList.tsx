import styled from '@emotion/styled';
import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { DictionaryFrontmatter, MarkdownNode } from 'lib/types';
import palette from 'lib/palette';

const DictionaryListBlock = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 1rem;
`;

const ItemBlock = styled(Link)`
  display: flex;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid ${palette.bluegrey[600]};
  background: ${palette.grey[100]};
`;

ItemBlock.defaultProps = {
  activeStyle: {
    background: palette.lightgreen[100],
  },
};

type StaticQuery = {
  allMdx: {
    edges: [
      {
        node: MarkdownNode<DictionaryFrontmatter>;
      },
    ];
  };
};

const Dictionary = () => {
  const response = useStaticQuery<StaticQuery>(graphql`
    {
      allMdx(filter: { frontmatter: { category: { eq: "dictionary" } } }) {
        edges {
          node {
            id
            frontmatter {
              title
            }
            fields {
              slugs
            }
          }
        }
      }
    }
  `);

  return (
    <DictionaryListBlock>
      <h1>목록</h1>
      {response.allMdx.edges.map(item => (
        <ItemBlock
          key={item.node.id}
          to={`/dictionary/${item.node.fields.slugs}`}
        >
          {item.node.frontmatter.title}
        </ItemBlock>
      ))}
    </DictionaryListBlock>
  );
};

export default Dictionary;
