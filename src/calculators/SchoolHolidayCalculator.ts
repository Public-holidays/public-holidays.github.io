/**
 * School holiday calculation utilities for Austrian schools
 * Based on Austrian school law (Schulzeitgesetz)
 */

import { calculateEaster, addDays } from './HolidayCalculator.js';
import { SchoolHolidayPeriod, PatronSaintDay} from '../types/Holiday.js';
import {AustrianRegion} from "../data/austrianHolidays";

/**
 * Get the first Monday of a given month
 */
function getFirstMondayOfMonth(year: number, month: number): Date {
  const firstDay = new Date(year, month - 1, 1);
  const dayOfWeek = firstDay.getDay();
  
  // If it's already Monday (1), return it
  if (dayOfWeek === 1) {
    return firstDay;
  }
  
  // Calculate days until next Monday
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek + 1;
  return addDays(firstDay, daysUntilMonday);
}

/**
 * Get the nth Monday of a given month
 */
function getNthMondayOfMonth(year: number, month: number, n: number): Date {
  const firstMonday = getFirstMondayOfMonth(year, month);
  return addDays(firstMonday, (n - 1) * 7);
}

/**
 * Get the first Saturday within a date range
 */
function getFirstSaturdayInRange(year: number, month: number, startDay: number): Date {
  const startDate = new Date(year, month - 1, startDay);
  const dayOfWeek = startDate.getDay();
  
  // If it's already Saturday (6), return it
  if (dayOfWeek === 6) {
    return startDate;
  }
  
  // Calculate days until next Saturday
  const daysUntilSaturday = dayOfWeek === 0 ? 6 : 6 - dayOfWeek;
  return addDays(startDate, daysUntilSaturday);
}

/**
 * Calculate when the school year starts for a given region
 * § 2 (1): Burgenland, Niederösterreich, Wien: first Monday in September
 *         Others: second Monday in September
 */
export function calculateSchoolYearStart(year: number, region: AustrianRegion): Date {
  const group1: AustrianRegion[] = ['Burgenland', 'Niederösterreich', 'Wien'];
  
  if (group1.includes(region)) {
    return getNthMondayOfMonth(year, 9, 1);
  } else {
    return getNthMondayOfMonth(year, 9, 2);
  }
}

/**
 * Calculate Christmas break
 * § 2 (4) 3.: December 24 to January 6 (inclusive)
 */
export function calculateChristmasBreak(year: number): SchoolHolidayPeriod {
  return {
    startDate: new Date(year, 11, 24), // December 24
    endDate: new Date(year + 1, 0, 6), // January 6 next year
    nameDE: 'Weihnachtsferien',
    nameEN: 'Christmas Break',
  };
}

/**
 * Calculate semester break
 * § 2 (2) 1. b) and § 2 (4) 5.:
 * - Niederösterreich, Wien: first Monday in February
 * - Burgenland, Kärnten, Salzburg, Tirol, Vorarlberg: second Monday in February
 * - Oberösterreich, Steiermark: third Monday in February
 * Duration: Monday to Saturday (one week)
 */
export function calculateSemesterBreak(year: number, region: AustrianRegion): SchoolHolidayPeriod {
  const group1: AustrianRegion[] = ['Niederösterreich', 'Wien'];
  const group2: AustrianRegion[] = ['Burgenland', 'Kärnten', 'Salzburg', 'Tirol', 'Vorarlberg'];
  const group3: AustrianRegion[] = ['Oberösterreich', 'Steiermark'];
  
  let startDate: Date;
  
  if (group1.includes(region)) {
    startDate = getNthMondayOfMonth(year, 2, 1);
  } else if (group2.includes(region)) {
    startDate = getNthMondayOfMonth(year, 2, 2);
  } else if (group3.includes(region)) {
    startDate = getNthMondayOfMonth(year, 2, 3);
  } else {
    throw new Error(`Unknown region: ${region}`);
  }
  
  // Monday to Saturday (6 days, but 5 days added to Monday = Saturday)
  const endDate = addDays(startDate, 5);
  
  return {
    startDate,
    endDate,
    nameDE: 'Semesterferien',
    nameEN: 'Semester Break',
  };
}

/**
 * Calculate Easter break
 * § 2 (4) 6.: Saturday before Palm Sunday to Easter Monday (inclusive)
 * Palm Sunday is one week before Easter Sunday
 */
export function calculateEasterBreak(year: number): SchoolHolidayPeriod {
  const easter = calculateEaster(year);
  const palmSunday = addDays(easter, -7);
  const saturdayBefore = addDays(palmSunday, -1);
  const easterMonday = addDays(easter, 1);
  
  return {
    startDate: saturdayBefore,
    endDate: easterMonday,
    nameDE: 'Osterferien',
    nameEN: 'Easter Break',
  };
}

/**
 * Calculate Whit/Pentecost break
 * § 2 (4) 7.: Saturday before Whit Sunday to Whit Monday (inclusive)
 * Whit Sunday is 49 days after Easter
 */
export function calculateWhitBreak(year: number): SchoolHolidayPeriod {
  const easter = calculateEaster(year);
  const whitSunday = addDays(easter, 49);
  const saturdayBefore = addDays(whitSunday, -1);
  const whitMonday = addDays(whitSunday, 1);
  
  return {
    startDate: saturdayBefore,
    endDate: whitMonday,
    nameDE: 'Pfingstferien',
    nameEN: 'Whit Break',
  };
}

/**
 * Calculate autumn break
 * § 2 (4) 8.: October 27 to October 31 (inclusive)
 */
export function calculateAutumnBreak(year: number): SchoolHolidayPeriod {
  return {
    startDate: new Date(year, 9, 27), // October 27
    endDate: new Date(year, 9, 31), // October 31
    nameDE: 'Herbstferien',
    nameEN: 'Autumn Break',
  };
}

/**
 * Calculate summer holidays
 * § 2 (2) 2.:
 * - Burgenland, Niederösterreich, Wien: Saturday between June 28 - July 4
 * - Others: Saturday between July 5 - July 11
 * Ends the day before the school year starts (in September of the SAME year)
 */
export function calculateSummerHolidays(year: number, region: AustrianRegion): SchoolHolidayPeriod {
  const group1: AustrianRegion[] = ['Burgenland', 'Niederösterreich', 'Wien'];
  
  let startDate: Date;
  
  if (group1.includes(region)) {
    startDate = getFirstSaturdayInRange(year, 6, 28);
  } else {
    startDate = getFirstSaturdayInRange(year, 7, 5);
  }
  
  // End date is the Sunday before school year starts in September
  const schoolYearStart = calculateSchoolYearStart(year, region);
  const endDate = addDays(schoolYearStart, -1);
  
  return {
    startDate,
    endDate,
    nameDE: 'Sommerferien',
    nameEN: 'Summer Holidays',
  };
}

/**
 * Get the patron saint day for a region
 * § 2 (4) 2.: School-free on the day of the Landespatron
 */
export function getPatronSaintDay(year: number, region: AustrianRegion): PatronSaintDay | null {
  const patronDays: Record<AustrianRegion, PatronSaintDay | null> = {
    Kärnten: {
      date: new Date(year, 2, 19), // March 19
      nameDE: 'Hl. Josef',
      nameEN: 'St. Joseph',
    },
    Steiermark: {
      date: new Date(year, 2, 19), // March 19
      nameDE: 'Hl. Josef',
      nameEN: 'St. Joseph',
    },
    Tirol: {
      date: new Date(year, 2, 19), // March 19
      nameDE: 'Hl. Josef',
      nameEN: 'St. Joseph',
    },
    Vorarlberg: {
      date: new Date(year, 2, 19), // March 19
      nameDE: 'Hl. Josef',
      nameEN: 'St. Joseph',
    },
    Oberösterreich: {
      date: new Date(year, 4, 4), // May 4
      nameDE: 'Hl. Florian',
      nameEN: 'St. Florian',
    },
    Salzburg: {
      date: new Date(year, 8, 24), // September 24
      nameDE: 'Hl. Rupert',
      nameEN: 'St. Rupert',
    },
    Burgenland: {
      date: new Date(year, 10, 11), // November 11
      nameDE: 'Hl. Martin',
      nameEN: 'St. Martin',
    },
    Wien: {
      date: new Date(year, 10, 15), // November 15
      nameDE: 'Hl. Leopold',
      nameEN: 'St. Leopold',
    },
    Niederösterreich: {
      date: new Date(year, 10, 15), // November 15
      nameDE: 'Hl. Leopold',
      nameEN: 'St. Leopold',
    },
  };
  
  return patronDays[region];
}

/**
 * Get additional state holiday (Carinthia only)
 */
export function getStateHoliday(year: number, region: AustrianRegion): PatronSaintDay | null {
  if (region === 'Kärnten') {
    return {
      date: new Date(year, 9, 10), // October 10
      nameDE: 'Tag der Volksabstimmung',
      nameEN: 'Carinthian Plebiscite Day',
    };
  }
  return null;
}

/**
 * Get all school holidays for a given year and region
 */
export function getSchoolHolidays(year: number, region: AustrianRegion): SchoolHolidayPeriod[] {
  const holidays: SchoolHolidayPeriod[] = [];
  
  // Patron saint day (single day)
  const patronDay = getPatronSaintDay(year, region);
  if (patronDay) {
    holidays.push({
      startDate: patronDay.date,
      endDate: patronDay.date,
      nameDE: patronDay.nameDE,
      nameEN: patronDay.nameEN,
    });
  }
  
  // Additional state holiday (Kärnten only)
  const stateHoliday = getStateHoliday(year, region);
  if (stateHoliday) {
    holidays.push({
      startDate: stateHoliday.date,
      endDate: stateHoliday.date,
      nameDE: stateHoliday.nameDE,
      nameEN: stateHoliday.nameEN,
    });
  }
  
  // Semester break (February)
  holidays.push(calculateSemesterBreak(year, region));
  
  // Easter break (March/April)
  holidays.push(calculateEasterBreak(year));
  
  // Whit break (May/June)
  holidays.push(calculateWhitBreak(year));
  
  // Summer holidays (July-September)
  holidays.push(calculateSummerHolidays(year, region));
  
  // Autumn break (October)
  holidays.push(calculateAutumnBreak(year));
  
  // Christmas break (December-January)
  holidays.push(calculateChristmasBreak(year));
  
  return holidays;
}
