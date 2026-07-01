import UrlMgr from "../../service/UrlMgr";
import HotUpdate from "../Event/HotUpdate";
import SdkHelper from "./SdkHelper";
import EngineUtil from "./EngineUtil";

const {
    ccclass,
    property
} = cc._decorator;
@ccclass
export default class HttpUtil {
    static timeOut = 15000;

    static Post(e, t) {
        var o = this,
            n = 9999,
            s = Date.now();
        setTimeout(function () {
        }, 3000);
        return new Promise(function (a, c) {
            var s = new XMLHttpRequest();
            s.timeout = o.timeOut;
            s.onreadystatechange = function () {
                if (4 == s.readyState) {
                    n = s.status;
                    if (s.status >= 200 && s.status < 400) {
                        var t = s.responseText;
                        if (t) {
                            var o = JSON.parse(t),
                                l = o;
                            if (o && o.ecp) {
                                l = SdkHelper.getAesDncrypData(o.data);
                                l = JSON.parse(l);
                            }
                            o && !o.ecp && console.log("不解密");
                            console.log("网络 ", e, JSON.stringify(l));
                            if (e.includes(UrlMgr.getInstance().baseTestUrl) || e.includes(UrlMgr.getInstance().baseUrl)) {
                                var u = l.code;
                                if (u < 0 && -1010 != u) {
                                    if (-2015 == u) {
                                        SdkHelper.showToast(l.message);
                                        return;
                                    }
                                    SdkHelper.showToast(l.message);
                                    c(l);
                                    return;
                                }
                                a(l);
                                return;
                            }
                            a(l);
                        } else {
                            console.log("返回数据不存在");
                            c({
                                code: -1,
                                message: "返回数据不存在",
                                http_status: s.status
                            });
                        }
                    } else a({
                        code: -100,
                        message: "xhr.status" + s.status,
                        http_status: s.status
                    });
                }
            };
            s.open("POST", e, true);
            s.setRequestHeader("Content-type", "multipart/form-data;boundary=AaB03x");
            SdkHelper.setXhrCookie(s);
            s.send(t.arrayBuffer());
            s.addEventListener("abort", function () {
                a({
                    code: -100,
                    message: "onXhr.abort",
                    http_status: s.status
                });
            });
            s.addEventListener("error", function () {
                a({
                    code: -100,
                    message: "onXhr.error",
                    http_status: s.status
                });
            });
            s.addEventListener("timeout", function () {
                a({
                    code: -101,
                    message: "onXhr.timeout",
                    http_status: s.status
                });
            });
        }).finally(function () {
            if (HotUpdate.getInstance().isOnlineRelease() && EngineUtil.getRandomNum(1, 100) <= 5) {
                var t = Date.now() - s;
                SdkHelper.reportData("http_monitor", {
                    request_path: e,
                    response_code: n,
                    response_time: t
                });
            }
        });
    }

    static Get(e, t, o) {
        var n = new XMLHttpRequest();
        n.timeout = this.timeOut;
        n.ontimeout = function () {
            cc.log("[tydf.https] get: request time out.");
            o && o(false);
        };
        n.onreadystatechange = function () {
            if (4 === n.readyState && o) if (200 == n.status) {
                var e = JSON.parse(n.responseText);
                o && o(e);
            } else o && o(false);
        };
        n.onerror = function () {
            console.log("There was an error!");
            o && o(false);
        };
        n.open("GET", encodeURI(e), true);
        n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        n.send();
    }
}