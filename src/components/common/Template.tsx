import React, { ReactNode } from 'react';
import GlobalStyle from 'components/common/GlobalStyle';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import Header from './Header';
import { graphql, useStaticQuery } from 'gatsby';
import Footer from './Footer';

type TemplateProps = {
  children: ReactNode;
};

const TemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentsBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type query = {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      author: string;
    };
  };
  file: {
    publicURL: string;
  };
};

const Template = ({ children }: TemplateProps) => {
  const response = useStaticQuery<query>(graphql`
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
        }
      }
      file {
        publicURL
      }
    }
  `);

  const meta = response.site.siteMetadata;

  return (
    <TemplateBlock>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:title" content={meta.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.siteUrl} />
        <meta property="og:image" content={response.file.publicURL} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
      </Helmet>
      <GlobalStyle />
      <Header />
      <ContentsBlock>{children}</ContentsBlock>
      <Footer />
    </TemplateBlock>
  );
};

export default Template;
