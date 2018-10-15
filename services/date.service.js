"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DateService = (function () {
    function DateService() {
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }
    DateService.prototype.addLeadingZero = function (value) {
        if (value < 10) {
            return "0" + value.toString();
        }
        return value.toString();
    };
    DateService.prototype.formatMobileYYYYMMDD = function (date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        return date.getFullYear() + "-" + this.addLeadingZero(date.getMonth() + 1) + "-" + this.addLeadingZero(date.getDate());
    };
    DateService.prototype.formatMobileYYYYMMDDTHHMM = function (date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        return this.formatMobileYYYYMMDD(date) + "T" + this.addLeadingZero(date.getHours()) + ":" + this.addLeadingZero(date.getMinutes());
    };
    DateService.prototype.formatMMDDYYYY = function (date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    };
    DateService.prototype.formatMMDDYYYY_HHMM_AMPM = function (date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        var hours = date.getHours();
        var minutes = date.getMinutes();
        return this.formatMMDDYYYY(date) + " " + this.formatHHMM_AMPM(hours, minutes);
    };
    DateService.prototype.formatHHMM_AMPM = function (hour, minute) {
        if (hour == null || minute == null) {
            return '';
        }
        var formattedMinute = (!minute ? '00' : (minute <= 9 ? "0" + minute : minute));
        if (hour > 12) {
            return hour - 12 + ":" + formattedMinute + " pm";
        }
        if (hour == 12) {
            return "12:" + formattedMinute + " pm";
        }
        if (hour == 0) {
            return "12:" + formattedMinute + " am";
        }
        return hour + ":" + formattedMinute + " am";
    };
    DateService.prototype.getCurrentMonthDays = function (month, year) {
        var dayOfTheMonth = new Date(year, month - 1, 1);
        var nextMonth = new Date(year, month - 1, 1);
        var returnedDays = [];
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        while (dayOfTheMonth.getMonth() != nextMonth.getMonth()) {
            var dayToAdd = {
                day: dayOfTheMonth.getDate(),
                dayOfTheWeek: dayOfTheMonth.getDay(),
                month: dayOfTheMonth.getMonth() + 1,
                date: new Date((dayOfTheMonth.getMonth() + 1) + '/' + dayOfTheMonth.getDate() + '/' + dayOfTheMonth.getFullYear())
            };
            returnedDays.push(dayToAdd);
            dayOfTheMonth.setDate(dayOfTheMonth.getDate() + 1);
        }
        return returnedDays;
    };
    DateService.prototype.getDateList = function (Month, Year) {
        return this.getPreviousMonthDays(Month, Year).concat(this.getCurrentMonthDays(Month, Year), this.getNextMonthDays(Month, Year));
    };
    DateService.prototype.getPreviousMonthDays = function (Month, Year) {
        var day = new Date(Month + '/1/' + Year);
        var returnedDays = [];
        var dayOfTheWeek = day.getDay();
        while (dayOfTheWeek != 0) {
            day.setDate(day.getDate() - 1);
            returnedDays = [{
                    day: day.getDate(),
                    dayOfTheWeek: day.getDay(),
                    month: day.getMonth() + 1,
                    date: new Date((day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear())
                }].concat(returnedDays);
            dayOfTheWeek = day.getDay();
        }
        return returnedDays;
    };
    DateService.prototype.getNextMonthDays = function (Month, Year) {
        var day = new Date(Month + '/1/' + Year);
        day.setMonth(day.getMonth() + 1);
        day.setDate(day.getDate() - 1);
        var returnedDays = [];
        var dayOfTheWeek = day.getDay();
        while (dayOfTheWeek != 6) {
            day.setDate(day.getDate() + 1);
            returnedDays = returnedDays.concat([{
                    day: day.getDate(),
                    dayOfTheWeek: day.getDay(),
                    month: day.getMonth() + 1,
                    date: new Date((day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear())
                }]);
            dayOfTheWeek = day.getDay();
        }
        return returnedDays;
    };
    DateService.prototype.getMonths = function () {
        return this.months;
    };
    DateService.prototype.getMonthText = function (date) {
        if (date == null) {
            date = new Date();
        }
        return this.months[date.getMonth()];
    };
    DateService.prototype.getAvailableYears = function () {
        var currentYear = new Date().getFullYear();
        var startYear = currentYear - 80;
        var returnYears = [];
        while (startYear <= (currentYear + 5)) {
            returnYears.push(startYear);
            startYear = startYear + 1;
        }
        return returnYears;
    };
    DateService.prototype.canSelectYear = function (year, min, max) {
        if (!min && !max) {
            return true;
        }
        if (min && year < new Date(min).getFullYear()) {
            return false;
        }
        if (max && year > new Date(max).getFullYear()) {
            return false;
        }
        return true;
    };
    DateService.prototype.canSelectMonth = function (month, year, min, max) {
        if (!min && !max) {
            return true;
        }
        if ((!min || year === new Date(min).getFullYear())
            && (!max || year === new Date(max).getFullYear())) {
            if (min && month < new Date(min).getMonth()) {
                return false;
            }
            if (max && month > new Date(max).getMonth()) {
                return false;
            }
            return true;
        }
        else {
            return this.canSelectYear(year, min, max);
        }
    };
    DateService.prototype.canSelectDay = function (day, month, year, min, max) {
        if (!min && !max) {
            return true;
        }
        if ((!min || (year === new Date(min).getFullYear() && month === new Date(min).getMonth()))
            && (!max || (year === new Date(max).getFullYear() && month === new Date(max).getMonth()))) {
            if (min && day < new Date(min).getDate()) {
                return false;
            }
            if (max && day > new Date(max).getDate()) {
                return false;
            }
            return true;
        }
        else {
            return this.canSelectMonth(month, year, min, max);
        }
    };
    DateService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DateService.ctorParameters = function () { return []; };
    return DateService;
}());
exports.DateService = DateService;
