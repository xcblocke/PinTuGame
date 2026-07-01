import AudioManager from "./framework/Utils/AudioManager";
import DeadLineBtn from "./comp/DeadLineBtn";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
export enum CollectImgType {
  step1 = 1,
  step2 = 2,
  step3 = 3,
}
@ccclass
export default class CollecImgPage extends BasePage {
  @property(cc.Node)
  step1Node: cc.Node = null;
  @property(cc.Node)
  step2Node: cc.Node = null;
  @property(cc.Node)
  step3Node: cc.Node = null;
  @property(DeadLineBtn)
  deadLineBtn: DeadLineBtn = null;
  _init(t) {
    var o = this;
    super._init.call(this, t);
    this.step1Node.active = 1 == t.step;
    this.step2Node.active = 2 == t.step;
    this.step3Node.active = 3 == t.step;
    var n = 1 == t.step ? "去集图" : 2 == t.step ? "去提现" : "去集图",
      i = 7;
    switch (t.step) {
      case 1:
        i = 8;
        AudioManager.instance.playCash("gallery_1");
        break;
      case 2:
        i = 4;
        AudioManager.instance.playCash("gallery5_complete");
        break;
      case 3:
        i = 7;
        AudioManager.instance.playCash("cash_fail_30gallery");
    }
    this.deadLineBtn.init(i, function () {
      o._hide();
    }, n);
  }
  _onHide() {
    super._onHide.call(this);
    AudioManager.instance.stopCash("gallery_1");
    AudioManager.instance.stopCash("gallery5_complete");
    AudioManager.instance.stopCash("cash_fail_30gallery");
  }
  _onShow() {
    super._onShow.call(this);
    this.deadLineBtn.startTime();
  }
}