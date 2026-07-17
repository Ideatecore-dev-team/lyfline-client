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
    ],
  },
  async redirects() {
    const redirectFromHost = process.env.REDIRECT_FROM_HOST;
    const canonicalUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!redirectFromHost || !canonicalUrl) return [];

    // Parse host for circular redirect checks
    let canonicalHost = canonicalUrl;
    try {
      canonicalHost = new URL(canonicalUrl).host;
    } catch {
      // Fallback
    }

    if (redirectFromHost === canonicalHost) return [];

    return [
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
