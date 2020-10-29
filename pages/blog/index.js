import { Layout } from 'components';
import api from 'config/ghost-client';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import format from 'date-fns/format';

const Blog = (props) => {
  return (
    <Layout>
      {props.posts.map((post) => {
        return (
          <div key={post.id} className='m-5 bg-white rounded p-3'>
            <div>
              <Row>
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Col xs={12} className='post-link display-6'>
                    {post.title}
                  </Col>
                </Link>
                <Col xs={12} className='text-muted'>
                  {format(new Date(post.published_at), 'M/d/yy')}
                </Col>
              </Row>
              <Row className='justify-content-start align-items-start'>
                <Link href={`/blog/${post.slug}`}>
                  <Col xs={10} className='post-link pt-3 w-75'>
                    {`${post.excerpt.slice(0, 300)}...`}
                  </Col>
                </Link>
              </Row>
            </div>
            <div>
              <img />
            </div>
          </div>
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
