'use strict';

(function (exports) {

    /**
     * Banner
     * @param element 
     */
    function Banner(element) {
        this.initBackgroundColor(element);
    }

    Banner.prototype.initBackgroundColor = function(element) {
        var infoPanel = element.querySelector('.amp-dc-banner-info');
        var dataColor = infoPanel.getAttribute('data-color') || 'fff';
        var dataOpacity = Number(infoPanel.getAttribute('data-opacity') || '1');

        if (dataColor.indexOf('#') === 0) {
            dataColor = dataColor.slice(1);
        }

        if (dataColor.length === 3) {
            var hexArr = dataColor.split('');
            dataColor = hexArr[0] + hexArr[0];
            dataColor += hexArr[1] + hexArr[1];
            dataColor += hexArr[2] + hexArr[2];
        }

        var r = parseInt(dataColor.slice(0, 2), 16);
        var g = parseInt(dataColor.slice(2, 4), 16);
        var b = parseInt(dataColor.slice(4, 6), 16);

        infoPanel.style.backgroundColor = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + dataOpacity + ')';
    }

    /**
     * The code below finds dom elements output from templates
     * and invokes the associated Javascript component
     */

    function attachComponent(selector, component) {
        [].slice.call(document.querySelectorAll(selector))
            .forEach(function(element) {
                if (!element.component) {
                    element.component = new component(element);
                }
            });
    }

    function attachComponents() {
        attachComponent('.amp-dc-banner', Banner);
    }

    exports.Utils = exports.Utils || {};
    exports.Utils.attachComponents = attachComponents;

})(
    window.AmpCa = window.AmpCa || {}
);

/*===========================
 Utils AMD Export
 ===========================*/
// if (typeof module !== 'undefined') {
//     module.exports = window.AmpCa.Utils;
// } else if (typeof define === 'function' && define.amd) {
//     define([], function () {
//         'use strict';
//         return window.AmpCa.Utils;
//     });
// }
