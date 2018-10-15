"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var date_component_1 = require("./date.component/date.component");
var datePicker_component_1 = require("./datePicker.component/datePicker.component");
var time_component_1 = require("./time.component/time.component");
var dateTimePicker_component_1 = require("./dateTimePicker.component/dateTimePicker.component");
var timePicker_component_1 = require("./timePicker.component/timePicker.component");
var date_service_1 = require("./services/date.service");
var isMobile_service_1 = require("./services/isMobile.service");
var DateTimePickerModule = (function () {
    function DateTimePickerModule() {
    }
    DateTimePickerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [datePicker_component_1.DatePickerComponent, dateTimePicker_component_1.DateTimePickerComponent, timePicker_component_1.TimePickerComponent],
                    declarations: [time_component_1.TimeComponent, date_component_1.DateComponent, datePicker_component_1.DatePickerComponent, dateTimePicker_component_1.DateTimePickerComponent, timePicker_component_1.TimePickerComponent],
                    providers: [date_service_1.DateService, isMobile_service_1.IsMobileService],
                },] },
    ];
    /** @nocollapse */
    DateTimePickerModule.ctorParameters = function () { return []; };
    return DateTimePickerModule;
}());
exports.DateTimePickerModule = DateTimePickerModule;
