const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class BreathComp extends cc.Component {
  @property(cc.Integer)
  breathTime: number = 0.5;
  nowTween = null;
  @property(cc.Float)
  addScaleNode: number = 0.1;
  originScale = 0;
  onLoad() {
    this.originScale = this.node.scale;
  }
  start() {
    this.play();
  }
  play() {
    0 == this.originScale && (this.originScale = this.node.scale);
    this.stop();
    var e = this.originScale,
      t = this.breathTime;
    this.nowTween = cc.tween(this.node).to(t, {
      scale: e + this.addScaleNode
    }).to(t, {
      scale: e
    }).union().repeatForever().start();
  }
  stop() {
    var e;
    null === (e = this.nowTween) || void 0 === e || e.stop();
  }
}