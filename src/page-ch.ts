import {formatDate, REGION_SELECT_ID, initPage, renderHolidayCard, renderDownloadLinksGeneric} from './page-common.js';
import {getSwissHolidaysForCanton, SwissCanton, swissCantons} from './data/swissHolidays.js';
import { stateToFilename } from './types/Holiday.js';
import { calculateDate } from './calculators/HolidayCalculator.js';

function renderHolidays(year: number, canton: SwissCanton) {
    const holidays = getSwissHolidaysForCanton(canton).map(holidayDef => {
        return {
            ...holidayDef,
            date: calculateDate(year, holidayDef)
        };
    }).sort((a, b) => a.date.getTime() - b.date.getTime());

    const container = document.getElementById('holidays');
    const holidayYearSpan = document.getElementById('holiday-year');
    const holidayCantonSpan = document.getElementById('holiday-canton');
    if (!container || !holidayYearSpan || !holidayCantonSpan) return;

    holidayYearSpan.textContent = year.toString();
    holidayCantonSpan.textContent = canton;

    container.innerHTML = holidays.map(h =>
        renderHolidayCard(h, formatDate, 'de-CH')
    ).join('');
}

function renderDownloadLinks() {
    renderDownloadLinksGeneric({
        containerId: 'swiss-holidays-downloads',
        files: swissCantons.map(canton => ({
            file: `swiss_holidays_${stateToFilename(canton)}.ics`,
            label: canton
        }))
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initPage({
        regionSelectId: REGION_SELECT_ID,
        regions: swissCantons,
        renderHolidays,
        renderDownloadLinks
    });
});
