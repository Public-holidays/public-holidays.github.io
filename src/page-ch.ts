import {formatDate, populateBundeslandSelect, populateYearSelect, REGION_SELECT_ID, switchTab} from './page-common.js';
import {getSwissHolidaysForCanton, SwissCanton, swissCantons} from './data/swissHolidays.js';
import { stateToFilename } from './types/Holiday.js';
import { calculateDate } from './calculators/HolidayCalculator.js';

declare global {
    interface Window {
        switchTab: (event: MouseEvent, tabName: string) => void;
        updateCalendar: () => void;
    }
}

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

    container.innerHTML = holidays.map(h => {
        const scope = h.scope || 'kantonal';
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

const YEAR_SELECT_ID = 'yearSelect';

function updateCalendar() {
    const yearSelect = document.getElementById(YEAR_SELECT_ID) as HTMLSelectElement;
    const cantonSelect = document.getElementById(REGION_SELECT_ID) as HTMLSelectElement;
    if (!yearSelect || !cantonSelect) return;

    const year = parseInt(yearSelect.value);
    const canton = cantonSelect.value as SwissCanton;

    renderHolidays(year, canton);
}

async function init() {
    const yearSelect = document.getElementById(YEAR_SELECT_ID) as HTMLSelectElement;
    const cantonSelect = document.getElementById(REGION_SELECT_ID) as HTMLSelectElement;
    if (!yearSelect || !cantonSelect) return;


    populateYearSelect(yearSelect);

    populateBundeslandSelect(swissCantons, cantonSelect);

    // Populate download links
    renderDownloadLinks();

    updateCalendar();
}

window.switchTab = switchTab;
window.updateCalendar = updateCalendar;

document.addEventListener('DOMContentLoaded', init);
