import decorator from "./decorator/decorator";
import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
import { AdRewardType, VideoActionType } from "./framework/enum/AllEnum";
import BasePage from "./view/BasePage";
import { CommonReport } from "./report/CommonReport";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class luckRewardPage extends BasePage {
  @property(cc.Node)
  videoBtnNode: cc.Node = null;
  @property(cc.Node)
  unVideoBtnNode: cc.Node = null;
  @property(cc.Label)
  wxLabel: cc.Label = null;
  @property(cc.Label)
  hbLabel: cc.Label = null;
  @property(cc.Label)
  onlyLabel: cc.Label = null;
  @property(sp.Skeleton)
  spine: sp.Skeleton = null;
  isForce = false;
  _init() {
    var t;
    super._init.call(this);
    this.videoBtnNode.active = false;
    this.unVideoBtnNode.active = false;
    this.wxLabel.string = MakeMnGlobalData.getCashBalanceWithUnit(null === (t = MakeMnGlobalData.submitGameData) || void 0 === t ? void 0 : t.show_xc_video_reward, "");
    this.hbLabel.string = MakeMnGlobalData.getGoldBalanceWithUnit(MakeMnGlobalData.luckyRewardNum, "");
    this.onlyLabel.string = "只要" + MakeMnGlobalData.getCashBalanceWithUnit(MakeMnGlobalData.luckyRewardOnlyNum, "元现金");
    this.spine.node.opacity = 0;
    AudioManager.instance.playMusic("luckReward");
  }
  _onHide() {
    super._onHide.call(this);
  }
  _onShow() {
    var t = this;
    super._onShow.call(this);
    this.scheduleOnce(function () {
      t.spine.node.opacity = 255;
    }, 0.01);
    this.spine.setAnimation(0, "cx2", false);
    this.spine.setCompleteListener(function () {
      t.spine.setAnimation(0, "dj2", true);
      t.spine.setCompleteListener(null);
    });
    this.scheduleOnce(function () {
      t.videoBtnNode.active = true;
      t.videoBtnNode.opacity = 0;
      cc.tween(t.videoBtnNode).to(0.3, {
        opacity: 255
      }).start();
      t.unVideoBtnNode.active = true;
      t.unVideoBtnNode.opacity = 0;
      cc.tween(t.unVideoBtnNode).delay(0.2).to(0.3, {
        opacity: 255
      }).start();
    }, 0.4);
  }
  @decorator.Debounce(500)
  async lookVideo(e = 0) {
    if (!(await EngineUtil.isOppoAd())) return;
    0 == e && CommonReport.instance.reportGameAdPlay({
      page_id: AdRewardType.eliminateCount,
      action_type: VideoActionType.show,
      force: 0
    });
    MakeMnGlobalData.force_num = 0;
    this._fakeHide();
    await EngineUtil.playVideoCommon(AdRewardType.eliminateCount, null, this.success.bind(this), false, this.isForce ? 1 : 0);
    return;
  }
  success() {
    this._onHide();
  }
  @decorator.Debounce(500)
  async onlyGetCash() {
    var e,
      t = this;
    this.isForce = !!MakeMnGlobalData.ForceNum;
    CommonReport.instance.reportGameAdPlay({
      page_id: AdRewardType.eliminateCount,
      action_type: VideoActionType.show,
      force: this.isForce ? 1 : 0
    });
    if (this.isForce) {
      this.lookVideo(1);
      return;
    }
    e = false;
    this._fakeHide();
    this.scheduleOnce(function () {
      if (!e) {
        e = true;
        t._onHide();
      }
    }, 10);
    await EngineUtil.noWatchVideo(AdRewardType.eliminateCount);
    if (e) return;
    e = true;
    this._onHide();
    return;
  }
  _hide() {
    return super._hide.call(this);
  }
}