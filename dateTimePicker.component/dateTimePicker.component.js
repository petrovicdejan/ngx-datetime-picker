"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var isMobile_service_1 = require("../services/isMobile.service");
var date_service_1 = require("../services/date.service");
var DateTimePickerComponent = (function () {
    function DateTimePickerComponent(isMobileService, dateService, eRef) {
        this.isMobileService = isMobileService;
        this.dateService = dateService;
        this.eRef = eRef;
        this.disableInput = false;
        this.disableButton = false;
        this.disablePicker = false;
        this.selectedDateTimeChange = new core_1.EventEmitter();
        this.pickerVisible = false;
        this.isMobile = isMobileService.isMobile;
        this.placeholder = this.placeholder || '';
    }
    DateTimePickerComponent.prototype.offClick = function (event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.pickerVisible = false;
        }
    };
    Object.defineProperty(DateTimePickerComponent.prototype, "formattedDate", {
        get: function () {
            return this.dateService.formatMMDDYYYY_HHMM_AMPM(this.selectedDateTime);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "mobileFormattedDate", {
        get: function () {
            return this.dateService.formatMobileYYYYMMDDTHHMM(this.selectedDateTime);
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerComponent.prototype.writeValue = function (value) {
        this.selectedDateTime = value;
    };
    DateTimePickerComponent.prototype.registerOnChange = function (handler) {
        this.selectedDateTimeChange.subscribe(handler);
    };
    DateTimePickerComponent.prototype.registerOnTouched = function () { };
    DateTimePickerComponent.prototype.setDateTime = function (dateTime) {
        var isValid = !!Date.parse(dateTime);
        if (isValid) {
            this.selectedDateTime = new Date(dateTime);
            this.selectedDateTimeChange.emit(this.selectedDateTime);
            this.invalid = false;
        }
        else {
            this.invalid = true;
        }
    };
    DateTimePickerComponent.prototype.ngOnInit = function () {
        if (typeof this.selectedDateTime == 'string') {
            this.selectedDateTime = new Date(this.selectedDateTime);
        }
    };
    DateTimePickerComponent.prototype.newDatePicked = function (date) {
        this.selectedDateTimeChange.emit(date);
        this.selectedDateTime = date;
    };
    DateTimePickerComponent.prototype.closePicker = function (close) {
        this.pickerVisible = close;
    };
    DateTimePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ngx-datetime-picker',
                    template: "<div [ngSwitch]=\"isMobile\" [class.invalid]=\"invalid\"> <div *ngSwitchCase=\"true\"> <input type=\"datetime-local\" [disabled]=\"disableInput || disablePicker\" [placeholder]=\"placeholder\" [value]=\"mobileFormattedDate\" (change)=\"setDateTime($event.target.value)\" /> </div> <div *ngSwitchDefault> <div class=\"ngx-picker\"> <input type=\"text\" [disabled]=\"disableInput || disablePicker\" [placeholder]=\"placeholder\" (click)=\"pickerVisible = !pickerVisible\" [value]=\"formattedDate\" (change)=\"setDateTime($event.target.value)\" /> <button type=\"button\" [disabled]=\"disableButton || disablePicker\" (click)=\"pickerVisible = !pickerVisible\"> <span class='oi oi-calendar'></span><span class='oi oi-chevron-bottom'></span> </button> <ngx-date [hidden]=\"!pickerVisible\" includeTime=\"true\" (closeDatePicker)=\"closePicker($event)\" (selectedDateChange)=\"newDatePicked($event)\" [selectedDate]=\"selectedDateTime\"> </ngx-date> </div> </div> </div> ",
                    encapsulation: core_1.ViewEncapsulation.None,
                    providers: [
                        {
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return DateTimePickerComponent; }),
                            multi: true,
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    DateTimePickerComponent.ctorParameters = function () { return [
        { type: isMobile_service_1.IsMobileService, },
        { type: date_service_1.DateService, },
        { type: core_1.ElementRef, },
    ]; };
    DateTimePickerComponent.propDecorators = {
        'selectedDateTime': [{ type: core_1.Input },],
        'placeholder': [{ type: core_1.Input },],
        'disableInput': [{ type: core_1.Input },],
        'disableButton': [{ type: core_1.Input },],
        'disablePicker': [{ type: core_1.Input },],
        'selectedDateTimeChange': [{ type: core_1.Output },],
        'offClick': [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return DateTimePickerComponent;
}());
exports.DateTimePickerComponent = DateTimePickerComponent;
