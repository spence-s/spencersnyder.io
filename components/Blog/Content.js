import Col from 'react-bootstrap/Col';
import { DiscussionEmbed } from 'disqus-react';
import copy from 'copy-to-clipboard';

const Content = ({ html, title, id }) => {
	// we have to handle this imperatively
	// since react doesn't control the part of the dom
	// where the code blocks live
	let timer;
	const handleCodeCopy = (ev) => {
		const $button = ev.target.closest('button.copy-button');

		if ($button) {
			const $code = ev.target
				.closest('.copy-code-container')
				.querySelector('code[class^=language]');

			if ($code) {
				copy($code.textContent);
				// change the SVG to the checked version
				$button.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
						<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
						<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
					</svg>
				`;

				if (timer) clearTimeout(timer);

				timer = setTimeout(() => {
					// after 2 seconds change back
					$button.innerHTML = `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
							<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
							<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
						</svg>
					`;
				}, 2000);
			}
		}
	};

	return (
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
				onClick={handleCodeCopy}
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
};

export default Content;
