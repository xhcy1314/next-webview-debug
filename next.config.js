const os = require('os');
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: `http://${os.userInfo().username}.xhcy.online:8088`,
  // assetPrefix: './',
  experimental: {
    images: {
      unoptimized: true,
    },
  },
};

module.exports = nextConfig;
