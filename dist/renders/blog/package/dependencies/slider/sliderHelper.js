window.loryHelpers = {
  navigationDots: function($sliderBox, sliderInstance, sliderSettings) {
    var dots = Array.prototype.slice.call(
      $sliderBox.querySelectorAll('.js_dc_slider_dot'),
      0
    );

    var attachNavEvents = function() {
      dots.forEach(function($dot, ind) {
        if (ind === 0) {
          $dot.classList.add('active');
        }
        $dot.addEventListener('click', function(evt) {
          sliderInstance.slideTo(ind);
        });
      });
    };

    var selectActiveDot = function(evt) {
      dots.forEach(function($dot, ind) {
        $dot.classList.remove('active');
      });

      var currentSlide = sliderSettings.infinite
        ? evt.detail.currentSlide - 1
        : evt.detail.currentSlide;
      dots[currentSlide].classList.add('active');
    };

    var resetToFirst = function() {
      dots.forEach(function($dot, ind) {
        ind === 0
          ? $dot.classList.add('active')
          : $dot.classList.remove('active');
      });
    };

    attachNavEvents();
    $sliderBox.addEventListener('after.lory.slide', selectActiveDot);
    $sliderBox.addEventListener('on.lory.resize', resetToFirst);
  },
  autoPlay: function($sliderBox) {
    // To decide
  },
  disableNavButtons: function($sliderBox, sliderInstance) {
    var $slides = Array.prototype.slice.call(
      $sliderBox.querySelectorAll('.js_dc_slide'),
      0
    );
    var $prevButton = $sliderBox.querySelector('.js_prev');
    var $nextButton = $sliderBox.querySelector('.js_next');
    var disabledClass = 'ctrl-disabled';

    var navButtonsBehave = function(evt) {
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

    $sliderBox.addEventListener('after.lory.slide', navButtonsBehave);
    $sliderBox.addEventListener('on.lory.resize', navButtonsBehave);
  },
  initSliders: function($sliders) {
    var self = this;
    $sliders = Array.prototype.slice.call($sliders, 0);

    $sliders.forEach(function($slider, i) {
      var infinite = $slider.getAttribute('data-infinite') === 'true';
      var navDots = $slider.getAttribute('data-navigation') === 'true';
      var sliderSettings = {};
      if (infinite) {
        sliderSettings.infinite = 1;
      }

      var slider = lory($slider, sliderSettings);

      if (!infinite) {
        self.disableNavButtons($slider, slider);
      }

      if (navDots) {
        self.navigationDots($slider, slider, sliderSettings);
      }
    });
  }
};
