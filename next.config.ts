import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: ".next",
  eslint: {
    // 빌드 시 ESLint 검사를 무시하도록 설정
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
