const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class DeadLineBtn extends cc.Component {
  @property(cc.Label)
  timeLabel: cc.Label = null;
  @property(cc.Sprite)
  timeSprite: cc.Sprite = null;
  @property(cc.Label)
  btnText: cc.Label = null;
  timeStart = -9999;
  DEADLINE = 5;
  cb = null;
  startTime() {
    this.timeStart = this.DEADLINE;
  }
  init(e, t, o) {
    this.timeSprite.fillRange = 1;
    this.timeLabel.string = e + "s";
    this.cb = t;
    this.timeStart = -9999;
    this.DEADLINE = e;
    this.btnText.string = o;
  }
  update(e) {
    if (this.timeStart > 0) {
      this.timeStart -= e;
      this.timeSprite.fillRange = Math.max(0, this.timeStart / this.DEADLINE);
      this.timeLabel.string = Math.ceil(this.timeStart) + "s";
    } else if (this.timeStart > -9999) {
      this.timeStart = -9999;
      this.cb();
    }
  }
}