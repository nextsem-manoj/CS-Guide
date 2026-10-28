import { MetadataRoute } from 'next';

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/profile'],
    },
    sitemap: 'https://cs.nextsem.online/sitemap.xml',
  };
}
