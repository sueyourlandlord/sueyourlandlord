/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    swcMinify: true,
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
