import AudioManager from "./framework/Utils/AudioManager";
import BaseSystem from "./framework/Utils/BaseSystem";
import PlayerDataSys from "./framework/Utils/PlayerDataSys";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import SdkHelper from "./framework/Utils/SdkHelper";
import { CUSTOMER_SERVICE } from "./framework/SystemConfig";
import EngineUtil from "./framework/Utils/EngineUtil";
import GlobalApp from "./common/GlobalApp";
import { gameData } from "./data/GameData";
import BasePage from "./view/BasePage";
import PageMgr from "./view/PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class SetUpPage extends BasePage {
  cb = null;
  @property(cc.Label)
  nameLabel: cc.Label = null;
  @property(cc.Label)
  IDLabel: cc.Label = null;
  @property(cc.Sprite)
  head: cc.Sprite = null;
  @property(cc.Sprite)
  musicImg: cc.Sprite = null;
  @property(cc.Sprite)
  soundImg: cc.Sprite = null;
  @property(cc.Sprite)
  gxhImg: cc.Sprite = null;
  @property(cc.Sprite)
  zdImg: cc.Sprite = null;
  @property(cc.Sprite)
  dmImg: cc.Sprite = null;
  @property(cc.Label)
  helpLb: cc.Label = null;
  @property(cc.Label)
  adLb: cc.Label = null;
  @property(cc.SpriteFrame)
  turnImgs: cc.SpriteFrame = [];
  @property(cc.Node)
  demoNode: cc.Node = null;
  comeinTime = 0;
  start() {
    this.demoNode.active = gameData.isOpenDemo;
  }
  _init(t) {
    super._init.call(this, t);
    this.setInfo();
  }
  onEnable() {
    super.onEnable.call(this);
    this.helpLb.string = PlayerDataSys.isTencent() ? "客服通道" : "帮助中心";
    var t = "xiaomi" == SdkHelper.getChannelName().toLowerCase();
    this.adLb.string = t ? "个性化广告" : "个性化推荐";
    this.comeinTime = new Date().getTime();
    SdkHelper.reportData("b_entry_page", {
      act_page: "setting_page"
    });
    EventMgr.listen(GameEventType.WXLOGIN_FINISH, this.setInfo, this);
    EventMgr.listen(GameEventType.CLOSE_PERSONPAGE, this._hide, this);
  }
  onDisable() {
    EventMgr.ignore(GameEventType.WXLOGIN_FINISH, this.setInfo, this);
    EventMgr.ignore(GameEventType.CLOSE_PERSONPAGE, this._hide, this);
  }
  setInfo() {
    PlayerDataSys.nickname;
    this.IDLabel.string = "ID:" + PlayerDataSys.userid;
    EngineUtil.setUserNameAndHeadImage(this.nameLabel, this.head);
    this.musicImg.spriteFrame = this.turnImgs[Number(AudioManager.getInstance().getMusicState())];
    this.soundImg.spriteFrame = this.turnImgs[Number(AudioManager.getInstance().getAudioState())];
    this.gxhImg.spriteFrame = this.turnImgs[PlayerDataSys.reco_switch];
    this.zdImg.spriteFrame = this.turnImgs[Number(AudioManager.getInstance().getVibratorState())];
    var e = EngineUtil.localStorageGetItem("barrageIsOpen", "open");
    this.dmImg.spriteFrame = "open" == e ? this.turnImgs[1] : this.turnImgs[0];
  }
  nameFormat(e) {
    for (var t = e.split(""), o = t.length, n = 0, i = "", a = "", r = new RegExp("[一-龥]+"), c = 0; c < o; c++) {
      var s = t[c];
      if (r.test(s)) {
        n += 2;
      } else {
        n++;
      }
      if (n > 12) {
        a = "...";
        break;
      }
      i += s;
    }
    return i + a;
  }
  onBtn(e, t) {
    AudioManager.getInstance().playMusic("btntouch");
    if ("zd" == t) {
      this.touchZdBtn();
    } else {
      if ("yx" == t) {
        this.effectTouch();
      } else {
        if ("yy" == t) {
          this.musicTouch();
        } else {
          if ("gx" == t) {
            this.touchPersonality();
          } else {
            if ("dm" == t) {
              this.touchPersonality();
            } else {
              "dm1" == t && this.touchDM();
            }
          }
        }
      }
    }
  }
  touchZdBtn() {
    if (AudioManager.getInstance().getVibratorState()) {
      AudioManager.getInstance().closeVibrator();
    } else {
      AudioManager.getInstance().openVibrator();
    }
    this.zdImg.spriteFrame = this.turnImgs[Number(AudioManager.getInstance().getVibratorState())];
    SdkHelper.reportData("click_vibrateTouch");
  }
  effectTouch() {
    if (AudioManager.getInstance().getAudioState()) {
      AudioManager.getInstance().closeAudio();
    } else {
      AudioManager.getInstance().openAudio();
    }
    this.soundImg.spriteFrame = this.turnImgs[Number(AudioManager.getInstance().getAudioState())];
    SdkHelper.reportData("click_soundTouch");
  }
  touchPersonality() {
    var e = this,
      t = PlayerDataSys.reco_switch ? 0 : 1;
    BaseSystem.setReco({
      reco_switch: t
    }).then(function (o) {
      if (o && 1 == o.code) {
        PlayerDataSys.reco_switch = t;
        e.gxhImg.spriteFrame = e.turnImgs[t];
        if (t) {
          SdkHelper.reportData("reco_switch_open");
        } else {
          SdkHelper.reportData("reco_switch_close");
        }
      }
    }).catch(function () {});
  }
  touchDM() {
    AudioManager.getInstance().playMusic("btntouch");
    var e = EngineUtil.localStorageGetItem("barrageIsOpen", "open");
    EngineUtil.localStorageSetItem("barrageIsOpen", "open" == e ? "close" : "open");
    var t = EngineUtil.localStorageGetItem("barrageIsOpen", "open");
    SdkHelper.reportData("click_barrageTouch", {
      state: t
    });
    this.dmImg.spriteFrame = this.turnImgs["open" == t ? 1 : 0];
    EventMgr.trigger(GameEventType.UPDATE_DANMU);
  }
  onLabelBtn(e, t) {
    AudioManager.getInstance().playMusic("btntouch");
    if ("yh" == t) {
      this.userAgreement();
    } else {
      if ("ys" == t) {
        this.privacyPolicy();
      } else {
        if ("gy" == t) {
          this.aboutUs();
        } else {
          if ("zx" == t) {
            this.remove();
          } else {
            if ("tc" == t) {
              this.logout();
            } else {
              "bz" == t && this.customerService();
            }
          }
        }
      }
    }
  }
  musicTouch() {
    if (AudioManager.getInstance().getMusicState()) {
      AudioManager.getInstance().closeBg();
    } else {
      AudioManager.getInstance().openBg();
    }
    this.musicImg.spriteFrame = this.turnImgs[Number(AudioManager.getInstance().getMusicState())];
    SdkHelper.reportData("click_musicTouch");
  }
  customerService() {
    AudioManager.getInstance().playMusic("btntouch");
    SdkHelper.reportData("click_help_center");
    var e = CUSTOMER_SERVICE;
    EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "helpCenterPage",
      data: {
        url: e
      }
    });
  }
  aboutUs() {
    AudioManager.getInstance().playMusic("btntouch");
    EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "aboutPage"
    });
  }
  userAgreement() {
    SdkHelper.reportData("u_click_user_agreement");
    AudioManager.getInstance().playMusic("btntouch");
    var e = PlayerDataSys.getUserAgreementUrl(0);
    EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "webPage",
      data: {
        title: "用户协议",
        url: e,
        index: 0
      },
      option: {
        reuse: false
      }
    });
  }
  privacyPolicy() {
    AudioManager.getInstance().playMusic("btntouch");
    SdkHelper.reportData("u_click_user_privacy");
    var e = PlayerDataSys.getPrivacyAgreementUrl();
    EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "webPage",
      data: {
        title: "隐私政策",
        url: e,
        index: 1
      },
      option: {
        reuse: false
      }
    });
  }
  restartGame() {
    GlobalApp.GameMain.restartGame();
    this._hide();
  }
  remove() {
    EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "removeUserPage"
    });
  }
  logout() {
    PageMgr.clear();
    EngineUtil.setLocalData("yid", "");
    AudioManager.getInstance().stopMusic("bg", true);
    cc.game.restart();
  }
  onClose() {
    AudioManager.getInstance().playMusic("btntouch");
    SdkHelper.reportData("b_leave_page", {
      act_page: "setting_page",
      duration: new Date().getTime() - this.comeinTime
    });
    this._hide();
  }
  openDebug() {
    EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "debugPage"
    });
  }
  passClick() {
    EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "debugJumpPage"
    });
    this._hide();
  }
}