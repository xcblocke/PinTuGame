const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class SpineDelayLoop extends cc.Component {
  @property({
    tooltip: "Spine动画的名称。如果未设置，将使用第一个动画名称。"
  })
  animationName = "";
  @property({
    type: cc.Float,
    tooltip: "动画播放完成后的等待时间（秒）。"
  })
  delayTime: number = 1;
  spine = null;
  onLoad() {
    this.spine = this.getComponent(sp.Skeleton);
    this.spine || cc.error("SpineLoopController: Spine component not found on node.");
  }
  onEnable() {
    this.animationName || (this.animationName = this.spine.defaultAnimation);
    this.playAnimation();
  }
  playAnimation() {
    var e = this;
    if (this.spine) {
      this.spine.setAnimation(0, this.animationName, false);
      var t = this.spine.getCurrent(0);
      if (t) {
        var o = t.animation.duration;
        this.scheduleOnce(function () {
          e.playAnimation();
        }, o + this.delayTime);
      }
    }
  }
}