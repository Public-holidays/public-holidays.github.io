/**
 * Holiday date calculation utilities
 * Includes Easter calculation and moveable holiday dates
 */

/**
 * Calculate Easter Sunday for a given year using the Meeus/Jones/Butcher algorithm
 * @param year The year to calculate Easter for
 * @returns Date object representing Easter Sunday
 */
export function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Calculate Easter Monday
 */
export function calculateEasterMonday(year: number): Date {
  return addDays(calculateEaster(year), 1);
}

/**
 * Calculate Ascension Day (39 days after Easter)
 */
export function calculateAscensionDay(year: number): Date {
  return addDays(calculateEaster(year), 39);
}

/**
 * Calculate Whit Sunday / Pentecost Sunday (49 days after Easter)
 */
export function calculateWhitSunday(year: number): Date {
  return addDays(calculateEaster(year), 49);
}

/**
 * Calculate Whit Monday / Pentecost Monday (50 days after Easter)
 */
export function calculateWhitMonday(year: number): Date {
  return addDays(calculateEaster(year), 50);
}

/**
 * Calculate Corpus Christi (60 days after Easter)
 */
export function calculateCorpusChristi(year: number): Date {
  return addDays(calculateEaster(year), 60);
}

/**
 * Calculate Good Friday (2 days before Easter)
 */
export function calculateGoodFriday(year: number): Date {
  return addDays(calculateEaster(year), -2);
}

/**
 * Calculate Repentance and Prayer Day (Germany)
 * Wednesday before November 23rd
 */
export function calculateRepentanceDay(year: number): Date {
  const nov23 = new Date(year, 10, 23); // November 23
  const dayOfWeek = nov23.getDay();
  // Calculate days back to previous Wednesday (3)
  const daysBack = dayOfWeek >= 3 ? dayOfWeek - 3 : dayOfWeek + 4;
  return addDays(nov23, -daysBack);
}
