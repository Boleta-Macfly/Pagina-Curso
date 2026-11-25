import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio 100 % estático: funciona en Netlify, Vercel o cualquier hosting.
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    // Deben coincidir con WIDTHS de scripts/optimize-images.mjs
    deviceSizes: [640, 828, 1080, 1600],
    imageSizes: [128, 256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
