/**
 * Post-build sitemap generator.
 * Reads blog post IDs from src/data/blog.js and generates dist/sitemap.xml.
 * Run after `vite build`: node generate-sitemap.js
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';

const DOMAIN = 'https://danielpardo.dev';
const DIST_DIR = './dist';

// Extract blog post IDs from blog.js using regex (avoids importing ESM with JSX)
const blogSource = readFileSync('./src/data/blog.js', 'utf-8');
const idMatches = [...blogSource.matchAll(/id:\s*["']([^"']+)["']/g)];
const blogIds = idMatches.map(m => m[1]);

const today = new Date().toISOString().split('T')[0];

const urls = [
    { loc: '/', priority: '1.0', changefreq: 'monthly' },
    ...blogIds.map(id => ({
        loc: `/blog/${id}`,
        priority: '0.8',
        changefreq: 'monthly',
    })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${DOMAIN}${u.loc}</loc>
    <lastmod>${today}</lastmod>
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
