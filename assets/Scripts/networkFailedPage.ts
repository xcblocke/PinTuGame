import decorator from "./decorator/decorator";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import BasePage, { AnimType } from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class networkFailedPage extends BasePage {
  reconnectFun = null;
  @property(cc.Label)
  descLabel: cc.Label = null;
  onLoad() {
    super.onLoad.call(this);
    EventMgr.listen(GameEventType.CLOSE_RECONNECT, this._hide, this);
    this._animInit({
      animType: AnimType.NONE
    });
  }
  onDestroy() {
    EventMgr.ignore(GameEventType.CLOSE_RECONNECT, this._hide, this);
  }
  update() {
    this.node.parent.children[this.node.parent.children.length - 1] != this.node && this.node.setSiblingIndex(this.node.parent.children.length - 1);
  }
  _init(e) {
    var t = e.callback;
    this.reconnectFun = t;
  }
  @decorator.Debounce(1500)
  async reconnect() {
    this.reconnectFun(true);
    return;
  }
}