/**
 * Swiss public holiday definitions by Canton
 * Source: https://de.wikipedia.org/wiki/Feiertage_in_der_Schweiz
 * 
 * Switzerland has only 4 national holidays that apply to all 26 cantons.
 * All other holidays are cantonal and vary significantly.
 */

import { HolidayDefinition } from '../types/Holiday.js';
import {
    NEW_YEARS_DAY,
    GOOD_FRIDAY,
    EASTER_MONDAY,
    LABOUR_DAY,
    ASCENSION_DAY,
    WHIT_MONDAY,
    CORPUS_CHRISTI,
    ASSUMPTION_OF_MARY,
    ALL_SAINTS_DAY,
    CHRISTMAS_DAY,
    BOXING_DAY,
} from './commonHolidays.js';
import { calculateWhitSunday } from '../calculators/HolidayCalculator.js';
import {germanCalenderVariants} from "./germanHolidays";

// Switzerland-specific holidays
const SWISS_NATIONAL_DAY: HolidayDefinition = {
    nameDE: 'Bundesfeiertag',
    nameEN: 'Swiss National Day',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Bundesfeiertag',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Swiss_National_Day',
    fixed: { month: 8, day: 1 },
    scope: 'national',
};

const BERCHTOLDSTAG: HolidayDefinition = {
    nameDE: 'Berchtoldstag',
    nameEN: 'Berchtold\'s Day',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Berchtoldstag',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Berchtold%27s_Day',
    fixed: { month: 1, day: 2 },
};

const EPIPHANY: HolidayDefinition = {
    nameDE: 'Heilige Drei Könige',
    nameEN: 'Epiphany',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Erscheinung_des_Herrn',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Epiphany_(holiday)',
    fixed: { month: 1, day: 6 },
};

const JOSEPHS_DAY: HolidayDefinition = {
    nameDE: 'Josefstag',
    nameEN: 'Saint Joseph\'s Day',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Josefstag',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Saint_Joseph%27s_Day',
    fixed: { month: 3, day: 19 },
};

const IMMACULATE_CONCEPTION: HolidayDefinition = {
    nameDE: 'Mariä Empfängnis',
    nameEN: 'Immaculate Conception',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Mari%C3%A4_Empf%C3%A4ngnis',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Immaculate_Conception',
    fixed: { month: 12, day: 8 },
};

const WHIT_SUNDAY: HolidayDefinition = {
    nameDE: 'Pfingstsonntag',
    nameEN: 'Whit Sunday',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Pfingsten',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Whitsun',
    calculator: calculateWhitSunday,
};

const PETER_AND_PAUL: HolidayDefinition = {
    nameDE: 'Peter und Paul',
    nameEN: 'Saints Peter and Paul',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Peter_und_Paul',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Feast_of_Saints_Peter_and_Paul',
    fixed: { month: 6, day: 29 },
};

// National holidays (apply to all 26 cantons)
const nationalHolidays: HolidayDefinition[] = [
    NEW_YEARS_DAY,
    ASCENSION_DAY,
    SWISS_NATIONAL_DAY,
    CHRISTMAS_DAY,
].map(holiday => ({ ...holiday, scope: 'national' }));

// Cantonal holidays
const cantonalHolidays: Record<SwissCanton, HolidayDefinition[]> = {
    'Zürich': [
        BERCHTOLDSTAG,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        LABOUR_DAY,
        WHIT_MONDAY,
        BOXING_DAY,
    ],
    'Bern': [
        BERCHTOLDSTAG,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        BOXING_DAY,
    ],
    'Luzern': [
        BERCHTOLDSTAG,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        JOSEPHS_DAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Uri': [
        EPIPHANY,
        JOSEPHS_DAY,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Schwyz': [
        EPIPHANY,
        JOSEPHS_DAY,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Obwalden': [
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Nidwalden': [
        JOSEPHS_DAY,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Glarus': [
        BERCHTOLDSTAG,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        ALL_SAINTS_DAY,
        BOXING_DAY,
    ],
    'Zug': [
        BERCHTOLDSTAG,
        JOSEPHS_DAY,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Freiburg': [
        BERCHTOLDSTAG,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        LABOUR_DAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Solothurn': [
        BERCHTOLDSTAG,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        LABOUR_DAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Basel-Stadt': [
        GOOD_FRIDAY,
        EASTER_MONDAY,
        LABOUR_DAY,
        WHIT_MONDAY,
        BOXING_DAY,
    ],
    'Basel-Landschaft': [
        GOOD_FRIDAY,
        EASTER_MONDAY,
        LABOUR_DAY,
        WHIT_MONDAY,
        BOXING_DAY,
    ],
    'Schaffhausen': [
        BERCHTOLDSTAG,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        LABOUR_DAY,
        WHIT_MONDAY,
        BOXING_DAY,
    ],
    'Appenzell Ausserrhoden': [
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        BOXING_DAY,
    ],
    'Appenzell Innerrhoden': [
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'St. Gallen': [
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Graubünden': [
        EPIPHANY,
        JOSEPHS_DAY,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Aargau': [
        BERCHTOLDSTAG,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Thurgau': [
        BERCHTOLDSTAG,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        LABOUR_DAY,
        WHIT_MONDAY,
        BOXING_DAY,
    ],
    'Tessin': [
        EPIPHANY,
        JOSEPHS_DAY,
        EASTER_MONDAY,
        LABOUR_DAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        PETER_AND_PAUL,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Waadt': [
        BERCHTOLDSTAG,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        BOXING_DAY,
    ],
    'Wallis': [
        JOSEPHS_DAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        IMMACULATE_CONCEPTION,
        BOXING_DAY,
    ],
    'Neuenburg': [
        BERCHTOLDSTAG,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        LABOUR_DAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        BOXING_DAY,
    ],
    'Genf': [
        GOOD_FRIDAY,
        EASTER_MONDAY,
        WHIT_MONDAY,
        BOXING_DAY,
    ],
    'Jura': [
        BERCHTOLDSTAG,
        GOOD_FRIDAY,
        EASTER_MONDAY,
        LABOUR_DAY,
        WHIT_MONDAY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
        BOXING_DAY,
    ],
};

export function getSwissHolidaysForCanton(canton: SwissCanton): HolidayDefinition[] {
    const cantonal = cantonalHolidays[canton] || [];
    return [...nationalHolidays, ...cantonal];
}

export function getSwissNationalHolidays(): HolidayDefinition[] {
    return nationalHolidays;
}

export const swissCantons = [
    'Zürich',
    'Bern',
    'Luzern',
    'Uri',
    'Schwyz',
    'Obwalden',
    'Nidwalden',
    'Glarus',
    'Zug',
    'Freiburg',
    'Solothurn',
    'Basel-Stadt',
    'Basel-Landschaft',
    'Schaffhausen',
    'Appenzell Ausserrhoden',
    'Appenzell Innerrhoden',
    'St. Gallen',
    'Graubünden',
    'Aargau',
    'Thurgau',
    'Tessin',
    'Waadt',
    'Wallis',
    'Neuenburg',
    'Genf',
    'Jura',
] as const;

export const swissHolidays = nationalHolidays;
export type SwissCanton = typeof swissCantons[number];
