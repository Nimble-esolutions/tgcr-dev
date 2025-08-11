/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // trailingSlash: true,

  //outputFileTracingRoot: join(process.cwd(), "../../"), // Adjust if needed
  // outputFileTracingRoot: process.cwd(),
  // logging: {
  //   level: "verbose", // Enable detailed logging
  // },
  images: {
    unoptimized: true,
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "via.placeholder.com",
      "developers.google.com",
    ],
  },
  env: {
    NEXT_PUBLIC_BUILD_VERSION: process.env.VERSION ?? "dev",
  },
};

export default nextConfig;
