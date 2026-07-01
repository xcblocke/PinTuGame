const {
  ccclass,
  property
} = cc._decorator;
enum r {
  FADE = 0,
  SCALE = 1,
}
enum c {
  CENTER = 0,
  LEFT = 1,
  RIGHT = 2,
  TOP = 3,
  BOTTOM = 4,
}
@ccclass
export default class UIAnimComponent extends cc.Component {
  @property({
    type: cc.Enum(r),
    tooltip: "选择动画类型：渐隐（FADE）或缩放（SCALE）"
  })
  animType: number = r.FADE;
  @property({
    type: cc.Enum(c),
    tooltip: "缩放中心点位置",
    visible: function () {
      return this.animType === r.SCALE;
    }
  })
  centerType: number = c.CENTER;
  @property({
    tooltip: "起始缩放比例（如从0.5开始缩放）",
    visible: function () {
      return this.animType === r.SCALE;
    }
  })
  startScale = cc.v2(0, 0);
  @property({
    tooltip: "目标缩放比例（通常保持1,1）",
    visible: function () {
      return this.animType === r.SCALE;
    }
  })
  targetScale = cc.v2(1, 1);
  @property({
    tooltip: "动画持续时间（秒）"
  })
  duration = 0.3;
  @property({
    tooltip: "缓动曲线类型（如quadIn、backOut等）"
  })
  easeType = "quadOut";
  originalOpacity = 255;
  originalPosition = cc.v3(0, 0, 0);
  originalAnchor = cc.v2(0.5, 0.5);
  onLoad() {
    this.originalOpacity = this.node.opacity;
    this.originalPosition = this.node.position.clone();
    this.originalAnchor = this.node.getAnchorPoint();
    this.playShow();
  }
  playShow() {
    this.node.active = true;
    this.playAnim(true);
  }
  playHide() {
    var e = this;
    this.playAnim(false, function () {
      e.node.active = false;
    });
  }
  playAnim(e, t) {
    var o = this;
    cc.Tween.stopAllByTarget(this.node);
    var n = this.getScaleValues(e),
      i = n.initialScale,
      a = n.targetScale,
      c = this.getOpacityValues(e),
      s = c.initialOpacity,
      l = c.targetOpacity;
    this.node.opacity = s;
    this.node.setScale(i);
    this.animType === r.SCALE && this.configureScaleAnimation(e);
    cc.tween(this.node).to(this.duration, {
      scaleX: a.x,
      scaleY: a.y,
      opacity: l
    }, {
      easing: cc.easing[this.easeType] || cc.easing.quadOut
    }).call(function () {
      e || o.resetAnchor();
      null == t || t();
    }).start();
  }
  configureScaleAnimation(e) {
    this.setPivotByCenterType();
    e && this.node.setAnchorPoint(this.originalAnchor);
  }
  setPivotByCenterType() {
    var e = this.calculateAnchorPoint();
    this.node.setAnchorPoint(e);
  }
  calculateAnchorPoint() {
    switch (this.centerType) {
      case c.LEFT:
        return cc.v2(0, 0.5);
      case c.RIGHT:
        return cc.v2(1, 0.5);
      case c.TOP:
        return cc.v2(0.5, 1);
      case c.BOTTOM:
        return cc.v2(0.5, 0);
      default:
        return cc.v2(0.5, 0.5);
    }
  }
  getScaleValues(e) {
    return {
      initialScale: e ? this.startScale : this.targetScale,
      targetScale: e ? this.targetScale : this.startScale
    };
  }
  getOpacityValues(e) {
    return {
      initialOpacity: e ? 0 : this.originalOpacity,
      targetOpacity: e ? this.originalOpacity : 0
    };
  }
  resetAnchor() {
    this.node.setAnchorPoint(this.originalAnchor);
  }
}