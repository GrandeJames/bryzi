import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Exclude protected pages because they are not accessible to search engines
  return [
    {
      url: "https://bryzi.com",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://bryzi.com/login",
      lastModified: new Date(),
      priority: 0.2,
    },
  ];
}
