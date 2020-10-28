import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Layout } from 'components';
import api from 'config/ghost-client';

const post = (props) => {
  return (
    <Layout>
      <Row className='position-absolute h-35 rl-0 border p-0 m-0 bg-dark' />
      <Row className='d-flex justify-content-center align-items-center vh-75'>
        <Col
          lg={8}
          md={10}
          xs={12}
          className='bg-white p-5 mt-5 border rounded-sm'>
          <h3 className='text-center mb-5'>{props.title}</h3>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: props.html }} />
        </Col>
      </Row>
    </Layout>
  );
};

export default post;

export async function getStaticProps({ params: { slug } }) {
  const post = await api.posts.read({ slug });
  return {
    props: post
  };
}

export async function getStaticPaths() {
  const posts = await api.posts.browse();

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking'
  };
}
