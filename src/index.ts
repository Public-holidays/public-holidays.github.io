#!/usr/bin/env node

/**
 * Main entry point for holiday calendar generator
 */

import { IcsGenerator } from './generators/IcsGenerator.js';
import { austrianHolidays, austrianRegions } from './data/austrianHolidays.js';
import {getGermanHolidaysForVariant, germanCalenderVariants, parseGermanDate} from './data/germanHolidays.js';
import { getSchoolHolidays } from './calculators/SchoolHolidayCalculator.js';
import { AustrianRegion } from './types/SchoolHoliday.js';
import {stateToFilename} from './types/Holiday.js';
import { germanSchoolHolidays, SchoolHolidayPeriod } from './data/germanSchoolHolidays.js';
import { germanStates} from './data/germanHolidays.js';
import { join } from 'path';

const BASE_DOMAIN = 'public-holidays.github.io';
export const BASE_URL = 'https://public-holidays.github.io/';
const OUTPUT_DIR = 'holidays/output';

const AUSTRIA_COUNTRY_CODE = 'AT';
const GERMANY_COUNTRY_CODE = 'DE';


const COMMON_APPLICATION_PRODID = `-//${BASE_DOMAIN}//public Holidays//${GERMANY_COUNTRY_CODE}`;

async function generateAustrianCalendars() {
  console.log('\n📅 Generating Austrian Holiday Calendars...');
  console.log('='.repeat(60));

  const currentYear = new Date().getFullYear();

  // Generate rolling calendar (5 years)
  await IcsGenerator.generateRollingCalendar(
    austrianHolidays,
    {
      name: 'Austrian Public Holidays',
      productId: COMMON_APPLICATION_PRODID,
      calendarName: 'Österreichische Feiertage',
      description: 'All Austrian public holidays',
      country: AUSTRIA_COUNTRY_CODE
    },
    join(OUTPUT_DIR, 'austrian_holidays.ics'),
    currentYear,
    currentYear + 4
  );

  // Generate individual year calendars
  for (let year = currentYear; year <= currentYear + 2; year++) {
    const holidays = IcsGenerator.generateHolidaysForYear(austrianHolidays, year, 'Österreich');

    await IcsGenerator.generateAndSaveIcs(
      holidays,
      {
        name: `Austrian Public Holidays ${year}`,
        productId: COMMON_APPLICATION_PRODID,
        calendarName: `Österreichische Feiertage ${year}`,
        country: AUSTRIA_COUNTRY_CODE
      },
      join(OUTPUT_DIR, `austrian_holidays_${year}.ics`)
    );
  }

  console.log(`\n✓ Austrian calendars generated`);
}

async function generateGermanCalendars() {
  console.log('\n📅 Generating German Holiday Calendars...');
  console.log('='.repeat(60));

  const currentYear = new Date().getFullYear();

  for (const calenderVariant of germanCalenderVariants) {
    const holidays = getGermanHolidaysForVariant(calenderVariant);

    await IcsGenerator.generateRollingCalendar(
      holidays,
      {
        name: `German Public Holidays - ${calenderVariant}`,
        productId: COMMON_APPLICATION_PRODID,
        calendarName: `Deutsche Feiertage - ${calenderVariant}`, country: GERMANY_COUNTRY_CODE
      },
      join(OUTPUT_DIR, `german_holidays_${stateToFilename(calenderVariant)}.ics`),
      currentYear,
      currentYear + 4
    );
  }

  console.log(`\n✓ German calendars generated for ${germanCalenderVariants.length} states`);
}

async function generateSchoolHolidays() {
  console.log('\n📅 Generating School Holiday Calendars...');
  console.log('='.repeat(60));

  const currentYear = new Date().getFullYear();

  for (const region of austrianRegions) {
    const allPeriods = [];

    // Generate for current year and next 5 years
    for (let year = currentYear; year <= currentYear + 5; year++) {
      const yearHolidays = getSchoolHolidays(year, region as AustrianRegion);
      allPeriods.push(...yearHolidays);
    }

    // Sort by start date
    allPeriods.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    // Convert to format expected by ICS generator
    const periods = allPeriods.map(p => ({
      startDate: p.startDate,
      endDate: p.endDate,
      title: p.nameDE,
      description: `${p.nameEN} - School holidays in ${region}`,
    }));

    // Generate and save ICS
    const icsContent = await IcsGenerator.generateSchoolHolidayIcsContent(
      periods,
      {
        name: `School Holidays - ${region}`,
        productId: COMMON_APPLICATION_PRODID,
        calendarName: `Schulferien - ${region}`,
          country: AUSTRIA_COUNTRY_CODE
      }
    );

    const outputPath = join(OUTPUT_DIR, 'school', `school_holidays_${stateToFilename(region)}.ics`);

    // Ensure directory exists
    const { mkdir, writeFile } = await import('fs/promises');
    const { dirname } = await import('path');
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, icsContent, 'utf-8');

    console.log(`✓ Generated: ${outputPath}`);
  }

  console.log(`\n✓ School calendars generated for ${austrianRegions.length} regions`);
}

/**
 * Parse extra dates string and return array of date ranges
 */
function parseExtraDates(extra: string): Array<{ start: Date; end: Date }> {
  const ranges: Array<{ start: Date; end: Date }> = [];

  // Split by common separators
  const parts = extra.split(/\s+(?:und|,)\s+/).filter(p => p.trim());

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      // Date range like "01.06.2028-02.06.2028"
      const [startStr, endStr] = trimmed.split('-');
      ranges.push({
        start: parseGermanDate(startStr.trim()),
        end: parseGermanDate(endStr.trim())
      });
    } else if (/^\d{2}\.\d{2}\.\d{4}$/.test(trimmed)) {
      // Single date like "26.05.2028"
      const date = parseGermanDate(trimmed);
      ranges.push({ start: date, end: date });
    }
  }

  return ranges;
}

/**
 * Convert German school holiday period to calendar events
 */
function convertPeriodToEvents(
  period: SchoolHolidayPeriod | null,
  periodName: string,
  state: string
): Array<{ startDate: Date; endDate: Date; title: string; description: string }> {
  if (!period) return [];

  const events = [];
  const periodNameMap: Record<string, string> = {
    'herbst': 'Herbstferien',
    'weihnachten': 'Weihnachtsferien',
    'winter': 'Winterferien',
    'ostern': 'Osterferien',
    'pfingsten': 'Pfingstferien',
    'sommer': 'Sommerferien'
  };

  const title = periodNameMap[periodName] || periodName;

  // Main period
  events.push({
    startDate: parseGermanDate(period.start),
    endDate: parseGermanDate(period.end),
    title,
    description: `${title} in ${state}`
  });

  // Extra dates
  if (period.extra) {
    const extraRanges = parseExtraDates(period.extra);
    for (const range of extraRanges) {
      events.push({
        startDate: range.start,
        endDate: range.end,
        title: `${title} (zusätzlich)`,
        description: `${title} in ${state} (zusätzliche Ferientage)`
      });
    }
  }

  return events;
}

async function generateGermanSchoolHolidays() {
  console.log('\n📅 Generating German School Holiday Calendars...');
  console.log('='.repeat(60));


  for (const state of germanStates) {
    const allPeriods: Array<{ startDate: Date; endDate: Date; title: string; description: string }> = [];

    // Iterate through all years in the data
    for (const yearRange of Object.keys(germanSchoolHolidays) as Array<keyof typeof germanSchoolHolidays>) {
      const yearData = germanSchoolHolidays[yearRange][state];
      if (!yearData) continue;

      // Convert each holiday period to events
      const periods: Array<keyof typeof yearData> = ['herbst', 'weihnachten', 'winter', 'ostern', 'pfingsten', 'sommer'];
      for (const periodName of periods) {
        const period = yearData[periodName];
        const events = convertPeriodToEvents(period, periodName as string, state);
        allPeriods.push(...events);
      }
    }

    // Sort by start date
    allPeriods.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    // Generate and save ICS
    const icsContent = await IcsGenerator.generateSchoolHolidayIcsContent(
      allPeriods,
      {
        name: `School Holidays - ${state}`,
        productId: COMMON_APPLICATION_PRODID,
        calendarName: `Schulferien - ${state}`,
        country: GERMANY_COUNTRY_CODE
      }
    );

    const outputPath = join(OUTPUT_DIR, 'school', `school_holidays_${stateToFilename(state)}.ics`);

    // Ensure directory exists
    const { mkdir, writeFile } = await import('fs/promises');
    const { dirname } = await import('path');
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, icsContent, 'utf-8');

    console.log(`✓ Generated: ${outputPath}`);
  }

  console.log(`\n✓ German school calendars generated for ${germanStates.length} states`);
}

async function main() {
  const command = process.argv[2] || 'all';

  console.log('\n🗓️  Public Holidays Calendar Generator');
  console.log('   TypeScript/Node.js Edition');
  console.log('='.repeat(60));

  try {
    switch (command) {
      case 'austrian':
      case 'at':
        await generateAustrianCalendars();
        break;

      case 'german':
      case 'de':
        await generateGermanCalendars();
        break;

      case 'school':
        await generateSchoolHolidays();
        await generateGermanSchoolHolidays();
        break;

      case 'school-at':
        await generateSchoolHolidays();
        break;

      case 'school-de':
        await generateGermanSchoolHolidays();
        break;

      case 'all':
      default:
        await generateAustrianCalendars();
        await generateGermanCalendars();
        await generateSchoolHolidays();
        await generateGermanSchoolHolidays();
        break;
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ All done!');
    console.log('='.repeat(60));
    console.log();

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
