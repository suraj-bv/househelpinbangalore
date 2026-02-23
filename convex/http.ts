import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const BASE_URL = "https://househelpinbangalore.com";

const http = httpRouter();

/**
 * Dynamic sitemap endpoint — serves /sitemap-dynamic.xml with all blog post URLs.
 * This is called from the main sitemap.xml via a sitemap index, or can be submitted
 * directly to Google Search Console as a supplementary sitemap.
 *
 * URL: https://secret-mink-845.eu-west-1.convex.site/sitemap.xml
 */
http.route({
  path: "/sitemap.xml",
  method: "GET",
  handler: httpAction(async (ctx) => {
    // Fetch all blog posts from the database
    const posts = await ctx.runQuery(api.blogPosts.getAll);

    const blogUrls = posts
      .map((post) => {
        const lastmod = post.date
          ? post.date.substring(0, 10)
          : new Date().toISOString().substring(0, 10);
        return `
  <url>
    <loc>${BASE_URL}/blogs/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${new Date().toISOString().substring(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Blog Listing Page -->
  <url>
    <loc>${BASE_URL}/blogs</loc>
    <lastmod>${new Date().toISOString().substring(0, 10)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${blogUrls}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Robots-Tag": "noindex",
      },
    });
  }),
});

/**
 * Robots.txt served from the Convex backend (optional backup)
 */
http.route({
  path: "/robots.txt",
  method: "GET",
  handler: httpAction(async () => {
    const content = `User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://househelpinbangalore.com/sitemap.xml`;

    return new Response(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }),
});

export default http;
