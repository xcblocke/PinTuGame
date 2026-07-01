import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class AutoProcessPage extends BasePage {
  @property(cc.Sprite)
  progressSprite: cc.Sprite = null;
  @property(sp.Skeleton)
  spineSkeleton: sp.Skeleton = null;
  _init(t) {
    super._init.call(this, t);
    this.progressSprite.fillRange = 0;
    this.spineSkeleton.node.opacity = 0;
    AudioManager.instance.playCash("auto_withdrawal");
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
    });
    this.scheduleOnce(function () {
      cc.tween(t.progressSprite).to(2, {
        fillRange: 1
      }).call(async function () {
        const __async_this = t;
        var e = __async_this;
        await EngineUtil.sleep(500);
        __async_this.spineSkeleton.setAnimation(0, "xs", false);
        __async_this.spineSkeleton.setCompleteListener(function () {
          e._hide();
        });
        return;
      }).start();
    }, 0.5);
  }
}