/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    githubId: process.env.GITHUB_ID,
    githubSecret: process.env.GITHUB_SECRET,
    googleId: process.env.GOOGLE_CLIENT_ID,
    googleSecret: process.env.GOOGLE_CLIENT_SECRET,
    hasuraApi: process.env.HASURA_PROJECT_ENDPOINT,
    hasuraAdminSecret: process.env.HASURA_ADMIN_SECRET,
  },
}

module.exports = nextConfig
