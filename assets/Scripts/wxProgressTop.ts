const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class wxProgressTop extends cc.Component {
  @property(cc.Sprite)
  proTop: cc.Sprite = null;
  setProgress() {
    this.proTop.fillRange = 1;
  }
  init() {}
}