(function () {
    'use strict';

    var Utils = function () {
        this.retries = 0;
        this.timeout = 100;
    };

    Utils.prototype = {
        baseAjax: function (params) {
            //url, callback, formatData, errorCallback
            var self = this;
            var xhr = new XMLHttpRequest();
            var mime = params.mime ? params.mime : 'application/json';
            xhr.overrideMimeType(mime);
            xhr.open('GET', params.url, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var data = params.formatData
                        ? params.formatData(xhr.responseText)
                        : xhr.responseText;
                    if (data.length > 0) {
                        return params.callback(data);
                    } else {
                        console.error('Error retrieving data', xhr.responseText);
                        return params.callback(false);
                    }
                } else {
                    if (self.retries < 9) {
                        setTimeout(function () {
                            params.errorCallback(xhr.status);
                            self.timeout *= 2;
                            self.retries += 1;
                        }, self.timeout);
                    } else {
                        console.error('Error retrieving data', xhr.responseText);
                    }
                }
            };
            xhr.onerror = function () {
                console.error('Error xhr request');
            };
            xhr.send(null);
        },
        getHtmlServiceData: function (params) {
            var self = this;

            var url = encodeURI(
                params.auth.baseUrl +
                '/v1/content/' +
                params.auth.store +
                '/content-item/' +
                params.auth.id +
                '?template=' +
                params.auth.templateName
            );

            return this.baseAjax({
                url: url,
                callback: function (data) {
                    params.callback(data);
                },
                errorCallback: function () {
                    self.getHtmlServiceData(params);
                }
            });
        },
        postProcessing: {
            execHtmlService: function (renderName, params) {
                var self = this;
                self.htmlServiceDependencies[renderName].forEach(function (fixName) {
                    self.handlers[fixName](params);
                });
            },
            htmlServiceDependencies: {
                slider: [
                    'fixVideoButton',
                    'fixAndroidSwipeOverTheVideo',
                    'bannerStyle'
                ],
                video: ['fixVideoButton'],
                splitBlock: ['fixVideoButton', 'showdown', 'bannerStyle', 'split'],
                blog: ['fixVideoButton', 'bannerStyle', 'split', 'showdown'],
                homepage: [
                    'fixVideoButton',
                    'fixAndroidSwipeOverTheVideo',
                    'promoBanner',
                    'bannerStyle',
                    'split',
                    'showdown'
                ],
                promoBanner: ['promoBanner'],
                text: ['showdown'],
                banner: ['bannerStyle']
            },
            handlers: {
                split: function () {
                    var splitClass = function (index, split) {
                        if (typeof split === 'undefined') {
                            return '';
                        }
                        var id = parseInt(index, 10);
                        var splitter = split.split('/');
                        if (id === 0) {
                            return 'amp-dc-size-' + splitter[0];
                        }
                        return 'amp-dc-size-' + splitter[1];
                    };

                    var splitBlock = [].slice.call(
                        document.querySelectorAll('.amp-dc-splitBlock')
                    );
                    if (splitBlock.length < 1) {
                        return;
                    }

                    splitBlock.forEach(function (split) {
                        var needle = 'js_dc_split-';
                        var className = split.className;
                        var splitPosition = className.indexOf(needle);

                        if (splitPosition == -1) {
                            return;
                        }

                        var splitPercentage = className.substring(
                            splitPosition + needle.length,
                            className.length
                        );

                        var splitParts = [].slice.call(
                            split.querySelectorAll('.amp-dc-split-part')
                        );

                        if (splitParts.length > 1) {
                            splitParts.forEach(function (splitPart, ind) {
                                var addClass = splitClass(ind, splitPercentage).trim();
                                splitPart.classList.add(addClass);
                            });
                        }
                    });
                },
                bannerStyle: function (opts) {
                    var bannerSections = [].slice.call(
                        document.querySelectorAll('.amp-dc-banner-info')
                    );

                    if (bannerSections.length < 1) {
                        return;
                    }

                    var setStyle = function (opts) {
                        var style = '';
                        var hex = opts.bannerColor || '#fff';
                        var alpha = opts.bannerOpacity || 1;
                        var hex = hex.replace('#', '');

                        if (hex.length === 3) {
                            var hexArr = hex.split('');
                            hex = hexArr[0] + hexArr[0];
                            hex += hexArr[1] + hexArr[1];
                            hex += hexArr[2] + hexArr[2];
                        }

                        var r = parseInt(hex.slice(0, 2), 16);
                        var g = parseInt(hex.slice(2, 4), 16);
                        var b = parseInt(hex.slice(4, 6), 16);

                        if (alpha) {
                            style +=
                                'background-color:rgba(' +
                                r +
                                ', ' +
                                g +
                                ', ' +
                                b +
                                ', ' +
                                alpha +
                                '); ';
                        } else {
                            style +=
                                'background-color:rgb(' + r + ', ' + g + ', ' + b + '); ';
                        }

                        if (opts.textColour) {
                            style += 'color: #' + opts.textColour;
                        }

                        return style;
                    };

                    bannerSections.forEach(function (bannerSection) {
                        bannerSection.setAttribute(
                            'style',
                            setStyle({
                                bannerColor: bannerSection.getAttribute('data-color'),
                                bannerOpacity: bannerSection.getAttribute('data-opacity'),
                                textColour: bannerSection.getAttribute('data-txtcolor')
                            })
                        );
                    });
                },
                showdown: function () {
                    var textNodes = [].slice.call(
                        document.querySelectorAll('.amp-dc-text')
                    );

                    if (textNodes.length < 1) {
                        return;
                    }

                    if (typeof showdown === 'undefined') {
                        return html || '';
                    }

                    var converter = new showdown.Converter({
                        noHeaderId: true,
                        simpleLineBreaks: true
                    });

                    textNodes.forEach(function (textNode) {
                        textNode.innerHTML = converter.makeHtml(textNode.innerHTML.trim());
                    });
                },
                promoBanner: function () {
                    var promoBanner = function ($node) {
                        var $children = [].slice.call(
                            $node.querySelectorAll('.amp-dc-promo-block')
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

                        var interval = setInterval(function () {
                            winWidth = window.innerWidth;
                            var $fadedElems = [].slice.call(
                                $node.querySelectorAll('.dc-fade-in')
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
                    };
                    var arr = [].slice.call(
                        document.querySelectorAll('.amp-dc-promo-banner-wrap')
                    );
                    arr.forEach(function ($node) {
                        promoBanner($node);
                    });
                },
                fixAndroidSwipeOverTheVideo: function () {
                    if (navigator.userAgent.match(/Android/i)) {
                        var videos = document.querySelectorAll(
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
                },
                fixVideoButton: function () {
                    var videos = document.querySelectorAll('.amp-dc-video');
                    videos = Array.prototype.slice.call(videos, 0);
                    var pauseButtons = document.querySelectorAll('.pause-button');
                    pauseButtons = Array.prototype.slice.call(pauseButtons, 0);
                    var ev = 'click';

                    if (!pauseButtons || !pauseButtons.length) {
                        return false;
                    }

                    if (navigator.userAgent.match(/(iPad)|(iPhone)|(Android)/i)) {
                        ev = 'touchstart';
                    } else {
                        pauseButtons.forEach(function (item) {
                            item.classList.remove('inactive');
                        });
                    }
                    if (navigator.userAgent.match(/Android/i)) {
                        videos.forEach(function (video) {
                            video.addEventListener(ev, function () {
                                var self = this;
                                self.paused
                                    ? setTimeout(function () {
                                        self.play();
                                    }, 1)
                                    : setTimeout(function () {
                                        self.pause();
                                    }, 1);
                            });
                        });
                    } else {
                        var lock = [];
                        var lockInit = function (ix) {
                            lock[ix] = true;
                            setTimeout(function () {
                                lock[ix] = false;
                            }, 200);
                        };
                        videos.forEach(function (video, ix) {
                            lock[ix] = false;
                            video.addEventListener(
                                ev,
                                (function () {
                                    return function () {
                                        if (!lock[ix]) {
                                            if (videos[ix].paused) {
                                                lockInit(ix);
                                                setTimeout(function () {
                                                    videos[ix].paused ? videos[ix].play() : '';
                                                }, 200);
                                            } else {
                                                lockInit(ix);
                                                setTimeout(function () {
                                                    videos[ix].pause();
                                                }, 200);
                                            }
                                        }
                                    };
                                })(ix)
                            );
                            video.addEventListener('pause', function () {
                                pauseButtons[ix].classList.remove('inactive');
                            });
                            video.addEventListener('play', function () {
                                pauseButtons[ix].classList.add('inactive');
                            });
                            pauseButtons[ix].addEventListener(ev, function () {
                                if (!lock[ix]) {
                                    videos[ix].paused
                                        ? setTimeout(function () {
                                            videos[ix].play();
                                        }, 1)
                                        : setTimeout(function () {
                                            videos[ix].pause();
                                        }, 1);
                                    lockInit(ix);
                                }
                            });
                        });
                    }
                }
            }
        },
        constructor: Utils
    };

    window.AmpCa = window.AmpCa || {};
    window.AmpCa.Utils = Utils;
})();

/*===========================
 Utils AMD Export
 ===========================*/
if (typeof module !== 'undefined') {
    module.exports = window.AmpCa.Utils;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.AmpCa.Utils;
    });
}
