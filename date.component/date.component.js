"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var date_service_1 = require("../services/date.service");
var DateComponent = (function () {
    function DateComponent(dateService) {
        this.dateService = dateService;
        this.selectedDateChange = new core_1.EventEmitter();
        this.closeDatePicker = new core_1.EventEmitter();
        this.showMonthSelection = false;
        this.showYearSelection = false;
    }
    Object.defineProperty(DateComponent.prototype, "selectedMonth", {
        get: function () {
            if (this.selectedDate == null) {
                return new Date().getMonth() + 1;
            }
            return this.selectedDate.getMonth() + 1;
        },
        set: function (month) {
            var newDate = new Date(this.selectedDate);
            if (month == null) {
                month = new Date().getMonth();
            }
            newDate.setMonth(month - 1);
            this.loadCalendarMonth(newDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateComponent.prototype, "selectedDay", {
        get: function () {
            if (this.selectedDate == null) {
                return new Date().getDate();
            }
            return this.selectedDate.getDate();
        },
        set: function (day) {
            var newDate = new Date(this.selectedDate);
            newDate.setDate(day);
            this.loadCalendarMonth(newDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateComponent.prototype, "selectedYear", {
        get: function () {
            if (this.selectedDate == null) {
                return new Date().getFullYear();
            }
            return this.selectedDate.getFullYear();
        },
        set: function (year) {
            var newDate = new Date(this.selectedDate);
            newDate.setFullYear(year);
            this.loadCalendarMonth(newDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateComponent.prototype, "selectedMonthText", {
        get: function () {
            return this.dateService.getMonthText(this.selectedDate);
        },
        enumerable: true,
        configurable: true
    });
    DateComponent.prototype.setSelectedDate = function (date, hour, minutes) {
        if (this.includeTime && !!date && !!this.selectedDate) {
            date.setHours(this.selectedDate.getHours(), this.selectedDate.getMinutes());
        }
        if (!date) {
            date = new Date();
        }
        if (this.min && date < new Date(this.min)) {
            date = new Date(this.min);
        }
        if (this.max && date > new Date(this.max)) {
            date = new Date(this.max);
        }
        //load calendarMonth will set the selected date;
        this.loadCalendarMonth(date);
        if (hour != null) {
            this.selectedDate.setHours(hour);
        }
        if (minutes != null) {
            this.selectedDate.setMinutes(minutes);
        }
        this.selectedDateChange.emit(this.selectedDate);
        this.highlightedDate = this.selectedDate;
        this.selectedHour = date.getHours();
        this.selectedMinute = date.getMinutes();
        this.closePicker();
    };
    DateComponent.prototype.loadCalendarMonth = function (date) {
        if (date == null) {
            date = new Date();
        }
        var shouldReloadCalendar = (this.selectedMonth != (date.getMonth() + 1) || this.selectedYear != date.getFullYear());
        this.selectedDate = date;
        if (shouldReloadCalendar) {
            this.availableDays = this.dateService.getDateList(this.selectedMonth, this.selectedYear).slice();
        }
    };
    DateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.months = this.dateService.getMonths();
        this.years = this.dateService.getAvailableYears();
        // subscribing to it's own event emitter to set the selected year position
        this.selectedDateChange.subscribe(function (date) {
            _this.scrollToMonth();
            _this.scrollToYear();
        });
        //If no date is selected then default to today's date.
        if (!this.selectedDate) {
            if (this.min && new Date(this.min) > new Date()) {
                this.selectedDate = new Date(this.min);
            }
            else if (this.max && new Date(this.max) < new Date()) {
                this.selectedDate = new Date(this.max);
            }
            else {
                this.selectedDate = new Date();
            }
        }
        if (typeof this.selectedDate == 'string') {
            this.selectedDate = new Date(this.selectedDate);
        }
        if (this.includeTime) {
            this.selectedHour = this.selectedDate.getHours();
        }
        if (this.includeTime) {
            this.selectedMinute = this.selectedDate.getMinutes();
        }
        this.highlightedDate = this.selectedDate;
        this.availableDays = this.dateService.getDateList(this.selectedMonth, this.selectedYear).slice();
    };
    DateComponent.prototype.canSelectYear = function (year) {
        return this.dateService.canSelectYear(year, this.min, this.max);
    };
    DateComponent.prototype.canSelectMonth = function (month) {
        return this.dateService.canSelectMonth(month, this.selectedYear, this.min, this.max);
    };
    DateComponent.prototype.canSelectDay = function (day, month) {
        return this.dateService.canSelectDay(day, month, this.selectedYear, this.min, this.max);
    };
    DateComponent.prototype.scrollToYear = function () {
        var _this = this;
        // setTime out is being used since I need this code to excute next, if not the change won't be visible until the second click
        setTimeout(function () {
            if (_this.yearSelect && _this.yearSelect.nativeElement) {
                var selectContainer = _this.yearSelect.nativeElement;
                var selectedYear = selectContainer.querySelector('.calendar--year__selected');
                selectContainer.scrollTop = selectedYear.offsetTop - (selectContainer.clientHeight / 2) - (selectedYear.clientHeight);
            }
        });
    };
    DateComponent.prototype.scrollToMonth = function () {
        var _this = this;
        // setTime out is being used since I need this code to excute next, if not the change won't be visible until the second click
        setTimeout(function () {
            if (_this.monthSelect && _this.monthSelect.nativeElement) {
                var selectContainer = _this.monthSelect.nativeElement;
                var selectedMonth = selectContainer.querySelector('.calendar--month__selected');
                selectContainer.scrollTop = selectedMonth.offsetTop - (selectContainer.clientHeight / 2) - (selectedMonth.clientHeight);
            }
        });
    };
    DateComponent.prototype.previousMonth = function () {
        var previousMonth = new Date(this.selectedDate);
        //because javascript sets months based on a 0 index need to jump back 2 to go to the previous month.
        previousMonth.setMonth(this.selectedMonth - 2);
        this.loadCalendarMonth(previousMonth);
    };
    DateComponent.prototype.nextMonth = function () {
        var nextMonth = new Date(this.selectedDate);
        /// same as above but since selected month is 1-12 the index is already the next month.
        nextMonth.setMonth(this.selectedMonth);
        this.loadCalendarMonth(nextMonth);
    };
    DateComponent.prototype.toggleMonthMenu = function () {
        this.scrollToMonth();
        this.showMonthSelection = !this.showMonthSelection;
    };
    DateComponent.prototype.toggleYearMenu = function () {
        this.scrollToYear();
        this.showYearSelection = !this.showYearSelection;
    };
    DateComponent.prototype.closePicker = function () {
        this.closeDatePicker.emit(false);
    };
    DateComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ngx-date',
                    template: "<div class=\"calendar\" style=\"left:-220px;\"> <button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__month\" (click)=\"toggleMonthMenu(); showYearSelection = false\">{{ selectedMonthText }}</button> <button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__year\" (click)=\"toggleYearMenu(); showMonthSelection = false\">{{ selectedYear }}</button> <span class=\"calendar--previous-and-next\"> <button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__previous\" (click)=\"previousMonth()\">&lt;</button> <button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__next\" (click)=\"nextMonth()\" >&gt;</button> </span> <div class=\"calendar--months-select\" #monthSelect [hidden]=\"!showMonthSelection\"> <span class=\"calendar--month\" [class.calendar--month__selected]=\"i+ 1 == selectedMonth\" [class.calendar--month__disabled]=\"!canSelectMonth(i)\" (click)=\"selectedMonth = i+ 1; showMonthSelection = false;\" *ngFor=\"let month of months; let i = index ;\">{{ month }}</span> </div> <div class=\"calendar--years-select\" #yearSelect [hidden]=\"!showYearSelection\"> <span class=\"calendar--year\" [class.calendar--year__selected]=\"selectedYear == year\" [class.calendar--year__disabled]=\"!canSelectYear(year)\" (click)=\"selectedYear = year; showMonthSelection = true; showYearSelection = false;\" *ngFor=\"let year of years\"> {{ year }} </span> </div> <div class=\"calendar--days-and-weeks\" *ngIf=\"showMonthSelection == false && showYearSelection == false\"> <div class=\"calendar--days-of-week\"> <span class=\"calendar--day-of-week\">Su</span> <span class=\"calendar--day-of-week\">Mo</span> <span class=\"calendar--day-of-week\">Tu</span> <span class=\"calendar--day-of-week\">We</span> <span class=\"calendar--day-of-week\">Th</span> <span class=\"calendar--day-of-week\">Fr</span> <span class=\"calendar--day-of-week\">Sa</span> </div> <div class=\"calendar--days-select\"> <span class=\"calendar--day\" [class.calendar--day__muted]=\"day.month != selectedMonth\" [class.calendar--day__selected]=\"day.date.getDate() == highlightedDate?.getDate() && day.date.getFullYear() == highlightedDate?.getFullYear() && day.date.getMonth() == highlightedDate?.getMonth() \" [class.calendar--day__disabled]=\"!canSelectDay(day.day, day.date.getMonth())\" (click)=\"setSelectedDate(day.date)\" *ngFor=\"let day of availableDays\"> {{ day.day}} </span> </div> </div> <ngx-time *ngIf=\"includeTime\" [selectedHour]=\"selectedHour\" [selectedMinute]=\"selectedMinute\" (selectedHourChange)=\"setSelectedDate(highlightedDate,$event)\" (selectedMinuteChange)=\"setSelectedDate(highlightedDate,null,$event)\" ></ngx-time> <div class=\"calendar--footer\"> <button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__now\" (click)=\"setSelectedDate(null); showMonthSelection = false; showYearSelection = false\">Now</button> <button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__close\" (click)=\"closePicker()\">Close</button> </div> </div> ",
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    DateComponent.ctorParameters = function () { return [
        { type: date_service_1.DateService, },
    ]; };
    DateComponent.propDecorators = {
        'selectedDate': [{ type: core_1.Input },],
        'includeTime': [{ type: core_1.Input },],
        'min': [{ type: core_1.Input },],
        'max': [{ type: core_1.Input },],
        'selectedDateChange': [{ type: core_1.Output },],
        'closeDatePicker': [{ type: core_1.Output },],
        'yearSelect': [{ type: core_1.ViewChild, args: ['yearSelect',] },],
        'monthSelect': [{ type: core_1.ViewChild, args: ['monthSelect',] },],
    };
    return DateComponent;
}());
exports.DateComponent = DateComponent;
