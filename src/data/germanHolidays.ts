/**
 * German public holiday definitions by Bundesland
 */

import { HolidayDefinition } from '../types/Holiday.js';
import {
  calculateGoodFriday,
  calculateEasterMonday,
  calculateAscensionDay,
  calculateWhitMonday,
  calculateWhitSunday,
  calculateCorpusChristi,
  calculateRepentanceDay,
  calculateEaster,
} from '../calculators/HolidayCalculator.js';

// Common holidays for all German states
const commonGermanHolidays: HolidayDefinition[] = [
  {
    nameDE: 'Neujahr',
    nameEN: "New Year's Day",
    fixed: { month: 1, day: 1 },
  },
  {
    nameDE: 'Karfreitag',
    nameEN: 'Good Friday',
    calculator: calculateGoodFriday,
  },
  {
    nameDE: 'Ostermontag',
    nameEN: 'Easter Monday',
    calculator: calculateEasterMonday,
  },
  {
    nameDE: 'Tag der Arbeit',
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
    nameDE: 'Tag der Deutschen Einheit',
    nameEN: 'German Unity Day',
    fixed: { month: 10, day: 3 },
  },
  {
    nameDE: 'Erster Weihnachtstag',
    nameEN: 'Christmas Day',
    fixed: { month: 12, day: 25 },
  },
  {
    nameDE: 'Zweiter Weihnachtstag',
    nameEN: 'Boxing Day',
    fixed: { month: 12, day: 26 },
  },
];

// State-specific holidays
const stateSpecificHolidays: Record<string, HolidayDefinition[]> = {
  'baden-wuerttemberg': [
    {
      nameDE: 'Heilige Drei Könige',
      nameEN: 'Epiphany',
      fixed: { month: 1, day: 6 },
    },
    {
      nameDE: 'Fronleichnam',
      nameEN: 'Corpus Christi',
      calculator: calculateCorpusChristi,
    },
    {
      nameDE: 'Allerheiligen',
      nameEN: "All Saints' Day",
      fixed: { month: 11, day: 1 },
    },
  ],
  bayern: [
    {
      nameDE: 'Heilige Drei Könige',
      nameEN: 'Epiphany',
      fixed: { month: 1, day: 6 },
    },
    {
      nameDE: 'Fronleichnam',
      nameEN: 'Corpus Christi',
      calculator: calculateCorpusChristi,
    },
    {
      nameDE: 'Augsburger Friedensfest',
      nameEN: 'Augsburg Peace Festival',
      fixed: { month: 8, day: 8 },
    },
    {
      nameDE: 'Mariä Himmelfahrt',
      nameEN: 'Assumption of Mary',
      fixed: { month: 8, day: 15 },
    },
    {
      nameDE: 'Allerheiligen',
      nameEN: "All Saints' Day",
      fixed: { month: 11, day: 1 },
    },
  ],
  berlin: [
    {
      nameDE: 'Internationaler Frauentag',
      nameEN: "International Women's Day",
      fixed: { month: 3, day: 8 },
    },
  ],
  brandenburg: [
    {
      nameDE: 'Ostersonntag',
      nameEN: 'Easter Sunday',
      calculator: calculateEaster,
    },
    {
      nameDE: 'Pfingstsonntag',
      nameEN: 'Whit Sunday',
      calculator: calculateWhitSunday,
    },
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
  ],
  bremen: [
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
  ],
  hamburg: [
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
  ],
  hessen: [
    {
      nameDE: 'Fronleichnam',
      nameEN: 'Corpus Christi',
      calculator: calculateCorpusChristi,
    },
  ],
  'mecklenburg-vorpommern': [
    {
      nameDE: 'Internationaler Frauentag',
      nameEN: "International Women's Day",
      fixed: { month: 3, day: 8 },
    },
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
  ],
  niedersachsen: [
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
  ],
  'nordrhein-westfalen': [
    {
      nameDE: 'Fronleichnam',
      nameEN: 'Corpus Christi',
      calculator: calculateCorpusChristi,
    },
    {
      nameDE: 'Allerheiligen',
      nameEN: "All Saints' Day",
      fixed: { month: 11, day: 1 },
    },
  ],
  'rheinland-pfalz': [
    {
      nameDE: 'Fronleichnam',
      nameEN: 'Corpus Christi',
      calculator: calculateCorpusChristi,
    },
    {
      nameDE: 'Allerheiligen',
      nameEN: "All Saints' Day",
      fixed: { month: 11, day: 1 },
    },
  ],
  saarland: [
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
      nameDE: 'Allerheiligen',
      nameEN: "All Saints' Day",
      fixed: { month: 11, day: 1 },
    },
  ],
  sachsen: [
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
    {
      nameDE: 'Buß- und Bettag',
      nameEN: 'Day of Repentance and Prayer',
      calculator: calculateRepentanceDay,
    },
  ],
  'sachsen-anhalt': [
    {
      nameDE: 'Heilige Drei Könige',
      nameEN: 'Epiphany',
      fixed: { month: 1, day: 6 },
    },
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
  ],
  'schleswig-holstein': [
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
  ],
  thueringen: [
    {
      nameDE: 'Weltkindertag',
      nameEN: "World Children's Day",
      fixed: { month: 9, day: 20 },
    },
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
  ],
};

export function getGermanHolidaysForState(state: string): HolidayDefinition[] {
  const specificHolidays = stateSpecificHolidays[state] || [];
  return [...commonGermanHolidays, ...specificHolidays];
}

export const germanStates = [
  'baden-wuerttemberg',
  'bayern',
  'berlin',
  'brandenburg',
  'bremen',
  'hamburg',
  'hessen',
  'mecklenburg-vorpommern',
  'niedersachsen',
  'nordrhein-westfalen',
  'rheinland-pfalz',
  'saarland',
  'sachsen',
  'sachsen-anhalt',
  'schleswig-holstein',
  'thueringen',
];
