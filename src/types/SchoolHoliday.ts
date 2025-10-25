/**
 * Type definitions for school holidays
 */

export interface SchoolHolidayPeriod {
  startDate: Date;
  endDate: Date;
  nameDE: string;
  nameEN: string;
}

export interface PatronSaintDay {
  date: Date;
  nameDE: string;
  nameEN: string;
}

export type AustrianRegion =
  | 'Burgenland'
  | 'Kärnten'
  | 'Niederösterreich'
  | 'Oberösterreich'
  | 'Salzburg'
  | 'Steiermark'
  | 'Tirol'
  | 'Vorarlberg'
  | 'Wien';

/**
 * Convert region name to filename-safe format (lowercase, no umlauts)
 */
export function regionToFilename(region: AustrianRegion): string {
  return region.toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue');
}
