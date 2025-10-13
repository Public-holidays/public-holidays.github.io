#!/usr/bin/env python3
"""
Main Sitemap Generator for Root GitHub Pages Repo
Combines static pages with ICS calendar file entries
"""

from datetime import datetime
import os

# Configuration
BASE_URL = "https://public-holidays.github.io/holidays"  # CHANGE THIS to your actual domain
HOLIDAYS_REPO_PATH = "../public-holidays-holidays"  # Path to the holidays repo (adjust as needed)


def get_last_modified(filepath):
    """Get the last modification time of a file"""
    try:
        timestamp = os.path.getmtime(filepath)
        return datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d')
    except:
        return datetime.now().strftime('%Y-%m-%d')


def load_fragment_from_url():
    """
    Load sitemap fragment from published GitHub Pages site
    Returns list of URL entries or None if not found
    """
    fragment_url = f'{BASE_URL}/holidays/sitemap_fragment.xml'

    try:
        import urllib.request
        print(f"Fetching fragment from: {fragment_url}")

        with urllib.request.urlopen(fragment_url, timeout=10) as response:
            content = response.read().decode('utf-8')

        # Extract just the <url> entries (skip comments)
        lines = content.split('\n')
        url_lines = []
        for line in lines:
            if '<url>' in line or '</url>' in line or '<loc>' in line or '<lastmod>' in line or '<changefreq>' in line or '<priority>' in line:
                url_lines.append(line)

        return url_lines
    except Exception as e:
        print(f"⚠️  Could not fetch fragment: {e}")
        return None


def load_fragment_from_local_repo():
    """
    Fallback: Load sitemap fragment from local holidays repo
    Returns list of URL entries or None if not found
    """
    fragment_path = os.path.join(HOLIDAYS_REPO_PATH, 'sitemap_fragment.xml')

    if os.path.exists(fragment_path):
        print(f"Loading fragment from local path: {fragment_path}")
        with open(fragment_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract just the <url> entries (skip comments)
        lines = content.split('\n')
        url_lines = []
        for line in lines:
            if '<url>' in line or '</url>' in line or '<loc>' in line or '<lastmod>' in line or '<changefreq>' in line or '<priority>' in line:
                url_lines.append(line)

        return url_lines
    return None


def generate_manual_ics_entries():
    """
    Manual fallback: Generate ICS entries if fragment file not found
    Use this if you don't have the holidays repo cloned locally
    """
    print("⚠️  Generating manual ICS entries (fragment not found)")

    current_date = datetime.now().strftime('%Y-%m-%d')
    entries = []

    # German Bundesländer
    german_bundeslaender = [
        'baden-wuerttemberg', 'bayern', 'berlin', 'brandenburg', 'bremen',
        'hamburg', 'hessen', 'mecklenburg-vorpommern', 'niedersachsen',
        'nordrhein-westfalen', 'rheinland-pfalz', 'saarland', 'sachsen',
        'sachsen-anhalt', 'schleswig-holstein', 'thueringen'
    ]

    entries.append('  <!-- German Holidays ICS Files -->')
    for bundesland in german_bundeslaender:
        entries.extend([
            '  <url>',
            f'    <loc>{BASE_URL}/output/german_holidays_{bundesland}.ics</loc>',
            f'    <lastmod>{current_date}</lastmod>',
            '    <changefreq>yearly</changefreq>',
            '    <priority>0.7</priority>',
            '  </url>',
            ''
        ])

    # Austrian holidays
    entries.append('  <!-- Austrian Holidays ICS Files -->')
    entries.extend([
        '  <url>',
        f'    <loc>{BASE_URL}/output/austrian_holidays.ics</loc>',
        f'    <lastmod>{current_date}</lastmod>',
        '    <changefreq>yearly</changefreq>',
        '    <priority>0.8</priority>',
        '  </url>',
        ''
    ])

    # Austrian school holidays
    entries.append('  <!-- Austrian School Holidays ICS Files -->')
    austrian_bundeslaender = [
        'wien', 'niederoesterreich', 'burgenland', 'oberoesterreich',
        'steiermark', 'kaernten', 'salzburg', 'tirol', 'vorarlberg'
    ]

    for bundesland in austrian_bundeslaender:
        entries.extend([
            '  <url>',
            f'    <loc>{BASE_URL}/output/school/school_holidays_{bundesland}.ics</loc>',
            f'    <lastmod>{current_date}</lastmod>',
            '    <changefreq>yearly</changefreq>',
            '    <priority>0.7</priority>',
            '  </url>',
            ''
        ])

    return entries


def generate_sitemap():
    """Generate complete sitemap.xml"""

    print("=" * 60)
    print("Main Sitemap Generator")
    print("=" * 60)
    print()

    current_date = datetime.now().strftime('%Y-%m-%d')

    sitemap_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ''
    ]

    # Static pages in root repo
    static_pages = [
        {
            'loc': f'{BASE_URL}/',
            'file': 'index.html',
            'changefreq': 'monthly',
            'priority': '1.0',
            'comment': 'Landing Page',
            'hreflang': [
                ('de', f'{BASE_URL}/'),
                ('de-DE', f'{BASE_URL}/de/'),
                ('de-AT', f'{BASE_URL}/at/')
            ]
        }
    ]

    # Pages from holidays repo (served via GitHub Pages)
    holidays_pages = [
        {
            'loc': f'{BASE_URL}/de/index.html',
            'file': None,  # In other repo
            'changefreq': 'monthly',
            'priority': '0.9',
            'comment': 'German Holidays',
            'hreflang': [('de-DE', f'{BASE_URL}/de/index.html')]
        },
        {
            'loc': f'{BASE_URL}/at/index.html',
            'file': None,  # In other repo
            'changefreq': 'monthly',
            'priority': '0.9',
            'comment': 'Austrian Holidays',
            'hreflang': [('de-AT', f'{BASE_URL}/at/index.html')]
        },
        {
            'loc': f'{BASE_URL}/at/impressum.html',
            'file': None,  # In other repo
            'changefreq': 'yearly',
            'priority': '0.3',
            'comment': 'Impressum'
        }
    ]

    all_pages = static_pages + holidays_pages

    # Add static pages
    for page in all_pages:
        sitemap_lines.append(f'  <!-- {page["comment"]} -->')
        sitemap_lines.append('  <url>')
        sitemap_lines.append(f'    <loc>{page["loc"]}</loc>')

        # Get last modified date from file if it exists in this repo
        if page['file'] and os.path.exists(page['file']):
            lastmod = get_last_modified(page['file'])
        else:
            lastmod = current_date

        sitemap_lines.append(f'    <lastmod>{lastmod}</lastmod>')
        sitemap_lines.append(f'    <changefreq>{page["changefreq"]}</changefreq>')
        sitemap_lines.append(f'    <priority>{page["priority"]}</priority>')

        if 'hreflang' in page:
            for lang, url in page['hreflang']:
                sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="{lang}" href="{url}"/>')

        sitemap_lines.append('  </url>')
        sitemap_lines.append('')
        print(f"✓ Added page: {page['comment']}")

    # Try to load ICS entries from fragment
    print()
    print("Loading ICS calendar entries...")
    fragment_lines = load_fragment_from_url()

    if fragment_lines:
        print("✓ Loaded from sitemap_fragment.xml")
        sitemap_lines.append('  <!-- ICS Calendar Files from holidays repo -->')
        sitemap_lines.extend(fragment_lines)
    else:
        print("⚠️  Fragment not found, generating manual entries")
        manual_entries = generate_manual_ics_entries()
        sitemap_lines.extend(manual_entries)

    # Close XML
    sitemap_lines.append('</urlset>')

    # Write sitemap.xml
    sitemap_content = '\n'.join(sitemap_lines)

    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap_content)

    print()
    print("=" * 60)
    print(f"✓ Sitemap generated: sitemap.xml")
    print(f"  Total URLs: {sitemap_content.count('<url>')}")
    print(f"  Last updated: {current_date}")
    print("=" * 60)
    print()
    print("Next steps:")
    print("1. Update BASE_URL in this script to your actual domain")
    print("2. Commit and push sitemap.xml to your root repo")
    print("3. Submit to Google Search Console")
    print("4. Submit to Bing Webmaster Tools")


def generate_robots_txt():
    """Generate robots.txt file"""

    robots_content = f"""# robots.txt for Feiertage & Schulferien Calendar
# {BASE_URL}/robots.txt

# Allow all crawlers to access everything
User-agent: *
Allow: /

# Sitemap location
Sitemap: {BASE_URL}/sitemap.xml

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
"""

    with open('robots.txt', 'w', encoding='utf-8') as f:
        f.write(robots_content)

    print("✓ Generated: robots.txt")


if __name__ == "__main__":
    print()
    print("🗓️  Feiertage & Schulferien - Main Sitemap Generator")
    print("   (For root GitHub Pages repo)")
    print()

    # Check if BASE_URL needs to be updated
    if BASE_URL == "https://yourdomain.com":
        print("⚠️  WARNING: Please update BASE_URL in this script!")
        print("   Current: https://yourdomain.com")
        print("   Change to your actual domain name")
        print()

    # Generate sitemap
    generate_sitemap()

    # Generate robots.txt
    generate_robots_txt()

    print()
    print("All done! 🎉")
    print()
    print("💡 Tip: If you have the holidays repo cloned locally,")
    print("   update HOLIDAYS_REPO_PATH to automatically include")
    print("   the latest ICS file entries from sitemap_fragment.xml")