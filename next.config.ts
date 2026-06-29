import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* yahan tumhare baaki config options aayenge agar koi hain */
  
  async redirects() {
    return [
      {
        source: '/refund-policy',
        destination: '/terms-and-conditions',
        permanent: true, 
      },
      {
        source: '/privacy-policy', // URL should not have spaces, usually it's /privacy-policy
        destination: '/terms-and-conditions',
        permanent: true, 
      },
      // Agar real URL '/Privacy Policy' jaisa dikhta hai server par (jo ki galat practice hai)
      // toh usko aise escape karke likhna padega:
      // {
      //   source: '/Privacy%20Policy',
      //   destination: '/terms-and-conditions',
      //   permanent: true,
      // }
    ];
  },
};

export default nextConfig;