/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
}

module.exports = nextConfig
