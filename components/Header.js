import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import * as gtag from '../config/analytics';

export const Header = ({ title, description, ogTitle }) => {
	const router = useRouter();
	useEffect(() => {
		const handleRouteChange = (url) => {
			gtag.pageview(url);
		};

		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
			<Script
				strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
			/>
			<Script
				id='gtag-init'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `
				}}
			/>
			<Head>
				<title>{title}</title>
				<NextSeo
					defaultTitle='spencersnyder.io'
					title={title}
					description={description}
					openGraph={{ title: ogTitle || title }}
				/>
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
		</>
	);
};

export default Header;
