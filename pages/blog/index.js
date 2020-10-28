import { Layout } from 'components';
import api from 'config/ghost-client';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Blog = (props) => {
  return (
    <Layout>
      {props.posts.map((post, i) => {
        return (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Row xs={12} className='m-5 bg-white'>
              <Col className='rounded border p-5'>{post.title}</Col>
            </Row>
          </Link>
        );
      })}
    </Layout>
  );
};

export default Blog;

export async function getStaticProps() {
  const posts = await api.posts.browse();
  return {
    props: { posts },
    revalidate: 1
  };
}
