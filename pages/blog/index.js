import { useState } from 'react';
import { Layout } from 'components';
import api from 'config/ghost-client';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';

const Blog = (props) => {
  const [filterTags, setFilterTags] = useState([]);

  const handleTagClick = (tag) => () => {
    if (filterTags.some((t) => t.name === tag.name))
      setFilterTags(filterTags.filter((t) => t.name !== tag.name));
    else setFilterTags(filterTags.concat(tag));
  };

  const formatDate = (dateStr) => format(new Date(dateStr), 'M/d/yy');

  return (
    <Layout>
      <Row>
        <Col xs={12} lg={1}>
          <div className='mt-5'>Filters:</div>
          {props.tags.map((tag) => {
            const classNames = ['btn badge'];
            if (filterTags.some((t) => t.name === tag.name))
              classNames.push('badge-dark');
            else classNames.push('badge-secondary');

            return (
              <div key={tag.id} onClick={handleTagClick(tag)}>
                <span className={classNames.join(' ')}>{tag.name}</span>
              </div>
            );
          })}
        </Col>
        <Col xs={12} lg={11}>
          {props.posts
            .filter((post) =>
              isEmpty(filterTags)
                ? true
                : post.tags.some((tag) =>
                    filterTags.some((t) => tag.name === t.name)
                  )
            )
            .map((post) => {
              return (
                <div key={post.id} className='m-5 bg-white rounded p-3'>
                  <div>
                    <Row>
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <Col xs={12} className='post-link display-6'>
                          {post.title}
                        </Col>
                      </Link>
                      <Col xs={12} className='text-muted small'>
                        {post.published_at.toString() ===
                        post.updated_at.toString() ? (
                          formatDate(post.published_at)
                        ) : (
                          <>
                            <span className='mr-3'>
                              Originally Published:
                              {` ${formatDate(post.published_at)}`}
                            </span>
                            <span>
                              Updated On:
                              {` ${formatDate(post.updated_at)}`}
                            </span>
                          </>
                        )}
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
        </Col>
      </Row>
    </Layout>
  );
};

export default Blog;

export async function getStaticProps() {
  const posts = sortBy(await api.posts.browse({ include: 'tags' }), (post) =>
    new Date(post.published_at).getTime()
  ).reverse();

  const tags = await api.tags.browse();

  return {
    props: { posts, tags },
    revalidate: 1
  };
}
