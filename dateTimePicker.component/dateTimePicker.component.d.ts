import { OnInit, EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IsMobileService } from '../services/isMobile.service';
import { DateService } from '../services/date.service';
export declare class DateTimePickerComponent implements OnInit, ControlValueAccessor {
    private isMobileService;
    dateService: DateService;
    private eRef;
    selectedDateTime: Date;
    placeholder: string;
    disableInput: boolean;
    disableButton: boolean;
    disablePicker: boolean;
    selectedDateTimeChange: EventEmitter<Date>;
    offClick(event: any): void;
    pickerVisible: boolean;
    isMobile: boolean;
    invalid: boolean;
    readonly formattedDate: string;
    readonly mobileFormattedDate: string;
    constructor(isMobileService: IsMobileService, dateService: DateService, eRef: ElementRef);
    writeValue(value: Date): void;
    registerOnChange(handler: any): void;
    registerOnTouched(): void;
    setDateTime(dateTime: string): void;
    ngOnInit(): void;
    newDatePicked(date: Date): void;
    closePicker(close: boolean): void;
}
