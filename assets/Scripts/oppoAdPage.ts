import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class oppoAdPage extends BasePage {
  isOK = false;
  _init(t) {
    super._init.call(this, t);
    this.resolveData = false;
  }
  onLoad() {
    super.onLoad.call(this);
  }
  onbtnYesClick() {
    this.resolveData = true;
    this.DoClosePage();
  }
}