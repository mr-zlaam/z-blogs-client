/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";
const nextConfig = {
  env: {
    BACKEND_URI: process.env.NEXT_PUBLIC_BACKEND_URI_DEV,
    SECRET: process.env.JWT_ACCESS_SECRET,
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

export default withPlaiceholder(nextConfig);
