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
  fixed?: {
    month: number;
    day: number;
  };
  calculator?: (year: number) => Date;
}

export interface RegionHolidays {
  region: string;
  holidays: Holiday[];
}

export interface CalendarConfig {
  name: string;
  productId: string;
  calendarName: string;
  description?: string;
}
