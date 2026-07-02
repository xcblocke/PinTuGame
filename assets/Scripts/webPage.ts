import AudioManager from "./framework/Utils/AudioManager";
import BaseSystem from "./framework/Utils/BaseSystem";
import SdkHelper from "./framework/Utils/SdkHelper";
import BasePage from "./view/BasePage";
import PlayerDataSys from "./framework/Utils/PlayerDataSys";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class webPage extends BasePage {
  @property(cc.WebView)
  webView: cc.WebView = null;
  @property(cc.Node)
  ysxx: cc.Node = null;
  @property(cc.Node)
  yhxy: cc.Node = null;
  onLoad() {
    super.onLoad.call(this);
    this.webView.node.on("error", this.webCall, this);
  }
  _init(e) {
    var t = e.title,
      o = e.noReport,
      n = void 0 !== o && o,
      i = e.index,
      a = e.is_first,
      r = e.url;
    console.log("url:", r);
    this.ysxx.active = false;
    this.yhxy.active = false;
    switch (i) {
      case 0:
        SdkHelper.reportData("open_UserAgreement");
        this.yhxy.active = true;
        break;
      case 1:
        SdkHelper.reportData("open_PrivacyAgreement");
        this.ysxx.active = true;
        break;
      default:
        return;
    }
    a || PlayerDataSys.is_reviewer;
    this.webView.url = r;
    this.agreementForce(t, n);
  }
  agreementForce(e, t = false) {
    if (`gkey_272` != e) {
      var o = "";
      if (`gkey_030` == e) {
        o = "user";
        if (t) {
          cc.sys.localStorage.setItem("user_LastAgreement", this.webView.url);
          return;
        }
      } else {
        if (`gkey_262` != e) return;
        o = "privacy";
        if (t) {
          cc.sys.localStorage.setItem("user_LastPrivacy", this.webView.url);
          return;
        }
      }
      console.log("agreementForce requesData\nurl=" + this.webView.url + "\ntype=" + o);
      BaseSystem.agreementForce({
        url: this.webView.url,
        type: o
      });
    }
  }
  webCall() {
    SdkHelper.showToast(`gkey_273`);
  }
  close() {
    AudioManager.getInstance().playMusic("btntouch");
    this.webView.node.off("error", this.webCall, this);
    this._hide();
  }
}