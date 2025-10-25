/**
 * Format date using native Intl.DateTimeFormat API
 * @param dateString ISO date string
 * @param locale Locale to use (default: 'de-AT' for Austrian German)
 */
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
