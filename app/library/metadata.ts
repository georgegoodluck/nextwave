// app/library/metadata.ts
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Resource Library | NextWave Global",
  description:
    "Access free PDF resources, guides, and books to help you learn, earn, and lead. Download productivity, sales, finance, and wealth-building resources.",
  keywords: [
    "free resources",
    "PDF library",
    "student resources",
    "productivity books",
    "finance guides",
    "wealth building",
    "entrepreneurship",
    "negotiation skills",
    "public speaking",
  ],
  openGraph: {
    title: "Free Resource Library | NextWave Global",
    description:
      "Access free PDF resources, guides, and books to help you learn, earn, and lead.",
    url: "/library",
    images: [
      {
        url: "/og-library.jpg",
        width: 1200,
        height: 630,
        alt: "NextWave Global Resource Library",
      },
    ],
  },
  twitter: {
    title: "Free Resource Library | NextWave Global",
    description:
      "Access free PDF resources, guides, and books to help you learn, earn, and lead.",
    images: ["/og-library.jpg"],
  },
};
