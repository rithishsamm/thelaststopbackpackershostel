! function() {
    "use strict";

    function e() {
        M.keyboardSupport && f("keydown", r)
    }

    function t() {
        if (window.getComputedStyle || (window.getComputedStyle = function(e) {
                return this.el = e, this.getPropertyValue = function(t) {
                    var o = /(\-([a-z]){1})/g;
                    return "float" == t && (t = "styleFloat"), o.test(t) && (t = t.replace(o, function() {
                        return arguments[2].toUpperCase()
                    })), e.currentStyle[t] ? e.currentStyle[t] : null
                }, this
            }), !H && document.body) {
            H = !0;
            var t = document.body,
                o = document.documentElement,
                n = window.innerHeight,
                r = t.scrollHeight;
            if (z = document.compatMode.indexOf("CSS") >= 0 ? o : t, S = t, e(), top != self) C = !0;
            else if (r > n && (t.offsetHeight <= n || o.offsetHeight <= n)) {
                var a = document.createElement("div");
                a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + z.scrollHeight + "px", document.body.appendChild(a);
                var l, i = function() {
                    l || (l = setTimeout(function() {
                        T || (a.style.height = "0", a.style.height = z.scrollHeight + "px", l = null)
                    }, 500))
                };
                setTimeout(i, 10);
                if (z.offsetHeight <= n) {
                    var u = document.createElement("div");
                    u.style.clear = "both", t.appendChild(u)
                }
            }
            M.fixedBackground || T || (t.style.backgroundAttachment = "scroll", o.style.backgroundAttachment = "scroll")
        }
    }

    function o(e, t, o) {
        if (h(t, o), 1 != M.accelerationMax) {
            var n = Date.now(),
                r = n - K;
            if (r < M.accelerationDelta) {
                var a = (1 + 50 / r) / 2;
                a > 1 && (a = Math.min(a, M.accelerationMax), t *= a, o *= a)
            }
            K = Date.now()
        }
        if (L.push({
                x: t,
                y: o,
                lastX: 0 > t ? .99 : -.99,
                lastY: 0 > o ? .99 : -.99,
                start: Date.now()
            }), !A) {
            var l = e === document.body,
                i = function() {
                    for (var n = Date.now(), r = 0, a = 0, u = 0; u < L.length; u++) {
                        var c = L[u],
                            d = n - c.start,
                            s = d >= M.animationTime,
                            f = s ? 1 : d / M.animationTime;
                        M.pulseAlgorithm && (f = b(f));
                        var m = c.x * f - c.lastX >> 0,
                            h = c.y * f - c.lastY >> 0;
                        r += m, a += h, c.lastX += m, c.lastY += h, s && (L.splice(u, 1), u--)
                    }
                    l ? window.scrollBy(r, a) : (r && (e.scrollLeft += r), a && (e.scrollTop += a)), t || o || (L = []), L.length ? P(i, e, 1e3 / M.frameRate + 1) : A = !1
                };
            P(i, e, 0), A = !0
        }
    }

    function n(e) {
        if (jQuery.browser.msie) {
            H || t();
            var n = e.target,
                r = u(n);
            if (!r || e.defaultPrevented || e.ctrlKey) return !0;
            if (m(S, "embed") || m(n, "embed") && /\.pdf/i.test(n.src) || m(S, "object")) return !0;
            var a = -e.wheelDeltaX || e.deltaX || 0,
                i = -e.wheelDeltaY || e.deltaY || 0;
            if (Y && (e.wheelDeltaX && p(e.wheelDeltaX, 120) && (a = -120 * (e.wheelDeltaX / Math.abs(e.wheelDeltaX))), e.wheelDeltaY && p(e.wheelDeltaY, 120) && (i = -120 * (e.wheelDeltaY / Math.abs(e.wheelDeltaY)))), a || i || (i = -e.wheelDelta || 0), 1 === e.deltaMode && (a *= 40, i *= 40), !M.touchpadSupport && w(i)) return !0;
            Math.abs(a) > 1.2 && (a *= M.stepSize / 120), Math.abs(i) > 1.2 && (i *= M.stepSize / 120), o(r, a, i), e.preventDefault(), l()
        }
    }

    function r(e) {
        var t = e.target,
            n = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== B.spacebar;
        "undefined" === !document.contains ? -1 != !document.indexOf(S) && (S = document.activeElement) : document.contains(S) || (S = document.activeElement);
        var r = /^(textarea|select|embed|object)$/i,
            a = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (r.test(t.nodeName) || m(t, "input") && !a.test(t.type) || m(S, "video") || g(e) || t.isContentEditable || e.defaultPrevented || n) return !0;
        if ((m(t, "button") || m(t, "input") && a.test(t.type)) && e.keyCode === B.spacebar) return !0;
        var i, c = 0,
            d = 0,
            s = u(S),
            f = s.clientHeight;
        switch (s == document.body && (f = window.innerHeight), e.keyCode) {
            case B.up:
                d = -M.arrowScroll;
                break;
            case B.down:
                d = M.arrowScroll;
                break;
            case B.spacebar:
                i = e.shiftKey ? 1 : -1, d = -i * f * .9;
                break;
            case B.pageup:
                d = .9 * -f;
                break;
            case B.pagedown:
                d = .9 * f;
                break;
            case B.home:
                d = -s.scrollTop;
                break;
            case B.end:
                var h = s.scrollHeight - s.scrollTop - f;
                d = h > 0 ? h + 10 : 0;
                break;
            case B.left:
                c = -M.arrowScroll;
                break;
            case B.right:
                c = M.arrowScroll;
                break;
            default:
                return !0
        }
        o(s, c, d), e.preventDefault(), l()
    }

    function a(e) {
        S = e.target
    }

    function l() {
        clearTimeout(x), x = setInterval(function() {
            O = {}
        }, 1e3)
    }

    function i(e, t) {
        for (var o = e.length; o--;) O[N(e[o])] = t;
        return t
    }

    function u(e) {
        var t = [],
            o = document.body,
            n = z.scrollHeight;
        do {
            var r = O[N(e)];
            if (r) return i(t, r);
            if (t.push(e), n === e.scrollHeight) {
                var a = d(z) && d(o),
                    l = a || s(z);
                if (C && c(z) || !C && l) return i(t, R())
            } else if (c(e) && s(e)) return i(t, e)
        } while (e = e.parentElement)
    }

    function c(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }

    function d(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "hidden" !== t
    }

    function s(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }

    function f(e, t) {
        window.addEventListener ? window.addEventListener(e, t, !1) : window.attachEvent("on" + e, t, !1)
    }

    function m(e, t) {
        return (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }

    function h(e, t) {
        e = e > 0 ? 1 : -1, t = t > 0 ? 1 : -1, (E.x !== e || E.y !== t) && (E.x = e, E.y = t, L = [], K = 0)
    }

    function w(e) {
        return e ? (X.length || (X = [e, e, e]), e = Math.abs(e), X.push(e), X.shift(), clearTimeout(k), k = setTimeout(function() {
            window.localStorage && (localStorage.SS_deltaBuffer = X.join(","))
        }, 1e3), !v(120) && !v(100)) : void 0
    }

    function p(e, t) {
        return Math.floor(e / t) == e / t
    }

    function v(e) {
        return p(X[0], e) && p(X[1], e) && p(X[2], e)
    }

    function g(e) {
        var t = e.target,
            o = !1;
        if (-1 != document.URL.indexOf("www.youtube.com/watch"))
            do
                if (o = t.classList && -1 != t.classList.indexOf("html5-video-controls")) break; while (t = t.parentNode);
        return o
    }

    function y(e) {
        var t, o, n;
        return e *= M.pulseScale, 1 > e ? t = e - (1 - Math.exp(-e)) : (o = Math.exp(-1), e -= 1, n = 1 - Math.exp(-e), t = o + n * (1 - o)), t * M.pulseNormalize
    }

    function b(e) {
        return e >= 1 ? 1 : 0 >= e ? 0 : (1 == M.pulseNormalize && (M.pulseNormalize /= y(1)), y(e))
    }
    var S, x, k, D = {
            frameRate: 150,
            animationTime: 450,
            stepSize: 120,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 20,
            accelerationMax: 1,
            keyboardSupport: !0,
            arrowScroll: 50,
            touchpadSupport: !0,
            fixedBackground: !0,
            excluded: ""
        },
        M = D,
        T = !1,
        C = !1,
        E = {
            x: 0,
            y: 0
        },
        H = !1,
        z = document.documentElement,
        X = [],
        Y = /^Mac/.test(navigator.platform),
        B = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            spacebar: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36
        },
        M = D,
        L = [],
        A = !1,
        K = Date.now(),
        N = function() {
            var e = 0;
            return function(t) {
                return t.uniqueID || (t.uniqueID = e++)
            }
        }(),
        O = {};
    window.localStorage && localStorage.SS_deltaBuffer && (X = localStorage.SS_deltaBuffer.split(","));
    var q, P = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, o) {
                window.setTimeout(e, o || 1e3 / 60)
            }
        }(),
        R = (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, function() {
            var e;
            return function() {
                if (!e) {
                    var t = document.createElement("div");
                    t.style.cssText = "height:10000px;width:1px;", document.body.appendChild(t); {
                        var o = document.body.scrollTop;
                        document.documentElement.scrollTop
                    }
                    window.scrollBy(0, 1), e = document.body.scrollTop != o ? document.body : document.documentElement, window.scrollBy(0, -1), document.body.removeChild(t)
                }
                return e
            }
        }());
    "onwheel" in document.createElement("div") ? q = "wheel" : "onmousewheel" in document.createElement("div") && (q = "mousewheel"), q && (f(q, n), f("mousedown", a), f("load", t))
}();