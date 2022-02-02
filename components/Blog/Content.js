import Col from 'react-bootstrap/Col';
import { DiscussionEmbed } from 'disqus-react';

const Content = ({ html, title, id }) => (
	<Col
		xl={8}
		lg={9}
		md={10}
		sm={11}
		xs={12}
		className='bg-white border rounded p-sm-3 px-1'>
		<div
			/* eslint-disable-next-line react/no-danger */
			dangerouslySetInnerHTML={{ __html: html }}
		/>
		{typeof window === 'undefined' ? null : (
			<DiscussionEmbed
				shortname='spencersnyder-io'
				config={{
					url: `${window.location.origin}${window.location.pathname}`,
					title,
					identifier: id
				}}
			/>
		)}
	</Col>
);

export default Content;
