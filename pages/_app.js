import { AnimatePresence } from 'framer-motion';
import 'prism-themes/themes/prism-dracula.css';
import 'prismjs/plugins/treeview/prism-treeview.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import '../styles/custom.scss';

function MyApp({ Component, pageProps }) {
	return (
		<AnimatePresence exitBeforeEnter>
			<Component {...pageProps} />
		</AnimatePresence>
	);
}

export default MyApp;
