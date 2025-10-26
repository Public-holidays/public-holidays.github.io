import {formatDate, populateBundeslandSelect, populateYearSelect, switchTab} from './page-common.js';
import { getSwissHolidaysForCanton, swissCantons } from './data/swissHolidays.js';
import { stateToFilename } from './types/Holiday.js';
import { calculateDate } from './calculators/HolidayCalculator.js';
import {germanCalenderVariants, germanStates} from "./data/germanHolidays";

declare global {
    interface Window {
        switchTab: (event: MouseEvent, tabName: string) => void;
        updateCalendar: () => void;
    }
}

function renderHolidays(year: number, canton: string) {
    const holidays = getSwissHolidaysForCanton(canton as any).map(holidayDef => {
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

    container.innerHTML = holidays.map(h => {
        const scope = (h as any).scope || 'kantonal';
        const wikiLink = h.wikipediaDE 
            ? `<a href="${h.wikipediaDE}" target="_blank" rel="noopener" class="info-link" title="Mehr erfahren (Wikipedia)">ℹ️</a>`
            : '';
        
        return `
            <div class="holiday-card">
                <h3>
                    ${h.nameDE}
                    ${wikiLink}
                </h3>
                <div class="date">${formatDate(h.date.toISOString(), 'de-CH')}</div>
                <div class="subtitle">${h.nameEN}</div>
                <div class="scope-badge ${scope === 'national' ? 'national' : ''}">${scope}</div>
            </div>
        `;
    }).join('');
}

function renderDownloadLinks() {
    const swissHolidaysContainer = document.getElementById('swiss-holidays-downloads');
    if (swissHolidaysContainer) {
        swissHolidaysContainer.innerHTML = swissCantons.map(canton => 
            `<a href="../output/swiss_holidays_${stateToFilename(canton)}.ics" class="download-btn">${canton}</a>`
        ).join('');
    }
}

function updateCalendar() {
    const yearSelect = document.getElementById('yearSelect') as HTMLSelectElement;
    const cantonSelect = document.getElementById('cantonSelect') as HTMLSelectElement;
    if (!yearSelect || !cantonSelect) return;

    const year = parseInt(yearSelect.value);
    const canton = cantonSelect.value;

    renderHolidays(year, canton);
}

async function init() {
    const yearSelect = document.getElementById('yearSelect') as HTMLSelectElement;
    const cantonSelect = document.getElementById('bundeslandSelect') as HTMLSelectElement;
    if (!yearSelect || !cantonSelect) return;


    populateYearSelect(yearSelect);

    populateBundeslandSelect(germanCalenderVariants, cantonSelect);

    // Populate download links
    renderDownloadLinks();

    updateCalendar();
}

window.switchTab = switchTab;
window.updateCalendar = updateCalendar;

document.addEventListener('DOMContentLoaded', init);
