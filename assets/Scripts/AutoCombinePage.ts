import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class AutoCombinePage extends BasePage {
  @property(cc.Label)
  combineAmountLabel: cc.Label = null;
  @property(cc.Sprite)
  progressSprite: cc.Sprite = null;
  @property(sp.Skeleton)
  spineSkeleton: sp.Skeleton = null;
  _init(t) {
    super._init.call(this, t);
    this.combineAmountLabel.string = "0";
    this.progressSprite.fillRange = 0;
    this.spineSkeleton.node.opacity = 0;
  }
  _onHide() {
    super._onHide.call(this);
  }
  _onShow() {
    var t = this;
    super._onShow.call(this);
    this.spineSkeleton.setAnimation(0, "cx", false);
    this.scheduleOnce(function () {
      t.spineSkeleton.node.opacity = 255;
    }, 0.01);
    this.spineSkeleton.setCompleteListener(function () {
      t.spineSkeleton.setAnimation(0, "dj", true);
      cc.tween(t.progressSprite).to(5, {
        fillRange: 1
      }).call(function () {
        t._hide();
      }).start();
    });
  }
}