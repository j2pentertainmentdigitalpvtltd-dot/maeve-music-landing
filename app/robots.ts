import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // Ye pages Google ko nahi dikhane
    },
    sitemap: 'https://www.maevemusicmusic.in/sitemap.xml',
  };
}