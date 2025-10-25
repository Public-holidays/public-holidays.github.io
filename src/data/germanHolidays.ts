/**
 * German public holiday definitions by Bundesland
 */

import { HolidayDefinition, GermanState } from '../types/Holiday.js';
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
const stateSpecificHolidays: Record<GermanState, HolidayDefinition[]> = {
  'Baden-Württemberg': [
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
  'Bayern': [
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
  'Berlin': [
    {
      nameDE: 'Internationaler Frauentag',
      nameEN: "International Women's Day",
      fixed: { month: 3, day: 8 },
    },
  ],
  'Brandenburg': [
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
  'Bremen': [
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
  ],
  'Hamburg': [
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
  ],
  'Hessen': [
    {
      nameDE: 'Fronleichnam',
      nameEN: 'Corpus Christi',
      calculator: calculateCorpusChristi,
    },
  ],
  'Mecklenburg-Vorpommern': [
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
  'Niedersachsen': [
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
  ],
  'Nordrhein-Westfalen': [
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
  'Rheinland-Pfalz': [
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
  'Saarland': [
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
  'Sachsen': [
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
  'Sachsen-Anhalt': [
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
  'Schleswig-Holstein': [
    {
      nameDE: 'Reformationstag',
      nameEN: 'Reformation Day',
      fixed: { month: 10, day: 31 },
    },
  ],
  'Thüringen': [
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

export function getGermanHolidaysForState(state: GermanState): HolidayDefinition[] {
  const specificHolidays = stateSpecificHolidays[state] || [];
  return [...commonGermanHolidays, ...specificHolidays];
}

export const germanStates: GermanState[] = [
  'Baden-Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein-Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thüringen',
];
