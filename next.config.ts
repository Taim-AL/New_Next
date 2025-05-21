import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '', // فارغ = كل البورتات، أو اكتب '8000' لو تستخدمه
        pathname: '/specialization_image/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '', // لو عندك مسارات ثانية في نفس localhost
        pathname: '/course_image/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/course_image/**',
      },{
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/video_thumbnail/**',
      },{
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/teacher_image/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/specialization_image/**',
      },
      ],
    },
};

export default nextConfig;
