// client imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Layout } from 'components';
import api from 'config/ghost-client';

// server imports
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';
import cheerio from 'cheerio';
import { decode } from 'html-entities';

const Post = (props) => {
	return (
		<Layout title={props.title} description={props.excerpt}>
			<Row className='position-absolute h-35 rl-0 bg-dark z-100' />
			<Row className='d-flex justify-content-center align-items-center vh-75'>
				<Col
					lg={8}
					md={10}
					xs={12}
					className='bg-white p-5 mt-5 border rounded'>
					<h3 className='text-center mb-5'>{props.title}</h3>
					{/* eslint-disable-next-line react/no-danger */}
					<div dangerouslySetInnerHTML={{ __html: props.html }} />
				</Col>
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
