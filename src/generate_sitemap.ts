import * as fs from 'fs';
import * as path from 'path';
import {glob} from 'glob';
import {BASE_URL} from './index.js';
import {austrianRegions} from "./data/austrianHolidays.js";
import {stateToFilename} from "./types/Holiday.js";
import {germanCalenderVariants} from "./data/germanHolidays.js";

// Configuration
const HOLIDAYS_DIR = "holidays";
const OUTPUT_DIR = `${HOLIDAYS_DIR}/output`;
const HOLIDAYS_URL = `${BASE_URL}holidays/`;

function getLastModified(filepath: string): string {
    try {
        const stats = fs.statSync(filepath);
        return stats.mtime.toISOString().split('T')[0];
    } catch (e) {
        return new Date().toISOString().split('T')[0];
    }
}

async function getIcsFiles(directory: string): Promise<string[]> {
    if (!fs.existsSync(directory)) {
        return [];
    }
    const files = await glob(`${directory}/*.ics`);
    return files.map(f => path.basename(f)).sort();
}

function addLastModifiedLines(filename: string, sitemapLines: string[]) {
    const filepath = path.join(OUTPUT_DIR, filename);
    const lastModified = getLastModified(filepath);
    sitemapLines.push('  <url>');
    sitemapLines.push(`    <loc>${HOLIDAYS_URL}output/${filename}</loc>`);
    sitemapLines.push(`    <lastmod>${lastModified}</lastmod>`);
    sitemapLines.push('    <changefreq>yearly</changefreq>');
    sitemapLines.push('    <priority>0.5</priority>');
    sitemapLines.push('  </url>');
    sitemapLines.push('');
}

function addFilePath(filename: string, sitemapLines: string[], urlCount: number) {
    const filepath = path.join(OUTPUT_DIR, filename);

    if (fs.existsSync(filepath)) {
        addLastModifiedLines(filename, sitemapLines);
        urlCount++;
        console.log(`  ✓ ${filename}`);
    }
    return urlCount;
}

async function generateIcsEntries(): Promise<string[]> {
    console.log();
    console.log("Generating ICS calendar entries...");

    const sitemapLines: string[] = [];
    let urlCount = 0;

    // German holidays ICS files
    const germanBundeslaenderVariant = germanCalenderVariants.map(variant => stateToFilename(variant));

    sitemapLines.push('  <!-- German Holidays ICS Files -->');
    for (const bundesland of germanBundeslaenderVariant) {
        urlCount = addFilePath(`german_holidays_${bundesland}.ics`, sitemapLines, urlCount);
    }

    // Austrian holidays ICS files
    sitemapLines.push('  <!-- Austrian Holidays ICS Files -->');

    // Rolling calendar (main one)
    urlCount = addFilePath('austrian_holidays.ics', sitemapLines, urlCount)

    // Year-specific Austrian calendars
    const austrianIcsFiles = await getIcsFiles(OUTPUT_DIR);
    for (const filename of austrianIcsFiles) {
        if (filename.startsWith('austrian_holidays_') && filename !== 'austrian_holidays.ics') {
            addLastModifiedLines(filename, sitemapLines);
            urlCount++;
            console.log(`  ✓ ${filename}`);
        }
    }

    // Austrian school holidays ICS files
    sitemapLines.push('  <!-- Austrian School Holidays ICS Files -->');

    const austrianBundeslaender = austrianRegions.map(bundesland => stateToFilename(bundesland));

    for (const bundesland of austrianBundeslaender) {
        urlCount = addFilePath(`school_holidays_${bundesland}.ics`, sitemapLines, urlCount);
    }

    console.log(`  Total ICS files: ${urlCount}`);

    return sitemapLines;
}

async function generateSitemap() {
    console.log("=".repeat(60));
    console.log("Main Sitemap Generator");
    console.log("=".repeat(60));
    console.log();

    const currentDate = new Date().toISOString().split('T')[0];

    const sitemapLines: string[] = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ''
    ];

    // Static pages in the root repo
    const staticPages = [
        {
            loc: `${BASE_URL}`,
            file: 'index.html',
            changefreq: 'monthly',
            priority: '1.0',
            comment: 'Landing Page',
            hreflang: [
                { lang: 'de', url: `${BASE_URL}` },
                { lang: 'de-DE', url: `${HOLIDAYS_URL}de/` },
                { lang: 'de-AT', url: `${HOLIDAYS_URL}at/` }
            ]
        }
    ];

    // Pages from holidays repo (served via GitHub Pages)
    const holidaysPages = [
        {
            loc: `${HOLIDAYS_URL}/de/index.html`,
            file: null, // In another repo
            changefreq: 'monthly',
            priority: '0.9',
            comment: 'German Holidays',
            hreflang: [{ lang: 'de-DE', url: `${HOLIDAYS_URL}de/index.html` }]
        },
        {
            loc: `${HOLIDAYS_URL}/at/index.html`,
            file: null, // In other repo
            changefreq: 'monthly',
            priority: '0.9',
            comment: 'Austrian Holidays',
            hreflang: [{ lang: 'de-AT', url: `${HOLIDAYS_URL}at/index.html` }]
        },
        {
            loc: `${HOLIDAYS_URL}/at/impressum.html`,
            file: null, // In other repo
            changefreq: 'yearly',
            priority: '0.3',
            comment: 'Impressum'
        }
    ];

    const allPages = [...staticPages, ...holidaysPages];

    // Add static pages
    for (const page of allPages) {
        sitemapLines.push(`  <!-- ${page.comment} -->`);
        sitemapLines.push('  <url>');
        sitemapLines.push(`    <loc>${page.loc}</loc>`);

        let lastmod = currentDate;
        if (page.file && fs.existsSync(page.file)) {
            lastmod = getLastModified(page.file);
        }

        sitemapLines.push(`    <lastmod>${lastmod}</lastmod>`);
        sitemapLines.push(`    <changefreq>${page.changefreq}</changefreq>`);
        sitemapLines.push(`    <priority>${page.priority}</priority>`);

        if (page.hreflang) {
            for (const { lang, url } of page.hreflang) {
                sitemapLines.push(`    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}"/>`);
            }
        }

        sitemapLines.push('  </url>');
        sitemapLines.push('');
        console.log(`✓ Added page: ${page.comment}`);
    }

    // Load ICS entries directly
    const icsEntries = await generateIcsEntries();
    sitemapLines.push(...icsEntries);

    // Close XML
    sitemapLines.push('</urlset>');

    // Write sitemap.xml
    const sitemapContent = sitemapLines.join('\n');

    fs.writeFileSync('sitemap.xml', sitemapContent, 'utf-8');

    console.log();
    console.log("=".repeat(60));
    console.log(`✓ Sitemap generated: sitemap.xml`);
    console.log(`  Total URLs: ${sitemapContent.match(/<url>/g)?.length || 0}`);
    console.log(`  Last updated: ${currentDate}`);
    console.log("=".repeat(60));
    console.log();
    console.log("Next steps:");
    console.log("1. Update BASE_URL in this script to your actual domain");
    console.log("2. Commit and push sitemap.xml to your root repo");
    console.log("3. Submit to Google Search Console");
    console.log("4. Submit to Bing Webmaster Tools");
}

function generateRobotsTxt() {
    const robotsContent = `# robots.txt for Feiertage & Schulferien Calendar
# ${BASE_URL}robots.txt

# Allow all crawlers to access everything
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${BASE_URL}sitemap.xml

# Specific rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 0

# Allow calendar files to be indexed
Allow: /holidays/output/*.ics
Allow: /holidays/output/school/*.ics

# Allow all HTML pages
Allow: /holidays/de/
Allow: /holidays/at/
Allow: /holidays/*.html
`;

    fs.writeFileSync('robots.txt', robotsContent, 'utf-8');
    console.log("✓ Generated: robots.txt");
}

async function main() {
    console.log();
    console.log("🗓️  Feiertage & Schulferien - Main Sitemap Generator");
    console.log("   (For root GitHub Pages repo)");
    console.log();

    // @ts-ignore
    if (BASE_URL === "https://yourdomain.com") {
        console.log("⚠️  WARNING: Please update BASE_URL in this script!");
        console.log("   Current: https://yourdomain.com");
        console.log("   Change to your actual domain name");
        console.log();
    }

    await generateSitemap();
    generateRobotsTxt();

    console.log();
    console.log("All done! 🎉");
    console.log();
}

main().catch(console.error);
