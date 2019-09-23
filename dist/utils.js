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

"use strict";window.POI=function(t){this.images=[],this.imgsLoaded=0,this.params=t,this.namedImagesData={}},window.POI.prototype={generateData:function(t){var e,a=this,n=a.getHotspots(t.data);if(null!==n){var i=a.findImg(t.img);e={dimensions:{width:t.data.width,height:t.data.height},canvas:t.canvas,layerCanvas:t.layerCanvas,changeSize:t.changeSize,layerCommand:t.layerCommand,$img:i,data:t.img,name:t.img.name,points:n,breakpoints:t.breakpoints,svg:null},a.images.push(e),a.namedImagesData[t.img.name+"?"+t.img.query]=e}a.imgsLoaded+=1,t.callback(e)},getImgData:function(t){for(var e=this,a=this.params.images,n=this.getWindowSize(),i=document.querySelectorAll("img."+this.params.imgClass),s=document.getElementsByTagName("source"),r=function(a,i){var r,l,c=[],u=!1;window.devicePixelRatio>1&&(u=!0);for(var m=s.length-1;m>=0;m--){var p,d,h,g=s[m].getAttribute("srcset"),f=s[m].parentNode.getElementsByTagName("img"),y=s[m].getAttribute("media"),v=g.split(", ");f=f.length?f[0].getAttribute("src"):"",v=v.map(Function.prototype.call,String.prototype.trim),v.forEach(function(t){t.includes("1x")?p=t:t.includes("2x")?d=t:p=t}),u&&d?g=d:p&&(g=p),r=g.split("?"),f=f.split("?"),l=r[0].split(e.params.account+"/"),f=f[0].split("/"),h=r[1]||"",l=l[l.length-1].split("/"),l=l[0],f=f[f.length-1],y=y.split("and"),y=y.map(Function.prototype.call,String.prototype.trim);var b={polygonCallbacks:i.polygonCallbacks,hotspotCallbacks:i.hotspotCallbacks,name:l,query:h,parentName:f};y=y.map(function(t){t=t.replace("(",""),t=t.replace(")",""),t=t.split(":"),t=t.map(Function.prototype.call,String.prototype.trim);var e=t[0]&&"max-width"===t[0]?"maxWidth":"minWidth",a=t[1]?parseInt(t[1].replace("px",""),10):"minWidth"===e?0:"";return b[e]=a,b}),c.push(b)}var C=[];c.forEach(function(t){var e={};if((t.name===a||t.parentName===a)&&(t.minWidth&&!t.maxWidth&&n>=t.minWidth&&(e.break=t,e.diff=n-t.minWidth,C.push(e)),t.maxWidth&&!t.minWidth&&n<=t.maxWidth&&(e.break=t,e.diff=t.maxWidth-n,C.push(e)),t.maxWidth&&void 0!=t.minWidth&&n<=t.maxWidth&&n>=t.minWidth)){e.break=t;var i=t.maxWidth-n,s=n-t.minWidth;e.diff=i<s?i:s,C.push(e)}}),C.sort(function(t,e){return t.diff-e.diff});var w=C.length?C[0].break:null;if(w)i=w,i.breakpoints=c;else{var x,S,k,A=e.findImg(i,a);if(!A)return!1;g=A.getAttribute("srcset"),v=g?g.split(", "):A.getAttribute("src").split(", "),v=v.map(Function.prototype.call,String.prototype.trim),v.forEach(function(t){t.includes("1x")?x=t:t.includes("2x")?S=t:x=t}),u&&S?g=S:x&&(g=x),r=g.split("?"),k=r[1]||"",i.query=k}i&&i.data?e.generateData({data:i.data,layerCommand:i.layerCommand,canvas:i.canvas,changeSize:i.changeSize,img:i,callback:function(e){t(e)}}):i&&e.namedImagesData[i.name+"?"+i.query]?t(e.namedImagesData[i.name+"?"+i.query]):o(i,a)},o=function(a,n){var i=a.query||"",s="*"!==a.name?a.name:n,r=s.includes("?")?"&X-Amp-Trace=true&v="+(new Date).getTime():"?"+i+"&X-Amp-Trace=true&v="+(new Date).getTime();e.ajax.atomic(e.params.domain+"/i/"+e.params.account+"/"+s+r).then(function(s){var r=s.data,o=r.find(function(t){return"translate"===t.type});if(!(o&&o.data&&o.data.output&&o.data.output.layerCommand))return!1;var l,c,u=o.data.output.layerCommand.metadata,m=o.data.output.layerCommand,p=o.data.output.childlayers,d=o.data.output.layerCommand.info.canvas;l=p.find(function(t){return t.layerCommand.metadata}),l&&l.layerCommand&&(m=l.layerCommand,u=l.layerCommand.metadata,c=l.layerCommand.info.canvas),e.generateData({data:u,layerCommand:m,layerCanvas:c,canvas:d,changeSize:i.includes("crop")||a.name.includes("crop"),img:{name:n,hotspotCallbacks:a.hotspotCallbacks,polygonCallbacks:a.polygonCallbacks,query:a.query,parentName:a.parentName,breakpoints:a.breakpoints,minWidth:a.minWidth,maxWidth:a.maxWidth},breakpoints:a.breakpoints,callback:function(e){t(e)}})}).catch(function(t){console.error("Image failed to load",t)})},l=a.length-1;l>=0;l--)!function(){var t=l,n=a[t];if("*"===n.name)for(var s=i.length-1;s>=0;s--)!function(){var t,o=s,l=i[o],c=l.getAttribute("src"),u=c.split("?");if(t=u[0].split(e.params.account+"/"),t=t[t.length-1].split("/"),t=t[0],a.find(function(e){return e.name===t}))return!1;r(t,n)}();else r(n.name,n)}()},findImg:function(t,e){var a=document.querySelectorAll("img."+this.params.imgClass),n=this.params.imgAttribute||"src",i=null,s=e||t.clearName||t.name,r=new RegExp(s),o=null;"*"===s&&(r=/[\s\S]+/g);for(var l=a.length-1;l>=0;l--){var c=a[l].parentNode;if(c&&"picture"===c.tagName.toLowerCase()){for(var u=c.children,m=u.length-1;m>=0;m--)if((o=u[m].getAttribute(n)?u[m].getAttribute(n).match(r):u[m].getAttribute("srcset").match(r))&&o.length>0){i=a[l];break}}else if((o=a[l].getAttribute(n).match(r))&&o.length>0){i=a[l];break}}return i},getHotspots:function(t){var e=null;t.constructor!==Array&&(t=[t]);for(var a=t.length-1;a>=0;a--)t[a]&&t[a].metadata&&t[a].metadata.hotSpots&&t[a].metadata.hotSpots.constructor===Object&&t[a].metadata.hotSpots.hotSpots&&t[a].metadata.hotSpots.hotSpots.constructor===Object&&t[a].metadata.hotSpots.hotSpots.list&&t[a].metadata.hotSpots.hotSpots.list.length>0&&(e=t[a].metadata.hotSpots.hotSpots.list);return e},iteratePoints:function(t){if(t){var e=this.hotspots(),a=this.polygons(),n=t.points;e.removeOthers(t);for(var i=n.length-1;i>=0;i--)a.hideOthers(n[i],t),n[i].points.constructor===Array?a.create(n[i],t):e.create(n[i],t)}},assignEvents:function(t,e,a,n){if(a&&a.length>0)for(var i=a.length-1;i>=0;i--)!function(){var s=a[i];if(s.target===e)t.addEventListener(s.action,function(t){s.callback(t,n)},!1),s.initCallback&&s.initCallback(n);else if("*"===s.target){var r=a.find(function(t){return t.target===e&&t.action===s.action});r||(t.addEventListener(s.action,function(t){s.callback(t,n)},!1),s.initCallback&&s.initCallback(n))}}()},getWindowSize:function(){return document.documentElement.clientWidth},checkResizeSubscription:function(){for(var t,e=this.images,a=!1,n=this,i=e.length-1;i>=0;i--)if(e[i].breakpoints&&e[i].breakpoints.length){a=!0;break}a&&(window.onresize=function(e){clearTimeout(t),t=setTimeout(function(){n.getImgData(function(t){n.iteratePoints(t)})},350)})},init:function(){var t=this;this.getImgData(function(e){t.iteratePoints(e),t.checkResizeSubscription()})}},"object"==typeof exports&&(module.exports=POI),POI.prototype.dom={hasClass:function(t,e){return new RegExp("(\\s|^)"+e+"(\\s|$)").test(t.className)},getClosest:function(t,e){var a,n,i=e.charAt(0),s="classList"in document.documentElement;for("["===i&&(e=e.substr(1,e.length-2),a=e.split("="),a.length>1&&(n=!0,a[1]=a[1].replace(/"/g,"").replace(/'/g,"")));t&&t!==document&&1===t.nodeType;t=t.parentNode){if("."===i)if(s){if(t.classList.contains(e.substr(1)))return t}else if(new RegExp("(^|\\s)"+e.substr(1)+"(\\s|$)").test(t.className))return t;if("#"===i&&t.id===e.substr(1))return t;if("["===i&&t.hasAttribute(a[0])){if(!n)return t;if(t.getAttribute(a[0])===a[1])return t}if(t.tagName.toLowerCase()===e)return t}return null}},POI.prototype.hotspots=function(){var t=this;return{create:function(e,a){var n=a.data.hotspotCallbacks,i=document.createElement("div"),s=e.selector,r=e.target;if(!s)return void console.warn("no selector specified");0===s.indexOf(".")?(s=s.slice(1),i.setAttribute("class",s)):0===s.indexOf("#")?(s=s.slice(1),i.setAttribute("id",s)):i.setAttribute("class",s);var o=t.dom.getClosest(a.$img,"."+t.params.containerClass);if(i.setAttribute("data-type","poi-hotspot"),o&&t.dom.hasClass(o,t.params.containerClass)){var l,c,u=e.points.x*a.dimensions.width,m=e.points.y*a.dimensions.height,p=a.layerCanvas||a.canvas,d=a.layerCommand,h=d.tileEndW,g=d.tileEndH,f=a.changeSize;if(p){var y=p.x,v=p.y,b=p.width,C=p.height;l=100*(u-y)/b,c=100*(m-v)/C}if(f)l<=100&&c<=100&&(i.style.position="absolute",i.style.left=l+"%",i.style.top=c+"%",i.setAttribute("data-name",a.name),o.style.position="relative",o.appendChild(i));else if(!f){var w,x;w=y?100*(e.points.x*h-y)/b:100*e.points.x,x=v?100*(e.points.y*g-v)/C:100*e.points.y,w<=100&&x<=100&&(i.style.position="absolute",i.style.left=w+"%",i.style.top=x+"%",i.setAttribute("data-name",a.name),o.style.position="relative",o.appendChild(i))}r&&r.length>0&&(i.setAttribute("data-target",r),t.assignEvents(i,r,n,{$image:a.$img,$target:i,$parent:o,hotspot:e,imgInfo:a}))}else console.warn("No parent with specified className "+t.params.containerClass+" was found.")},removeOthers:function(e){var a=t.dom.getClosest(e.$img,"."+t.params.containerClass),n=a&&a.querySelectorAll('[data-type="poi-hotspot"]');if(!n)return!1;for(var i=n.length-1;i>=0;i--)a&&a.removeChild(n[i])}}},POI.prototype.polygons=function(){var t=this;return{create:function(e,a){var n=a.data.polygonCallbacks,i=e.selector,s=document.getElementById("colorPicker"),r=s&&s.querySelector(".colorInput").getAttribute("value");if(!i)return void console.warn("no selector specified");var o,l=e.target,c=t.dom.getClosest(a.$img,"."+t.params.containerClass),u="http://www.w3.org/2000/svg",m=document.createElementNS(u,"g"),p=document.createElementNS(u,"polygon"),d=a.layerCanvas||a.canvas,h=a.layerCommand,g=h.tileEndW,f=h.tileEndH;if(!c)return!1;if(d)var y=d.x,v=d.y,b=d.width,C=d.height;if(a.svg?o=a.svg:(o=document.createElementNS(u,"svg"),o.setAttributeNS(null,"viewBox","0 0 "+(b||a.dimensions.width)+" "+(C||a.dimensions.height)),o.setAttributeNS(null,"data-name",a.name+"?"+a.data.query),c.appendChild(o),a.svg=o),0===i.indexOf(".")?(i=i.slice(1),p.setAttributeNS(null,"class",i)):0===i.indexOf("#")?(i=i.slice(1),p.setAttributeNS(null,"id",i)):p.setAttributeNS(null,"class",i),r&&p.setAttributeNS(null,"style","stroke: "+r),c&&t.dom.hasClass(c,t.params.containerClass)){var w="";e.points.forEach(function(t,e){var n=a.dimensions.width*t.x,i=a.dimensions.height*t.y;n=g>0?t.x*g-y:Math.abs(y-n),i=f>0?t.y*f-v:Math.abs(v-i),w+=n+","+i+" "}),p.setAttributeNS(null,"points",w),o.appendChild(m),m.appendChild(p),l&&l.length>0&&(p.setAttributeNS(null,"data-target",l),t.assignEvents(m,l,n,{$image:a.$img,$target:m,$parent:c,polygon:e,imgInfo:a}))}else console.warn("No parent with specified className "+t.params.containerClass+" was found.")},hideOthers:function(e,a){var n=t.dom.getClosest(a.$img,"."+t.params.containerClass),i=n&&n.getElementsByTagName("svg");if(!i||!i.length)return!1;for(var s=i.length-1;s>=0;s--)i[s].getAttribute("data-name")===a.name+"?"+a.data.query?i[s].style.display="block":i[s].style.display="none"}}},POI.prototype.ajax={settings:null,defaults:{method:"GET",username:null,password:null,data:{},headers:{"Content-type":"application/x-www-form-urlencoded"},responseType:"text",timeout:null,withCredentials:!1},supports:function(){return"XMLHttpRequest"in window&&"JSON"in window&&"Promise"in window},extend:function(){for(var t=this,e={},a=0;a<arguments.length;a++){var n=arguments[a];!function(a){for(var n in a)a.hasOwnProperty(n)&&("[object Object]"===Object.prototype.toString.call(a[n])?e[n]=t.extend(e[n],a[n]):e[n]=a[n])}(n)}return e},parse:function(t){var e;if("text"!==this.settings.responseType&&""!==this.settings.responseType)return{data:t.response,xhr:t};try{e=JSON.parse(t.responseText)}catch(a){e=t.responseText}return{data:e,xhr:t}},param:function(t){if("string"==typeof t||"[object FormData]"===Object.prototype.toString.call(t))return t;if(/application\/json/i.test(this.settings.headers["Content-type"])||"[object Array]"===Object.prototype.toString.call(t))return JSON.stringify(t);var e=[];for(var a in t)t.hasOwnProperty(a)&&e.push(encodeURIComponent(a)+"="+encodeURIComponent(t[a]));return e.join("&")},makeRequest:function(t){var e=new XMLHttpRequest,a=this,n=new Promise(function(n,i){e.onreadystatechange=function(){4===e.readyState&&(e.status>=200&&e.status<300?n(a.parse(e)):i({status:e.status,statusText:e.statusText,responseText:e.responseText}))},e.open(a.settings.method,t,!0,a.settings.username,a.settings.password),e.responseType=a.settings.responseType;for(var s in a.settings.headers)a.settings.headers.hasOwnProperty(s)&&e.setRequestHeader(s,a.settings.headers[s]);a.settings.timeout&&(e.timeout=a.settings.timeout,e.ontimeout=function(t){i({status:408,statusText:"Request timeout"})}),a.settings.withCredentials&&(e.withCredentials=!0),e.send(a.param(a.settings.data))});return n.cancel=function(){e.abort()},n},atomic:function(t,e){if(!this.supports())throw"Atomic: This browser does not support the methods used in this plugin.";return this.settings=this.extend(this.defaults,e||{}),this.makeRequest(t)}};