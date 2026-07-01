import AudioManager from "./framework/Utils/AudioManager";
import GlobalApp from "./common/GlobalApp";
import DeadLineBtn from "./comp/DeadLineBtn";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class ActTipPage extends BasePage {
  @property(DeadLineBtn)
  deadLineBtn: DeadLineBtn = null;
  onLoad() {
    super.onLoad.call(this);
    this.startPosition = GlobalApp.MakeMnProcessComp.levelBorardGrp.node.worldPosition;
  }
  _init(t) {
    var o = this;
    super._init.call(this, t);
    AudioManager.instance.playCash("activity_2");
    this.deadLineBtn.init(5, function () {
      o._hide();
    }, "继续游戏");
  }
  update() {}
  _onHide() {
    super._onHide.call(this);
    AudioManager.instance.stopCash("activity_2");
  }
  _onShow() {
    super._onShow.call(this);
    this.deadLineBtn.startTime();
  }
}