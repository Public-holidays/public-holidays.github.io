/**
 * Format date using native Intl.DateTimeFormat API
 * @param dateString ISO date string
 * @param locale Locale to use (default: 'de-AT' for Austrian German)
 */

import { HolidayCardData } from './types/Holiday.js';

export function formatDate(dateString: string, locale: string = 'de-AT'): string {
    const date = new Date(dateString);
    
    // Use Intl.DateTimeFormat for proper localization
    const formatter = new Intl.DateTimeFormat(locale, {
        weekday: 'long',    // "Montag", "Dienstag", etc.
        day: 'numeric',     // 1, 2, 3, etc.
        month: 'long',      // "Jänner" (AT) or "Januar" (DE)
        year: 'numeric'     // 2025
    });
    
    return formatter.format(date);
}

export function getDaysBetween(start: string, end: string): number {
    const diffTime = Math.abs(new Date(end).getTime() - new Date(start).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end day
}

export function switchTab(event: MouseEvent, tabName: string): void {
    document.querySelectorAll('.tab').forEach((tab: Element) => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach((content: Element) => content.classList.remove('active'));

    (event.target as HTMLElement).classList.add('active');
    const tabContent = document.getElementById(`${tabName}-tab`);
    if (tabContent) {
        tabContent.classList.add('active');
    }
}

export function populateYearSelect(yearSelect: HTMLSelectElement) {
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
}

export function populateBundeslandSelect(bundeslandStrings: readonly string[], bundeslandSelect: HTMLSelectElement) {
    bundeslandSelect.innerHTML = ''; // Clear existing options

    // Sort the strings alphabetically for better UX
    const sortedStrings = [...bundeslandStrings].sort((a, b) => a.localeCompare(b, 'de'));

    for (const variant of sortedStrings) {
        const option = document.createElement('option');
        option.value = variant;
        option.textContent = variant;
        bundeslandSelect.appendChild(option);
    }
}

export const REGION_SELECT_ID = 'bundeslandSelect';
export const YEAR_SELECT_ID = 'yearSelect';

// Declare Window interface globally
declare global {
    interface Window {
        switchTab: (event: MouseEvent, tabName: string) => void;
        updateCalendar: () => void;
    }
}

/**
 * Page configuration for country-specific pages
 */
export interface PageConfig<TRegion = string> {
    regionSelectId: string;
    regions: readonly TRegion[];
    renderHolidays: (year: number, region: TRegion) => void;
    renderSchoolHolidays?: (year: number, region: TRegion) => void;
    renderDownloadLinks: () => void;
}

/**
 * Standard initialization for all country pages
 */
export function initPage<TRegion = string>(config: PageConfig<TRegion>) {
    const yearSelect = document.getElementById(YEAR_SELECT_ID) as HTMLSelectElement;
    const regionSelect = document.getElementById(config.regionSelectId) as HTMLSelectElement;

    if (!yearSelect || !regionSelect) {
        console.error('Required select elements not found');
        return;
    }

    // Populate dropdowns
    populateYearSelect(yearSelect);
    populateBundeslandSelect(config.regions as readonly string[], regionSelect);

    // Populate download links
    config.renderDownloadLinks();

    // Setup update function
    const updateCalendar = () => {
        const year = parseInt(yearSelect.value);
        const region = regionSelect.value as TRegion;

        config.renderHolidays(year, region);

        if (config.renderSchoolHolidays) {
            config.renderSchoolHolidays(year, region);
        }
    };

    // Expose to window
    window.switchTab = switchTab;
    window.updateCalendar = updateCalendar;

    // Initial render
    updateCalendar();
}


/**
 * Generic holiday card renderer
 */
export function renderHolidayCard(holiday: HolidayCardData, formatDate: (iso: string, locale?: string) => string, locale: string = 'de-DE'): string {
    const scope = holiday.scope || 'regional';
    const wikiLink = holiday.wikipediaDE
        ? `<a href="${holiday.wikipediaDE}" target="_blank" rel="noopener" class="info-link" title="Mehr erfahren (Wikipedia)">ℹ️</a>`
        : '';

    // Handle date range for school holidays
    const isSingleDay = !holiday.endDate || holiday.date.getTime() === holiday.endDate.getTime();
    const dateDisplay = formatDate(holiday.date.toISOString(), locale);

    const endDateDisplay = !isSingleDay && holiday.endDate
        ? `<div class="subtitle">bis ${formatDate(holiday.endDate.toISOString(), locale)}</div>`
        : '';

    return `
        <div class="holiday-card">
            <h3>
                ${holiday.nameDE}
                ${wikiLink}
            </h3>
            <div class="date">${dateDisplay}</div>
            ${endDateDisplay}
            <div class="subtitle">${holiday.nameEN}</div>
            ${holiday.scope ? `<div class="scope-badge ${scope === 'bundesweit' || scope === 'national' ? scope : ''}">${scope}</div>` : ''}
       </div>
    `;
}

/**
 * Download link configuration interface
 */
export interface DownloadLinkConfig {
    containerId: string;
    files: Array<{ file: string; label: string }>;
    basePath?: string;
}

/**
 * Generic download link renderer
 */
export function renderDownloadLinksGeneric(config: DownloadLinkConfig) {
    const container = document.getElementById(config.containerId);
    if (!container) return;

    const basePath = config.basePath || '../output/';
    container.innerHTML = config.files.map(link =>
        `<a href="${basePath}${link.file}" class="download-btn">${link.label}</a>`
    ).join('');
}

