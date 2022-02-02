// client imports
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
			if (!['javascript', 'css', 'clike', 'markup'].includes(lang))
				loadLanguages([lang]);
			$code.html(Prism.highlight(code, Prism.languages[lang], code));
			$code.parent('pre').addClass(`language-${lang}`);
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
