import React from 'react';
import Layout from '../components/Layout';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';

const Blog = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  console.log(edges);
  const Posts = edges.map(edge => (
    <Link key={edge.node.id} to={`${edge.node.frontmatter.path}`}>
      {edge.node.frontmatter.title}
    </Link>
  ));

  return <Layout>Hello{Posts}</Layout>;
};

export default Blog;

Blog.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
