/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URI: process.env.NEXT_PUBLIC_BACKEND_URI_DEV,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
