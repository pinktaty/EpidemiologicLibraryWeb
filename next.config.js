/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "export",
    distDir: 'dist',
    images: {
        loader: "akamai",
        path: ""
    }
}

module.exports = nextConfig