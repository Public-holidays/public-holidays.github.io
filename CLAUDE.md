# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript/Node.js holiday and school calendar generator for German-speaking regions (DACH: Germany, Austria, Switzerland). It generates ICS (iCalendar) files for public holidays and school holidays that users can subscribe to in Outlook, Google Calendar, Apple Calendar, etc.

**Key facts:**
- Generates ~50 ICS files covering 13 Austrian holidays, 16 German state variants, 26 Swiss cantons, and regional school holidays
- Runs on Node.js with automated monthly regeneration via GitHub Actions
- Deployed as static site to GitHub Pages at https://public-holidays.github.io/
- Handles complex moveable holidays (Easter, Whitsunday, Ascension) using the Meeus/Jones/Butcher algorithm
- Includes Austrian school holiday calendar logic following Schulzeitgesetz

## Common Commands

```bash
npm run build              # Compile TypeScript + bundle frontend with esbuild
npm run dev                # Run directly with tsx (no build) - fast iteration in development
npm run generate           # Full pipeline: build TypeScript + generate all ICS files to holidays/output/
npm run bundle             # Frontend bundling only (esbuild for AT/DE/CH pages)
npm run watch              # Watch TypeScript files and rebuild on changes
npm run sitemap            # Generate sitemap.xml
npm run sitemap:dev        # Generate sitemap in dev mode
```

**Single test:** The project has no test suite. For validation, run `npm run dev` to test locally or `npm run generate` to see full output.

## Project Structure & Architecture

### Core Layers

**Data Layer** (`/src/data/`)
- Holiday definitions stored as declarative objects with name, and either `fixed` date or `calculator` function
- `austrianHolidays.ts` - 13 national Austrian holidays
- `germanHolidays.ts` - 16 German state variants (Bundesländer)
- `swissHolidays.ts` - National + 26 cantonal holidays
- `germanSchoolHolidays.ts` - German school holiday periods
- `commonHolidays.ts` - Shared moveable holidays (Easter-based)

**Calculator Layer** (`/src/calculators/`)
- `HolidayCalculator.ts` - Implements Meeus algorithm for Easter, derives Whitsunday (+49 days), Ascension (+39 days), etc.
- `SchoolHolidayCalculator.ts` - Austrian school holiday logic with region-specific start/end dates per Schulzeitgesetz

**Generator Layer** (`/src/generators/`)
- `IcsGenerator.ts` - Converts holiday definitions to ICS calendar events, handles multi-year rolling calendars (5-year spans), generates deterministic UIDs (YYYYMMDD-slugified-name@public-holidays.github.io)

**Frontend Layer** (`/src/page-*.ts`)
- `page-at.ts`, `page-de.ts`, `page-ch.ts` - Three separate SPAs bundled by esbuild for country-specific pages
- `page-common.ts` - Shared utilities (date formatting, dropdown population, tab switching)

### Output

- **Generated files:** `holidays/output/*.ics` (~50 total)
- **Frontend bundles:** `dist/page-*.js` (esbuild bundles)
- **Compiled backend:** `dist/index.js` and `dist/generate_sitemap.js`

### Main Entry Points

- `src/index.ts` - Orchestrates generation of all ICS files (Austrian, German, Swiss, school holidays)
- `src/generate_sitemap.ts` - Scans `holidays/output/` and generates `sitemap.xml`

## Important Implementation Details

### Moveable Holiday Calculation
The `HolidayCalculator.ts` implements Easter using the Meeus/Jones/Butcher algorithm. All other moveable holidays are derived from Easter (Whitsunday is +49 days, Ascension is +39 days, etc.).

### German School Holiday Handling
German school holidays are stored as period data (start/end dates) in `germanSchoolHolidays.ts`. These are parsed by `IcsGenerator.ts` to create multi-day events in ICS files.

### Austrian School Holiday Logic
The `SchoolHolidayCalculator.ts` implements Schulzeitgesetz (Austrian school law) with region-specific start/end dates. Each Austrian state (Bundesland) has fixed school holiday windows that are programmatically calculated and applied.

### URL-Safe Filename Conversion
Function `stateToFilename()` in `src/types/Holiday.ts` converts region names to ASCII-safe filenames:
- "Baden-Württemberg" → "baden-wuerttemberg"
- Handles umlauts (ä→ae, ö→oe, ü→ue), spaces (→-), and special characters

### Deterministic UIDs
ICS UIDs are generated deterministically from date + slugified holiday name. This prevents duplicate events when users re-import calendars across different years/updates.

### Timezone Handling
Events use local date components (not UTC) to avoid date shifts in ICS files.

## Git Workflow

- **Branch:** main (primary development branch)
- **Automation:** GitHub Actions runs monthly on the 1st at 00:00 UTC, or on manual trigger/push to main
- **Current status:** Check `git status` for uncommitted changes (file: `src/calculators/SchoolHolidayCalculator.ts` may be modified)

## Dependencies & Tech Stack

- **TypeScript 5.3+** - Language & compilation (target: ES2022)
- **esbuild 0.25+** - Frontend bundling (3 separate SPAs)
- **tsx 4.0+** - Run TypeScript directly (development)
- **ics 3.7.6** - Generate ICS calendar files
- **glob 11.0+** - File pattern matching
- **Node.js 18+** - Runtime requirement

## Adding New Holidays or Regions

1. **Add holiday definition** to appropriate data file in `src/data/`
   - For fixed date: `{nameDE, nameEN, fixed: {month, day}}`
   - For moveable: `{nameDE, nameEN, calculator: (year) => Date}`

2. **Register in generator** (`src/index.ts`) if adding a new region

3. **Test locally:** `npm run dev` to verify date calculations

4. **Generate output:** `npm run generate` to create ICS files

5. **Verify:** Check `holidays/output/` for generated files

## Debugging & Development

- Use `npm run dev` for fast iteration without full build
- Use `npm run watch` to rebuild on file changes
- Generated ICS files in `holidays/output/` can be imported directly into calendar apps to verify
- Source maps are enabled in `tsconfig.json` for debugging compiled JavaScript
- Check `dist/` directory for compiled output
