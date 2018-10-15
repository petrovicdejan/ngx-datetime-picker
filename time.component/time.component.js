"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TimeComponent = (function () {
    function TimeComponent() {
        this.selectedHourChange = new core_1.EventEmitter();
        this.selectedMinuteChange = new core_1.EventEmitter();
        this.hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        this.minutes = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
    }
    Object.defineProperty(TimeComponent.prototype, "formatSelectedMinute", {
        get: function () {
            return (this.selectedMinute <= 9 ? '0' + this.selectedMinute : this.selectedMinute);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "formatSelectedHour", {
        get: function () {
            if (this.selectedHour == 12 || this.selectedHour == 0) {
                return '12';
            }
            return (this.selectedHour > 12 ? this.selectedHour - 12 : this.selectedHour);
        },
        enumerable: true,
        configurable: true
    });
    TimeComponent.prototype.ngOnInit = function () {
        if (!this.selectedHour) {
            this.selectedHour = 12;
        }
        if (!this.selectedMinute) {
            this.selectedMinute = 0;
        }
        if (this.selectedHour >= 12) {
            this.selectedClock = 'pm';
        }
    };
    TimeComponent.prototype.selectHourChange = function (hour) {
        hour = this.selectedClock == 'pm' ? parseInt(hour) + 12 : hour;
        this.selectedHourChange.emit(hour);
        this.selectedHour = hour;
        //if there isnt' a minute selected defautl to 0
        if (this.selectedMinute == null) {
            this.selectMinuteChange(0);
        }
        this.minutesOpen = false;
        this.hoursOpen = false;
    };
    TimeComponent.prototype.selectMinuteChange = function (minute) {
        this.selectedMinuteChange.emit(minute);
        this.selectedMinute = minute;
        this.minutesOpen = false;
        this.hoursOpen = false;
    };
    TimeComponent.prototype.selectClockChange = function (clock) {
        if (this.selectedClock != clock) {
            this.selectedClock = clock;
            var hour = 0;
            hour = this.selectedClock == 'pm' ? parseInt(this.selectedHour) + 12 : this.selectedHour - 12;
            this.selectedHour = hour;
            this.selectedHourChange.emit(hour);
        }
    };
    TimeComponent.prototype.toggleHourMenu = function () {
        this.minutesOpen = false;
        this.hoursOpen = !this.hoursOpen;
    };
    TimeComponent.prototype.toggleMinuteMenu = function () {
        this.hoursOpen = false;
        this.minutesOpen = !this.minutesOpen;
    };
    TimeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ngx-time',
                    template: "<div class=\"time-picker\"> <button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__hour\" (click)=\"toggleHourMenu()\">{{ formatSelectedHour }}</button> <button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__minute\" (click)=\"toggleMinuteMenu()\">{{ formatSelectedMinute }}</button> <div class=\"time--periods\"> <button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__am\" (click)=\"selectClockChange('am')\" [class.ngx-picker--btn__selected]=\"selectedHour < 12\">AM</button> <button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__pm\" (click)=\"selectClockChange('pm')\" [class.ngx-picker--btn__selected]=\"selectedHour >= 12\">PM</button> </div> <div class=\"time--selection__hours\" [hidden]=\"!hoursOpen\"> <div class=\"time--values\"> <div class=\"time--value\" [class.time--value__selected]=\"selectedHour == hour\" (click)=\"selectHourChange(hour)\" *ngFor=\"let hour of hours\">{{ hour }}</div> </div> </div> <div class=\"time--selection__minutes\" [hidden]=\"!minutesOpen\"> <div class=\"time--values\"> <div class=\"time--value\" [class.time--value__selected]=\"selectedMinute == minute\" (click)=\"selectMinuteChange(minute)\" *ngFor=\"let minute of minutes\">{{ minute }}</div> </div> </div> </div> ",
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    TimeComponent.ctorParameters = function () { return []; };
    TimeComponent.propDecorators = {
        'selectedHour': [{ type: core_1.Input },],
        'selectedHourChange': [{ type: core_1.Output },],
        'selectedMinute': [{ type: core_1.Input },],
        'selectedMinuteChange': [{ type: core_1.Output },],
    };
    return TimeComponent;
}());
exports.TimeComponent = TimeComponent;
