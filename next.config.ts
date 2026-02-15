import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // <--- Tambahin baris ini
  images: {
    unoptimized: true, // <--- Wajib kalau pakai component <Image /> di static export
  },
};

export default nextConfig;