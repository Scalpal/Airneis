/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_ACCESS_KEY: process.env.ACCESS_KEY,
    AWS_SECRET_KEY: process.env.SECRET_KEY,
    AWS_BUCKET_URL: process.env.AWS_BUCKET_URL
  },
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname:	"airneis-ecommerce-shop.s3.eu-north-1.amazonaws.com",
			},
		],
  },
  i18n,
  async redirects() {
    return [
      {
        source: "/_error",
        destination: "/",
        permanent: false
      },
    ];
  },
};

module.exports = nextConfig;
