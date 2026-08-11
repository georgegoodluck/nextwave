import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://nextwaveglobal.vercel.app/",
  ),
  title: {
    default: "NextWave Global - Learn, Earn, Lead",
    template: "%s | NextWave Global",
  },
  description:
    "Empowering students through events, mentorship, and career development. Join NextWave Global to learn, earn, and lead in your academic journey.",
  keywords: [
    "NextWave Global",
    "student empowerment",
    "career development",
    "mentorship",
    "academic success",
    "leadership",
    "student events",
    "professional development",
    "scholar reboot",
    "campus to linkedin",
    "tech career",
    "leadership skills",
  ],
  authors: [{ name: "NextWave Global" }],
  creator: "NextWave Global",
  publisher: "NextWave Global",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "NextWave Global - Learn, Earn, Lead",
    description:
      "Empowering students through events, mentorship, and career development",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "NextWave Global",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NextWave Global - Empowering Students Worldwide",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextWave Global - Learn, Earn, Lead",
    description:
      "Empowering students through events, mentorship, and career development",
    images: ["/og-image.jpg"],
    creator: "@nextwaveglobal",
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
  category: "education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
