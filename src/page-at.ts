import { formatDate, getDaysBetween, switchTab } from './page-common.js';
import { austrianHolidays, austrianRegions } from './data/austrianHolidays.js';
import { getSchoolHolidays } from './calculators/SchoolHolidayCalculator.js';
import {
    calculateDate
} from './calculators/HolidayCalculator.js';


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
    container.innerHTML = holidays.map(h => `
        <div class="holiday-card">
            <h3>${h.nameDE}</h3>
            <div class="date">${formatDate(h.date.toISOString())}</div>
            <div class="subtitle">${h.nameEN}</div>
        </div>
    `).join('');
}

function renderSchoolHolidays(year: number, bundesland: string) {
    const holidays = getSchoolHolidays(year, bundesland as any);
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
    const bundeslandSelect = document.getElementById('bundeslandSelect') as HTMLSelectElement;
    if (!yearSelect || !bundeslandSelect) return;

    const year = parseInt(yearSelect.value);
    const bundesland = bundeslandSelect.value;

    renderPublicHolidays(year);
    renderSchoolHolidays(year, bundesland);
}

async function init() {
    const yearSelect = document.getElementById('yearSelect') as HTMLSelectElement;
    if (!yearSelect) return;

    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 1;
    const endYear = currentYear + 5;

    for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.value = year.toString();
        option.textContent = year.toString();
        if (year === currentYear) option.selected = true;
        yearSelect.appendChild(option);
    }

    updateCalendar();
}

window.switchTab = switchTab;
window.updateCalendar = updateCalendar;

document.addEventListener('DOMContentLoaded', init);
