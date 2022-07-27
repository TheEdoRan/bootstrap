/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: true,
	output: "standalone",
	experimental: {
		newNextLinkBehavior: true,
	},
};

module.exports = nextConfig;
