/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /*
     * remotePatterns — allowlist of external hostnames that Next.js <Image>
     * is permitted to fetch and optimise.  Any hostname NOT listed here will
     * cause a runtime error if used in an <Image src="https://…"> tag.
     *
     * Only add a hostname here when:
     *   1. You trust the host (it won't serve malicious content).
     *   2. You cannot host the asset locally (e.g. a CDN icon library).
     *
     * Current entries:
     *   raw.githubusercontent.com — used for the Claude Code icon in AboutSection
     *                               (lobehub icon library, served from GitHub's CDN)
     */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
}

module.exports = nextConfig
