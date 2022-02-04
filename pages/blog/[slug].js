// client imports
// import { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import { Layout } from 'components';
import api from 'config/ghost-client';

// server imports
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';
import cheerio from 'cheerio';
import { decode } from 'html-entities';

import BlackBanner from 'components/Blog/BlackBanner';
import Content from 'components/Blog/Content';
import Title from 'components/Blog/Title';

const Post = (props) => {
	return (
		<Layout title={props.title} description={props.excerpt}>
			<BlackBanner />
			<Row className='vh-75 d-flex justify-content-center'>
				<Title title={props.title} />
				<Row className='d-flex justify-content-center'>
					<Content html={props.html} title={props.title} id={props.id} />
				</Row>
			</Row>
		</Layout>
	);
};

export default Post;

export async function getStaticProps({ params: { slug } }) {
	const post = await api.posts.read({ slug });

	// eslint-disable-next-line unicorn/prefer-module
	require('prismjs/plugins/treeview/prism-treeview');

	// properly parse and format all hightlighted
	// code blocks on the server
	const $ = cheerio.load(post.html);
	const $codes = $('code[class^=language]');
	if ($codes.length > 0)
		$codes.each(function () {
			const $code = $(this);
			const lang = $code.attr('class').replace('language-', '');
			const code = decode($code.html());
			// default loaded languages with prisma, skip to decrease build times
			if (!['javascript', 'css', 'clike', 'markup', 'treeview'].includes(lang))
				loadLanguages([lang]);
			$code.html(Prism.highlight(code, Prism.languages[lang], lang));
			$code
				.parent('pre')
				.addClass(`language-${lang}`)
				// .addClass('position-relative')
				.wrap(
					'<div class="copy-code-container position-relative"><div>'
				).after(`
					<button class="copy-button btn btn-sm btn-secondary position-absolute top-0 end-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
							<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
							<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
						</svg>
					</button>
				`);

			post.html = $.html();
		});

	return {
		props: post,
		revalidate: 1
	};
}

export async function getStaticPaths() {
	const posts = await api.posts.browse();

	return {
		paths: posts.map(({ slug }) => ({ params: { slug } })),
		fallback: 'blocking'
	};
}
