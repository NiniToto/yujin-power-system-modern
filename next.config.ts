import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: ".next", // Custom build directory (optional)
  
  // 로컬 폰트 최적화 설정
  optimizeFonts: true
};

export default nextConfig;
