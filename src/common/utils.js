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
    var dataColor = infoPanel.getAttribute('data-color') || "rgb(255,255,255)";
    var dataOpacity = Number(infoPanel.getAttribute('data-opacity') || '1');

    dataColor = dataColor.slice(4);
    dataColor = dataColor.slice(0, dataColor.length - 1);
    dataColor = dataColor.split(',');

    var r = parseInt(dataColor[0], 10);
    var g = parseInt(dataColor[1], 10);
    var b = parseInt(dataColor[2], 10);

    infoPanel.style.backgroundColor = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + dataOpacity + ')';
  };

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
  };

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
  };


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

  /**
   * scrollOnHover - is used to emulate scroll action on card mouse over event
   */

  var interval;

  function scrollOnHover() {
    var container = document.getElementById('card-container');
    var child = container.childNodes[0].nextSibling;
    var length = child.clientHeight;
    var parent = container.clientHeight;
    var xH;

    if (parent < length) {
      if (interval) {
        clearInterval(interval)
      }

      interval = setInterval(function () {
        xH = child.style.top || 0;
        xH = parseInt(xH);
        if (Math.abs(parseInt(xH)) + parent < length) {
          xH = xH - 1;
          xH = xH + "px";
          child.style.top = xH;
        } else {
          clearInterval(interval)
        }
      }, 1)
    }
  }

  function scrollLeave() {
    var container = document.getElementById('card-container');
    var child = container.childNodes[0].nextSibling;
    child.style.top = '0px';

    clearInterval(interval)
  }

  function initPOI() {
    var poi = new window.POI({
      domain: 'http://i1.adis.ws',
      account: 'csdemo',
      containerClass: 'amp-dc-poi-image',
      imgClass: 'amp-dc-image-pic',
      images: [{
        name: '*',
        polygonCallbacks: [
          {
            target: "*",
            action: "click",
            callback: function (evt, settings) {
              console.log('generic click', settings);

            },
            initCallback: function (settings) {
              console.log('init callback polygon', settings);
            }
          }
        ],
        hotspotCallbacks: [
          {
            target: "*",
            action: "click",
            callback: function (evt, settings) {
              console.log('yay, i was clicked :)', settings);
            },
            initCallback: function (settings) {
              console.log('init callback hotspot', settings);
            }
          },
          {
            target: "*",
            action: "mouseover",
            callback: function (evt, settings) {
              console.log('yay, i was hovered :)', settings);
            },
            initCallback: function (settings) {
              console.log('init callback hotspot', settings);
            }
          }
        ]
      }]
    });
    poi.init();
  }

  function attachComponents() {
    attachComponent('.amp-dc-banner', Banner);
    attachComponent('.amp-dc-promo-banner', PromoBanner);
    attachComponent('.amp-dc-slider', Slider);
    initPOI();
  }

  exports.Utils = exports.Utils || {};
  exports.Utils.attachComponents = attachComponents;
  exports.Utils.scrollOnHover = scrollOnHover;
  exports.Utils.scrollLeave = scrollLeave;

  /**
   * Automatically activate accelerator components when the page renders
   */
  window.addEventListener('load', function () {
    attachComponents();
  });

})
(
  window.AmpCa = window.AmpCa || {}
);
