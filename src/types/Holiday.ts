/**
 * Type definitions for holidays
 */

export interface Holiday {
  date: Date;
  title: string;
  description?: string;
  isRecurring?: boolean;
}

export interface HolidayDefinition {
  nameDE: string;
  nameEN: string;
  wikipediaDE?: string;  // German Wikipedia link
  wikipediaEN?: string;  // English Wikipedia link
  scope?: 'bundesweit' | 'regional';  // Scope for German holidays
  fixed?: {
    month: number;
    day: number;
  };
  calculator?: (year: number) => Date;
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
