import { formatDate, switchTab } from './page-common.js';
import { getGermanHolidaysForVariant, germanCalenderVariants } from './data/germanHolidays.js';
import {
    calculateDate
} from './calculators/HolidayCalculator.js';

declare global {
    interface Window {
        switchTab: (event: MouseEvent, tabName: string) => void;
        updateCalendar: () => void;
    }
}

function renderHolidays(year: number, bundesland: string) {
    const holidays = getGermanHolidaysForVariant(bundesland).map(holidayDef => {
        return {
            ...holidayDef,
            date: calculateDate(year, holidayDef)
        };
    }).sort((a, b) => a.date.getTime() - b.date.getTime());

    const container = document.getElementById('holidays');
    const holidayYearSpan = document.getElementById('holiday-year');
    const holidayBundeslandSpan = document.getElementById('holiday-bundesland');
    if (!container || !holidayYearSpan || !holidayBundeslandSpan) return;

    holidayYearSpan.textContent = year.toString();
    holidayBundeslandSpan.textContent = bundesland;

    container.innerHTML = holidays.map(h => {
        const scope = (h as any).scope || 'regional';
        const wikiLink = h.wikipediaDE 
            ? `<a href="${h.wikipediaDE}" target="_blank" rel="noopener" class="info-link" title="Mehr erfahren (Wikipedia)">ℹ️</a>`
            : '';
        
        return `
            <div class="holiday-card">
                <h3>
                    ${h.nameDE}
                    ${wikiLink}
                </h3>
                <div class="date">${formatDate(h.date.toISOString(), 'de-DE')}</div>
                <div class="subtitle">${h.nameEN}</div>
                <div class="scope-badge ${scope === 'bundesweit' ? 'bundesweit' : ''}">${scope}</div>
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

    renderHolidays(year, bundesland);
}

async function init() {
    const yearSelect = document.getElementById('yearSelect') as HTMLSelectElement;
    const bundeslandSelect = document.getElementById('bundeslandSelect') as HTMLSelectElement;
    if (!yearSelect || !bundeslandSelect) return;

    // Populate year dropdown
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

    // Populate Bundesland dropdown from germanCalenderVariants
    bundeslandSelect.innerHTML = ''; // Clear existing options
    for (const variant of germanCalenderVariants) {
        const option = document.createElement('option');
        option.value = variant;
        option.textContent = variant;
        bundeslandSelect.appendChild(option);
    }

    updateCalendar();
}

window.switchTab = switchTab;
window.updateCalendar = updateCalendar;

document.addEventListener('DOMContentLoaded', init);
