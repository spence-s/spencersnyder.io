import { AnimatePresence } from 'framer-motion';
import '../styles/custom.scss';
import 'prism-themes/themes/prism-dracula.css';

function MyApp({ Component, pageProps }) {
	return (
		<AnimatePresence exitBeforeEnter>
			<Component {...pageProps} />
		</AnimatePresence>
	);
}

export default MyApp;
