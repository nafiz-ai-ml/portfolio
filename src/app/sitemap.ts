import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${siteConfig.domain}`;
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}

