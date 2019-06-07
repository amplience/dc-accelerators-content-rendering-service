'use strict';

(function (exports) {

    /**
     * Banner - Javascript is used to calculate the background color
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
     * Promo Banner - Javascript is used to animate the sections for resolutions that can only show a single section at a time
     * @param element 
     */
    function PromoBanner(element) {
        var $children = [].slice.call(
            element.querySelectorAll('.amp-dc-promo-block')
        );
        var currentItemNum = 2;
        var winWidth = window.innerWidth;

        if ($children.length < 2) {
            $children[0].classList.add('dc-fade-in');
            return;
        }

        $children.forEach(function ($child) {
            $children[currentItemNum - 1].classList.remove('dc-fade-in');
        });

        $children[currentItemNum - 1].classList.add('dc-fade-in');

        var getNextItem = function () {
            if (currentItemNum === $children.length) {
                currentItemNum = 1;
            } else {
                currentItemNum += 1;
            }

            return currentItemNum - 1;
        };

        setInterval(function () {
            winWidth = window.innerWidth;
            var $fadedElems = [].slice.call(
                element.querySelectorAll('.dc-fade-in')
            );
            if (winWidth > 768) {
                return;
            }

            var itemToShow = getNextItem();
            if ($fadedElems.length > 0) {
                $fadedElems.forEach(function ($fadeElem) {
                    $fadeElem.classList.remove('dc-fade-in');
                });
            }
            $children[itemToShow].classList.add('dc-fade-in');
        }, 5000);
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
        attachComponent('.amp-dc-promo-banner', PromoBanner);
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
