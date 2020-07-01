const withSass = require("@zeit/next-sass");
const withImages = require("next-images");
// Extend your Next config for advanced behavior
// See https://nextjs.org/docs/api-reference/next.config.js/introduction
let nextConfig = {};

// Add the Next SASS plugin
nextConfig = withSass(withImages(nextConfig));

module.exports = nextConfig;
