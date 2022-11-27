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
    async redirects() {
        return [
            {
                source: '/',
                destination: '/de',
                permanent: true,
            },
        ];
    },
};
