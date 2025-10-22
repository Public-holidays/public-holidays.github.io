#!/usr/bin/env python3
"""
Unified Sitemap Generator
Generates complete sitemap.xml with static pages and ICS calendar files
"""

from datetime import datetime
import os
from pathlib import Path

# Configuration
BASE_URL = "https://public-holidays.github.io/"  # CHANGE THIS to your actual domain
HOLIDAYS_DIR = "holidays"
OUTPUT_DIR = f"${HOLIDAYS_DIR}/output"
SCHOOL_DIR = f"${HOLIDAYS_DIR}/output/school"


def get_last_modified(filepath):
    """Get the last modification time of a file"""
    try:
        timestamp = os.path.getmtime(filepath)
        return datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d')
    except:
        return datetime.now().strftime('%Y-%m-%d')


def get_ics_files(directory):
    """Get all ICS files in a directory"""
    path = Path(directory)
    if not path.exists():
        return []
    return sorted([f.name for f in path.glob('*.ics')])


def generate_ics_entries():
    """
    Generate ICS calendar file entries
    Returns list of sitemap URL entries
    """
    print()
    print("Generating ICS calendar entries...")
    
    sitemap_lines = []
    url_count = 0

    # German holidays ICS files
    german_bundeslaender = [
        'baden-wuerttemberg', 'bayern', 'berlin', 'brandenburg', 'bremen',
        'hamburg', 'hessen', 'mecklenburg-vorpommern', 'niedersachsen',
        'nordrhein-westfalen', 'rheinland-pfalz', 'saarland', 'sachsen',
        'sachsen-anhalt', 'schleswig-holstein', 'thueringen'
    ]

    sitemap_lines.append('  <!-- German Holidays ICS Files -->')
    for bundesland in german_bundeslaender:
        filename = f'german_holidays_{bundesland}.ics'
        filepath = os.path.join(OUTPUT_DIR, filename)

        if os.path.exists(filepath):
            lastmod = get_last_modified(filepath)
            sitemap_lines.append('  <url>')
            sitemap_lines.append(f'    <loc>{BASE_URL}/output/{filename}</loc>')
            sitemap_lines.append(f'    <lastmod>{lastmod}</lastmod>')
            sitemap_lines.append('    <changefreq>yearly</changefreq>')
            sitemap_lines.append('    <priority>0.7</priority>')
            sitemap_lines.append('  </url>')
            sitemap_lines.append('')
            url_count += 1
            print(f"  ✓ {filename}")

    # Austrian holidays ICS files
    sitemap_lines.append('  <!-- Austrian Holidays ICS Files -->')

    # Rolling calendar (main one)
    rolling_file = 'austrian_holidays.ics'
    rolling_path = os.path.join(OUTPUT_DIR, rolling_file)
    if os.path.exists(rolling_path):
        lastmod = get_last_modified(rolling_path)
        sitemap_lines.append('  <url>')
        sitemap_lines.append(f'    <loc>{BASE_URL}/output/{rolling_file}</loc>')
        sitemap_lines.append(f'    <lastmod>{lastmod}</lastmod>')
        sitemap_lines.append('    <changefreq>yearly</changefreq>')
        sitemap_lines.append('    <priority>0.8</priority>')
        sitemap_lines.append('  </url>')
        sitemap_lines.append('')
        url_count += 1
        print(f"  ✓ {rolling_file}")

    # Year-specific Austrian calendars
    austrian_ics_files = get_ics_files(OUTPUT_DIR)
    for filename in austrian_ics_files:
        if filename.startswith('austrian_holidays_') and filename != 'austrian_holidays.ics':
            filepath = os.path.join(OUTPUT_DIR, filename)
            lastmod = get_last_modified(filepath)
            sitemap_lines.append('  <url>')
            sitemap_lines.append(f'    <loc>{BASE_URL}/output/{filename}</loc>')
            sitemap_lines.append(f'    <lastmod>{lastmod}</lastmod>')
            sitemap_lines.append('    <changefreq>never</changefreq>')
            sitemap_lines.append('    <priority>0.5</priority>')
            sitemap_lines.append('  </url>')
            sitemap_lines.append('')
            url_count += 1
            print(f"  ✓ {filename}")

    # Austrian school holidays ICS files
    sitemap_lines.append('  <!-- Austrian School Holidays ICS Files -->')

    austrian_bundeslaender = [
        'wien', 'niederoesterreich', 'burgenland', 'oberoesterreich',
        'steiermark', 'kaernten', 'salzburg', 'tirol', 'vorarlberg'
    ]

    for bundesland in austrian_bundeslaender:
        filename = f'school_holidays_{bundesland}.ics'
        filepath = os.path.join(SCHOOL_DIR, filename)

        if os.path.exists(filepath):
            lastmod = get_last_modified(filepath)
            sitemap_lines.append('  <url>')
            sitemap_lines.append(f'    <loc>{BASE_URL}/output/school/{filename}</loc>')
            sitemap_lines.append(f'    <lastmod>{lastmod}</lastmod>')
            sitemap_lines.append('    <changefreq>yearly</changefreq>')
            sitemap_lines.append('    <priority>0.7</priority>')
            sitemap_lines.append('  </url>')
            sitemap_lines.append('')
            url_count += 1
            print(f"  ✓ school/{filename}")

    print(f"  Total ICS files: {url_count}")
    
    return sitemap_lines


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

    # Load ICS entries directly
    ics_entries = generate_ics_entries()
    sitemap_lines.extend(ics_entries)

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