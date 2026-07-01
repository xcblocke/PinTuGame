import { TweenEasingEnum } from "./game/config/AnimeConfig";
const {
  ccclass,
  menu,
  property
} = cc._decorator;
enum r {
  position = 0,
  scale = 1,
  angle = 2,
}
enum c {
  to = 0,
  by = 1,
  parallel = 2,
  delay = 3,
  union = 4,
  repeat = 5,
  repeatForever = 6,
}
var f = [c.to, c.by, c.parallel];
@ccclass("AnimeTweenConfig")
class AnimeTweenConfig {
  @property({
    type: cc.Float,
    tooltip: "动画时间",
    visible: function () {
      return f.includes(this.action);
    }
  })
  duration: number = 1;
  @property({
    type: cc.Enum(r),
    tooltip: "动画类型\n        position: 位置\n        scale: 缩放\n        angle: 角度\n        sleep: 睡眠\n        ",
    visible: function () {
      return f.includes(this.action);
    }
  })
  type: number = r.position;
  @property({
    type: cc.Enum(TweenEasingEnum),
    tooltip: "动画缓动",
    visible: function () {
      return f.includes(this.action);
    }
  })
  easing: number = TweenEasingEnum.smooth;
  @property({
    type: cc.Enum(c),
    tooltip: "\n        to: 执行动画\n        by: 相对动画\n        parallel: 并行动画\n        delay: 延迟动画\n        union: 合并动画\n        repeat: 重复动画\n        repeatForever: 永久重复动画\n        "
  })
  action: number = c.by;
  @property({
    visible: function () {
      return this.type === r.position;
    },
    tooltip: "动画目标位置"
  })
  targetPosition = cc.v3(0, 0, 0);
  @property({
    type: cc.Float,
    visible: function () {
      return this.type === r.scale;
    },
    tooltip: "动画目标缩放"
  })
  targetScale: number = 1;
  @property({
    type: cc.Float,
    visible: function () {
      return this.type === r.angle;
    },
    tooltip: "动画目标角度"
  })
  targetAngle: number = 0;
  @property({
    type: cc.Integer,
    visible: function () {
      return this.action === c.repeat;
    },
    tooltip: "动画重复次数"
  })
  repeatTimes: number = 1;
}
@ccclass
@menu("动画组件")
export default class AnimeTween extends cc.Component {
  @property({
    type: [AnimeTweenConfig]
  })
  tweenConfigs: [AnimeTweenConfig] = [];
  @property({
    tooltip: "自动开始播放"
  })
  autoPlay = true;
  stopTween() {
    var e;
    null === (e = this.nowTween) || void 0 === e || e.stop();
  }
  startTween(e = function () {}) {
    var t;
    null === (t = this.nowTween) || void 0 === t || t.stop();
    var o = cc.tween(this.node);
    this.tweenConfigs.forEach(function (e) {
      var t = c[e.action],
        n = TweenEasingEnum[e.easing];
      switch (e.action) {
        case c.repeat:
          o = o.union().repeat(e.repeatTimes);
          return;
        case c.repeatForever:
          o = o.union().repeatForever();
          return;
        case c.delay:
          o = o.delay(e.duration);
          return;
      }
      switch (e.type) {
        case r.position:
          o = o[t](e.duration, {
            position: e.targetPosition
          }, {
            easing: n
          });
          break;
        case r.scale:
          o = o[t](e.duration, {
            scale: e.targetScale
          }, {
            easing: n
          });
          break;
        case r.angle:
          o = o[t](e.duration, {
            rotation: e.targetAngle
          }, {
            easing: n
          });
      }
    });
    o.start();
    this.nowTween = o;
  }
  start() {
    this.autoPlay && this.startTween();
  }
  onLoad() {}
}