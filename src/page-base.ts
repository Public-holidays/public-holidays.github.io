/**
 * Base functionality shared across all country-specific pages
 */

import {populateBundeslandSelect, populateYearSelect, switchTab} from './page-common.js';

export const YEAR_SELECT_ID = 'yearSelect';

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
export interface HolidayCardData {
    nameDE: string;
    nameEN: string;
    date: Date;
    wikipediaDE?: string;
    scope?: string;
    extra?: string; // For additional info like duration
}

export function renderHolidayCard(holiday: HolidayCardData, formatDate: (iso: string, locale?: string) => string, locale: string = 'de-DE'): string {
    const scope = holiday.scope || 'regional';
    const wikiLink = holiday.wikipediaDE
        ? `<a href="${holiday.wikipediaDE}" target="_blank" rel="noopener" class="info-link" title="Mehr erfahren (Wikipedia)">ℹ️</a>`
        : '';

    return `
        <div class="holiday-card">
            <h3>
                ${holiday.nameDE}
                ${wikiLink}
            </h3>
            <div class="date">${formatDate(holiday.date.toISOString(), locale)}</div>
            <div class="subtitle">${holiday.nameEN}</div>
            ${holiday.scope ? `<div class="scope-badge ${scope === 'bundesweit' || scope === 'national' ? scope : ''}">${scope}</div>` : ''}
            ${holiday.extra || ''}
        </div>
    `;
}

/**
 * Generic download link renderer
 */
export interface DownloadLinkConfig {
    containerId: string;
    files: Array<{ file: string; label: string }>;
    basePath?: string;
}

export function renderDownloadLinksGeneric(config: DownloadLinkConfig) {
    const container = document.getElementById(config.containerId);
    if (!container) return;

    const basePath = config.basePath || '../output/';
    container.innerHTML = config.files.map(link =>
        `<a href="${basePath}${link.file}" class="download-btn">${link.label}</a>`
    ).join('');
}
