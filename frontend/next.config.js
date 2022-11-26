/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        fontLoaders: [
            { loader: '@next/font/google', options: { subsets: ['latin'] } },
        ],
    },
    images: {
        unoptimized: true,
    },
    i18n: {
        locales: ['en', 'de'],
        defaultLocale: 'de',
        localeDetection: false,
    },
};
