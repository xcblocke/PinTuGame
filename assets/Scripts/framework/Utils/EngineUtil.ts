import EventMgr from "../Event/EventMgr";
import GameEventType from "../Event/GameEventType";
import SdkHelper from "./SdkHelper";
import { GAME_NAME } from "../SystemConfig";
import HotUpdate from "../Event/HotUpdate";
import AudioManager from "./AudioManager";
import PlayerDataSys from "./PlayerDataSys";
import GameSystem from "../../system/GameSystem";
import { GuideConfig } from "../enum/GuideConfig";
import PageMgr from "../../view/PageMgr";
import { PageEnum, VideoActionType, AdRewardType } from "../enum/AllEnum";
import AdvancedAnimComponent from "../../game/common/AdvancedAnimComponent";
import AnimUtil from "../../game/common/AnimUtil";
import GlobalApp from "../../common/GlobalApp";
import { TweenEasing } from "../../game/config/AnimeConfig";
import { CommonReport } from "../../report/CommonReport";
import AdManager from "../Platform/AdManager";
import Service from "../../service/Service";
import { RequestType } from "../../service/RequestType";
import { gameData } from "../../data/GameData";
import MakeMnGlobalData from "../../data/MakeMnGlobalData";
Date.prototype.Format = function (e) {
  var t = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
  for (var o in t) new RegExp("(" + o + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[o] : ("00" + t[o]).substr(("" + t[o]).length)));
  return e;
};
class _EngineUtil {
  toastContent = "";
  color = new cc.Color();
  showHttpToast = true;
  cocosToast3 = null;
  lastToast = false;
  mapRecord = new Map();
  promiseResolves = {};
  nodeTopParent = new Map();
  static _interface = null;
  static _getInterface() {
    _EngineUtil._interface || (_EngineUtil._interface = new _EngineUtil());
    return _EngineUtil._interface;
  }
  isOnlineRelease() {
    if (cc.sys.isBrowser || !cc.sys.isNative) return false;
    if (!jsb.fileUtils.isFileExist("projectCfg.json")) return false;
    var e = jsb.fileUtils.getStringFromFile("projectCfg.json");
    if (null != e && "" != e) {
      var t = JSON.parse(e);
      return "release" == t.version || "prod" == t.version;
    }
    return false;
  }
  localStorageGetItem(e, t) {
    var o = cc.sys.localStorage.getItem(e);
    return o && "" != o && null != o && "nan" != o ? o : t;
  }
  localStorageSetItem(e, t) {
    cc.sys.localStorage.setItem(e, t);
  }
  httpErr(e, t, o = true) {
    if (!o) {
      this.error(e);
      PageMgr.showPageByEnum(PageEnum.networkFailedPage, {
        callback: t,
        err: e
      });
      SdkHelper.reportData("httpErr", {
        response: JSON.stringify(e)
      });
    }
  }
  reconnectSuc() {
    EventMgr.trigger(GameEventType.PAGE_HIDE, "loadingPage");
    EventMgr.trigger(GameEventType.CLOSE_RECONNECT);
  }
  reconnectFai() {
    EventMgr.trigger(GameEventType.PAGE_HIDE, "loadingPage");
  }
  getColor(e) {
    e.includes("#") || (e = "#" + e);
    return this.color.fromHEX(e);
  }
  log() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    if (!HotUpdate.getInstance().isOnlineRelease()) if (cc.sys.isBrowser || !cc.sys.isNative) console.log(GAME_NAME, e);else try {
      console.log(GAME_NAME, JSON.stringify(e));
    } catch (e) {
      console.error(GAME_NAME, e);
    }
  }
  error() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    if (!HotUpdate.getInstance().isOnlineRelease()) if (cc.sys.isNative) try {
      console.error(GAME_NAME, JSON.stringify(e));
    } catch (e) {
      console.error(GAME_NAME, e);
    } else console.error(GAME_NAME, e);
  }
  setLocalData(e, t) {
    cc.sys.localStorage.setItem(e, t);
  }
  getLocalData(e, t = null) {
    var o = cc.sys.localStorage.getItem(e);
    return null !== o ? o : t;
  }
  getRandId() {
    return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36);
  }
  getTimeStamp() {
    return Math.floor(Date.now() / 1000);
  }
  isLargeScreen() {
    var e = cc.winSize.height / cc.winSize.width;
    return Number(e.toFixed(2)) > 2;
  }
  loadRemoteAsset(e) {
    return new Promise(function (t, o) {
      cc.assetManager.loadRemote(e, function (n, i) {
        if (n) {
          console.error("加载远程资源错误url:" + e, n);
          o();
        }
        t(i);
      });
    });
  }
  loadRemoteImg(e, t = ".png") {
    return new Promise(function (o, n) {
      cc.assetManager.loadRemote(e, {
        ext: t
      }, function (t, i) {
        if (t) {
          console.error("加载远程图片资源错误url:" + e, t);
          n();
        }
        o(i);
      });
    });
  }
  loadResourceAsset(e) {
    return new Promise(function (t, o) {
      cc.resources.load(e, function (n, i) {
        if (n) {
          console.error("加载resource错误url:" + e, n);
          o(n);
        }
        t(i);
      });
    });
  }
  loadPrefabByUrl(e) {
    return new Promise(function (t, o) {
      cc.loader.loadRes("prefabs/" + e, function (n, i) {
        if (n) {
          console.error("加载resource错误url:" + e, n);
          o(n);
        }
        t(i);
      });
    });
  }
  loadFrames(e) {
    return new Promise(function (t) {
      if (e) {
        cc.resources.loadDir("img/" + e, cc.SpriteFrame, function (e, o) {
          if (e) {
            console.log("manageLoadRes error", e);
          } else {
            t(o);
          }
        });
      } else {
        t([]);
      }
    });
  }
  loadFrame(e) {
    return new Promise(function (t) {
      if (e) {
        cc.loader.loadRes("img/" + e, cc.SpriteFrame, function (e, o) {
          if (e) {
            console.log("manageLoadRes error", e);
          } else {
            t(o);
          }
        });
      } else {
        t(null);
      }
    });
  }
  formatTime(e) {
    var t = Math.floor(e / 60 << 0),
      o = Math.floor(e % 60);
    t < 10 && (t = "0" + t);
    o < 10 && (o = "0" + o);
    return t + ":" + o;
  }
  formatHourTime(e) {
    var t = Math.round((e - 1800) / 3600),
      o = Math.round((e - 30) / 60) % 60,
      n = Math.floor(e % 60);
    t < 10 && (t = "0" + t);
    o < 10 && (o = "0" + o);
    n < 10 && (n = "0" + n);
    return t + ":" + o + ":" + n;
  }
  getRandomNum(e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e;
  }
  getProgressWidth(e, t, o) {
    var n = Math.ceil(e * o);
    0 != n && n < t && (n = t);
    n > o && (n = o);
    var i = Math.ceil(100 * e);
    isNaN(i) && (i = 1);
    return {
      width: n,
      persent: i
    };
  }
  getPosByRot(e, t) {
    var o = e * Math.cos(2 * Math.PI / 360 * (90 - t)),
      n = e * Math.sin(2 * Math.PI / 360 * (90 - t));
    return cc.v2(o, n);
  }
  getRotation(e, t) {
    var o = 0,
      n = e.sub(t).mag(),
      i = Math.abs(e.y - t.y),
      a = 57 * Math.asin(i / n);
    o = t.x > e.x ? t.y > e.y ? 90 - a : 90 + a : t.y > e.y ? -(90 - a) : -(90 + a);
    isNaN(o) && (o = 0);
    if (0 > o) {
      var r = Math.abs(o);
      r > 90 && (o = 180 - r + 180);
      o = 90 - r + 270;
    }
    return this.getRotTo360(o);
  }
  getRotTo360(e) {
    var t = 0;
    0 == (t = 0 < e ? e % 360 : 360 - Math.abs(e) % 360) && (t = 360);
    return t;
  }
  getDistance(e, t) {
    return e.sub(t).mag();
  }
  getFormatScore(e) {
    if (e < 1000000) return e;
  }
  printCurrentTime(e) {
    this.isOnlineRelease() || console.log("timePrintFor", e, this.getCurrentTime());
  }
  getCurrentTime() {
    var e = new Date();
    return e.getHours().toString().padStart(2, "0") + ":" + e.getMinutes().toString().padStart(2, "0") + ":" + e.getSeconds().toString().padStart(2, "0");
  }
  oneDayLocalStorage(e, t = 0, o = false) {
    var n = cc.sys.localStorage.getItem(e);
    null == (n = n ? JSON.parse(n) : {
      date: new Date().Format("yyyy-MM-dd"),
      count: 0
    }).count && (n.count = 0);
    if (n.date == new Date().Format("yyyy-MM-dd")) n.count += t;else {
      n.date = new Date().Format("yyyy-MM-dd");
      n.count = t;
    }
    o && (n.count = 0);
    cc.sys.localStorage.setItem(e, JSON.stringify(n));
    return n;
  }
  formatDate(e, t = "-") {
    var o = new Date(e);
    return "" + o.getFullYear() + t + (o.getMonth() + 1) + t + o.getDate();
  }
  formatDateStr(e, t = "年", o = "月", n = "日") {
    var i = new Date(e);
    return "" + i.getFullYear() + t + (i.getMonth() + 1) + o + i.getDate() + n;
  }
  showCocosToast2(e = "") {
    this.showCocosToast3(e);
  }
  showCocosToast3(e = "") {
    var t = this;
    if (e && !this.lastToast) if (this.cocosToast3) {
      var o = cc.instantiate(this.cocosToast3);
      PageMgr.setToastNode(o);
      o.getComponentInChildren(cc.Label).string = e;
      o.zIndex = 888;
      o.scale = 0;
      this.lastToast = true;
      o.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.moveBy(0.4, 0, 48), cc.callFunc(function () {
        t.lastToast = false;
      }), cc.moveBy(0.6, 0, 72), cc.fadeOut(0.3), cc.callFunc(function () {
        o.parent = null;
        o.destroy();
      })));
    } else cc.loader.loadRes("prefabs/cocosToast3", cc.Prefab, function (o, n) {
      if (!o) {
        t.cocosToast3 = n;
        t.showCocosToast3(e);
      }
    });
  }
  nameFormat(e, t = 12) {
    if (!e) return "用户不存在";
    for (var o = e.split(""), n = o.length, i = 0, a = "", r = "", c = new RegExp("[一-龥]+"), s = 0; s < n; s++) {
      var l = o[s];
      if (c.test(l)) {
        i += 2;
      } else {
        i++;
      }
      if (i > 12) {
        r = "...";
        break;
      }
      a += l;
    }
    return a + r;
  }
  convertNodePosition(e, t) {
    if (e && e.parent && t && t.parent) return e.parent.convertToNodeSpaceAR(t.parent.convertToWorldSpaceAR(t.position));
  }
  GetChildByName(e, t, o) {
    var n = e.node ? e.node : e,
      i = null;
    if (n && t) {
      i = n.getChildByName(t);
      if (o && !i) for (var a = n.children, r = n.childrenCount, c = 0; c < r && !(i = this.GetChildByName(a[c], t, o)); ++c);
    }
    return i;
  }
  loadResourceJson(e) {
    return new Promise(function (t, o) {
      cc.resources.load(e, function (n, i) {
        if (n) {
          console.error("加载json错误url:" + e, n);
          o(n);
        }
        t(i);
      });
    });
  }
  setUserNameAndHeadImage(e, t) {
    e && (e.string = this.nameFormat(PlayerDataSys.nickname));
    if (PlayerDataSys.headimgurl && t) {
      if ("1" == PlayerDataSys.headimgurl) return;
      this.loadRemoteImg(PlayerDataSys.headimgurl).then(function (e) {
        t.spriteFrame = new cc.SpriteFrame(e);
      }).catch(function (e) {
        console.log(e);
      });
    }
  }
  setNodeSprieFrame(e, t) {
    cc.resources.load(t, cc.SpriteFrame, function (t, o) {
      if (t) {
        console.log(t);
      } else {
        e.getComponent(cc.Sprite).spriteFrame = o;
      }
    });
  }
  loaderHead(e, t) {
    e && "1" != e && cc.assetManager.loadRemote(e, {
      ext: ".png"
    }, function (e, o) {
      if (e) cc.log("头像加载失败", e);else try {
        t.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(o);
      } catch (e) {
        t && console.log("?????????????????头像报错了", t.name, t.parent ? t.parent.name : "无parent");
      }
    });
  }
  subUserName(e, t = 8) {
    return e ? "" != e && e.length > t ? e.substring(0, t) : e : "用户不存在";
  }
  hexToColor(e) {
    e = e.replace(/^#/, "");
    var t = parseInt(e.substring(0, 2), 16),
      o = parseInt(e.substring(2, 4), 16),
      n = parseInt(e.substring(4, 6), 16);
    return new cc.Color(t, o, n);
  }
  shuffleArray(e, t = null) {
    var o, n;
    for (var i = e.length - 1; i > 0; i--) {
      var a = Math.floor(Math.random() * (i + 1));
      o = [e[a], e[i]], e[i] = o[0], e[a] = o[1];
      t && (n = [t[a], t[i]], t[i] = n[0], t[a] = n[1]);
    }
    return e;
  }
  registerBtnEvent(e, t, o, n = "", i = {}) {
    if (cc.isValid(e)) {
      t && (t = t.name ? t.name : t);
      if ("function" == typeof t) {
        var a = "__BtnClick__" + this.randomKey(16);
        o[a] = t;
        t = a;
      }
      var r = e.getComponent(cc.Button);
      if (!r) {
        (r = e.addComponent(cc.Button)).transition = cc.Button.Transition.SCALE;
        r.zoomScale = 0.95;
        0 == i.isScale && (r.transition = cc.Button.Transition.NONE);
      }
      if (r && !r.clickEvents[0]) {
        var c = new cc.Component.EventHandler();
        c.target = o.node;
        c.component = cc.js.getClassName(o);
        c.handler = t;
        c.customEventData = n;
        r.clickEvents[0] = c;
        for (var s in i) i.hasOwnProperty(s) && (r[s] = i[s]);
      }
      e.on("click", function () {
        AudioManager.getInstance().playMusic("btntouch");
      });
    }
  }
  randomKey(e) {
    for (var t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], o = "", n = t.length, i = 0; i < e; i++) o += t[this.randomInt(0, n - 1)];
    return o;
  }
  randomInt(e, t) {
    if (e == t) return e;
    if (!t && 0 != t) {
      t = e[1];
      e = e[0];
    }
    return Math.floor(Math.random() * (t - e + 1)) + e;
  }
  destroyNode(e) {
    if (cc.isValid(e)) {
      e.removeFromParent(false);
      e.destroy();
    } else console.error("Tools: destroyNode error, param is invalid");
  }
  getScript(e) {
    if (!e) return null;
    for (var t = e._components, o = 0; o < t.length; o++) if (t[o] && t[o].hasOwnProperty("_super")) return t[o];
    return null;
  }
  isEmojiCharacter(e) {
    if (!e) return false;
    for (var t = 0; t < e.length; t++) {
      var o = e.charCodeAt(t);
      if (55296 <= o && o <= 56319) {
        if (e.length > 1) {
          var n = 1024 * (o - 55296) + (e.charCodeAt(t + 1) - 56320) + 65536;
          if (118784 <= n && n <= 128895) return true;
        }
      } else if (e.length > 1) {
        if (8419 == e.charCodeAt(t + 1)) return true;
      } else {
        if (8448 <= o && o <= 10239) return true;
        if (11013 <= o && o <= 11015) return true;
        if (10548 <= o && o <= 10549) return true;
        if (12951 <= o && o <= 12953) return true;
        if (169 == o || 174 == o || 12349 == o || 12336 == o || 11093 == o || 11036 == o || 11035 == o || 11088 == o) return true;
      }
    }
    return false;
  }
  setNodeToBeforeEffect(e, t = null) {
    var o = e.parent,
      n = e.getSiblingIndex(),
      i = e.worldPosition;
    e.parent = t || PageMgr.effectBefore;
    e.getComponent(AdvancedAnimComponent) && e.getComponent(AdvancedAnimComponent).stop();
    e.worldPosition = i;
    if (this.mapRecord.get(e)) {
      this.mapRecord.get(e).parent = e.parent;
    } else {
      this.mapRecord.set(e, {
        parent: o,
        index: n,
        worldPos: i,
        nowParent: e.parent
      });
    }
  }
  recoverNodeBeforeEffect(e) {
    var t = this.mapRecord.get(e);
    if (t && t.nowParent === e.parent) {
      e.parent = t.parent;
      e.setSiblingIndex(t.index);
      e.worldPosition = t.worldPos;
      e.getComponent(AdvancedAnimComponent) && e.getComponent(AdvancedAnimComponent).play();
      this.mapRecord.delete(e);
    }
  }
  hasPromiseResolve(e) {
    return this.promiseResolves[e] || null;
  }
  async getPromiseResolve(e) {
    var t, o;
    if (this.promiseResolves[e]) return this.promiseResolves[e];
    o = new Promise(function (e) {
      t = e;
    });
    this.promiseResolves[e] = {
      resolve: t,
      promise: o
    };
    return this.promiseResolves[e].promise;
  }
  triggerPromise(e, t = 0) {
    if (this.promiseResolves[e]) {
      this.promiseResolves[e].resolve(t);
      delete this.promiseResolves[e];
    }
  }
  powBigInt(e, t) {
    for (var o = BigInt(1), n = BigInt(0); n < t; n += BigInt(1)) o *= e;
    return o;
  }
  testUnHasGuide(e) {
    return !this.testHasGuide(e);
  }
  testHasGuide(e) {
    return BigInt(PlayerDataSys.guide_step_new) & this.powBigInt(BigInt(2), BigInt(e)) && !GuideConfig[e].isRepeat;
  }
  bigIntMaxNum(e, t) {
    return e < t ? t : e;
  }
  setGuideLocal(e) {
    if (!GuideConfig[e].isRepeat && !this.testHasGuide(e)) {
      PlayerDataSys.guide_step_new = PlayerDataSys.guide_step_new | this.powBigInt(BigInt(2), BigInt(e));
      GameSystem.updateGuideIno({
        guide_step_new: PlayerDataSys.guide_step_new.toString()
      });
    }
  }
  deepCopyNumberArr(e) {
    return e.map(function (e) {
      return e.slice();
    });
  }
  deepCopy(e) {
    return JSON.parse(JSON.stringify(e));
  }
  deepCopyFast(e) {
    var t = this;
    if (null === e || "object" != typeof e) return e;
    if (e instanceof Date) return new Date(e.getTime());
    if (e instanceof Array) return e.map(function (e) {
      return t.deepCopyFast(e);
    });
    if ("object" == typeof e) {
      var o = {};
      for (var n in e) e.hasOwnProperty(n) && (o[n] = this.deepCopyFast(e[n]));
      return o;
    }
    return e;
  }
  deepCopyUltra(e) {
    return "undefined" != typeof structuredClone ? structuredClone(e) : this.deepCopyFast(e);
  }
  deepCopySafe(e) {
    var t = new WeakMap();
    return function e(o) {
      if (null === o || "object" != typeof o) return o;
      if (o instanceof Date) return new Date(o.getTime());
      if (o instanceof Array) return o.map(function (t) {
        return e(t);
      });
      if (t.has(o)) return t.get(o);
      var n = {};
      t.set(o, n);
      for (var i in o) o.hasOwnProperty(i) && (n[i] = e(o[i]));
      return n;
    }(e);
  }
  formatCommonPath(e) {
    if (e && -1 !== e.indexOf("/")) for (var t = e.split("/"), o = 0; o < t.length; o++) t[o];
    return e;
  }
  randomIntOne(e) {
    return Math.floor(Math.random() * e);
  }
  addBehindFix(e) {
    return "" + e;
  }
  addBehindFixByPath(e) {
    var t = this;
    return e.split("/").map(function (e) {
      return e ? t.addBehindFix(e) : "";
    }).join("/");
  }
  calculateDistance(e, t) {
    var o = e.worldPosition,
      n = t.worldPosition;
    return Math.sqrt(Math.pow(o.x - n.x, 2) + Math.pow(o.y - n.y, 2));
  }
  sleep(e, t, o = true) {
    return GlobalApp.GameMain && o ? new Promise(function (o) {
      GlobalApp.GameMain.scheduleOnce(function () {
        o(true);
        null == t || t();
      }, e / 1000);
    }) : new Promise(function (o) {
      setTimeout(function () {
        o(true);
        null == t || t();
      }, e);
    });
  }
  formatTimeToInternational(e, t = false) {
    if (e <= 0) return t ? "0s" : "0m";
    var o = Math.floor(e / 86400),
      n = Math.floor(e % 86400 / 3600),
      i = Math.floor(e % 3600 / 60),
      a = Math.floor(e % 60),
      r = [];
    if (o > 0) {
      r.push(o + "d");
      n > 0 && r.push(n + "h");
    } else if (n > 0) {
      r.push(n + "h");
      i > 0 && r.push(i + "m");
    } else {
      i > 0 && r.push(i + "m");
      (a > 0 || 0 === i && 0 === a) && r.push(a + "s");
    }
    return 0 === r.length ? t ? "0s" : "0m" : r.join(" ");
  }
  async isOppoAd() {
    if (PlayerDataSys.isOppoReviewer()) {
      if (!(await PageMgr.showPageByEnum(PageEnum.oppoAdPage, {}))) return false;
    }
    return true;
  }
  async playVideoCommon(e, t = 0, o?, n = false, r = 0, c = {}) {
    var i, l;
    i = {
      isOk: false
    };
    try {
      SdkHelper.reportData("event_error_test", {
        msgg: "视频开始播放"
      });
      AudioManager.getInstance().playNativeMusic("video_big_reward");
      SdkHelper.showForceToast("看完广告<br><font color='#F74708'>领取大额奖励</font>");
      PageMgr.openEventBlock("playVideoCommon");
      CommonReport.instance.reportGameAdPlay({
        page_id: e,
        action_type: VideoActionType.click,
        force: r,
        ext_param: {
          prop_type: t
        }
      });
      AdManager.getInstance().playVideoAd(this.success.bind(this, e, t, true, o, n, r, c, i), this.success.bind(this, e, t, false, o, n, r, c, i));
      await this.sleep(5000);
      if (!i.isOk) {
        SdkHelper.reportData("event_error_test", {
          msgg: "触发超时回调"
        });
        this.success(e, t, false, o, n, r, c, i);
      }
      return;
    } catch (__error_1_0) {
      l = __error_1_0;
      console.error(l);
      this.success(e, t, false, o, n, r, c, i);
    }
    return;
  }
  success(e, t = 0, o = true, r?, c = false, l = 0, u = {}, p = null) {
    var d = this;
    if (p.isOk) SdkHelper.reportData("event_error_test", {
      msgg: "重新触发了"
    });else {
      SdkHelper.reportData("event_error_test", {
        msgg: "视频回调成功"
      });
      PageMgr.closeEventBlock("playVideoCommon");
      p.isOk = true;
      o || SdkHelper.showForceToast("未看完广告<br><font color='#F74708'>只领取了少量奖励</font>");
      PageMgr.closeEventBlock("playVideoCommon");
      CommonReport.instance.reportGameAdPlay({
        page_id: e,
        action_type: o ? VideoActionType.succ : VideoActionType.fail,
        force: l,
        ext_param: {
          prop_type: t
        }
      });
      GameSystem.videoReward({
        video_type: e,
        force_type: 0,
        is_over: o
      }).then(async function (t) {
        const __async_this = d;
        var m = GlobalApp.MakeMnProcessComp;
        m && m.levelBorardGrp && m.levelBorardGrp.updateActiveNum(t.data.activity_num);
        t.data && t.data.prop_info && (gameData.startgameData.prop_info = t.data.prop_info);
        const hasPropReward = !!(u && ((u.propCount || 0) > 0 || (u.propCount2 || 0) > 0));
        if (c || !t.data.cash_reward && !t.data.gold_reward && !hasPropReward) {
          null == r || r(t.data);
          return;
        }
        if (hasPropReward && null != r) {
          r(t.data);
          r = null;
        }
        if (e == AdRewardType.settlement) {
          1 == gameData.startgameData.game_level && (t.data.cash_reward = MakeMnGlobalData.pass1CashReward);
          2 == gameData.startgameData.game_level && (t.data.cash_reward = MakeMnGlobalData.pass2CashReward);
        }
        await PageMgr.showPageByEnum(PageEnum.rewardToastPage, Object.assign(Object.assign({}, u), {
          goldReward: t.data.gold_reward,
          cashReward: t.data.cash_reward
        }));
        null == r || r(t.data);
        return;
      });
    }
  }
  async videoSuccess(e, t = {}) {
    if (!(0 == e.cash_reward || 0 == e.gold_reward)) {
      await PageMgr.showPageByEnum(PageEnum.rewardToastPage, Object.assign({
        goldReward: e.gold_reward,
        cashReward: e.cash_reward,
        cashBalance: e.cash_balance,
        goldBalance: e.gold_balance
      }, t));
      return;
    } else {
      return;
    }
  }
  updateFlyBalance() {}
  async noWatchVideo(e, t = {}) {
    var o, n;
    try {
      (o = await Service.commonApiPost(RequestType.OnlyReward, {
        type: e,
        code: 0
      })).data.cash_reward = o.data.reward;
      if (e == AdRewardType.settlement) {
        1 == gameData.startgameData.game_level && (o.data.cash_reward = MakeMnGlobalData.pass1CashReward);
        2 == gameData.startgameData.game_level && (o.data.cash_reward = MakeMnGlobalData.pass2CashReward);
      }
      await this.videoSuccess(o.data, t);
    } catch (__error_0_0) {
      n = __error_0_0;
      console.error(n);
    }
    return;
  }
  showNumTween(e, t = function () {}, o = function () {}) {
    return cc.tween({
      num: 0
    }).to(e, {
      num: 100
    }, {
      progress: function (e, o, n, i) {
        t(i);
      }
    }).call(function () {
      o();
    }).start();
  }
  hidePropNode(e) {
    (e = e.filter(function (e) {
      return null == e ? void 0 : e.activeInHierarchy;
    })).forEach(function (e) {
      if (e) {
        e.scale = 0;
        e.opacity = 0;
        cc.Tween.stopAllByTarget(e);
      }
    });
  }
  showPropNode(e, t = 0.1) {
    PageMgr.openEventBlock("showPropNode");
    this.hidePropNode(e);
    return new Promise(function (o) {
      e.forEach(function (n, i) {
        if (n) {
          cc.tween(n).delay(t * i).call(function () {
            n.opacity = 255;
          }).to(0.6, {
            scale: 1
          }, {
            easing: TweenEasing.elasticOut
          }).call(function () {
            n === e[e.length - 1] && o(true);
          }).start();
          i == e.length - 1 && PageMgr.closeEventBlock("showPropNode");
        }
      });
    });
  }
  setNodeToTop(e) {
    if (this.nodeTopParent.get(e)) this.nodeTopParent.get(e)[1]++;else {
      this.nodeTopParent.set(e, [e.parent, 1]);
      e.getComponent(cc.Button) && (e.getComponent(cc.Button).enabled = false);
      var t = e.worldPosition;
      e.parent = PageMgr.effectBefore;
      e.worldPosition = t;
      AnimUtil.popAnim(e);
    }
  }
  recoverNodeToTop(e) {
    var t;
    if (this.nodeTopParent.get(e)) {
      this.nodeTopParent.get(e)[1]--;
      if (!((null === (t = this.nodeTopParent.get(e)) || void 0 === t ? void 0 : t[1]) > 0)) {
        e.getComponent(cc.Button) && (e.getComponent(cc.Button).enabled = true);
        var o = this.nodeTopParent.get(e);
        this.nodeTopParent.delete(e);
        var n = e.worldPosition;
        e.parent = o[0];
        e.worldPosition = n;
      }
    }
  }
  shuffle2DArray(e, t = false) {
    if (!e || !Array.isArray(e)) return [];
    for (var o = [], n = 0; n < e.length; n++) if ((a = e[n]) && Array.isArray(a)) {
      var i = a.filter(function (e) {
        return null != e;
      });
      i.length > 0 && o.push(i);
    }
    for (n = 0; n < o.length; n++) for (var a, r = (a = o[n]).length - 1; r > 0; r--) {
      var c = Math.floor(Math.random() * (r + 1)),
        s = a[r];
      a[r] = a[c];
      a[c] = s;
    }
    if (t) for (n = o.length - 1; n > 0; n--) {
      c = Math.floor(Math.random() * (n + 1)), s = o[n];
      o[n] = o[c];
      o[c] = s;
    }
    return o;
  }
  transpose2DArray(e) {
    if (!e || !Array.isArray(e) || 0 === e.length) return [];
    var t = Math.max.apply(Math, e.map(function (e) {
      return e && Array.isArray(e) ? e.length : 0;
    }));
    if (0 === t) return [];
    for (var o = [], n = 0; n < t; n++) {
      for (var i = [], a = 0; a < e.length; a++) {
        var r = e[a];
        r && Array.isArray(r) && n < r.length && i.push(r[n]);
      }
      o.push(i);
    }
    return o;
  }
  formatDateToChineseDateTime(e) {
    return e.getFullYear() + "年" + String(e.getMonth() + 1).padStart(2, "0") + "月" + String(e.getDate()).padStart(2, "0") + "日 " + String(e.getHours()).padStart(2, "0") + ":" + String(e.getMinutes()).padStart(2, "0") + ":" + String(e.getSeconds()).padStart(2, "0");
  }
  formatDateToChineseDateTimeNoSeconds(e) {
    return e.getFullYear() + "年" + String(e.getMonth() + 1).padStart(2, "0") + "月" + String(e.getDate()).padStart(2, "0") + "日 " + String(e.getHours()).padStart(2, "0") + ":" + String(e.getMinutes()).padStart(2, "0");
  }
  async showAdByRule(e) {
    if (PlayerDataSys.isOppoReviewer()) {
      return await PageMgr.showPageByEnum(PageEnum.oppoAdPage, {
        cb: e
      });
    }
    e();
    return true;
  }
  netError(e, t, o = null) {
    console.log("🚀yxl ~ EngineUtil.ts:1027 ~ EngineUtil ~ netError ~ e:", JSON.stringify(e), e.message);
    console.error(e);
    if ("xhr.status0" != e.message && "onXhr.error" != e.message && 0 != e.http_status) return false;
    this.reconnectFai();
    this.httpErr(e, function () {
      t();
    }, true);
    return true;
  }
}
export default _EngineUtil._getInterface();
