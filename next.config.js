/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "export",
    basePath: "/EpidemiologicLibraryWeb",
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
}

module.exports = nextConfig