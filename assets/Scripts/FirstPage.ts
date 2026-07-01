import AudioManager from "./framework/Utils/AudioManager";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class FirstPage extends BasePage {
  @property(cc.Node)
  contentNode: cc.Node = null;
  @property(cc.Node)
  btnNode: cc.Node = null;
  _init() {
    this.playAnim();
    AudioManager.instance.playCash("first");
  }
  playAnim() {
    var e = this;
    this.btnNode.active = false;
    this.contentNode.children.forEach(function (t, o) {
      t.x = -1000;
      cc.tween(t).delay(0.1 * o).to(0.5, {
        x: 0
      }, {
        easing: "backInOut"
      }).call(function () {
        o == e.contentNode.children.length - 1 && (e.btnNode.active = true);
      }).start();
    });
  }
  _onHide() {
    super._onHide.call(this);
    AudioManager.instance.stopCash("first");
  }
  _onShow() {
    super._onShow.call(this);
  }
}