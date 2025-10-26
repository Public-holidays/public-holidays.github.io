import {formatDate, getDaysBetween, REGION_SELECT_ID} from './page-common.js';
import { austrianHolidays, austrianRegions } from './data/austrianHolidays.js';
import { getSchoolHolidays } from './calculators/SchoolHolidayCalculator.js';
import { calculateDate } from './calculators/HolidayCalculator.js';
import {stateToFilename} from "./types/Holiday.js";
import {AustrianRegion} from "./types/SchoolHoliday";
import { initPage, renderHolidayCard, renderDownloadLinksGeneric } from './page-base.js';

function renderPublicHolidays(year: number) {
    const holidays = austrianHolidays.map(holidayDef => {
        return {
            ...holidayDef,
            date: calculateDate(year, holidayDef)
        };
    }).sort((a, b) => a.date.getTime() - b.date.getTime());

    const container = document.getElementById('public-holidays');
    const publicYearSpan = document.getElementById('public-year');
    if (!container || !publicYearSpan) return;

    publicYearSpan.textContent = year.toString();
    container.innerHTML = holidays.map(h =>
        renderHolidayCard({
            nameDE: h.nameDE,
            nameEN: h.nameEN,
            date: h.date,
            wikipediaDE: h.wikipediaDE
        }, formatDate)
    ).join('');
}

function renderSchoolHolidays(year: number, bundesland: AustrianRegion) {
    const holidays = getSchoolHolidays(year, bundesland);
    const container = document.getElementById('school-holidays');
    const schoolYearSpan = document.getElementById('school-year');
    const schoolBundeslandSpan = document.getElementById('school-bundesland');
    if (!container || !schoolYearSpan || !schoolBundeslandSpan) return;

    schoolYearSpan.textContent = year.toString();
    schoolBundeslandSpan.textContent = bundesland;

    container.innerHTML = holidays.map(h => {
        const days = getDaysBetween(h.startDate.toISOString(), h.endDate.toISOString());
        const isSingleDay = h.startDate.getTime() === h.endDate.getTime();

        return `
            <div class="holiday-card">
                <h3>${h.nameDE}</h3>
                <div class="date">${formatDate(h.startDate.toISOString())}</div>
                ${!isSingleDay ? `<div class="subtitle">bis ${formatDate(h.endDate.toISOString())}</div>` : ''}
                <div class="subtitle">${h.nameEN}</div>
                <div class="duration">${days} Tag${days > 1 ? 'e' : ''}</div>
            </div>
        `;
    }).join('');
}

function renderDownloadLinks() {
    // Austrian public holidays
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear + 1, currentYear + 2];

    renderDownloadLinksGeneric({
        containerId: 'public-holidays-downloads',
        files: [
            { file: 'austrian_holidays.ics', label: '📆 Fortlaufender Kalender (2024-2030)' },
            ...years.map(year => ({ file: `austrian_holidays_${year}.ics`, label: year.toString() }))
        ]
    });

    // School holidays by region
    renderDownloadLinksGeneric({
        containerId: 'school-holidays-downloads',
        files: austrianRegions.map(region => ({
            file: `school/school_holidays_${stateToFilename(region)}.ics`,
            label: region
        }))
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initPage({
        regionSelectId: REGION_SELECT_ID,
        regions: austrianRegions,
        renderHolidays: (year) => renderPublicHolidays(year),
        renderSchoolHolidays: (year, region) => renderSchoolHolidays(year, region as AustrianRegion),
        renderDownloadLinks
    });
});
