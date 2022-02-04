import Script from 'next/script';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import 'prism-themes/themes/prism-dracula.css';
import 'prismjs/plugins/treeview/prism-treeview.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import '../styles/custom.scss';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link
					rel='preload'
					href='/fonts/DankMono-Regular.otf'
					as='font'
					crossOrigin=''
				/>
				<link
					rel='preload'
					href='/fonts/DankMono-Italic.otf'
					as='font'
					crossOrigin=''
				/>
			</Head>
			<Script
				strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
			/>
			<Script strategy='afterInteractive'>
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}')
				`}
			</Script>
			<AnimatePresence exitBeforeEnter>
				<Component {...pageProps} />
			</AnimatePresence>
		</>
	);
}

export default MyApp;
