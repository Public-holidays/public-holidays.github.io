/**
 * Austrian public holiday definitions
 */

import { HolidayDefinition } from '../types/Holiday.js';
import { AustrianRegion } from '../types/SchoolHoliday.js';
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
    wikipediaDE: 'https://de.wikipedia.org/wiki/Neujahr',
    wikipediaEN: 'https://en.wikipedia.org/wiki/New_Year%27s_Day',
    fixed: { month: 1, day: 1 },
  },
  {
    nameDE: 'Heilige Drei Könige',
    nameEN: 'Epiphany',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Erscheinung_des_Herrn',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Epiphany_(holiday)',
    fixed: { month: 1, day: 6 },
  },
  {
    nameDE: 'Ostermontag',
    nameEN: 'Easter Monday',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Ostermontag',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Easter_Monday',
    calculator: calculateEasterMonday,
  },
  {
    nameDE: 'Staatsfeiertag',
    nameEN: 'Labour Day',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Tag_der_Arbeit',
    wikipediaEN: 'https://en.wikipedia.org/wiki/International_Workers%27_Day',
    fixed: { month: 5, day: 1 },
  },
  {
    nameDE: 'Christi Himmelfahrt',
    nameEN: 'Ascension Day',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Christi_Himmelfahrt',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Feast_of_the_Ascension',
    calculator: calculateAscensionDay,
  },
  {
    nameDE: 'Pfingstmontag',
    nameEN: 'Whit Monday',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Pfingstmontag',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Whit_Monday',
    calculator: calculateWhitMonday,
  },
  {
    nameDE: 'Fronleichnam',
    nameEN: 'Corpus Christi',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Fronleichnam',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Corpus_Christi_(feast)',
    calculator: calculateCorpusChristi,
  },
  {
    nameDE: 'Mariä Himmelfahrt',
    nameEN: 'Assumption of Mary',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Mari%C3%A4_Aufnahme_in_den_Himmel',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Assumption_of_Mary',
    fixed: { month: 8, day: 15 },
  },
  {
    nameDE: 'Nationalfeiertag',
    nameEN: 'National Day',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Nationalfeiertag_(%C3%96sterreich)',
    wikipediaEN: 'https://en.wikipedia.org/wiki/National_Day_(Austria)',
    fixed: { month: 10, day: 26 },
  },
  {
    nameDE: 'Allerheiligen',
    nameEN: "All Saints' Day",
    wikipediaDE: 'https://de.wikipedia.org/wiki/Allerheiligen',
    wikipediaEN: 'https://en.wikipedia.org/wiki/All_Saints%27_Day',
    fixed: { month: 11, day: 1 },
  },
  {
    nameDE: 'Mariä Empfängnis',
    nameEN: 'Immaculate Conception',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Mariä_Empfängnis',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Feast_of_the_Immaculate_Conception',
    fixed: { month: 12, day: 8 },
  },
  {
    nameDE: 'Christtag',
    nameEN: 'Christmas Day',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Weihnachten',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Christmas',
    fixed: { month: 12, day: 25 },
  },
  {
    nameDE: 'Stefanitag',
    nameEN: "St. Stephen's Day",
    wikipediaDE: 'https://de.wikipedia.org/wiki/Stephanstag',
    wikipediaEN: 'https://en.wikipedia.org/wiki/St._Stephen%27s_Day',
    fixed: { month: 12, day: 26 },
  },
];

export const austrianRegions: AustrianRegion[] = [
  'Wien',
  'Niederösterreich',
  'Burgenland',
  'Oberösterreich',
  'Steiermark',
  'Kärnten',
  'Salzburg',
  'Tirol',
  'Vorarlberg',
];
