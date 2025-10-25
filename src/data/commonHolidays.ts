/**
 * Common holidays shared between Austria and Germany
 */

import { HolidayDefinition } from '../types/Holiday.js';
import {
  calculateGoodFriday,
  calculateEasterMonday,
  calculateAscensionDay,
  calculateWhitMonday,
  calculateCorpusChristi,
} from '../calculators/HolidayCalculator.js';

// Holidays that exist in both Austria and Germany
export const NEW_YEARS_DAY: HolidayDefinition = {
  nameDE: 'Neujahr',
  nameEN: "New Year's Day",
  wikipediaDE: 'https://de.wikipedia.org/wiki/Neujahr',
  wikipediaEN: 'https://en.wikipedia.org/wiki/New_Year%27s_Day',
  fixed: { month: 1, day: 1 },
};

export const EPIPHANY: HolidayDefinition = {
  nameDE: 'Heilige Drei Könige',
  nameEN: 'Epiphany',
  wikipediaDE: 'https://de.wikipedia.org/wiki/Erscheinung_des_Herrn',
  wikipediaEN: 'https://en.wikipedia.org/wiki/Epiphany_(holiday)',
  fixed: { month: 1, day: 6 },
};

export const GOOD_FRIDAY: HolidayDefinition = {
  nameDE: 'Karfreitag',
  nameEN: 'Good Friday',
  wikipediaDE: 'https://de.wikipedia.org/wiki/Karfreitag',
  wikipediaEN: 'https://en.wikipedia.org/wiki/Good_Friday',
  calculator: calculateGoodFriday,
};

export const EASTER_MONDAY: HolidayDefinition = {
  nameDE: 'Ostermontag',
  nameEN: 'Easter Monday',
  wikipediaDE: 'https://de.wikipedia.org/wiki/Ostermontag',
  wikipediaEN: 'https://en.wikipedia.org/wiki/Easter_Monday',
  calculator: calculateEasterMonday,
};

export const LABOUR_DAY: HolidayDefinition = {
  nameDE: 'Tag der Arbeit',
  nameEN: 'Labour Day',
  wikipediaDE: 'https://de.wikipedia.org/wiki/Tag_der_Arbeit',
  wikipediaEN: 'https://en.wikipedia.org/wiki/International_Workers%27_Day',
  fixed: { month: 5, day: 1 },
};

export const ASCENSION_DAY: HolidayDefinition = {
  nameDE: 'Christi Himmelfahrt',
  nameEN: 'Ascension Day',
  wikipediaDE: 'https://de.wikipedia.org/wiki/Christi_Himmelfahrt',
  wikipediaEN: 'https://en.wikipedia.org/wiki/Feast_of_the_Ascension',
  calculator: calculateAscensionDay,
};

export const WHIT_MONDAY: HolidayDefinition = {
  nameDE: 'Pfingstmontag',
  nameEN: 'Whit Monday',
  wikipediaDE: 'https://de.wikipedia.org/wiki/Pfingstmontag',
  wikipediaEN: 'https://en.wikipedia.org/wiki/Whit_Monday',
  calculator: calculateWhitMonday,
};

export const CORPUS_CHRISTI: HolidayDefinition = {
  nameDE: 'Fronleichnam',
  nameEN: 'Corpus Christi',
  wikipediaDE: 'https://de.wikipedia.org/wiki/Fronleichnam',
  wikipediaEN: 'https://en.wikipedia.org/wiki/Corpus_Christi_(feast)',
  calculator: calculateCorpusChristi,
};

export const ASSUMPTION_OF_MARY: HolidayDefinition = {
    nameDE: 'Mariä Himmelfahrt',
    nameEN: 'Assumption of Mary',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Mari%C3%A4_Aufnahme_in_den_Himmel',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Assumption_of_Mary',
    fixed: {month: 8, day: 15},
};

export const ALL_SAINTS_DAY: HolidayDefinition = {
  nameDE: 'Allerheiligen',
  nameEN: "All Saints' Day",
  wikipediaDE: 'https://de.wikipedia.org/wiki/Allerheiligen',
  wikipediaEN: 'https://en.wikipedia.org/wiki/All_Saints%27_Day',
  fixed: { month: 11, day: 1 },
};

export const CHRISTMAS_DAY: HolidayDefinition = {
  nameDE: 'Erster Weihnachtstag',
  nameEN: 'Christmas Day',
  wikipediaDE: 'https://de.wikipedia.org/wiki/Weihnachten',
  wikipediaEN: 'https://en.wikipedia.org/wiki/Christmas',
  fixed: { month: 12, day: 25 },
};

export const BOXING_DAY: HolidayDefinition = {
  nameDE: 'Zweiter Weihnachtstag',
  nameEN: 'Boxing Day',
  wikipediaDE: 'https://de.wikipedia.org/wiki/Zweiter_Weihnachtsfeiertag',
  wikipediaEN: 'https://en.wikipedia.org/wiki/Boxing_Day',
  fixed: { month: 12, day: 26 },
};

