/**
 * German public holiday definitions by Bundesland
 */

import {HolidayDefinition, GermanState} from '../types/Holiday.js';
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
        wikipediaDE: 'https://de.wikipedia.org/wiki/Neujahr',
        wikipediaEN: 'https://en.wikipedia.org/wiki/New_Year%27s_Day',
        fixed: {month: 1, day: 1},
    },
    {
        nameDE: 'Karfreitag',
        nameEN: 'Good Friday',
        wikipediaDE: 'https://de.wikipedia.org/wiki/Karfreitag',
        wikipediaEN: 'https://en.wikipedia.org/wiki/Good_Friday',
        calculator: calculateGoodFriday,
    },
    {
        nameDE: 'Ostermontag',
        nameEN: 'Easter Monday',
        wikipediaDE: 'https://de.wikipedia.org/wiki/Ostermontag',
        wikipediaEN: 'https://en.wikipedia.org/wiki/Easter_Monday',
        calculator: calculateEasterMonday,
    },
    {
        nameDE: 'Tag der Arbeit',
        nameEN: 'Labour Day',
        wikipediaDE: 'https://de.wikipedia.org/wiki/Tag_der_Arbeit',
        wikipediaEN: 'https://en.wikipedia.org/wiki/International_Workers%27_Day',
        fixed: {month: 5, day: 1},
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
        nameDE: 'Tag der Deutschen Einheit',
        nameEN: 'German Unity Day',
        wikipediaDE: 'https://de.wikipedia.org/wiki/Tag_der_Deutschen_Einheit',
        wikipediaEN: 'https://en.wikipedia.org/wiki/German_Unity_Day',
        fixed: {month: 10, day: 3},
    },
    {
        nameDE: 'Erster Weihnachtstag',
        nameEN: 'Christmas Day',
        wikipediaDE: 'https://de.wikipedia.org/wiki/Weihnachten',
        wikipediaEN: 'https://en.wikipedia.org/wiki/Christmas',
        fixed: {month: 12, day: 25},
    },
    {
        nameDE: 'Zweiter Weihnachtstag',
        nameEN: 'Boxing Day',
        wikipediaDE: 'https://de.wikipedia.org/wiki/Zweiter_Weihnachtsfeiertag',
        wikipediaEN: 'https://en.wikipedia.org/wiki/Boxing_Day',
        fixed: {month: 12, day: 26},
    },
];

const dreiKoenige: HolidayDefinition = {
    nameDE: 'Heilige Drei Könige',
    nameEN: 'Epiphany',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Erscheinung_des_Herrn',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Epiphany_(holiday)',
    fixed: {month: 1, day: 6},
}

const fronleichnam: HolidayDefinition = {
    nameDE: 'Fronleichnam',
    nameEN: 'Corpus Christi',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Fronleichnam',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Corpus_Christi_(feast)',
    calculator: calculateCorpusChristi,
}

const allerheiligen: HolidayDefinition = {
    nameDE: 'Allerheiligen',
    nameEN: "All Saints' Day",
    wikipediaDE: 'https://de.wikipedia.org/wiki/Allerheiligen',
    wikipediaEN: 'https://en.wikipedia.org/wiki/All_Saints%27_Day',
    fixed: {month: 11, day: 1},
}

const mariaHimmelfahrt : HolidayDefinition = {
    nameDE: 'Mariä Himmelfahrt',
    nameEN: 'Assumption of Mary',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Mari%C3%A4_Aufnahme_in_den_Himmel',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Assumption_of_Mary',
    fixed: {month: 8, day: 15},
}

// State-specific holidays
const stateSpecificHolidays: Record<GermanState, HolidayDefinition[]> = {
    'Baden-Württemberg': [
        dreiKoenige,
        fronleichnam,
        allerheiligen,
    ],
    'Bayern': [
        dreiKoenige,
        fronleichnam,
        {
            nameDE: 'Augsburger Friedensfest',
            nameEN: 'Augsburg Peace Festival',
            fixed: {month: 8, day: 8},
        },
        mariaHimmelfahrt,
        allerheiligen,
    ],
    'Berlin': [
        {
            nameDE: 'Internationaler Frauentag',
            nameEN: "International Women's Day",
            fixed: {month: 3, day: 8},
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
            fixed: {month: 10, day: 31},
        },
    ],
    'Bremen': [
        {
            nameDE: 'Reformationstag',
            nameEN: 'Reformation Day',
            fixed: {month: 10, day: 31},
        },
    ],
    'Hamburg': [
        {
            nameDE: 'Reformationstag',
            nameEN: 'Reformation Day',
            fixed: {month: 10, day: 31},
        },
    ],
    'Hessen': [
        fronleichnam,
    ],
    'Mecklenburg-Vorpommern': [
        {
            nameDE: 'Internationaler Frauentag',
            nameEN: "International Women's Day",
            fixed: {month: 3, day: 8},
        },
        {
            nameDE: 'Reformationstag',
            nameEN: 'Reformation Day',
            fixed: {month: 10, day: 31},
        },
    ],
    'Niedersachsen': [
        {
            nameDE: 'Reformationstag',
            nameEN: 'Reformation Day',
            fixed: {month: 10, day: 31},
        },
    ],
    'Nordrhein-Westfalen': [
        fronleichnam,
        allerheiligen,
    ],
    'Rheinland-Pfalz': [
        fronleichnam,
        allerheiligen,
    ],
    'Saarland': [
        fronleichnam,
        {
            nameDE: 'Mariä Himmelfahrt',
            nameEN: 'Assumption of Mary',
            fixed: {month: 8, day: 15},
        },
        allerheiligen,
    ],
    'Sachsen': [
        {
            nameDE: 'Reformationstag',
            nameEN: 'Reformation Day',
            fixed: {month: 10, day: 31},
        },
        {
            nameDE: 'Buß- und Bettag',
            nameEN: 'Day of Repentance and Prayer',
            calculator: calculateRepentanceDay,
        },
    ],
    'Sachsen-Anhalt': [
        dreiKoenige,
        {
            nameDE: 'Reformationstag',
            nameEN: 'Reformation Day',
            fixed: {month: 10, day: 31},
        },
    ],
    'Schleswig-Holstein': [
        {
            nameDE: 'Reformationstag',
            nameEN: 'Reformation Day',
            fixed: {month: 10, day: 31},
        },
    ],
    'Thüringen': [
        {
            nameDE: 'Weltkindertag',
            nameEN: "World Children's Day",
            fixed: {month: 9, day: 20},
        },
        {
            nameDE: 'Reformationstag',
            nameEN: 'Reformation Day',
            fixed: {month: 10, day: 31},
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
