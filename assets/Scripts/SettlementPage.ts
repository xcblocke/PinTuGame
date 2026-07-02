import decorator from "./decorator/decorator";
import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
import { AdRewardType, VideoActionType } from "./framework/enum/AllEnum";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import { CommonReport } from "./report/CommonReport";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class SettlementPage extends BasePage {
  @property(cc.Label)
  wxLabel: cc.Label = null;
  @property(cc.Label)
  onlyWxLabel: cc.Label = null;
  @property(cc.Label)
  hbLabel: cc.Label = null;
  @property(sp.Skeleton)
  spine: sp.Skeleton = null;
  @property(cc.Node)
  videoBtnNode: cc.Node = null;
  @property(cc.Node)
  unVideoBtnNode: cc.Node = null;
  isForce = false;
  _isAddDiamond = false;
  get LoopAnimName() {
    return "dj2";
  }
  get showAnimName() {
    return "cx2";
  }
  async _init(t) {
    var o, n;
    CommonReport.instance.reportGameBalanceEnd();
    CommonReport.instance.reportGameEnd();
    AudioManager.getInstance().playMusic("level_pass");
    super._init.call(this, t);
    o = null == t ? void 0 : t.show_tg_video_reward;
    n = MakeMnGlobalData.infoType.conf_info.parameter_conf.levelup_cash_only.para_value;
    if (1 == MakeMnGlobalData.startGameData.game_level) {
      o = MakeMnGlobalData.pass1CashReward;
      n = o;
    }
    if (2 == MakeMnGlobalData.startGameData.game_level) {
      o = MakeMnGlobalData.pass2CashReward;
      n = o;
    }
    this.wxLabel.string = MakeMnGlobalData.getCashBalanceWithUnit(o, "");
    this.hbLabel.string = MakeMnGlobalData.getGoldBalanceWithUnit(MakeMnGlobalData.settlementShowNum, "");
    this.onlyWxLabel.string = `gkey_257??&value1==${MakeMnGlobalData.getCashBalanceWithUnit(n)}`;
    this.spine.node.opacity = 0;
    this.videoBtnNode.active = false;
    this.unVideoBtnNode.active = false;
    return;
  }
  @decorator.Debounce(500)
  async lookVideo(e = 0) {
    if (!(await EngineUtil.isOppoAd())) return;
    0 == e && CommonReport.instance.reportGameAdPlay({
      page_id: AdRewardType.settlement,
      action_type: VideoActionType.show,
      force: 0
    });
    MakeMnGlobalData.force_num = 0;
    this._fakeHide();
    await EngineUtil.playVideoCommon(AdRewardType.settlement, null, this.success.bind(this), false, this.isForce ? 1 : 0);
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
      page_id: AdRewardType.settlement,
      action_type: VideoActionType.show,
      force: this.isForce ? 1 : 0
    });
    if (this.isForce) {
      this.lookVideo(1);
      return;
    }
    this._fakeHide();
    e = false;
    this.scheduleOnce(function () {
      if (!e) {
        e = true;
        t._onHide();
      }
    }, 10);
    await EngineUtil.noWatchVideo(AdRewardType.settlement, {});
    if (e) return;
    e = true;
    this._onHide();
    return;
  }
  _onHide() {
    super._onHide.call(this);
  }
  async _onShow() {
    var t = this;
    super._onShow.call(this);
    this.scheduleOnce(function () {
      t.spine.node.opacity = 255;
    }, 0.01);
    this.spine.setAnimation(0, this.showAnimName, false);
    this.spine.setCompleteListener(function () {
      t.spine.setAnimation(0, t.LoopAnimName, true);
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
    return;
  }
  close() {
    this._hide();
  }
}