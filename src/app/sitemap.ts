import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { courses } from "@/content/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...courses.map((c) => ({ url: `${site.url}/cursos/${c.slug}`, priority: 0.8 })),
    { url: `${site.url}/privacidad`, priority: 0.2 },
    { url: `${site.url}/terminos`, priority: 0.2 },
  ];
}
