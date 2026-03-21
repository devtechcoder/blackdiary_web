const path = require("path");

const publicEnv = Object.keys(process.env)
  .filter((key) => key.startsWith("REACT_APP_"))
  .reduce((acc, key) => {
    acc[key] = process.env[key];
    return acc;
  }, {});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: publicEnv,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-router-dom": path.resolve(__dirname, "src/compat/reactRouterDom.js"),
      "react-router": path.resolve(__dirname, "src/compat/reactRouterDom.js"),
      "react-helmet-async": path.resolve(__dirname, "src/compat/reactHelmetAsync.js"),
    };

    return config;
  },
};

module.exports = nextConfig;
