import { useState } from 'react';
import { Layout } from 'components';
import api from 'config/ghost-client';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import format from 'date-fns/format';
import differenceInDays from 'date-fns/differenceInDays';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import MarkdownIt from 'markdown-it/lib';
import isSANB from 'is-string-and-not-blank';

const Blog = (props) => {
	const [filterTags, setFilterTags] = useState([]);

	const handleTagClick = (tag) => () => {
		if (filterTags.some((t) => t.name === tag.name))
			setFilterTags(filterTags.filter((t) => t.name !== tag.name));
		else setFilterTags(filterTags.concat(tag));
	};

	const formatDate = (dateStr) => format(new Date(dateStr), 'M/d/yy');

	const showUpdated = (post) => {
		const daysBetweenPublishedAndUpdated = Math.abs(
			differenceInDays(new Date(post.published_at), new Date(post.updated_at))
		);

		return daysBetweenPublishedAndUpdated > 30;
	};

	return (
		<Layout>
			<Row>
				<Col xs={12} lg={1}>
					<div className='mt-5'>Filters:</div>
					{props.tags.map((tag) => {
						const classNames = ['btn badge'];
						if (filterTags.some((t) => t.name === tag.name))
							classNames.push('bg-dark');
						else classNames.push('bg-secondary');

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
						.map((post) => (
							<div key={post.id} className='m-5 bg-white rounded p-3'>
								<Row>
									<Link key={post.id} href={`/blog/${post.slug}`}>
										<Col xs={12} className='post-link h5'>
											{post.title}
										</Col>
									</Link>
									<Col xs={12} className='small text-muted'>
										{showUpdated(post) ? (
											<>
												<div>
													Originally Published:
													{` ${formatDate(post.published_at)} `}
												</div>
												<div>
													Last Updated:
													{` ${formatDate(post.updated_at)} `}
												</div>
											</>
										) : (
											<div>Published: {formatDate(post.published_at)}</div>
										)}
									</Col>
								</Row>
								<Row className='justify-content-start align-items-start'>
									<Link href={`/blog/${post.slug}`}>
										<Col xs={10} className='post-link pt-3 w-75'>
											<div
												// eslint-disable-next-line react/no-danger
												dangerouslySetInnerHTML={{
													__html: post.excerpt
												}}
											/>
										</Col>
									</Link>
								</Row>
							</div>
						))}
				</Col>
			</Row>
		</Layout>
	);
};

export default Blog;

export async function getStaticProps() {
	const md = new MarkdownIt();
	const posts = sortBy(await api.posts.browse({ include: 'tags' }), (post) =>
		new Date(post.published_at).getTime()
	)
		.reverse()
		.map((post) => {
			post.excerpt = isSANB(post.custom_excerpt)
				? md.render(post.custom_excerpt)
				: md.render(`${post.excerpt.slice(0, 300)}...`);

			return post;
		});

	const tags = await api.tags.browse();

	return {
		props: { posts, tags },
		revalidate: 1
	};
}
