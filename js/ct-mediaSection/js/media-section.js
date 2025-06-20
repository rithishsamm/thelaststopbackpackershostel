! function(e, t, a) {
    "use strict";

    function s(t, a) {
        this.element = e(t), this.settings = e.extend(!0, {}, n, a), this.selfdefaults = n, this.selfname = i, Function.prototype.bind || (Function.prototype.bind = function(e) {
            if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var t = Array.prototype.slice.call(arguments, 1),
                a = this,
                s = function() {},
                i = function() {
                    return a.apply(this instanceof s && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
                };
            return s.prototype = this.prototype, i.prototype = new s, i
        }), this.init()
    }
    var i = "mediaSection",
        n = {
            parallax: {
                backgroundRatio: .3,
                horizontalScrolling: !1,
                verticalScrolling: !0,
                responsive: !0,
                horizontalOffset: 0,
                verticalOffset: 0,
                parallaxBackgrounds: !0,
                parallaxElements: !0,
                scrollProperty: "scroll",
                positionProperty: "position",
                hideDistantElements: !0
            },
            kenburns: {
                speed: 7e3
            },
            video: {
                startAt: 1,
                volume: 0
            },
            centerMode: !0,
            height: 1,
            background: "",
            backgroundMobile: "",
            disableMobile: !0
        };
    e.extend(s.prototype, {
        init: function() {
            var t = this,
                a = t.element,
                s = a.attr("data-type") || "",
                i = e("html");
            t.settings.centerMode && "false" !== a.attr("data-centerMode") || a.addClass("noVCenter"), e.browser.mozilla && i.addClass("browser-mozilla"), e.browser.webkit && i.addClass("browser-webkit"), e.browser.msie && i.addClass("browser-msie"), e.browser.safari && i.addClass("browser-safari"), t.setBackground(), t.setHeight(), (!device.mobile() || "true" != a.attr("data-disable-mobile") && !t.settings.disableMobile) && ("parallax" === s ? t.createParallax() : "kenburns" === s ? t.createKenBurns() : "video" === s && t.createVideo()), (device.mobile() || device.ipad() || device.androidTablet()) && a.css("background-attachment", "scroll"), ("true" == a.attr("data-disable-mobile") || t.settings.disableMobile) && device.mobile() && (a.find(".ct-mediaSection-video").css("display", "none"), a.find(".ct-mediaSection-kenburns").css("display", "none"))
        },
        setBackground: function() {
            var t = this,
                a = t.element,
                s = "",
                i = "",
                n = e("html");
            a.attr("data-background") ? s = a.attr("data-background") : t.settings.background && (s = t.settings.background), a.attr("data-background-mobile") ? i = a.attr("data-background-mobile") : t.settings.backgroundMobile && (i = t.settings.backgroundMobile), "#" === s.substr(0, 1) ? a.css("background-color", s) : i && device.mobile() ? a.css("background-image", "url(" + i + ")") : n.hasClass("ie8") ? a.css("background", "url(" + s + ")") : a.css("background-image", "url(" + s + ")")
        },
        setHeight: function() {
            var a = this,
                s = a.element,
                i = "0",
                n = t.innerHeight > 0 ? t.innerHeight : screen.height,
                r = e("html");
            if (i = s.attr("data-height") ? s.attr("data-height") : a.settings.height, i.indexOf("%") > -1) {
                var l = n * (parseInt(i, 10) / 100) + "px";
                r.hasClass("browser-safari") ? s.css("height", l) : s.css("min-height", l)
            } else {
                var l = parseInt(i, 10) + "px";
                r.hasClass("browser-safari") ? s.css("height", l) : s.css("min-height", l)
            }
        },
        makekenburns: function(e) {
            function a() {
                1 !== n && (r === n && (r = 0), i[r].className = "fx", 0 === r && (i[n - 2].className = ""), 1 === r && (i[n - 1].className = ""), r > 1 && (i[r - 2].className = ""), r++)
            }
            var s = this;
            e.find("img")[0].className = "fx";
            var i = e.find("img"),
                n = i.length,
                r = 1,
                l = parseInt(s.settings.kenburns.speed, 10);
            1 === n && (i[0].className = "singlefx"), t.setInterval(a, l)
        },
        createKenBurns: function() {
            var t = this,
                a = t.element,
                s = a.find(".ct-mediaSection-kenburns"),
                i = s.find("img");
            device.mobile() || device.ipad() || device.androidTablet() ? i.each(function() {
                e(this).remove()
            }) : t.makekenburns(s)
        },
        createVideo: function() {
            var s = this,
                i = s.element,
                n = 1,
                r = t.innerWidth > 0 ? t.innerWidth : screen.width;
            if (i.hasClass("html5")) a.getElementById("video1").play();
            else {
                var l = i.find("iframe");
                if (l.attr("data-startat") ? n = l.attr("data-startat") : s.settings.video.startAt && (n = s.settings.video.startAt), !(992 > r || device.mobile()) && "undefined" != typeof $f) {
                    {
                        var o = "#" + $videoframe.attr("id"),
                            d = e(o)[0],
                            c = $f(d);
                        e(".status")
                    }
                    c.addEvent("ready", function() {
                        c.api("setVolume", s.settings.video.volume), c.api("seekTo", n)
                    })
                }
            }
        },
        createParallax: function() {
            var a = this,
                s = a.element;
            s.attr("data-stellar-background-ratio") || s.attr("data-stellar-background-ratio", a.settings.parallax.backgroundRatio), e(t).on("load", function() {
                e(t).stellar() || e(t).stellar({
                    horizontalScrolling: a.settings.parallax.horizontalScrolling,
                    verticalScrolling: a.settings.parallax.verticalScrolling,
                    responsive: a.settings.parallax.responsive,
                    horizontalOffset: a.settings.parallax.horizontalOffset,
                    verticalOffset: a.settings.parallax.verticalOffset,
                    parallaxBackgrounds: a.settings.parallax.parallaxBackgrounds,
                    parallaxElements: a.settings.parallax.parallaxElements,
                    scrollProperty: a.settings.parallax.scrollProperty,
                    positionProperty: a.settings.parallax.positionProperty,
                    hideDistantElements: a.settings.parallax.hideDistantElements
                })
            })
        }
    }), e.fn[i] = function(t) {
        return this.each(function() {
            e.data(this, "pluginself" + i) || e.data(this, "pluginself" + i, new s(this, t))
        })
    }
}(jQuery, window, document);