import PostBody from 'components/common/PostBody';
import Template from 'components/common/Template';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { MarkdownNode, PostFrontmatter } from 'lib/types';
import React from 'react';

type IndexPageProps = {
  data: {
    allMdx: {
      edges: [
        {
          node: MarkdownNode<PostFrontmatter>;
        },
      ];
    };
  };
};

const IndexPage = ({
  data: {
    allMdx: {
      edges: [
        {
          node: {
            body,
            frontmatter: {
              thumbnail: {
                childImageSharp: { gatsbyImageData },
                name,
              },
            },
          },
        },
      ],
    },
  },
}: IndexPageProps) => {
  return (
    <Template>
      <GatsbyImage image={gatsbyImageData} alt={name} />
      <PostBody body={body} />
    </Template>
  );
};

export default IndexPage;

export const query = graphql`
  {
    allMdx(filter: { frontmatter: { title: { eq: "home" } } }) {
      edges {
        node {
          frontmatter {
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              name
            }
          }
          body
        }
      }
    }
  }
`;
