// next.config.js
const withSourceMaps = require("@zeit/next-source-maps");

// Extend your Next config for advanced behavior
// See https://nextjs.org/docs/api-reference/next.config.js/introduction
let nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
