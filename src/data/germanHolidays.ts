/**
 * German public holiday definitions by Bundesland
 */

import {HolidayDefinition} from '../types/Holiday.js';
import {
    calculateRepentanceDay,
    calculateWhitSunday,
    calculateEaster,
} from '../calculators/HolidayCalculator.js';
import {
    NEW_YEARS_DAY,
    GOOD_FRIDAY,
    EASTER_MONDAY,
    LABOUR_DAY,
    ASCENSION_DAY,
    WHIT_MONDAY,
    CORPUS_CHRISTI,
    ASSUMPTION_OF_MARY,
    EPIPHANY,
    ALL_SAINTS_DAY,
    CHRISTMAS_DAY,
    BOXING_DAY,
} from './commonHolidays.js';

// Germany-specific holidays (constants)
const GERMAN_UNITY_DAY: HolidayDefinition = {
    nameDE: 'Tag der Deutschen Einheit',
    nameEN: 'German Unity Day',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Tag_der_Deutschen_Einheit',
    wikipediaEN: 'https://en.wikipedia.org/wiki/German_Unity_Day',
    scope: 'bundesweit',  // Nationwide holiday
    fixed: {month: 10, day: 3},
};

const REFORMATION_DAY: HolidayDefinition = {
    nameDE: 'Reformationstag',
    nameEN: 'Reformation Day',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Reformationstag',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Reformation_Day',
    fixed: {month: 10, day: 31},
};

const REPENTANCE_DAY: HolidayDefinition = {
    nameDE: 'Buß- und Bettag',
    nameEN: 'Day of Repentance and Prayer',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Bu%C3%9F-_und_Bettag',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Repentance_and_Prayer_Day',
    calculator: calculateRepentanceDay,
};

const WOMENS_DAY: HolidayDefinition = {
    nameDE: 'Internationaler Frauentag',
    nameEN: "International Women's Day",
    wikipediaDE: 'https://de.wikipedia.org/wiki/Internationaler_Frauentag',
    wikipediaEN: 'https://en.wikipedia.org/wiki/International_Women%27s_Day',
    fixed: {month: 3, day: 8},
};

const WHIT_SUNDAY: HolidayDefinition = {
    nameDE: 'Pfingstsonntag',
    nameEN: 'Whit Sunday',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Pfingsten',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Pentecost',
    calculator: calculateWhitSunday,
};

const EASTER_SUNDAY: HolidayDefinition = {
    nameDE: 'Ostersonntag',
    nameEN: 'Easter Sunday',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Ostern',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Easter',
    calculator: calculateEaster,
};

const AUGSBURG_PEACE_FESTIVAL: HolidayDefinition = {
    nameDE: 'Augsburger Friedensfest',
    nameEN: 'Augsburg Peace Festival',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Augsburger_Hohes_Friedensfest',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Augsburger_Hohes_Friedensfest',
    fixed: {month: 8, day: 8},
};

const WORLD_CHILDRENS_DAY: HolidayDefinition = {
    nameDE: 'Weltkindertag',
    nameEN: "World Children's Day",
    wikipediaDE: 'https://de.wikipedia.org/wiki/Weltkindertag',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Children%27s_Day',
    fixed: {month: 9, day: 20},
};

// Common holidays for all German states (marked as bundesweit/nationwide)
const commonGermanHolidays: HolidayDefinition[] = [
    NEW_YEARS_DAY,
    GOOD_FRIDAY,
    EASTER_MONDAY,
    LABOUR_DAY,
    ASCENSION_DAY,
    WHIT_MONDAY,
    GERMAN_UNITY_DAY,
    CHRISTMAS_DAY,
    BOXING_DAY,
].map(holiday => ({ ...holiday, scope: 'bundesweit' }));

// State-specific holidays
const stateSpecificHolidays: Record<GermanStatePublicHolidayVariant, HolidayDefinition[]> = {
    'Baden-Württemberg': [
        EPIPHANY,
        CORPUS_CHRISTI,
        ALL_SAINTS_DAY,
    ],
    'Bayern': [
        EPIPHANY,
        CORPUS_CHRISTI,
        ALL_SAINTS_DAY,
    ],
    'Bayern (katholisch)': [
        EPIPHANY,
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
    ],
    'Augsburg': [
        EPIPHANY,
        CORPUS_CHRISTI,
        AUGSBURG_PEACE_FESTIVAL,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
    ],
    'Berlin': [
        WOMENS_DAY,
    ],
    'Brandenburg': [
        EASTER_SUNDAY,
        WHIT_SUNDAY,
        REFORMATION_DAY,
    ],
    'Bremen': [
        REFORMATION_DAY,
    ],
    'Hamburg': [
        REFORMATION_DAY,
    ],
    'Hessen': [
        CORPUS_CHRISTI,
    ],
    'Mecklenburg-Vorpommern': [
        WOMENS_DAY,
        REFORMATION_DAY,
    ],
    'Niedersachsen': [
        REFORMATION_DAY,
    ],
    'Nordrhein-Westfalen': [
        CORPUS_CHRISTI,
        ALL_SAINTS_DAY,
    ],
    'Rheinland-Pfalz': [
        CORPUS_CHRISTI,
        ALL_SAINTS_DAY,
    ],
    'Saarland': [
        CORPUS_CHRISTI,
        ASSUMPTION_OF_MARY,
        ALL_SAINTS_DAY,
    ],
    'Sachsen': [
        REFORMATION_DAY,
        REPENTANCE_DAY,
    ],
    'Sachsen (katholisch)': [
        CORPUS_CHRISTI,
        REFORMATION_DAY,
        REPENTANCE_DAY,
    ],
    'Sachsen-Anhalt': [
        EPIPHANY,
        REFORMATION_DAY,
    ],
    'Schleswig-Holstein': [
        REFORMATION_DAY,
    ],
    'Thüringen': [
        WORLD_CHILDRENS_DAY,
        REFORMATION_DAY,
    ],
    'Thüringen (katholisch)': [
        CORPUS_CHRISTI,
        WORLD_CHILDRENS_DAY,
        REFORMATION_DAY,
    ],
};

export function getGermanHolidaysForVariant(state: GermanStatePublicHolidayVariant): HolidayDefinition[] {
    const specificHolidays = stateSpecificHolidays[state] || [];
    return [...commonGermanHolidays, ...specificHolidays];
}

// List of all German federal states (Bundesländer)
export const germanStates = [
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
    'Thüringen'
] as const;

export type GermanState = typeof germanStates[number];

// Special variants for German public holidays (Catholic regions, Augsburg)
export const germanStatesSpecialPublicHolidayVariants = [
    'Bayern (katholisch)', // Bavaria - Catholic regions with Assumption of Mary
    'Augsburg' , // Augsburg city - includes Augsburg Peace Festival
    'Sachsen (katholisch)', // Saxony - Catholic municipalities with Corpus Christi
    'Thüringen (katholisch)' // Thuringia - Catholic municipalities with Corpus Christi
] as const;

// Union array of all German state public holiday variants (base states + special variants)
export const germanCalenderVariants = [
    ...germanStates,
    ...germanStatesSpecialPublicHolidayVariants
] as const;

// Type for all German state public holiday variants
export type GermanStatePublicHolidayVariant = typeof germanCalenderVariants[number];

// export const germanCalenderVariants: GermanStatePublicHolidayVariant[] = [
//     'Baden-Württemberg',
//     'Bayern',
//     'Bayern (katholisch)',
//     'Augsburg',
//     'Berlin',
//     'Brandenburg',
//     'Bremen',
//     'Hamburg',
//     'Hessen',
//     'Mecklenburg-Vorpommern',
//     'Niedersachsen',
//     'Nordrhein-Westfalen',
//     'Rheinland-Pfalz',
//     'Saarland',
//     'Sachsen',
//     'Sachsen (katholisch)',
//     'Sachsen-Anhalt',
//     'Schleswig-Holstein',
//     'Thüringen',
//     'Thüringen (katholisch)',
// ];
