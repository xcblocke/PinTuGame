import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class GoldTipPage extends BasePage {
  @property(cc.RichText)
  tipLabel: cc.RichText = null;
  _onHide() {
    super._onHide.call(this);
  }
  _onShow() {
    super._onShow.call(this);
  }
  _init(e) {
    this.tipLabel.string = e.desc;
    this.startPosition = e.startPosition;
  }
}