import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bymxyrhvntbfyxhvpxek.supabase.co",
      },
      {
        protocol: "https",
        hostname: "api.lyfline.id",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  async redirects() {
    const staticRedirects = [
      {
        source: "/id",
        destination: "/",
        permanent: true,
      },
      {
        source: "/id/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/layanan-kami",
        destination: "/services",
        permanent: true,
      },
    ];

    const redirectFromHost = process.env.REDIRECT_FROM_HOST;
    const canonicalUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!redirectFromHost || !canonicalUrl) return staticRedirects;

    // Parse host for circular redirect checks
    let canonicalHost = canonicalUrl;
    try {
      canonicalHost = new URL(canonicalUrl).host;
    } catch {
      // Fallback
    }

    if (redirectFromHost === canonicalHost) return staticRedirects;

    return [
      ...staticRedirects,
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: redirectFromHost,
          },
        ],
        destination: `${canonicalUrl}/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
