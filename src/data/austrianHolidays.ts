/**
 * Austrian public holiday definitions
 */

import {HolidayDefinition} from '../types/Holiday.js';
import {AustrianRegion} from '../types/SchoolHoliday.js';
import {
    NEW_YEARS_DAY,
    EPIPHANY,
    EASTER_MONDAY,
    LABOUR_DAY,
    ASCENSION_DAY,
    WHIT_MONDAY,
    CORPUS_CHRISTI,
    ASSUMPTION_OF_MARY,
    ALL_SAINTS_DAY,
} from './commonHolidays.js';

// Austria-specific holidays
const NATIONAL_DAY: HolidayDefinition = {
    nameDE: 'Nationalfeiertag',
    nameEN: 'National Day',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Nationalfeiertag_(%C3%96sterreich)',
    wikipediaEN: 'https://en.wikipedia.org/wiki/National_Day_(Austria)',
    fixed: {month: 10, day: 26},
};

const IMMACULATE_CONCEPTION: HolidayDefinition = {
    nameDE: 'Mariä Empfängnis',
    nameEN: 'Immaculate Conception',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Mariä_Empfängnis',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Feast_of_the_Immaculate_Conception',
    fixed: {month: 12, day: 8},
};

const CHRISTMAS_DAY_AT: HolidayDefinition = {
    nameDE: 'Christtag',
    nameEN: 'Christmas Day',
    wikipediaDE: 'https://de.wikipedia.org/wiki/Weihnachten',
    wikipediaEN: 'https://en.wikipedia.org/wiki/Christmas',
    fixed: {month: 12, day: 25},
};

const ST_STEPHENS_DAY: HolidayDefinition = {
    nameDE: 'Stefanitag',
    nameEN: "St. Stephen's Day",
    wikipediaDE: 'https://de.wikipedia.org/wiki/Stephanstag',
    wikipediaEN: 'https://en.wikipedia.org/wiki/St._Stephen%27s_Day',
    fixed: {month: 12, day: 26},
};

export const austrianHolidays: HolidayDefinition[] = [
    NEW_YEARS_DAY,
    EPIPHANY,
    EASTER_MONDAY,
    LABOUR_DAY,
    ASCENSION_DAY,
    WHIT_MONDAY,
    CORPUS_CHRISTI,
    ASSUMPTION_OF_MARY,
    NATIONAL_DAY,
    ALL_SAINTS_DAY,
    IMMACULATE_CONCEPTION,
    CHRISTMAS_DAY_AT,
    ST_STEPHENS_DAY,
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
