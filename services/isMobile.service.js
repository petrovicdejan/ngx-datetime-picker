"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var IsMobileService = (function () {
    function IsMobileService() {
        this.isMobile = !!(window.navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            || navigator.userAgent.match(/Opera Mini/i)
            || navigator.userAgent.match(/IEMobile/i));
    }
    IsMobileService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    IsMobileService.ctorParameters = function () { return []; };
    return IsMobileService;
}());
exports.IsMobileService = IsMobileService;
