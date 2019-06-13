'use strict';

(function (exports) {

    /**
     * Banner - Javascript is used to calculate the background color
     * @param element 
     */
    function Banner(element) {
        this.initBackgroundColor(element);
    }

    Banner.prototype.initBackgroundColor = function (element) {
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
     * Slider - Javascript is used to add animation and navigation functionality to the slider
     * @param element 
     */
    function Slider(element) {
        var data = {
            infinite: element.getAttribute('data-infinite') === 'true',
            navigation: element.getAttribute('data-navigation') === 'true',
            autoplay: element.getAttribute('data-autoplay') === 'true'
        };

        var lory = window.lory ? window.lory : (typeof require === 'function' ? require('lory.js').lory : null);
        var slider = lory(element, data);

        if (!data.infinite) {
            this.disableNavButtons(element, slider);
        }

        if (data.navigation) {
            this.navigationDots(element, slider, data);
        }

        this.enableSwipeGesturesOnVideo(element);
    }

    Slider.prototype.disableNavButtons = function (element, sliderInstance) {
        var $slides = Array.prototype.slice.call(
            element.querySelectorAll('.js_dc_slide'),
            0
        );
        var $prevButton = element.querySelector('.js_prev');
        var $nextButton = element.querySelector('.js_next');
        var disabledClass = 'ctrl-disabled';

        var navButtonsBehave = function (evt) {
            var slideIndex = sliderInstance.returnIndex();
            if (slideIndex === 0) {
                $prevButton.classList.add(disabledClass);
                $nextButton.classList.remove(disabledClass);
            } else if (slideIndex === $slides.length - 1) {
                $prevButton.classList.remove(disabledClass);
                $nextButton.classList.add(disabledClass);
            } else {
                $prevButton.classList.remove(disabledClass);
                $nextButton.classList.remove(disabledClass);
            }
        };

        if (sliderInstance.returnIndex() === 0) {
            $prevButton.classList.add(disabledClass);
        }

        element.addEventListener('after.lory.slide', navButtonsBehave);
        element.addEventListener('on.lory.resize', navButtonsBehave);
    }

    Slider.prototype.navigationDots = function (element, sliderInstance, sliderSettings) {
        var dots = Array.prototype.slice.call(
            element.querySelectorAll('.js_dc_slider_dot'),
            0
        );

        var attachNavEvents = function () {
            dots.forEach(function ($dot, ind) {
                if (ind === 0) {
                    $dot.classList.add('active');
                }
                $dot.addEventListener('click', function (evt) {
                    sliderInstance.slideTo(ind);
                });
            });
        };

        var selectActiveDot = function (evt) {
            dots.forEach(function ($dot, ind) {
                $dot.classList.remove('active');
            });

            console.log(sliderSettings);
            var currentSlide = sliderSettings.infinite ?
                evt.detail.currentSlide - 1 :
                evt.detail.currentSlide;
            dots[currentSlide].classList.add('active');
        };

        var resetToFirst = function () {
            dots.forEach(function ($dot, ind) {
                ind === 0 ?
                    $dot.classList.add('active') :
                    $dot.classList.remove('active');
            });
        };

        attachNavEvents();
        element.addEventListener('after.lory.slide', selectActiveDot);
        element.addEventListener('on.lory.resize', resetToFirst);
    }

    Slider.prototype.enableSwipeGesturesOnVideo = function (element) {
        if (navigator.userAgent.match(/Android/i)) {
            var videos = element.querySelectorAll(
                '.amp-dc-slider .amp-dc-video'
            );
            videos = Array.prototype.slice.call(videos, 0);
            videos.forEach(function (video, ix) {
                var overlay = document.createElement('div');
                overlay.style.width = video.clientWidth + 'px';
                overlay.style.height = video.clientHeight - 30 + 'px';
                overlay.style.marginBottom = -video.clientHeight + 30 + 'px';
                overlay.className = 'inactive-video';
                video.parentNode.parentNode.insertBefore(
                    overlay,
                    video.parentNode
                );
                overlay.addEventListener('click', function () {
                    overlay.classList.add('no-overlay');
                    video.play();
                });
                video.addEventListener('pause', function () {
                    overlay.classList.remove('no-overlay');
                });
                window.addEventListener('resize', function () {
                    overlay.style.width = video.clientWidth + 'px';
                    overlay.style.height = video.clientHeight - 30 + 'px';
                    overlay.style.marginBottom = -video.clientHeight + 30 + 'px';
                });
            });
        }
    }


    /**
     * The code below finds dom elements output from templates
     * and invokes the associated Javascript component
     */

    function attachComponent(selector, component) {
        [].slice.call(document.querySelectorAll(selector))
            .forEach(function (element) {
                if (!element.component) {
                    element.component = new component(element);
                }
            });
    }

    function attachComponents() {
        attachComponent('.amp-dc-banner', Banner);
        attachComponent('.amp-dc-promo-banner', PromoBanner);
        attachComponent('.amp-dc-slider', Slider);
    }

    exports.Utils = exports.Utils || {};
    exports.Utils.attachComponents = attachComponents;

    /**
     * Automatically activate accelerator components when the page renders
     */
    document.addEventListener('DOMContentLoaded', function() {
        attachComponents();
    });

})(
    window.AmpCa = window.AmpCa || {}
);
