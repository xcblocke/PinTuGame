const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export class HideTarget extends cc.Component {
  @property(cc.Node)
  targetNode: cc.Node = null;
  @property(cc.Float)
  visableTime: number = 1;
  @property(cc.Float)
  hideTime: number = 1;
  start() {
    this.targetNode.active = true;
    this.viewAnim();
  }
  viewAnim() {
    var e = this;
    this.scheduleOnce(function () {
      e.targetNode.active = false;
      e.scheduleOnce(function () {
        e.targetNode.active = true;
        e.viewAnim();
      }, e.hideTime);
    }, this.visableTime);
  }
}