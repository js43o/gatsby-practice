import { IGatsbyImageData } from 'gatsby-plugin-image';

export type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  thumbnail: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
    name: string;
  };
};

export type DictionaryFrontmatter = {
  title_kr: string;
  title_en: string;
  species: string;
  weight: string;
  height: string;
  thumbnail: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
    name: string;
  };
};

export type MarkdownNode<Frontmatter> = {
  id: string;
  body: string;
  frontmatter: Frontmatter;
  fields: {
    slugs: string;
  };
};
