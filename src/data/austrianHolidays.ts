/**
 * Austrian public holiday definitions
 */

import { HolidayDefinition } from '../types/Holiday.js';
import {
  calculateEasterMonday,
  calculateAscensionDay,
  calculateWhitMonday,
  calculateCorpusChristi,
} from '../calculators/HolidayCalculator.js';

export const austrianHolidays: HolidayDefinition[] = [
  {
    nameDE: 'Neujahr',
    nameEN: "New Year's Day",
    fixed: { month: 1, day: 1 },
  },
  {
    nameDE: 'Heilige Drei Könige',
    nameEN: 'Epiphany',
    fixed: { month: 1, day: 6 },
  },
  {
    nameDE: 'Ostermontag',
    nameEN: 'Easter Monday',
    calculator: calculateEasterMonday,
  },
  {
    nameDE: 'Staatsfeiertag',
    nameEN: 'Labour Day',
    fixed: { month: 5, day: 1 },
  },
  {
    nameDE: 'Christi Himmelfahrt',
    nameEN: 'Ascension Day',
    calculator: calculateAscensionDay,
  },
  {
    nameDE: 'Pfingstmontag',
    nameEN: 'Whit Monday',
    calculator: calculateWhitMonday,
  },
  {
    nameDE: 'Fronleichnam',
    nameEN: 'Corpus Christi',
    calculator: calculateCorpusChristi,
  },
  {
    nameDE: 'Mariä Himmelfahrt',
    nameEN: 'Assumption of Mary',
    fixed: { month: 8, day: 15 },
  },
  {
    nameDE: 'Nationalfeiertag',
    nameEN: 'National Day',
    fixed: { month: 10, day: 26 },
  },
  {
    nameDE: 'Allerheiligen',
    nameEN: "All Saints' Day",
    fixed: { month: 11, day: 1 },
  },
  {
    nameDE: 'Mariä Empfängnis',
    nameEN: 'Immaculate Conception',
    fixed: { month: 12, day: 8 },
  },
  {
    nameDE: 'Christtag',
    nameEN: 'Christmas Day',
    fixed: { month: 12, day: 25 },
  },
  {
    nameDE: 'Stefanitag',
    nameEN: "St. Stephen's Day",
    fixed: { month: 12, day: 26 },
  },
];

export const austrianRegions = [
  'wien',
  'niederoesterreich',
  'burgenland',
  'oberoesterreich',
  'steiermark',
  'kaernten',
  'salzburg',
  'tirol',
  'vorarlberg',
];
