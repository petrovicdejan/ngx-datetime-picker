import { OnInit, EventEmitter } from '@angular/core';
export declare class TimeComponent implements OnInit {
    selectedHour: number;
    selectedHourChange: EventEmitter<number>;
    selectedMinute: number;
    selectedMinuteChange: EventEmitter<number>;
    selectedClock: string;
    hours: string[];
    minutes: string[];
    minutesOpen: boolean;
    hoursOpen: boolean;
    readonly formatSelectedMinute: string;
    readonly formatSelectedHour: string;
    ngOnInit(): void;
    selectHourChange(hour: number): void;
    selectMinuteChange(minute: number): void;
    selectClockChange(clock: string): void;
    toggleHourMenu(): void;
    toggleMinuteMenu(): void;
}
