import {
    formatDate,
    populateBundeslandSelect,
    populateYearSelect,
    REGION_SELECT_ID,
    switchTab,
    renderHolidayCard,
    renderDownloadLinksGeneric,
    YEAR_SELECT_ID
} from './page-common.js';
import {
    germanCalenderVariants,
    GermanStatePublicHolidayVariant,
    getGermanHolidaysForVariant,
    germanStates
} from './data/germanHolidays.js';
import {stateToFilename} from './types/Holiday.js';
import {calculateDate} from './calculators/HolidayCalculator.js';
import {germanSchoolHolidays, type SchoolYearRange} from './data/germanSchoolHolidays.js';

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

    container.innerHTML = holidays.map(h =>
        renderHolidayCard(h, formatDate, 'de-DE')
    ).join('');
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
    const yearSelect = document.getElementById(YEAR_SELECT_ID) as HTMLSelectElement;
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
    // German public holidays
    renderDownloadLinksGeneric({
        containerId: 'german-holidays-downloads',
        files: germanCalenderVariants.map(variant => ({
            file: `german_holidays_${stateToFilename(variant)}.ics`,
            label: variant
        }))
    });

    // German school holidays
    renderDownloadLinksGeneric({
        containerId: 'german-school-holidays-downloads',
        files: germanStates.map(state => ({
            file: `school/school_holidays_${stateToFilename(state)}.ics`,
            label: state
        }))
    });
}

async function init() {
    const yearSelect = document.getElementById('yearSelect') as HTMLSelectElement;
    const bundeslandSelect = document.getElementById(REGION_SELECT_ID) as HTMLSelectElement;
    const schoolBundeslandSelect = document.getElementById('schoolBundeslandSelect') as HTMLSelectElement;
    if (!yearSelect || !bundeslandSelect || !schoolBundeslandSelect) return;

    populateYearSelect(yearSelect);
    populateBundeslandSelect(germanCalenderVariants, bundeslandSelect);
    populateBundeslandSelect(germanStates, schoolBundeslandSelect);

    renderDownloadLinks();

    updateCalendar();
}

window.switchTab = switchTab;
window.updateCalendar = updateCalendar;

document.addEventListener('DOMContentLoaded', init);
