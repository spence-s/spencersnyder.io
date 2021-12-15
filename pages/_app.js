import Script from 'next/script';
import { AnimatePresence } from 'framer-motion';
import '../styles/custom.scss';
import 'prism-themes/themes/prism-dracula.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
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
