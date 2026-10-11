/**
 * 站点地图：构建时自动生成 /sitemap.xml
 * 手写而不用 @astrojs/sitemap 集成，是为了少一个依赖。
 * 加了新页面（比如以后加博客）记得在这里补上路径。
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/profile';

export const GET: APIRoute = async ({ site: astroSite }) => {
  const base = (astroSite ?? new URL(site.url)).href.replace(/\/$/, '');

  const projects = await getCollection('projects');

  const urls = [
    { loc: `${base}/`, priority: '1.0', changefreq: 'monthly' },
    ...projects.map((p) => ({
      loc: `${base}/projects/${p.id}`,
      priority: p.data.featured ? '0.8' : '0.5',
      changefreq: 'monthly' as const,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
