import '../styles/globals.css';
import { Rubik } from '@next/font/google';
import Head from 'next/head';

const rubik = Rubik({
    subsets: ['latin'],
    variable: '--font-rubik',
});

export default function App({ Component, pageProps }) {
    return (
        <main className={`${rubik.variable} font-sans`}>
            <Head>
                <title>Sue Your Landlord</title>
                <meta name='description' content='online fast!' />
                <link rel='icon' href='/favicon.ico' type='image/x-icon' />
            </Head>
            <Component {...pageProps} />
        </main>
    );
}
