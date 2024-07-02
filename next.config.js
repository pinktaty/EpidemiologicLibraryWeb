/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "export",
    basePath: '/EpidemiologicLibrary',
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
}

module.exports = nextConfig