const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class SpineReqeat extends cc.Component {
  @property(cc.Float)
  distance: number = 2;
  @property(cc.Float)
  delay: number = 0.5;
  @property(cc.String)
  animationName: string = "1";
  nowDis = 2;
  onLoad() {
    this.node.getComponent(sp.Skeleton).enabled = false;
    this.nowDis = this.distance;
  }
  start() {}
  playComplete() {
    this.node.getComponent(sp.Skeleton).setAnimation(0, this.animationName, false);
  }
  update(e) {
    this.delay -= e;
    if (!(this.delay > 0)) {
      this.node.getComponent(sp.Skeleton).enabled = true;
      if (this.nowDis > 0) this.nowDis -= e;else {
        this.nowDis = this.distance;
        this.playComplete();
      }
    }
  }
}