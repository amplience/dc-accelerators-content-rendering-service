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

!function(t,e){"function"==typeof define&&define.amd?define([],e(t)):"object"==typeof exports?module.exports=e(t):t.atomic=e(t)}("undefined"!=typeof global?global:this.window||this.global,function(t){"use strict";var e,a={},n=!!t.XMLHttpRequest&&!!t.JSON,i={type:"GET",url:null,data:{},callback:null,headers:{"Content-type":"application/x-www-form-urlencoded"},responseType:"text",withCredentials:!1},r=function(){for(var t={},e=0;e<arguments.length;e++){var a=arguments[e];!function(e){for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&("[object Object]"===Object.prototype.toString.call(e[a])?t[a]=r(!0,t[a],e[a]):t[a]=e[a])}(a)}return t},s=function(t){var a;if("text"!==e.responseType&&""!==e.responseType)return[t.response,t];try{a=JSON.parse(t.responseText)}catch(e){a=t.responseText}return[a,t]},o=function(t){if("string"==typeof t)return t;if(/application\/json/i.test(e.headers["Content-type"])||"[object Array]"===Object.prototype.toString.call(t))return JSON.stringify(t);var a=[];for(var n in t)t.hasOwnProperty(n)&&a.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return a.join("&")},l=function(){var t={success:function(){},error:function(){},always:function(){}},a={success:function(e){return t.success=e,a},error:function(e){return t.error=e,a},always:function(e){return t.always=e,a}},n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===n.readyState){var e=s(n);n.status>=200&&n.status<300?t.success.apply(t,e):t.error.apply(t,e),t.always.apply(t,e)}},n.open(e.type,e.url,!0),n.responseType=e.responseType;for(var i in e.headers)e.headers.hasOwnProperty(i)&&n.setRequestHeader(i,e.headers[i]);return e.withCredentials&&(n.withCredentials=!0),n.send(o(e.data)),a},c=function(){var a=t.document.getElementsByTagName("script")[0],n=t.document.createElement("script");e.data.callback=e.callback,n.src=e.url+(e.url.indexOf("?")+1?"&":"?")+o(e.data),a.parentNode.insertBefore(n,a),n.onload=function(){this.remove()}};return a.ajax=function(t){if(n)return e=r(i,t||{}),"jsonp"===e.type.toLowerCase()?c():l()},a}),window.POI=function(t){this.images=[],this.imgsLoaded=0,this.params=t,this.namedImagesData={}},window.POI.prototype={generateData:function(t){var e,a=this,n=a.getHotspots(t.data);if(null!==n){var i=a.findImg(t.img);e={dimensions:{width:t.data.width,height:t.data.height},canvas:t.canvas,layerCanvas:t.layerCanvas,changeSize:t.changeSize,layerCommand:t.layerCommand,$img:i,data:t.img,name:t.img.name,points:n,breakpoints:t.breakpoints,svg:null},a.images.push(e),a.namedImagesData[t.img.name+"?"+t.img.query]=e}a.imgsLoaded+=1,t.callback(e)},getImgData:function(t){for(var e=this,a=this.params.images,n=this.getWindowSize(),i=document.querySelectorAll("img."+this.params.imgClass),r=document.getElementsByTagName("source"),s=function(a,i){var s,l,c=[],u=!1;window.devicePixelRatio>1&&(u=!0);for(var p=r.length-1;p>=0;p--){var m,d,h,g=r[p].getAttribute("srcset"),f=r[p].parentNode.getElementsByTagName("img"),y=r[p].getAttribute("media"),v=g.split(", ");f=f.length?f[0].getAttribute("src"):"",v=v.map(Function.prototype.call,String.prototype.trim),v.forEach(function(t){t.includes("1x")?m=t:t.includes("2x")?d=t:m=t}),u&&d?g=d:m&&(g=m),s=g.split("?"),f=f.split("?"),l=s[0].split(e.params.account+"/"),f=f[0].split("/"),h=s[1]||"",l=l[l.length-1].split("/"),l=l[0],f=f[f.length-1],y=y.split("and"),y=y.map(Function.prototype.call,String.prototype.trim);var b={polygonCallbacks:i.polygonCallbacks,hotspotCallbacks:i.hotspotCallbacks,name:l,query:h,parentName:f};y=y.map(function(t){t=t.replace("(",""),t=t.replace(")",""),t=t.split(":"),t=t.map(Function.prototype.call,String.prototype.trim);var e=t[0]&&"max-width"===t[0]?"maxWidth":"minWidth",a=t[1]?parseInt(t[1].replace("px",""),10):"minWidth"===e?0:"";return b[e]=a,b}),c.push(b)}var C=[];c.forEach(function(t){var e={};if((t.name===a||t.parentName===a)&&(t.minWidth&&!t.maxWidth&&n>=t.minWidth&&(e.break=t,e.diff=n-t.minWidth,C.push(e)),t.maxWidth&&!t.minWidth&&n<=t.maxWidth&&(e.break=t,e.diff=t.maxWidth-n,C.push(e)),t.maxWidth&&void 0!=t.minWidth&&n<=t.maxWidth&&n>=t.minWidth)){e.break=t;var i=t.maxWidth-n,r=n-t.minWidth;e.diff=i<r?i:r,C.push(e)}}),C.sort(function(t,e){return t.diff-e.diff});var w=C.length?C[0].break:null;if(w)i=w,i.breakpoints=c;else{var S,x,k,A=e.findImg(i,a);if(!A)return!1;g=A.getAttribute("srcset"),v=g?g.split(", "):A.getAttribute("src").split(", "),v=v.map(Function.prototype.call,String.prototype.trim),v.forEach(function(t){t.includes("1x")?S=t:t.includes("2x")?x=t:S=t}),u&&x?g=x:S&&(g=S),s=g.split("?"),k=s[1]||"",i.query=k}i&&i.data?e.generateData({data:i.data,layerCommand:i.layerCommand,canvas:i.canvas,changeSize:i.changeSize,img:i,callback:function(e){t(e)}}):i&&e.namedImagesData[i.name+"?"+i.query]?t(e.namedImagesData[i.name+"?"+i.query]):o(i,a)},o=function(a,n){var i=a.query||"",r="*"!==a.name?a.name:n,s=r.includes("?")?"&X-Amp-Trace=true&v="+(new Date).getTime():"?"+i+"&X-Amp-Trace=true&v="+(new Date).getTime();atomic.ajax({url:e.params.domain+"/i/"+e.params.account+"/"+r+s}).success(function(r){var s=r.find(function(t){return"translate"===t.type});if(!(s&&s.data&&s.data.output&&s.data.output.layerCommand))return!1;var o,l,c=s.data.output.layerCommand.metadata,u=s.data.output.layerCommand,p=s.data.output.childlayers,m=s.data.output.layerCommand.info.canvas;o=p.find(function(t){return t.layerCommand.metadata}),o&&o.layerCommand&&(u=o.layerCommand,c=o.layerCommand.metadata,l=o.layerCommand.info.canvas),e.generateData({data:c,layerCommand:u,layerCanvas:l,canvas:m,changeSize:i.includes("crop")||a.name.includes("crop"),img:{name:n,hotspotCallbacks:a.hotspotCallbacks,polygonCallbacks:a.polygonCallbacks,query:a.query,parentName:a.parentName,breakpoints:a.breakpoints,minWidth:a.minWidth,maxWidth:a.maxWidth},breakpoints:a.breakpoints,callback:function(e){t(e)}})}).error(function(t){console.error("Image failed to load",t)})},l=a.length-1;l>=0;l--)!function(){var t=l,n=a[t];if("*"===n.name)for(var r=i.length-1;r>=0;r--)!function(){var t,o=r,l=i[o],c=l.getAttribute("src"),u=c.split("?");if(t=u[0].split(e.params.account+"/"),t=t[t.length-1].split("/"),t=t[0],a.find(function(e){return e.name===t}))return!1;s(t,n)}();else s(n.name,n)}()},findImg:function(t,e){var a=document.querySelectorAll("img."+this.params.imgClass),n=this.params.imgAttribute||"src",i=null,r=e||t.clearName||t.name,s=new RegExp(r),o=null;"*"===r&&(s=/[\s\S]+/g);for(var l=a.length-1;l>=0;l--){var c=a[l].parentNode;if(c&&"picture"===c.tagName.toLowerCase()){for(var u=c.children,p=u.length-1;p>=0;p--)if((o=u[p].getAttribute(n)?u[p].getAttribute(n).match(s):u[p].getAttribute("srcset").match(s))&&o.length>0){i=a[l];break}}else if((o=a[l].getAttribute(n).match(s))&&o.length>0){i=a[l];break}}return i},getHotspots:function(t){var e=null;t.constructor!==Array&&(t=[t]);for(var a=t.length-1;a>=0;a--)t[a]&&t[a].metadata&&t[a].metadata.hotSpots&&t[a].metadata.hotSpots.constructor===Object&&t[a].metadata.hotSpots.hotSpots&&t[a].metadata.hotSpots.hotSpots.constructor===Object&&t[a].metadata.hotSpots.hotSpots.list&&t[a].metadata.hotSpots.hotSpots.list.length>0&&(e=t[a].metadata.hotSpots.hotSpots.list);return e},iteratePoints:function(t){if(t){var e=this.hotspots(),a=this.polygons(),n=t.points;e.removeOthers(t);for(var i=n.length-1;i>=0;i--)a.hideOthers(n[i],t),n[i].points.constructor===Array?a.create(n[i],t):e.create(n[i],t)}},assignEvents:function(t,e,a,n){if(a&&a.length>0)for(var i=a.length-1;i>=0;i--)!function(){var r=a[i];if(r.target===e)t.addEventListener(r.action,function(t){r.callback(t,n)},!1),r.initCallback&&r.initCallback(n);else if("*"===r.target){var s=a.find(function(t){return t.target===e&&t.action===r.action});s||(t.addEventListener(r.action,function(t){r.callback(t,n)},!1),r.initCallback&&r.initCallback(n))}}()},getWindowSize:function(){return document.documentElement.clientWidth},checkResizeSubscription:function(){for(var t,e=this.images,a=!1,n=this,i=e.length-1;i>=0;i--)if(e[i].breakpoints&&e[i].breakpoints.length){a=!0;break}a&&(window.onresize=function(e){clearTimeout(t),t=setTimeout(function(){n.getImgData(function(t){n.iteratePoints(t)})},350)})},init:function(){var t=this;this.getImgData(function(e){t.iteratePoints(e),t.checkResizeSubscription()})}},"object"==typeof exports&&(module.exports=POI),POI.prototype.dom={hasClass:function(t,e){return new RegExp("(\\s|^)"+e+"(\\s|$)").test(t.className)},getClosest:function(t,e){var a,n,i=e.charAt(0),r="classList"in document.documentElement;for("["===i&&(e=e.substr(1,e.length-2),a=e.split("="),a.length>1&&(n=!0,a[1]=a[1].replace(/"/g,"").replace(/'/g,"")));t&&t!==document&&1===t.nodeType;t=t.parentNode){if("."===i)if(r){if(t.classList.contains(e.substr(1)))return t}else if(new RegExp("(^|\\s)"+e.substr(1)+"(\\s|$)").test(t.className))return t;if("#"===i&&t.id===e.substr(1))return t;if("["===i&&t.hasAttribute(a[0])){if(!n)return t;if(t.getAttribute(a[0])===a[1])return t}if(t.tagName.toLowerCase()===e)return t}return null}},POI.prototype.hotspots=function(){var t=this;return{create:function(e,a){var n=a.data.hotspotCallbacks,i=document.createElement("div"),r=e.selector,s=e.target;if(!r)return void console.warn("no selector specified");0===r.indexOf(".")?(r=r.slice(1),i.setAttribute("class",r)):0===r.indexOf("#")?(r=r.slice(1),i.setAttribute("id",r)):i.setAttribute("class",r);var o=t.dom.getClosest(a.$img,"."+t.params.containerClass);if(i.setAttribute("data-type","poi-hotspot"),o&&t.dom.hasClass(o,t.params.containerClass)){var l,c,u=e.points.x*a.dimensions.width,p=e.points.y*a.dimensions.height,m=a.layerCanvas||a.canvas,d=a.layerCommand,h=d.tileEndW,g=d.tileEndH,f=a.changeSize;if(m){var y=m.x,v=m.y,b=m.width,C=m.height;l=100*(u-y)/b,c=100*(p-v)/C}if(f)l<=100&&c<=100&&(i.style.position="absolute",i.style.left=l+"%",i.style.top=c+"%",i.setAttribute("data-name",a.name),o.style.position="relative",o.appendChild(i));else if(!f){var w,S;w=y?100*(e.points.x*h-y)/b:100*e.points.x,S=v?100*(e.points.y*g-v)/C:100*e.points.y,w<=100&&S<=100&&(i.style.position="absolute",i.style.left=w+"%",i.style.top=S+"%",i.setAttribute("data-name",a.name),o.style.position="relative",o.appendChild(i))}s&&s.length>0&&(i.setAttribute("data-target",s),t.assignEvents(i,s,n,{$image:a.$img,$target:i,$parent:o,hotspot:e,imgInfo:a}))}else console.warn("No parent with specified className "+t.params.containerClass+" was found.")},removeOthers:function(e){var a=t.dom.getClosest(e.$img,"."+t.params.containerClass),n=a&&a.querySelectorAll('[data-type="poi-hotspot"]');if(!n)return!1;for(var i=n.length-1;i>=0;i--)a&&a.removeChild(n[i])}}},POI.prototype.polygons=function(){var t=this;return{create:function(e,a){var n=a.data.polygonCallbacks,i=e.selector,r=document.getElementById("colorPicker"),s=r&&r.querySelector(".colorInput").getAttribute("value");if(!i)return void console.warn("no selector specified");var o,l=e.target,c=t.dom.getClosest(a.$img,"."+t.params.containerClass),u="http://www.w3.org/2000/svg",p=document.createElementNS(u,"g"),m=document.createElementNS(u,"polygon"),d=a.layerCanvas||a.canvas,h=a.layerCommand,g=h.tileEndW,f=h.tileEndH;if(!c)return!1;if(d)var y=d.x,v=d.y,b=d.width,C=d.height;if(a.svg?o=a.svg:(o=document.createElementNS(u,"svg"),o.setAttributeNS(null,"viewBox","0 0 "+(b||a.dimensions.width)+" "+(C||a.dimensions.height)),o.setAttributeNS(null,"data-name",a.name+"?"+a.data.query),c.appendChild(o),a.svg=o),0===i.indexOf(".")?(i=i.slice(1),m.setAttributeNS(null,"class",i)):0===i.indexOf("#")?(i=i.slice(1),m.setAttributeNS(null,"id",i)):m.setAttributeNS(null,"class",i),s&&m.setAttributeNS(null,"style","stroke: "+s),c&&t.dom.hasClass(c,t.params.containerClass)){var w="";e.points.forEach(function(t,e){var n=a.dimensions.width*t.x,i=a.dimensions.height*t.y;n=g>0?t.x*g-y:Math.abs(y-n),i=f>0?t.y*f-v:Math.abs(v-i),w+=n+","+i+" "}),m.setAttributeNS(null,"points",w),o.appendChild(p),p.appendChild(m),l&&l.length>0&&(m.setAttributeNS(null,"data-target",l),t.assignEvents(p,l,n,{$image:a.$img,$target:p,$parent:c,polygon:e,imgInfo:a}))}else console.warn("No parent with specified className "+t.params.containerClass+" was found.")},hideOthers:function(e,a){var n=t.dom.getClosest(a.$img,"."+t.params.containerClass),i=n&&n.getElementsByTagName("svg");if(!i||!i.length)return!1;for(var r=i.length-1;r>=0;r--)i[r].getAttribute("data-name")===a.name+"?"+a.data.query?i[r].style.display="block":i[r].style.display="none"}}};