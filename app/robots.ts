import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || "http://nextwaveglobal.vercel.app/"}/sitemap.xml`,
  };
}