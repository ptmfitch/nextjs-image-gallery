const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracingRoot: path.join(__dirname),
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/photos/**',
            },
        ],
    },
}

module.exports = nextConfig
