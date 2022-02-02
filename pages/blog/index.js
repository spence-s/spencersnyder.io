import { useState, useEffect } from 'react';
import { Layout } from 'components';
import api from 'config/ghost-client';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import MarkdownIt from 'markdown-it/lib';
import isSANB from 'is-string-and-not-blank';
import qs from 'querystringify';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import PostCard from 'components/Blog/PostCard';

const formatUrlTag = (str = '') => slugify(str.toLowerCase());

const Blog = (props) => {
	const [filterTags, setFilterTags] = useState([]);
	const router = useRouter();

	useEffect(() => {
		if (window?.location?.search) {
			let { tags = [] } = qs.parse(window.location.search);
			tags = (Array.isArray(tags) ? tags : tags.split(',')).map((tag) =>
				formatUrlTag(tag)
			);
			const newTags =
				tags.length > 0
					? props.tags.filter((tag) => tags.includes(formatUrlTag(tag.name)))
					: [];
			setFilterTags(newTags);
		}
	}, [props.tags]);

	useEffect(() => {
		if (filterTags.length > 0) {
			router.push(
				qs.stringify(
					{
						tags: filterTags
							.map((tag) => slugify(tag.name.toLowerCase()))
							.join(',')
					},
					true
				),
				undefined,
				{
					shallow: true
				}
			);
		} else {
			router.push('/blog', undefined, { shallow: true });
		}
	}, [filterTags]);

	const handleTagClick = (tag) => () => {
		if (filterTags.some((t) => t.name === tag.name))
			setFilterTags(filterTags.filter((t) => t.name !== tag.name));
		else setFilterTags(filterTags.concat(tag));
	};

	return (
		<Layout title='Blog'>
			<Row>
				<Col xs={12} md={2}>
					<div className='mt-3'>Filters:</div>
					{props.tags.map((tag) => {
						const classNames = ['btn badge'];
						if (filterTags.some((t) => t.name === tag.name))
							classNames.push('bg-dark');
						else classNames.push('bg-secondary');

						return (
							<div
								key={tag.id}
								className='float-start me-2 m2-md-0'
								onClick={handleTagClick(tag)}>
								<span className={classNames.join(' ')}>{tag.name}</span>
							</div>
						);
					})}
				</Col>
				<Col xs={12} md={10}>
					{props.posts
						.filter((post) =>
							isEmpty(filterTags)
								? true
								: post.tags.some((tag) =>
										filterTags.some((t) => tag.name === t.name)
								  )
						)
						.map((post) => (
							<PostCard key={post.id} post={post} />
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
