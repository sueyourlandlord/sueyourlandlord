import '../styles/globals.css';
import { Rubik } from '@next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const rubik = Rubik({
    subsets: ['latin'],
    variable: '--font-rubik',
});

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const pageIsGerman = router.query.locale === 'de';

    return (
        <main className={`${rubik.variable} font-sans relative`}>
            <Head>
                <title>Sue Your Landlord</title>
                <meta name='description' content='online fast!' />
                <link rel='icon' href='/favicon.ico' type='image/x-icon' />
            </Head>
            <div className='absolute top-0 right-0 z-50 overflow-hidden shadow rounded-bl-md flex-row-center'>
                <Link
                    href={router.asPath.replace('/en', '/de')}
                    className={
                        'w-10 h-10 leading-10 text-center ' +
                        (pageIsGerman
                            ? 'bg-white text-black font-semibold'
                            : 'bg-gray-300 text-gray-700')
                    }
                >
                    de
                </Link>
                <Link
                    href={router.asPath.replace('/de', '/en')}
                    className={
                        'w-10 h-10 leading-10 text-center ' +
                        (!pageIsGerman
                            ? 'bg-white text-black font-semibold'
                            : 'bg-gray-300 text-gray-700')
                    }
                >
                    en
                </Link>
            </div>
            <Component {...pageProps} />
        </main>
    );
}
