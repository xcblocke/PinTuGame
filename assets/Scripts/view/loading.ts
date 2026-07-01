import AudioManager from "../framework/Utils/AudioManager";
import BaseSystem from "../framework/Utils/BaseSystem";
import PlayerDataSys from "../framework/Utils/PlayerDataSys";
import GlobaldataMgr from "../framework/data/GlobaldataMgr";
import BaseEventType from "../framework/Utils/BaseEventType";
import EventMgr from "../framework/Event/EventMgr";
import GameEventType from "../framework/Event/GameEventType";
import AdManager from "../framework/Platform/AdManager";
import ClientData from "../framework/Event/ClientData";
import SdkHelper from "../framework/Utils/SdkHelper";
import EngineUtil from "../framework/Utils/EngineUtil";
import UrlMgr from "../service/UrlMgr";
import PageMgr from "./PageMgr";
import GlobalDataSys from "../framework/controller/GlobalDataSys";
import HotUpdate from "../framework/Event/HotUpdate";
import { Res } from "../common/ResourcesManager";
import { gameData } from "../data/GameData";
import LocalData from "../game/cyll/LocalData";
import { PageEnum } from "../framework/enum/AllEnum";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class loading extends cc.Component {
  @property(cc.Sprite)
  progress: cc.Sprite = null;
  hasAgree = false;
  @property(cc.Node)
  gou: cc.Node = null;
  @property(cc.Node)
  showLogin: cc.Node = null;
  @property(cc.Node)
  loading: cc.Node = null;
  @property(cc.Label)
  loadingLabel: cc.Label = null;
  @property(cc.Label)
  pro_label: cc.Label = null;
  couldTouch = true;
  get_middle_cfg_timer = null;
  get_oaid_timer = null;
  code = "";
  net_timer = null;
  @property([cc.Node])
  fcmNodeList: Array<cc.Node> = [];
  fad = "";
  restartTimes = 0;
  MAX_RESTART_TIMES = 40;
  totalNum = [0];
  @property(cc.Node)
  proIconNode: cc.Node = null;
  barNum = 0;
  updateArr = [0, 0];
  setLoadingLabel(e) {
    this.loadingLabel.string = e;
  }
  onLoad() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (e) {
        switch (e.label) {
          case 0:
            this.setLoadingLabel("正在初始化");
            AudioManager.getInstance().init();
            LocalData.getInstance().initData();
            this.addEvent();
            PageMgr.init();
            GlobalDataSys.init();
            this.preLoadPrefab();
            return EngineUtil.getLocalData("user_agreement") ? [3, 2] : [4, PageMgr.showPageByEnum(PageEnum.agreementPage)];
          case 1:
            if (e.sent()) return [2];
            e.label = 2;
          case 2:
            this.schedule(this.setHotUpdateProgress, 0.01, 900);
            SdkHelper.initOtherSDK(true);
            return [2];
        }
      });
    });
  }
  start() {
    this.setProgress(0);
  }
  preLoadPrefab() {}
  getMiddleCfg() {
    var e = this;
    this.setLoadingLabel("正在加载配置");
    var t = SdkHelper.getMiddleConfig();
    SdkHelper.requestSMId();
    console.log("getMiddleConfig():" + t);
    if (t) this.onGetMiddleCfg(t);else {
      EventMgr.listen(BaseEventType.ON_GET_MIDDLE_CFG, this.onGetMiddleCfg, this);
      this.get_middle_cfg_timer && clearTimeout(this.get_middle_cfg_timer);
      this.get_middle_cfg_timer = setTimeout(function () {
        console.log("getMiddleConfig():默认");
        e.onGetMiddleCfg();
      }, 5000);
    }
  }
  onGetMiddleCfg(e = "{}") {
    console.log("onGetMiddleCfg():" + e);
    this.get_middle_cfg_timer && clearTimeout(this.get_middle_cfg_timer);
    EventMgr.ignore(BaseEventType.ON_GET_MIDDLE_CFG, this.onGetMiddleCfg, this);
    GlobaldataMgr.init_middle_config(e);
    this.fad = JSON.parse(e).fad || "mcda";
    this.getSystemConfig();
  }
  onDestroy() {
    this.removeEvent();
  }
  addEvent() {
    EventMgr.listen(BaseEventType.SPLASH_FINISH, this.splashFinish, this);
    EventMgr.listen(GameEventType.WXLOGIN_FINISH, this.getUserInfo, this);
    EventMgr.listen(BaseEventType.GET_WECHAT_CODE, this.getWxCode, this);
    if (cc.sys.os == cc.sys.OS_ANDROID) {
      EventMgr.listen(BaseEventType.SDKINIT_FINISH, this.checkHotUpdate, this);
    } else {
      EventMgr.listen(BaseEventType.SDKINIT_FINISH, this.hotUpdate, this);
    }
  }
  removeEvent() {
    EventMgr.ignore(BaseEventType.GET_WECHAT_CODE, this.getWxCode, this);
    EventMgr.ignore(BaseEventType.SDKINIT_FINISH, this.hotUpdate, this);
    EventMgr.ignore(GameEventType.WXLOGIN_FINISH, this.getUserInfo, this);
    EventMgr.ignore(BaseEventType.SPLASH_FINISH, this.splashFinish, this);
  }
  splashFinish() {
    EventMgr.ignore(BaseEventType.SPLASH_FINISH, this.splashFinish, this);
    AdManager.getInstance().closeSplashAd();
    cc.sys.os == cc.sys.OS_IOS && this.autoLogin();
  }
  checkHotUpdate() {
    var e = this;
    this.setLoadingLabel("资源检测中");
    EngineUtil.log("==========sdk初始化成功");
    console.log("==========sdk初始化成功");
    if (SdkHelper.getOAID()) {
      EngineUtil.log("==========直接获取到了oaid");
      console.log("==========直接获取到了oaid");
      this.hotUpdate();
    } else {
      EventMgr.listen(BaseEventType.ON_GET_OAID, this.onGetOAID, this);
      this.get_oaid_timer && clearTimeout(this.get_oaid_timer);
      this.get_oaid_timer = setTimeout(function () {
        EngineUtil.log("==========oaid超时");
        console.log("==========oaid超时");
        e.onGetOAID();
      }, 2000);
    }
  }
  onGetOAID() {
    if (this.get_oaid_timer) {
      clearTimeout(this.get_oaid_timer);
      this.get_oaid_timer = null;
    }
    EngineUtil.log("==========异步获取到了oaid");
    console.log("==========异步获取到了oaid");
    EventMgr.ignore(BaseEventType.ON_GET_OAID, this.onGetOAID, this);
    this.hotUpdate();
  }
  hotUpdate() {
    var e = this;
    BaseSystem.init();
    if (EngineUtil.getLocalData("b_first_show_agreement")) {
      EngineUtil.setLocalData("b_first_show_agreement", "");
      SdkHelper.reportData("b_first_show_agreement");
    }
    if (EngineUtil.getLocalData("show_agreement_report")) {
      EngineUtil.setLocalData("show_agreement_report", "");
      SdkHelper.reportData("b_click_enter");
    }
    if (EngineUtil.getLocalData("cancel_agreement_report")) {
      EngineUtil.setLocalData("cancel_agreement_report", "");
      SdkHelper.reportData("b_click_cancel");
    }
    var t = UrlMgr.getInstance().getVersionUrl(),
      o = ClientData.getVersionData();
    console.log("==========hotUpdate111");
    if (gameData.isOpenDemo) {
      this.init();
    } else {
      HotUpdate.getInstance().checkGrayUpdate(t + "?" + o, function (t) {
        if (t) {
          console.log("grayUpdate canUpdate");
          HotUpdate.getInstance().hotUpdate(function (t, o) {
            e.unschedule(e.setHotUpdateProgress);
            e.updateArr[0] = 1;
            if (t < 0) {
              e.setProgress(0);
              e.init();
            }
            if (o && o.code == jsb.EventAssetsManager.UPDATE_PROGRESSION) {
              e.updateArr[1] = o.file_percent;
              e.setHotUpdateProgress();
            }
          });
        } else e.init();
      });
    }
  }
  init() {
    this.getMiddleCfg();
  }
  getSystemConfig(e) {
    var t = this;
    if (!GlobalDataSys.isSmGet && this.restartTimes < this.MAX_RESTART_TIMES && HotUpdate.getInstance().isOnlineRelease()) {
      this.restartTimes++;
      this.scheduleOnce(function () {
        t.getSystemConfig(e);
      }, 0.05);
    } else BaseSystem.getSystemConfig({}).then(function (o) {
      e && EngineUtil.reconnectSuc();
      var n = o.data;
      if ("mcda" != t.fad) {
        n.is_reviewer = 1;
        SdkHelper.reportData("reviewerPost");
      }
      PlayerDataSys.setConfigReviewing(n);
      t.setLoadingLabel("正在初始化游戏数据");
      if (HotUpdate.getInstance().checkReviewVMVersion()) {
        t.fcmNodeList.forEach(function (e) {
          e.active = false;
        });
      } else {
        t.fcmNodeList.forEach(function (e) {
          e.active = true;
        });
      }
      GlobaldataMgr.init(n);
      var i = GlobaldataMgr.reviewing_splash_ad,
        a = GlobaldataMgr.new_user;
      if (!i && !a) {
        AdManager.getInstance().showSplashAd(0);
        if (cc.sys.os == cc.sys.OS_IOS) return;
      }
      t.autoLogin();
    }).catch(function (o) {
      e && EngineUtil.reconnectFai();
      EngineUtil.httpErr(o, function (e) {
        t.getSystemConfig(e);
      });
    });
  }
  autoLogin(e) {
    var t = this;
    this.setLoadingLabel("正在初始化用户数据");
    console.log("000000000000000000");
    var o = SdkHelper.requestTDId(),
      n = null;
    if (o && "not_init" !== o) {
      n || (n = {});
      n = {
        black_box: o
      };
    }
    if (cc.sys.os === cc.sys.OS_ANDROID) {
      n || (n = {});
      n.bd_did = SdkHelper.getBD_did();
    }
    n && (n.yid = PlayerDataSys.getYid());
    BaseSystem.AutoLogin(n).then(function (o) {
      var n = "";
      o.data && (n = o.data.yid);
      console.log("autoLogin", o.data);
      e && EngineUtil.reconnectSuc();
      if (n) {
        PlayerDataSys.initUserId(o.data);
        t.getUserInfo();
      } else if (gameData.isOpenDemo) t.touristsLogin();else if (cc.sys.isBrowser || !cc.sys.isNative || HotUpdate.getInstance().checkReviewVMVersion()) t.touristsLogin();else {
        t.showLogin.active = true;
        t.loading.active = false;
        SdkHelper.reportData("show_wx_login");
      }
    }).catch(function () {
      e && EngineUtil.reconnectFai();
    });
  }
  touristsLogin(e) {
    var t = this,
      o = null,
      n = SdkHelper.requestTDId();
    if (n && "not_init" !== n) {
      o || (o = {});
      o = {
        black_box: n
      };
    }
    if (cc.sys.os === cc.sys.OS_ANDROID) {
      o || (o = {});
      o.bd_did = SdkHelper.getBD_did();
    }
    BaseSystem.touristsLogin(o).then(function (o) {
      e && EngineUtil.reconnectSuc();
      if (gameData.isOpenDemo) {
        PlayerDataSys.initUserId(o.data);
        t.getUserInfo();
      } else {
        if (-8888 == o.code) {
          t.showLogin.active = true;
          t.loading.active = false;
          return;
        }
        if (cc.sys.isNative && !HotUpdate.getInstance().checkReviewVMVersion()) {
          t.showLogin.active = true;
          t.loading.active = false;
        } else {
          PlayerDataSys.initUserId(o.data);
          t.getUserInfo();
        }
      }
    });
  }
  getUserInfo(e) {
    var t = this;
    this.showLogin.active = false;
    this.loading.active = true;
    BaseSystem.getUserInfo({}).then(function (o) {
      e && EngineUtil.reconnectSuc();
      if (o && 1 == o.code) {
        PlayerDataSys.setUserInfo(o.data);
        t.checkReport();
      }
    });
  }
  getAbTestInfo(e) {
    var t = this;
    BaseSystem.getAbTestInfo().then(function (o) {
      e && EngineUtil.reconnectSuc();
      o && 1 == o.code && o.data;
      t.loadScene();
    }).catch(function (o) {
      e && EngineUtil.reconnectFai();
      EngineUtil.httpErr(o, function (e) {
        t.getAbTestInfo(e);
      });
    });
  }
  checkReport() {
    var e = this,
      t = cc.sys.localStorage.getItem("user_LastAgreement");
    if (t) {
      BaseSystem.agreementForce({
        url: t,
        type: "user"
      });
      cc.sys.localStorage.removeItem("user_LastAgreement");
      SdkHelper.reportData("U_WATCH_RULE", {
        rule_type: "agreement"
      });
    }
    var o = cc.sys.localStorage.getItem("user_LastPrivacy");
    if (o) {
      BaseSystem.agreementForce({
        url: o,
        type: "privacy"
      });
      cc.sys.localStorage.removeItem("user_LastPrivacy");
      SdkHelper.reportData("U_WATCH_RULE", {
        rule_type: "privacy"
      });
    }
    SdkHelper.reportData("b_entry_page", {
      act_page: "loading_page"
    });
    this.scheduleOnce(function () {
      e.loadScene();
    }, 0.1);
  }
  loadScene() {
    var e = this;
    this.unschedule(this.setHotUpdateProgress);
    this.setLoadingLabel("正在加载场景");
    AudioManager.getInstance().initNativeUrl();
    PageMgr.preloadPage(PageEnum.networkFailedPage);
    var t = "mainScene";
    HotUpdate.getInstance().checkReviewVMVersion() && (t = "SceneA");
    var o = gameData.loadRemoteLevelData(PlayerDataSys.playerInfo.cueernt_level_url),
      n = Res.loadGameRes();
    cc.director.preloadScene(t, function (t, o) {
      e.totalNum[0] = t / o / e.totalNum.length;
      e.setProgress2();
    }, function () {
      return __awaiter(e, void 0, void 0, function () {
        return __generator(this, function (e) {
          switch (e.label) {
            case 0:
              return [4, o];
            case 1:
              e.sent();
              return [4, n];
            case 2:
              e.sent();
              cc.director.loadScene(t);
              return [2];
          }
        });
      });
    });
  }
  getWxCode(e) {
    console.log("SPK1", e);
    this.code = e;
    this.getWxInfo();
  }
  getWxInfo(e) {
    var t = this;
    console.log("SPK2");
    var o = SdkHelper.requestTDId();
    "not_init" != o && "failed" != o || (o = "");
    var n = {
      wechat_code: this.code,
      black_box: o
    };
    cc.sys.os === cc.sys.OS_ANDROID && (n.bd_did = SdkHelper.getBD_did());
    console.log("SPK3");
    BaseSystem.wechatLogin(n, true).then(function (o) {
      console.log("SPK4", o);
      if (o.code < 0) SdkHelper.showToast(o.message);else {
        e && EngineUtil.reconnectSuc();
        EngineUtil.log("微信登录成功");
        EngineUtil.log(o);
        PlayerDataSys.initWxData(o.data);
        SdkHelper.showToast("登录成功");
        t.getUserInfo();
        SdkHelper.reportData("wx_login_success");
      }
    }).catch(function () {
      console.log("SPK5");
      SdkHelper.reportData("wx_login_fail");
      SdkHelper.showToast("请重新登录!");
    });
  }
  agree() {
    this.hasAgree = !this.hasAgree;
    this.gou.active = this.hasAgree;
  }
  doWxLogin() {
    var e = this;
    if (this.couldTouch) {
      SdkHelper.reportData("click_wxlogin");
      SdkHelper.reportData("start_registration", null, true);
      this.couldTouch = false;
      this.unscheduleAllCallbacks();
      this.scheduleOnce(function () {
        e.couldTouch = true;
      }, 3);
      SdkHelper.callWxLogin();
    }
  }
  wxLogin() {
    if (this.hasAgree) this.doWxLogin();else {
      var e = function () {
        this.agree();
        this.doWxLogin();
      }.bind(this);
      EventMgr.trigger(GameEventType.PAGE_SHOW, {
        name: "wxTipPage",
        data: {
          type: "login",
          cb: e
        }
      });
    }
  }
  touch_user() {
    SdkHelper.reportData("u_click_user_agreement");
    var e = PlayerDataSys.getUserAgreementUrl(1);
    EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "webPage",
      data: {
        is_first: true,
        title: "用户协议",
        url: e,
        index: 0
      },
      option: {
        reuse: false
      }
    });
  }
  touch_privacy() {
    SdkHelper.reportData("u_click_user_privacy");
    var e = PlayerDataSys.getPrivacyAgreementUrl();
    EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "webPage",
      data: {
        is_first: true,
        title: "隐私政策",
        url: e,
        index: 1
      },
      option: {
        reuse: false
      }
    });
  }
  setProgress2() {
    var e = this.totalNum.reduce(function (e, t) {
      return e + t;
    }, 0);
    this.progress.fillRange = e;
    this.proIconNode.x = this.proIconNode.parent.width * e;
    this.pro_label.string = Math.floor(10000 * e) / 100 + "%";
  }
  setHotUpdateProgress() {
    if (this.updateArr[1] >= 1) this.setProgress(1);else {
      if (this.updateArr[0] < 1) {
        this.updateArr[0] += 0.0011111111111111111;
        this.updateArr[0] = Math.min(this.updateArr[0], 1);
      }
      this.setProgress((this.updateArr[0] + this.updateArr[1]) / 2);
    }
  }
  setProgress(e) {
    if (!isNaN(e)) {
      e < 0 && (e = 0);
      this.proIconNode.x = this.proIconNode.parent.width * e;
      this.progress.fillRange = e;
      this.pro_label.string = Math.floor(10000 * e) / 100 + "%";
    }
  }
  openSetting() {
    EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "SetUpPage"
    });
  }
}