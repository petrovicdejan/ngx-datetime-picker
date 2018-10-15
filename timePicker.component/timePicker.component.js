"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var isMobile_service_1 = require("../services/isMobile.service");
var date_service_1 = require("../services/date.service");
var TimePickerComponent = (function () {
    function TimePickerComponent(isMobileService, dateService, eRef) {
        this.isMobileService = isMobileService;
        this.dateService = dateService;
        this.eRef = eRef;
        this.disableInput = false;
        this.disableButton = false;
        this.disablePicker = false;
        this.selectedTimeChange = new core_1.EventEmitter();
        this.pickerVisible = false;
        this.isMobile = isMobileService.isMobile;
        this.placeholder = this.placeholder || '';
    }
    TimePickerComponent.prototype.offClick = function (event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.pickerVisible = false;
        }
    };
    Object.defineProperty(TimePickerComponent.prototype, "formattedTime", {
        get: function () {
            if (this.selectedTime == null) {
                return '';
            }
            this.selectedHour = parseInt(this.selectedTime.split(':')[0]);
            this.selectedMinute = parseInt(this.selectedTime.split(':')[1]);
            return this.dateService.formatHHMM_AMPM(this.selectedHour, this.selectedMinute);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "mobileFormattedTime", {
        get: function () {
            if (this.selectedTime == null) {
                return '';
            }
            this.selectedHour = parseInt(this.selectedTime.split(':')[0]);
            this.selectedMinute = parseInt(this.selectedTime.split(':')[1]);
            return (this.selectedHour < 10 ? '0' + this.selectedHour : this.selectedHour) + ":" + (this.selectedMinute < 10 ? '0' + this.selectedMinute : this.selectedMinute);
        },
        set: function (value) {
            var hour = value.split(':')[0];
            var minute = value.split(':')[1];
            if (parseInt(hour)) {
                this.selectedHour = parseInt(hour);
            }
            else {
                this.selectedHour = 0;
            }
            if (parseInt(minute)) {
                this.selectedMinute = parseInt(minute);
            }
            else {
                this.selectedMinute = 0;
            }
            this.selectedTime = hour + ":" + minute + " " + (parseInt(hour) > 11 ? 'am' : 'pm');
        },
        enumerable: true,
        configurable: true
    });
    TimePickerComponent.prototype.writeValue = function (value) {
        this.selectedTime = value;
    };
    TimePickerComponent.prototype.registerOnChange = function (handler) {
        this.selectedTimeChange.subscribe(handler);
    };
    TimePickerComponent.prototype.registerOnTouched = function () { };
    TimePickerComponent.prototype.setMobileFormattedTime = function (time) {
        this.selectedTimeChange.emit(time);
        this.selectedTime = time;
    };
    TimePickerComponent.prototype.setFormattedTime = function (formattedTime) {
        this.selectedTime = formattedTime;
        this.selectedTimeChange.emit(formattedTime);
    };
    TimePickerComponent.prototype.setTimeToNow = function () {
        var now = new Date();
        this.selectedTime = now.getHours() + ":" + now.getMinutes() + " " + (now.getHours() > 11 ? 'am' : 'pm');
        this.selectedTimeChange.emit(this.selectedTime);
        this.selectedHour = now.getHours();
        this.selectedMinute = now.getMinutes();
    };
    TimePickerComponent.prototype.setHourNow = function (hour) {
        if (this.selectedTime == null || this.selectedTime === '') {
            this.selectedTime = hour + ":00 " + (hour > 11 ? 'am' : 'pm');
        }
        else {
            var prevMinute = parseInt(this.selectedTime.split(':')[1]);
            this.selectedTime = hour + ":" + prevMinute + " " + (hour > 11 ? 'am' : 'pm');
        }
        this.selectedTimeChange.emit(this.selectedTime);
    };
    TimePickerComponent.prototype.setMinuteNow = function (minute) {
        if (this.selectedTime == null || this.selectedTime === '') {
            this.selectedTime = "00:" + minute + " am";
        }
        else {
            var prevHour = parseInt(this.selectedTime.split(':')[0]);
            this.selectedTime = prevHour + ":" + minute + " " + (prevHour > 11 ? 'am' : 'pm');
        }
        this.selectedTimeChange.emit(this.selectedTime);
    };
    TimePickerComponent.prototype.closePicker = function () {
        this.pickerVisible = false;
    };
    TimePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ngx-time-picker',
                    template: "<div [ngSwitch]=\"isMobile\"> <div *ngSwitchCase=\"true\"> <input type=\"time\" [disabled]=\"disableInput || disablePicker\" [placeholder]=\"placeholder\" [value]=\"mobileFormattedTime\" (change)=\"setMobileFormattedTime($event.target.value)\" /> </div> <div *ngSwitchDefault> <div class=\"ngx-picker\"> <input type=\"text\" [disabled]=\"disableInput || disablePicker\" [placeholder]=\"placeholder\" [value]=\"formattedTime\" (change)=\"setFormattedTime($event.target.value)\" (click)=\"pickerVisible = !pickerVisible\" /> <button type=\"button\" [disabled]=\"disableButton || disablePicker\" (click)=\"pickerVisible = !pickerVisible\"> <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\"  width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\" /> </svg> </button> <div class=\"calendar\" [hidden]=\"!pickerVisible\"> <ngx-time [selectedHour]=\"selectedHour\" [selectedMinute]=\"selectedMinute\" (selectedHourChange)=\"setHourNow($event)\" (selectedMinuteChange)=\"setMinuteNow($event)\"></ngx-time> <div class=\"calendar--footer\"> <button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__now\" (click)=\"setTimeToNow()\">Now</button> <button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__close\" (click)=\"closePicker()\">Close</button> </div> </div> </div> </div> </div> ",
                    encapsulation: core_1.ViewEncapsulation.None,
                    providers: [
                        {
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return TimePickerComponent; }),
                            multi: true,
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    TimePickerComponent.ctorParameters = function () { return [
        { type: isMobile_service_1.IsMobileService, },
        { type: date_service_1.DateService, },
        { type: core_1.ElementRef, },
    ]; };
    TimePickerComponent.propDecorators = {
        'selectedTime': [{ type: core_1.Input },],
        'placeholder': [{ type: core_1.Input },],
        'disableInput': [{ type: core_1.Input },],
        'disableButton': [{ type: core_1.Input },],
        'disablePicker': [{ type: core_1.Input },],
        'selectedTimeChange': [{ type: core_1.Output },],
        'offClick': [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return TimePickerComponent;
}());
exports.TimePickerComponent = TimePickerComponent;
