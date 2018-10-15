export interface dayOfTheMonth {
    day: number;
    dayOfTheWeek: number;
    month: number;
    date: Date;
}
export declare class DateService {
    private months;
    constructor();
    private addLeadingZero(value);
    formatMobileYYYYMMDD(date: Date): string;
    formatMobileYYYYMMDDTHHMM(date: Date): string;
    formatMMDDYYYY(date: Date): string;
    formatMMDDYYYY_HHMM_AMPM(date: Date): string;
    formatHHMM_AMPM(hour: number, minute: number): string;
    getCurrentMonthDays(month: number, year: number): dayOfTheMonth[];
    getDateList(Month: number, Year: number): dayOfTheMonth[];
    getPreviousMonthDays(Month: number, Year: number): dayOfTheMonth[];
    getNextMonthDays(Month: number, Year: number): dayOfTheMonth[];
    getMonths(): string[];
    getMonthText(date: Date): string;
    getAvailableYears(): number[];
    canSelectYear(year: number, min: string, max: string): boolean;
    canSelectMonth(month: number, year: number, min: string, max: string): boolean;
    canSelectDay(day: number, month: number, year: number, min: string, max: string): boolean;
}
