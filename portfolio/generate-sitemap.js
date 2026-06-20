/**
 * Post-build sitemap generator.
 * Reads blog post IDs and dates from src/data/blog.js and generates dist/sitemap.xml.
 * Run after `vite build`: node generate-sitemap.js
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';

const DOMAIN = 'https://danielwpcv.vercel.app';
const DIST_DIR = './dist';

// Extract blog post id + date pairs from blog.js using regex (avoids importing ESM with JSX).
// Non-greedy match from each `id:` to its first following `date:` keeps the pair together.
const blogSource = readFileSync('./src/data/blog.js', 'utf-8');
const posts = [...blogSource.matchAll(/id:\s*["']([^"']+)["'][\s\S]*?date:\s*["']([^"']+)["']/g)]
    .map(m => ({ id: m[1], date: m[2] }));

const buildDate = new Date().toISOString().split('T')[0];
// Home lastmod = most recent post date (ISO strings sort chronologically), else build date.
const latestPostDate = posts.length ? [...posts.map(p => p.date)].sort().at(-1) : buildDate;

const urls = [
    { loc: '/', priority: '1.0', changefreq: 'monthly', lastmod: latestPostDate },
    ...posts.map(p => ({
        loc: `/blog/${p.id}`,
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: p.date,
    })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${DOMAIN}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

if (!existsSync(DIST_DIR)) {
    console.error('Error: dist/ directory not found. Run "vite build" first.');
    // eslint-disable-next-line no-undef
    process.exit(1);
}

writeFileSync(`${DIST_DIR}/sitemap.xml`, xml);
console.log(`✅ sitemap.xml generated with ${urls.length} URLs`);
