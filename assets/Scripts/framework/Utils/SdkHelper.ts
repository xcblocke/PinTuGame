import CallAndroid from "../Event/CallAndroid";
import ClientData from "../Event/ClientData";
import EngineUtil from "./EngineUtil";
import CalliOS from "../Event/CalliOS";
import EventMgr from "../Event/EventMgr";
import BaseEventType from "./BaseEventType";
import AudioManager from "./AudioManager";
export default class SdkHelper {
  static EnableSDK = true;
  static EnableAndroidDecrypt = true;
  static clientData = null;
  static user_id = "";
  static comeInGameTime = 0;
  static getClientInfo() {
    SdkHelper.clientData || (!cc.sys.isBrowser && cc.sys.isNative && SdkHelper.EnableSDK ? cc.sys.os === cc.sys.OS_ANDROID ? SdkHelper.clientData = JSON.parse(CallAndroid.getInstance().getClientInfo()) : cc.sys.os === cc.sys.OS_IOS && (SdkHelper.clientData = JSON.parse(CalliOS.getInstance().getClientInfo())) : SdkHelper.clientData = {
      device_id: this.getTestDeviceId(),
      aid: "aid",
      ii: "li",
      madr: "madr",
      wmr: "wmr",
      version_name: "1.0.0.0",
      channel_name: "web"
    });
    return SdkHelper.clientData;
  }
  static getTestDeviceId() {
    var e = cc.sys.localStorage.getItem("device_id");
    if (!e) {
      e = "test-" + EngineUtil.getRandId();
      cc.sys.localStorage.setItem("device_id", e);
    }
    return e;
  }
  static requestTDId() {
    if (!cc.sys.isNative) return "";
    if (cc.sys.os === cc.sys.OS_ANDROID) {
      var e = CallAndroid.getInstance().requestTDId();
      EngineUtil.log("同盾", e);
      return e;
    }
    return cc.sys.os === cc.sys.OS_IOS ? "" : void 0;
  }
  static requestSMId() {
    cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID && CallAndroid.getInstance().requestSMId();
  }
  static getDev_token() {
    if (cc.sys.isNative) return cc.sys.os === cc.sys.OS_ANDROID && CallAndroid.getInstance().getHSToken() || "";
  }
  static getBD_did() {
    if (cc.sys.os === cc.sys.OS_ANDROID && !cc.sys.isBrowser) {
      var e = CallAndroid.getInstance().getBd_did();
      "null" == e && (e = "");
      if (e) {
        cc.sys.localStorage.setItem("bd_did", e);
        return e;
      }
      return cc.sys.localStorage.getItem("bd_did") || "";
    }
    return "";
  }
  static initOtherSDK(e) {
    if (cc.sys.os !== cc.sys.OS_ANDROID || cc.sys.isBrowser) EventMgr.trigger(BaseEventType.SDKINIT_FINISH);else {
      CallAndroid.getInstance().initOtherSDK();
      e && EventMgr.trigger(BaseEventType.SDKINIT_FINISH);
    }
  }
  static clipBoard(t) {
    SdkHelper.EnableSDK && (cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().clipBoard(t) : (cc.sys.os, cc.sys.OS_IOS));
  }
  static setUserInfo(t) {
    SdkHelper.user_id = t.user_id;
    SdkHelper.EnableSDK && (cc.sys.isBrowser || (cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().setUserInfo(JSON.stringify(t)) : cc.sys.os === cc.sys.OS_IOS && CalliOS.getInstance().setUserInfo(JSON.stringify(t))));
  }
  static getAesEncrypData(t) {
    return SdkHelper.EnableSDK ? cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().getAesEncrypData(JSON.stringify(t)) : cc.sys.os === cc.sys.OS_IOS ? CalliOS.getInstance().encrypt(JSON.stringify(t)) : null : null;
  }
  static getAesDncrypData(t) {
    return SdkHelper.EnableSDK ? cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().getAesDncrypData(t) : cc.sys.os === cc.sys.OS_IOS ? CalliOS.getInstance().decrypt(t) : null : null;
  }
  static ysdkLogin() {
    cc.sys.os === cc.sys.OS_ANDROID && CallAndroid.getInstance().ysdkLogin();
  }
  static df_sendStatue() {
    cc.sys.os, cc.sys.OS_IOS;
  }
  static getActivityNumByDate(e) {
    return cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().getActivityNumByDate(e) : "";
  }
  static getNgister(t, o, i) {
    return SdkHelper.EnableSDK && cc.sys.os === cc.sys.OS_ANDROID && !cc.sys.isBrowser ? CallAndroid.getInstance().getNgister(t, o.toString(), i) : cc.sys.os !== cc.sys.OS_IOS || cc.sys.isBrowser ? "" : CalliOS.getInstance().getNgister(t, o.toString(), i);
  }
  static callWxLogin() {
    if (!cc.sys.isBrowser && cc.sys.isNative) {
      if (cc.sys.os == cc.sys.OS_ANDROID) {
        CallAndroid.getInstance().wxLogin();
      } else {
        cc.sys.os == cc.sys.OS_IOS && CalliOS.getInstance().wxLogin();
      }
    } else {
      console.error("非原生端,微信登录失败");
    }
  }
  static wxShare(e) {
    if (e) {
      if (!cc.sys.isNative) {
        console.error("非原生端分享失败");
        return;
      }
      if (cc.sys.os == cc.sys.OS_ANDROID) {
        CallAndroid.getInstance().wxShare(e);
      } else {
        cc.sys.os, cc.sys.OS_IOS;
      }
    }
  }
  static getUrlSplicingString() {
    return SdkHelper.EnableSDK && (cc.sys.os, cc.sys.OS_ANDROID), ClientData.url_common_str;
  }
  static load(t, o) {
    if (SdkHelper.EnableSDK && cc.sys.os === cc.sys.OS_ANDROID) {
      var n = t.url;
      console.log("loadHead type:", t.type, "url:", n);
      if (null != n && "" != n) {
        console.log("loadHead begin load");
        cc.loader.load(t, o);
      }
    }
  }
  static showToast(t) {
    if (t) if (!cc.sys.isBrowser && SdkHelper.EnableSDK && cc.sys.isNative) {
      if (cc.sys.os === cc.sys.OS_ANDROID) CallAndroid.getInstance().showToast(t);else if (cc.sys.os == cc.sys.OS_IOS) {
        console.log("ios吐司~~~~~," + t);
        CalliOS.getInstance().showToast(t);
      }
    } else {
      console.log("非原生端,手动吐司~~~~~," + t);
      EngineUtil.showCocosToast3(t);
    }
  }
  static finishApp() {
    console.log("退出app");
    cc.sys.isBrowser || (SdkHelper.EnableSDK && cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().finishApp() : cc.sys.os == cc.sys.OS_IOS && CalliOS.getInstance().finishActivity());
  }
  static getScreenHeight() {
    return cc.sys.isNative ? SdkHelper.EnableSDK && cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().getScreenHeight() : cc.sys.os == cc.sys.OS_IOS ? CalliOS.getInstance().getScreenHeight() : void 0 : cc.winSize.height;
  }
  static setVibrator(t = 100) {
    !cc.sys.isBrowser && cc.sys.isNative && AudioManager.getInstance().getVibratorState() && (SdkHelper.EnableSDK && cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().setVibrator(t) : cc.sys.os == cc.sys.OS_IOS && CalliOS.getInstance().setVibratoLight());
  }
  static setNotchHeight() {
    SdkHelper.EnableSDK && (cc.sys.os, cc.sys.OS_ANDROID);
  }
  static setXhrCookie(t) {
    cc.sys.isBrowser || (SdkHelper.EnableSDK && cc.sys.os === cc.sys.OS_ANDROID ? t.setRequestHeader("Cookie", document.cookie) : cc.sys.os === cc.sys.OS_IOS && t.setRequestHeader("Cookie", document.cookie));
  }
  static showForceDialog(t, o) {
    o && (SdkHelper.EnableSDK && cc.sys.isNative ? cc.sys.os === cc.sys.OS_ANDROID && CallAndroid.getInstance().showForceDialog(t, o) : console.log("非原生端,手动吐司~~~~~," + o));
  }
  static showForceToast(t) {
    t && (!cc.sys.isBrowser && SdkHelper.EnableSDK && cc.sys.isNative ? cc.sys.os === cc.sys.OS_ANDROID && CallAndroid.getInstance().showForceToast(t) : console.log("非原生端,手动吐司~~~~~," + t));
  }
  static feedback(t, o, i) {
    if (SdkHelper.EnableSDK && cc.sys.os === cc.sys.OS_ANDROID) {
      CallAndroid.getInstance().openKefu(t, o, i, this.user_id);
    } else {
      cc.sys.os == cc.sys.OS_IOS && CalliOS.getInstance().openKefu(t, o, i);
    }
  }
  static openAgreementPage() {
    cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && CallAndroid.getInstance().setEnterAgreementTime();
  }
  static getFirstLaunchTime() {
    return cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID ? CallAndroid.getInstance().getFirstLaunchTime() : 0;
  }
  static getEnterAgreementTime() {
    return cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID ? CallAndroid.getInstance().getEnterAgreementTime() : 0;
  }
  static showNotification(e) {
    cc.sys.os === cc.sys.OS_ANDROID && CallAndroid.getInstance().showNotification(e);
  }
  static isNetworkAcailable() {
    return cc.sys.isNative ? cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().isNetworkAcailable() : void 0 : 1;
  }
  static playNativeAudio(e) {
    cc.sys.isNative && (cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().playMusic(e) : (cc.sys.os, cc.sys.OS_IOS));
  }
  static reportData(t, o, a) {
    // void 0 === a && (a = false);
    // o || (o = {});
    // o.user_id = e.user_id || "";
    // o.device_id = i.default.device_id || "";
    // o.game_version = u.default.getInstance().getVersion();
    // o.game_base_version = u.default.getInstance().getBaseVersion();
    // if (!cc.sys.isBrowser && cc.sys.isNative && e.EnableSDK) cc.sys.os === cc.sys.OS_ANDROID ? n.default.getInstance().reportData(t, o, a) : cc.sys.os === cc.sys.OS_IOS && r.default.getInstance().reportData(t, o, a);else {
    //   var c = "数据上报";
    //   a && (c = "core 数据上报");
    //   console.log(c, "\b\b事件名称 " + t, o);
    // }
  }
  static onAppPause() {
    if (this.comeInGameTime) {
      var t = new Date().getTime() - this.comeInGameTime;
      t = t < 0 ? 0 : t;
      this.comeInGameTime = 0;
      console.log("cocos_b_leave_page", t);
      SdkHelper.reportData("cocos_b_leave_page", {
        act_page: "game_main_page",
        duration: t
      });
    }
  }
  static onAppResume() {
    this.comeInGameTime = new Date().getTime();
    console.log("cocos_b_entry_page", this.comeInGameTime);
    SdkHelper.reportData("cocos_b_entry_page", {
      act_page: "game_main_page"
    });
  }
  static onAppRestart() {
    EventMgr.trigger(BaseEventType.APP_RESTART);
  }
  static onAppStart() {
    this.comeInGameTime = new Date().getTime();
    console.log("cocos_b_entry_page", this.comeInGameTime);
    SdkHelper.reportData("cocos_b_entry_page", {
      act_page: "game_main_page"
    });
    SdkHelper.reportData("app_launch", null, true);
  }
  static getMiddleConfig() {
    return cc.sys.isBrowser || !cc.sys.isNative ? "{}" : cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().getMiddleConfig() : cc.sys.os === cc.sys.OS_IOS ? CalliOS.getInstance().getMiddleConfig() : void 0;
  }
  static getNetWorkStatus() {
    return cc.sys.os == cc.sys.OS_IOS ? Number(CalliOS.getInstance().getNetworkingStatus()) : 1;
  }
  static getChannelName() {
    return cc.sys.isNative ? cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().getChannelName() : CalliOS.getInstance().getChannelName() : "";
  }
  static getVersionName() {
    return cc.sys.isNative ? cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().getVersionName() : CalliOS.getInstance().getVersionName() : "1.0.0.0";
  }
  static getVersionCode() {
    return cc.sys.isNative ? cc.sys.os === cc.sys.OS_ANDROID ? CallAndroid.getInstance().getVersionCode() : void 0 : 0;
  }
  static getOAID() {
    return cc.sys.isNative ? "" : cc.sys.os != cc.sys.OS_ANDROID || cc.sys.isBrowser ? cc.sys.os == cc.sys.OS_IOS ? "" : void 0 : CallAndroid.getInstance().getOAID();
  }
  static requestBasicPermission() {
    if (cc.sys.isNative) return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JavaScriptHelper", "requestBasicPermission", "()V");
  }
}