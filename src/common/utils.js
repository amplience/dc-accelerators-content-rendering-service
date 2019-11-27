'use strict';

(function (exports) {

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
      infinite: element.getAttribute('data-infinite') === 'true' ? 1 : 0,
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

    if (!$prevButton && !$nextButton) {
      return false;
    }

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
  };

  Slider.prototype.autoslide = function ($slider, sliderInstance) {
    var iterate = function () {
      sliderInstance.next();
    };
    var sim;

    return {
      start: function () {
        sim = setInterval(iterate, 3000);
      },
      stop: function () {
        clearTimeout(sim);
      },
      init: function () {
        this.start();
      }
    }
  };

  Slider.prototype.navigationDots = function (element, sliderInstance, sliderSettings) {
    var dots = Array.prototype.slice.call(
      element.querySelectorAll('.js_dc_slider_dot'),
      0
    );

    var autoSlide = sliderSettings.autoplay && new this.autoslide(element, sliderInstance);

    var attachNavEvents = function () {
      dots.forEach(function ($dot, ind) {
        if (ind === 0) {
          $dot.classList.add('active');
          autoSlide && autoSlide.init($dot);
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
      autoSlide && autoSlide.stop();
      autoSlide && autoSlide.start();
    };

    var resetToFirst = function () {
      dots.forEach(function ($dot, ind) {
        if (ind === 0) {
          $dot.classList.add('active');
          autoSlide && autoSlide.stop();
          autoSlide && autoSlide.start();
        } else {
          $dot.classList.remove('active')
        }
      });
    };

    attachNavEvents();
    element.addEventListener('after.lory.slide', selectActiveDot);
    // element.addEventListener('on.lory.resize', resetToFirst);
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
   * scrollCard - is used to scroll card if its content doesn't fit container
   */

  var interval;

  function scrollCard() {
    var container = document.getElementById('card-container');
    if (!container) {
      return false;
    }
    var child = container.childNodes[0].nextSibling;
    var length = child.clientHeight;
    var parent = container.clientHeight;
    var xH;

    if (length / parent > 1.5) {
      if (interval) {
        clearInterval(interval)
      }

      interval = setInterval(function () {
        container.classList.remove('transition');
        xH = child.style.top || 0;
        xH = parseInt(xH);
        if (Math.abs(parseInt(xH)) + parent < length) {
          xH = xH - 1;
          xH = xH + "px";
          child.style.top = xH;
        } else {
          clearInterval(interval);
          setTimeout(scrollLeave, 1000);
        }
      }, 10)
    }
  }

  function scrollLeave() {
    var container = document.getElementById('card-container');
    var child = container.childNodes[0].nextSibling;
    container.classList.add('with-transition');

    setTimeout(function () {
      child.style.top = '0px';
      container.classList.remove('with-transition');
      container.classList.add('transition');

      clearInterval(interval);
    }, 1000);
  }

  function initPOI() {
    var params = window.poiDefaults || {
      domain: '//i1.adis.ws',
      account: '{COMPANY_TAG}',
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
    };
    var poi = new window.POI(params);
    poi.init();
  }

  function attachComponents() {
    attachComponent('.amp-dc-promo-banner', PromoBanner);
    attachComponent('.amp-dc-slider', Slider);
    initPOI();
    setTimeout(scrollCard, 2000);
  }

  exports.Utils = exports.Utils || {};
  exports.Utils.attachComponents = attachComponents;

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
