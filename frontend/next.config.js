/*  @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   images: {
     remotePatterns: [
       {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
       },
       {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
     ],
   },
 };

module.exports = nextConfig; 

