/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		outputStandalone: true,
	},
	swcMinify: true,
};

// ESLint/TS errors are ignored during builds, since checks are already performed during pre-commits.

module.exports = nextConfig;
