
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
/**
 * Type definitions for holidays
 */
export interface Holiday {
  date: Date;
  title: string;
  description?: string;
  isRecurring?: boolean;
}

export interface HolidayDefinitionBase {
  nameDE: string;
  nameEN: string;
  scope?: 'bundesweit' | 'regional' | 'national' | 'kantonal';
  wikipediaDE?: string;  // German Wikipedia link
}

export interface HolidayDefinition extends HolidayDefinitionBase {
  wikipediaEN?: string;  // English Wikipedia link
  fixed?: {
    month: number;
    day: number;
  };
  calculator?: (year: number) => Date;
}

/**
 * Holiday card data for rendering (extends HolidayDefinition with computed date)
 * Used by the rendering functions in page-common.ts
 */
export interface HolidayCardData extends HolidayDefinitionBase {
  date: Date;
  endDate?: Date; // For multi-day periods (school holidays)
}

export interface CalendarConfig {
  name: string;
  productId: string;
  calendarName: string;
  description?: string;
  country: string;
}


/**
 * Convert German state name to filename-safe format (lowercase, no umlauts, hyphens)
 */
export function stateToFilename(state: string): string {
  return state.toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, '-')  // Replace spaces with hyphens
    .replace(/[()]/g, '');  // Remove parentheses
}
