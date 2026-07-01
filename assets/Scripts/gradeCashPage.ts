import AudioManager from "./framework/Utils/AudioManager";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class gradeCashPage extends BasePage {
  @property(cc.Label)
  oldRateLabel: cc.Label = null;
  @property(cc.Label)
  newRateLabel: cc.Label = null;
  @property(cc.Label)
  newRateLabel2: cc.Label = null;
  @property(sp.Skeleton)
  spine: sp.Skeleton = null;
  async _onHide() {
    super._onHide.call(this);
    return;
  }
  _onShow() {
    var t = this;
    super._onShow.call(this);
    this.scheduleOnce(function () {
      t.spine.node.opacity = 255;
    }, 0.01);
    this.spine.setAnimation(0, "show", false);
    this.spine.setCompleteListener(function () {
      t.spine.setAnimation(0, "idle", true);
      t.spine.setCompleteListener(null);
    });
  }
  showCommonPage() {
    AudioManager.instance.playBtn();
    this.resolveData = true;
    this._hide();
  }
  _init(e) {
    AudioManager.getInstance().playMusic("levelUp");
    this.resolveData = false;
    this.oldRateLabel.string = e.old_tx_ratio.replace("倍", "");
    this.newRateLabel.string = e.new_tx_ratio.replace("倍", "");
    this.newRateLabel2.string = e.new_tx_ratio.replace("倍", "元");
    this.spine.node.opacity = 0;
  }
  hideGame(e, t) {
    switch (t) {
      case "1":
        this.resolveData = true;
        break;
      case "2":
        this.resolveData = false;
    }
    this.close();
  }
  close() {
    AudioManager.instance.playBtn();
    this._hide();
  }
}