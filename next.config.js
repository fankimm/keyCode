/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== "production";
const repository = "http://fankimm.github.io/keyCode";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: !debug ? `/${repository}/` : "",
  trailingSlash: true,
};

module.exports = nextConfig;
