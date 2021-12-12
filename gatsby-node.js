const path = require('path');
const slugify = require('slugify');

// Setup Import Alias
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {};

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        lib: path.resolve(__dirname, 'src/lib'),
        templates: path.resolve(__dirname, 'src/templates'),
        types: path.resolve(__dirname, 'src/types'),
      },
    },
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = slugify(node.frontmatter.title, { lower: true });
    createNodeField({ node, name: 'slugs', value });
  }
};

// Generate Post Page Through Markdown Data
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // Get All Markdown File For Paging
  const query = await graphql(`
    {
      allMdx(
        filter: { frontmatter: { category: { eq: "dictionary" } } }
        sort: { order: DESC, fields: frontmatter___title }
      ) {
        edges {
          node {
            fields {
              slugs
            }
          }
        }
      }
    }
  `);

  // Handling GraphQL Query Error
  if (query.errors) {
    reporter.panicOnBuild(`Error while running query`);
    return;
  }

  const TemplateComponent = path.resolve(
    __dirname,
    'src/components/main/DictionaryTemplate.tsx',
  );

  const generatePage = ({
    node: {
      fields: { slugs },
    },
  }) =>
    createPage({
      path: `/dictionary/${slugs}`,
      component: TemplateComponent,
      context: { slugs },
    });

  query.data.allMdx.edges.forEach(generatePage);
};
