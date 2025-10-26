import {formatDate, populateBundeslandSelect, populateYearSelect, REGION_SELECT_ID, switchTab} from './page-common.js';
import {
    germanCalenderVariants,
    GermanStatePublicHolidayVariant,
    getGermanHolidaysForVariant,
    germanStates
} from './data/germanHolidays.js';
import {stateToFilename} from './types/Holiday.js';
import {calculateDate} from './calculators/HolidayCalculator.js';
import {germanSchoolHolidays, type SchoolYearRange} from './data/germanSchoolHolidays.js';

declare global {
    interface Window {
        switchTab: (event: MouseEvent, tabName: string) => void;
        updateCalendar: () => void;
    }
}

/**
 * Parse date string in DD.MM.YYYY format to Date object
 */
function parseGermanDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
}

function renderHolidays(year: number, bundesland: GermanStatePublicHolidayVariant) {
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
        const scope = h.scope || 'regional';
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

/**
 * Get school year range for a given year (e.g., 2025 -> "2025/2026")
 */
function getSchoolYearRange(year: number): SchoolYearRange | null {
    const range = `${year}/${year + 1}` as SchoolYearRange;
    return range in germanSchoolHolidays ? range : null;
}

/**
 * Render school holidays for a specific year and state
 */
function renderSchoolHolidays(year: number, bundesland: string) {
    const container = document.getElementById('school-holidays');
    const schoolYearSpan = document.getElementById('school-year');
    const schoolBundeslandSpan = document.getElementById('school-bundesland');
    if (!container || !schoolYearSpan || !schoolBundeslandSpan) return;

    schoolYearSpan.textContent = year.toString();
    schoolBundeslandSpan.textContent = bundesland;

    const yearRange = getSchoolYearRange(year);
    if (!yearRange) {
        container.innerHTML = '<div class="info-box"><p>Keine Schulferien-Daten für dieses Jahr verfügbar.</p></div>';
        return;
    }

    // Check if the state exists in the school holidays data
    if (!(bundesland in germanSchoolHolidays[yearRange])) {
        container.innerHTML = '<div class="info-box"><p>Keine Schulferien-Daten für dieses Bundesland verfügbar.</p></div>';
        return;
    }

    const holidayData = germanSchoolHolidays[yearRange][bundesland as keyof typeof germanSchoolHolidays[typeof yearRange]];

    const periodNames: Record<string, string> = {
        'herbst': '🍂 Herbstferien',
        'weihnachten': '🎄 Weihnachtsferien',
        'winter': '⛄ Winterferien',
        'ostern': '🐰 Osterferien',
        'pfingsten': '🌸 Pfingstferien',
        'sommer': '☀️ Sommerferien'
    };

    const periods: Array<{name: string; data: any}> = [];

    for (const [key, value] of Object.entries(holidayData)) {
        if (value) {
            periods.push({
                name: periodNames[key] || key,
                data: value
            });
        }
    }

    if (periods.length === 0) {
        container.innerHTML = '<div class="info-box"><p>Keine Schulferien-Daten verfügbar.</p></div>';
        return;
    }

    container.innerHTML = periods.map(period => {
        const startDate = parseGermanDate(period.data.start);
        const endDate = parseGermanDate(period.data.end);
        const startFormatted = formatDate(startDate.toISOString(), 'de-DE');
        const endFormatted = formatDate(endDate.toISOString(), 'de-DE');

        let extraInfo = '';
        if (period.data.extra) {
            extraInfo = `<div class="subtitle">Zusätzlich: ${period.data.extra}</div>`;
        }

        return `
            <div class="holiday-card">
                <h3>${period.name}</h3>
                <div class="date">${startFormatted} - ${endFormatted}</div>
                ${extraInfo}
            </div>
        `;
    }).join('');
}

function updateCalendar() {
    const yearSelect = document.getElementById('yearSelect') as HTMLSelectElement;
    const bundeslandSelect = document.getElementById(REGION_SELECT_ID) as HTMLSelectElement;
    const schoolBundeslandSelect = document.getElementById('schoolBundeslandSelect') as HTMLSelectElement;
    if (!yearSelect || !bundeslandSelect || !schoolBundeslandSelect) return;

    const year = parseInt(yearSelect.value);
    const bundesland = bundeslandSelect.value as GermanStatePublicHolidayVariant;
    const schoolBundesland = schoolBundeslandSelect.value;

    renderHolidays(year, bundesland);
    renderSchoolHolidays(year, schoolBundesland);
}

function renderDownloadLinks() {
    const germanHolidaysContainer = document.getElementById('german-holidays-downloads');
    if (germanHolidaysContainer) {
        germanHolidaysContainer.innerHTML = germanCalenderVariants.map(variant =>
            `<a href="../output/german_holidays_${stateToFilename(variant)}.ics" class="download-btn">${variant}</a>`
        ).join('');
    }

    const germanSchoolHolidaysContainer = document.getElementById('german-school-holidays-downloads');
    if (germanSchoolHolidaysContainer) {
        germanSchoolHolidaysContainer.innerHTML = germanStates.map(state =>
            `<a href="../output/school/school_holidays_${stateToFilename(state)}.ics" class="download-btn">${state}</a>`
        ).join('');
    }
}

async function init() {
    const yearSelect = document.getElementById('yearSelect') as HTMLSelectElement;
    const bundeslandSelect = document.getElementById(REGION_SELECT_ID) as HTMLSelectElement;
    const schoolBundeslandSelect = document.getElementById('schoolBundeslandSelect') as HTMLSelectElement;
    if (!yearSelect || !bundeslandSelect || !schoolBundeslandSelect) return;

    populateYearSelect(yearSelect);

    // Populate Bundesland dropdown for public holidays (includes variants)
    populateBundeslandSelect(germanCalenderVariants, bundeslandSelect);

    // Populate Bundesland dropdown for school holidays (only base states)
    populateBundeslandSelect(germanStates, schoolBundeslandSelect);

    // Populate download links
    renderDownloadLinks();

    updateCalendar();
}

window.switchTab = switchTab;
window.updateCalendar = updateCalendar;

document.addEventListener('DOMContentLoaded', init);
