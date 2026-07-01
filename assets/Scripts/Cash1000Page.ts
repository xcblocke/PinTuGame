import AudioManager from "./framework/Utils/AudioManager";
import SdkHelper from "./framework/Utils/SdkHelper";
import EngineUtil from "./framework/Utils/EngineUtil";
import { PageEnum } from "./framework/enum/AllEnum";
import Service from "./service/Service";
import BasePage from "./view/BasePage";
import PageMgr from "./view/PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class Cash1000Page extends BasePage {
  @property(sp.Skeleton)
  spineSkeleton: sp.Skeleton = null;
  @property(cc.Node)
  closeNode: cc.Node = null;
  @property(cc.Sprite)
  avatarSprite: cc.Sprite = null;
  _init(t) {
    super._init.call(this, t);
    this.closeNode.active = false;
    this.spineSkeleton.node.opacity = 0;
    EngineUtil.setUserNameAndHeadImage(null, this.avatarSprite);
    SdkHelper.reportData("show_accelerate_dialog");
    AudioManager.instance.playCash("speed_up");
    this.speedUp1();
  }
  speedUp1() {
    this.scheduleOnce(this.speedUp2, 2.1);
  }
  speedUp2() {
    this.closeNode.active = true;
    AudioManager.instance.playCash("speed_up_1");
    this.scheduleOnce(this.speedUp3, 3);
  }
  speedUp3() {
    AudioManager.instance.playCash("speed_up_2");
    this.scheduleOnce(this.speedUp4, 3);
  }
  speedUp4() {
    var e = this;
    this.closeNode.active = false;
    Service.getSubsidyReward().then(async function (t) {
      const __async_this = e;
      var e_local;
      if (e_local = t.data.reward) {
        await PageMgr.showPageByEnum(PageEnum.rewardToastPage, {
          cashReward: e_local
        });
        __async_this._hide();
        return;
      } else {
        return;
      }
    });
  }
  close() {
    var e = this;
    AudioManager.instance.stopCash("speed_up");
    AudioManager.instance.stopCash("speed_up_1");
    AudioManager.instance.stopCash("speed_up_2");
    this.unscheduleAllCallbacks();
    Service.getSubsidyReward().then(async function (t) {
      const __async_this = e;
      var e_local;
      if (e_local = t.data.reward) {
        await PageMgr.showPageByEnum(PageEnum.rewardToastPage, {
          cashReward: e_local
        });
        __async_this._hide();
        return;
      } else {
        return;
      }
    });
  }
  _onHide() {
    super._onHide.call(this);
    AudioManager.instance.stopCash("speed_up");
    AudioManager.instance.stopCash("speed_up_1");
    AudioManager.instance.stopCash("speed_up_2");
  }
  _onShow() {
    var t = this;
    super._onShow.call(this);
    this.spineSkeleton.setAnimation(0, "dj", false);
    this.scheduleOnce(function () {
      t.spineSkeleton.node.opacity = 255;
    }, 0.01);
  }
}