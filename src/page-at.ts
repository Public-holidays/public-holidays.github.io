import {
    formatDate,
    getDaysBetween,
    populateBundeslandSelect,
    populateYearSelect,
    REGION_SELECT_ID,
    switchTab
} from './page-common.js';
import { austrianHolidays, austrianRegions } from './data/austrianHolidays.js';
import { getSchoolHolidays } from './calculators/SchoolHolidayCalculator.js';
import {
    calculateDate
} from './calculators/HolidayCalculator.js';
import {stateToFilename} from "./types/Holiday.js";
import {AustrianRegion} from "./types/SchoolHoliday";


declare global {
    interface Window {
        switchTab: (event: MouseEvent, tabName: string) => void;
        updateCalendar: () => void;
    }
}

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
    container.innerHTML = holidays.map(h => {
        const wikiLink = h.wikipediaDE 
            ? `<a href="${h.wikipediaDE}" target="_blank" rel="noopener" class="info-link" title="Mehr erfahren (Wikipedia)">ℹ️</a>`
            : '';
        
        return `
            <div class="holiday-card">
                <h3>
                    ${h.nameDE}
                    ${wikiLink}
                </h3>
                <div class="date">${formatDate(h.date.toISOString())}</div>
                <div class="subtitle">${h.nameEN}</div>
            </div>
        `;
    }).join('');
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

function updateCalendar() {
    const yearSelect = document.getElementById('yearSelect') as HTMLSelectElement;
    const bundeslandSelect = document.getElementById(REGION_SELECT_ID) as HTMLSelectElement;
    if (!yearSelect || !bundeslandSelect) return;

    const year = parseInt(yearSelect.value);
    const bundesland = bundeslandSelect.value as AustrianRegion;

    renderPublicHolidays(year);
    renderSchoolHolidays(year, bundesland);
}

function renderDownloadLinks() {
    // Austrian public holidays
    const publicHolidaysContainer = document.getElementById('public-holidays-downloads');
    if (publicHolidaysContainer) {
        const currentYear = new Date().getFullYear();
        const years = [currentYear, currentYear + 1, currentYear + 2];
        
        const links = [
            { file: 'austrian_holidays.ics', label: '📆 Fortlaufender Kalender (2024-2030)' },
            ...years.map(year => ({ file: `austrian_holidays_${year}.ics`, label: year.toString() }))
        ];
        
        publicHolidaysContainer.innerHTML = links.map(link => 
            `<a href="../output/${link.file}" class="download-btn">${link.label}</a>`
        ).join('');
    }
    
    // School holidays by region
    const schoolHolidaysContainer = document.getElementById('school-holidays-downloads');
    if (schoolHolidaysContainer) {
        schoolHolidaysContainer.innerHTML = austrianRegions.map(region => 
            `<a href="../output/school/school_holidays_${stateToFilename(region)}.ics" class="download-btn">${region}</a>`
        ).join('');
    }
}

async function init() {
    const yearSelect = document.getElementById('yearSelect') as HTMLSelectElement;
    const bundeslandSelect = document.getElementById(REGION_SELECT_ID) as HTMLSelectElement;
    if (!yearSelect || !bundeslandSelect) return;

    populateYearSelect(yearSelect)

    populateBundeslandSelect(austrianRegions, bundeslandSelect);

    // Populate download links
    renderDownloadLinks();

    updateCalendar();
}

window.switchTab = switchTab;
window.updateCalendar = updateCalendar;

document.addEventListener('DOMContentLoaded', init);
