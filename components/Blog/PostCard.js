import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import format from 'date-fns/format';
import differenceInDays from 'date-fns/differenceInDays';

const formatDate = (dateStr) => format(new Date(dateStr), 'M/d/yy');

const PostCard = ({ post }) => {
	const showUpdated = (post) => {
		const daysBetweenPublishedAndUpdated = Math.abs(
			differenceInDays(new Date(post.published_at), new Date(post.updated_at))
		);

		return daysBetweenPublishedAndUpdated > 30;
	};

	return (
		<Link key={post.id} href={`/blog/${post.slug}`}>
			<div className='bg-white rounded p-2 my-3 ms-0 border post-link'>
				<Row>
					<Col xs={12} className='h5'>
						{post.title}
					</Col>
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
					<Col xs={10} className='post-link'>
						<div
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{
								__html: post.excerpt
							}}
						/>
					</Col>
				</Row>
			</div>
		</Link>
	);
};

export default PostCard;
