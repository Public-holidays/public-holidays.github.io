/**
 * ICS Calendar file generator
 */

import {createEvents, EventAttributes, DateArray} from 'ics';
import {writeFile, mkdir} from 'fs/promises';
import {dirname} from 'path';
import {Holiday, HolidayDefinition, CalendarConfig} from '../types/Holiday.js';

export class IcsGenerator {
    /**
     * Convert Date to DateArray format required by ics library
     */
    private static dateToDateArray(date: Date): DateArray {
        return [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
        ];
    }

    /**
     * Generate holidays from definitions for a given year
     */
    static generateHolidaysForYear(
        definitions: HolidayDefinition[],
        year: number,
        country: string = 'Österreich'
    ): Holiday[] {
        return definitions.map((def) => {
            let date: Date;

            if (def.fixed) {
                date = new Date(year, def.fixed.month - 1, def.fixed.day);
            } else if (def.calculator) {
                date = def.calculator(year);
            } else {
                throw new Error(`Holiday ${def.nameDE} has neither fixed date nor calculator`);
            }

            // Build description with Wikipedia links
            let description = `${def.nameEN} - Gesetzlicher Feiertag in ${country}`;
            
            if (def.wikipediaDE || def.wikipediaEN) {
                description += '\\n\\nLearn more:';
                if (def.wikipediaDE) {
                    description += `\\n🇩🇪 ${def.wikipediaDE}`;
                }
                if (def.wikipediaEN) {
                    description += `\\n🇬🇧 ${def.wikipediaEN}`;
                }
            }

            return {
                date,
                title: def.nameDE,
                description,
            };
        });
    }


    /**
     * Format date as ISO 8601 timestamp
     */
    private static formatTimestamp(date: Date): string {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    /**
     * Format date as YYYYMMDD
     */
    private static formatDateCompact(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    }
    /**
     * Generate UID for an event
     */
    private static generateUid(date: Date, title: string, domain: string): string {
        const dateStr = this.formatDateCompact(date);
        const slug = title.toLowerCase()
            .replace(/[äÄ]/g, 'a')
            .replace(/[öÖ]/g, 'o')
            .replace(/[üÜ]/g, 'u')
            .replace(/ß/g, 'ss')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        return `${dateStr}-${slug}@${domain}`;
    }
    /**
     * Generate ICS file content from holidays
     */
    static async generateIcsContent(
        holidays: Holiday[],
        config: CalendarConfig
    ): Promise<string> {
        const events: EventAttributes[] = holidays
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((holiday) => ({
                start: this.dateToDateArray(holiday.date),
                title: holiday.title,
                description: holiday.description,
                busyStatus: 'FREE',
                transp: 'TRANSPARENT',
                productId: config.productId,
                calName: config.calendarName,
                duration: {days: 1},
                uid: this.generateUid(holiday.date, `${holiday.title}-${config.country}`, "public-holidays.github.io"),
            }));

        const {error, value} = createEvents(events);

        if (error) {
            throw new Error(`Failed to generate ICS: ${error}`);
        }

        return value || '';
    }

    /**
     * Generate ICS file content from school holiday periods
     */
    static async generateSchoolHolidayIcsContent(
        periods: Array<{ startDate: Date; endDate: Date; title: string; description?: string }>,
        config: CalendarConfig
    ): Promise<string> {
        const events: EventAttributes[] = periods
            .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
            .map((period) => {
                const start = this.dateToDateArray(period.startDate);
                const end = this.dateToDateArray(period.endDate);

                // For multi-day events, add 1 day to end date (ICS format)
                const endWithOffset = new Date(period.endDate);
                endWithOffset.setDate(endWithOffset.getDate() + 1);

                return {
                    start,
                    end: this.dateToDateArray(endWithOffset),
                    title: period.title,
                    description: period.description,
                    busyStatus: 'FREE',
                    transp: 'TRANSPARENT',
                    productId: config.productId,
                    calName: config.calendarName,
                    uid: this.generateUid(period.startDate, `${period.title}-${config.country}`, "public-holidays.github.io"),
                };
            });

        const {error, value} = createEvents(events);

        if (error) {
            throw new Error(`Failed to generate ICS: ${error}`);
        }

        return value || '';
    }

    /**
     * Generate and save ICS file
     */
    static async generateAndSaveIcs(
        holidays: Holiday[],
        config: CalendarConfig,
        outputPath: string
    ): Promise<void> {
        const icsContent = await this.generateIcsContent(holidays, config);

        // Ensure directory exists
        await mkdir(dirname(outputPath), {recursive: true});

        // Write file
        await writeFile(outputPath, icsContent, 'utf-8');

        console.log(`✓ Generated: ${outputPath}`);
    }

    /**
     * Generate multi-year rolling calendar
     */
    static async generateRollingCalendar(
        definitions: HolidayDefinition[],
        config: CalendarConfig,
        outputPath: string,
        startYear: number,
        endYear: number
    ): Promise<void> {
        const allHolidays: Holiday[] = [];

        for (let year = startYear; year <= endYear; year++) {
            const yearHolidays = this.generateHolidaysForYear(definitions, year, 'Deutschland');
            allHolidays.push(...yearHolidays);
        }

        await this.generateAndSaveIcs(allHolidays, config, outputPath);
    }
}
