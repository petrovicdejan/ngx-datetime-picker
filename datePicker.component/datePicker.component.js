"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var isMobile_service_1 = require("../services/isMobile.service");
var date_service_1 = require("../services/date.service");
var DatePickerComponent = (function () {
    function DatePickerComponent(isMobileService, dateService, eRef, renderer) {
        this.isMobileService = isMobileService;
        this.dateService = dateService;
        this.eRef = eRef;
        this.renderer = renderer;
        this.disableInput = false;
        this.disableButton = false;
        this.disablePicker = false;
        this.selectedDateChange = new core_1.EventEmitter();
        this.pickerVisible = false;
        this.isMobile = isMobileService.isMobile;
        this.placeholder = this.placeholder || '';
    }
    DatePickerComponent.prototype.offClick = function (event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.pickerVisible = false;
        }
    };
    Object.defineProperty(DatePickerComponent.prototype, "formattedDate", {
        get: function () {
            return this.dateService.formatMMDDYYYY(this.selectedDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "mobileFormattedDate", {
        get: function () {
            return this.dateService.formatMobileYYYYMMDD(this.selectedDate);
        },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype.writeValue = function (value) {
        this.selectedDate = value;
    };
    DatePickerComponent.prototype.registerOnChange = function (handler) {
        this.selectedDateChange.subscribe(handler);
    };
    DatePickerComponent.prototype.registerOnTouched = function () { };
    // for use with the native html5 element. only emit's new valid dates.
    DatePickerComponent.prototype.setDate = function (date) {
        var isValid = !!Date.parse(date + " 00:00:00");
        if (isValid) {
            // set the time to zero so that values emitted on mobile are the same as on desktop
            this.selectedDate = new Date(date + " 00:00:00");
            this.selectedDateChange.emit(this.selectedDate);
            this.invalid = false;
        }
        else {
            this.invalid = true;
        }
    };
    DatePickerComponent.prototype.ngOnInit = function () {
        if (typeof this.selectedDate == 'string') {
            this.selectedDate = new Date(this.selectedDate);
        }
    };
    DatePickerComponent.prototype.newDatePicked = function (date) {
        this.selectedDateChange.emit(date);
        this.selectedDate = date;
    };
    DatePickerComponent.prototype.closePicker = function (close) {
        this.pickerVisible = close;
    };
    DatePickerComponent.prototype.focus = function () {
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus', []);
    };
    DatePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ngx-date-picker',
                    template: "<div [ngSwitch]=\"isMobile\" [class.invalid]=\"invalid\"> <div *ngSwitchCase=\"true\"> <input type=\"date\" #input [disabled]=\"disableInput || disablePicker\" [placeholder]=\"placeholder\" [value]=\"mobileFormattedDate\" (change)=\"setDate($event.target.value)\" [tabindex]=\"inputTabIndex\" [min]=\"min\" [max]=\"max\" /> </div> <div *ngSwitchDefault> <div class=\"ngx-picker\"> <input type=\"text\" #input [disabled]=\"disableInput || disablePicker\" [placeholder]=\"placeholder\" (click)=\"pickerVisible = !pickerVisible\" [value]=\"formattedDate\" (change)=\"setDate($event.target.value)\" [tabindex]=\"inputTabIndex\" /> <button type=\"button\" class=\"btn btn-outline-secondary\" [disabled]=\"disableButton || disablePicker\" (click)=\"pickerVisible = !pickerVisible\"> <span class='oi oi-calendar'></span><span class='oi oi-chevron-bottom'></span></button> <ngx-date *ngIf=\"pickerVisible\" (closeDatePicker)=\"closePicker($event)\" (selectedDateChange)=\"newDatePicked($event)\" [selectedDate]=\"selectedDate\" [min]=\"min\" [max]=\"max\"> </ngx-date> </div> </div> </div> ",
                    encapsulation: core_1.ViewEncapsulation.None,
                    providers: [
                        {
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return DatePickerComponent; }),
                            multi: true,
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return [
        { type: isMobile_service_1.IsMobileService, },
        { type: date_service_1.DateService, },
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ]; };
    DatePickerComponent.propDecorators = {
        'selectedDate': [{ type: core_1.Input },],
        'min': [{ type: core_1.Input },],
        'max': [{ type: core_1.Input },],
        'placeholder': [{ type: core_1.Input },],
        'inputTabIndex': [{ type: core_1.Input },],
        'disableInput': [{ type: core_1.Input },],
        'disableButton': [{ type: core_1.Input },],
        'disablePicker': [{ type: core_1.Input },],
        'selectedDateChange': [{ type: core_1.Output },],
        'input': [{ type: core_1.ViewChild, args: ['input',] },],
        'offClick': [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return DatePickerComponent;
}());
exports.DatePickerComponent = DatePickerComponent;
