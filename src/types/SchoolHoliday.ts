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
  | 'burgenland'
  | 'kaernten'
  | 'niederoesterreich'
  | 'oberoesterreich'
  | 'salzburg'
  | 'steiermark'
  | 'tirol'
  | 'vorarlberg'
  | 'wien';
