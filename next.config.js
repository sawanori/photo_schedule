/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ビルド時の型チェックを無効にする場合（開発時のみ型チェックを行う）
    // ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
