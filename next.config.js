/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: 'http://xuxiaohua.xhcy.online:8088',
  experimental: {
    images: {
        unoptimized: true
    }
}
}

module.exports = nextConfig
