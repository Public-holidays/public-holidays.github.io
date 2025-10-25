#!/usr/bin/env node

/**
 * Main entry point for holiday calendar generator
 */

import { IcsGenerator } from './generators/IcsGenerator.js';
import { austrianHolidays, austrianRegions } from './data/austrianHolidays.js';
import { getGermanHolidaysForState, germanStates } from './data/germanHolidays.js';
import { getSchoolHolidays } from './calculators/SchoolHolidayCalculator.js';
import { AustrianRegion, regionToFilename } from './types/SchoolHoliday.js';
import { stateToFilename } from './types/Holiday.js';
import { join } from 'path';

const BASE_URL = 'https://public-holidays.github.io/holidays';
const OUTPUT_DIR = 'holidays/output';

async function generateAustrianCalendars() {
  console.log('\n📅 Generating Austrian Holiday Calendars...');
  console.log('='.repeat(60));

  const currentYear = new Date().getFullYear();

  // Generate rolling calendar (5 years)
  await IcsGenerator.generateRollingCalendar(
    austrianHolidays,
    {
      name: 'Austrian Public Holidays',
      productId: '-//public-holidays.github.io//Austrian Holidays//DE',
      calendarName: 'Österreichische Feiertage',
      description: 'All Austrian public holidays',
      country: 'AT'
    },
    join(OUTPUT_DIR, 'austrian_holidays.ics'),
    currentYear,
    currentYear + 4
  );

  // Generate individual year calendars
  for (let year = currentYear; year <= currentYear + 2; year++) {
    const holidays = IcsGenerator.generateHolidaysForYear(austrianHolidays, year);
    
    await IcsGenerator.generateAndSaveIcs(
      holidays,
      {
        name: `Austrian Public Holidays ${year}`,
        productId: '-//public-holidays.github.io//Austrian Holidays//DE',
        calendarName: `Österreichische Feiertage ${year}`,
        country: 'AT'
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

  for (const state of germanStates) {
    const holidays = getGermanHolidaysForState(state);
    
    await IcsGenerator.generateRollingCalendar(
      holidays,
      {
        name: `German Public Holidays - ${state}`,
        productId: `-//public-holidays.github.io//German Holidays ${state}//DE`,
        calendarName: `Deutsche Feiertage - ${state}`, country: 'DE'
      },
      join(OUTPUT_DIR, `german_holidays_${stateToFilename(state)}.ics`),
      currentYear,
      currentYear + 4
    );
  }

  console.log(`\n✓ German calendars generated for ${germanStates.length} states`);
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
        productId: `-//public-holidays.github.io//School Holidays ${region}//AT`,
        calendarName: `Schulferien - ${region}`,
          country: 'AT'
      }
    );

    const outputPath = join(OUTPUT_DIR, 'school', `school_holidays_${regionToFilename(region)}.ics`);

    // Ensure directory exists
    const { mkdir, writeFile } = await import('fs/promises');
    const { dirname } = await import('path');
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, icsContent, 'utf-8');

    console.log(`✓ Generated: ${outputPath}`);
  }

  console.log(`\n✓ School calendars generated for ${austrianRegions.length} regions`);
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
        break;
      
      case 'all':
      default:
        await generateAustrianCalendars();
        await generateGermanCalendars();
        await generateSchoolHolidays();
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
