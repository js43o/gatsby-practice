import Template from 'components/common/Template';
import { Link } from 'gatsby';
import React from 'react';

const NotFoundPage = () => {
  return (
    <Template>
      <h1>Page Not Found!</h1>
      <br />
      <Link to="/">홈으로</Link>
    </Template>
  );
};

export default NotFoundPage;
