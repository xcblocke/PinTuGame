import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class WholeImgShowPage extends BasePage {
  @property(cc.Sprite)
  img: cc.Sprite = null;
  @property(cc.Node)
  showNode: cc.Node = null;
  _init(t) {
    super._init.call(this, t);
    this.img.spriteFrame = t;
    this.showNode.active = false;
  }
  _onHide() {
    super._onHide.call(this);
  }
  _onShow() {
    super._onShow.call(this);
    this.showNode.active = true;
  }
  close() {
    this.showNode.active = false;
    this._hide();
  }
}