import { TweenEasing } from "../config/AnimeConfig";
var i = [cc.WrapMode.Default, cc.WrapMode.Normal, cc.WrapMode.Reverse];
class a {
  static _instance = null;
  static get instance() {
    this._instance || (this._instance = new a());
    return this._instance;
  }
  onAnimFinishOnce(e, t, o) {
    e.once(cc.Animation.EventType.FINISHED, t, o);
  }
  onAnimFinishOn(e, t, o) {
    e.on(cc.Animation.EventType.FINISHED, t, o);
  }
  showHideBgTween(e, t = true, o = 0.5, n = 220) {
    e.opacity = t ? 0 : n;
    return new Promise(function (i) {
      cc.tween(e).to(o, {
        opacity: t ? 0 : n
      }).call(function () {
        i(true);
      }).start();
    });
  }
  callAnimPlay(e, t = null) {
    var o = t ? e.getAnimationState(t) : e.getAnimationState(e.defaultClip.name),
      n = i.includes(o.wrapMode) ? new Promise(function (t) {
        e.once(cc.Animation.EventType.FINISHED, function () {
          t(true);
        });
      }) : null;
    if (t) {
      e.play(t);
    } else {
      e.play();
    }
    return n;
  }
  AnimeReversePlay(e, t = null, o = false) {
    (t ? e.getAnimationState(t) : e.getAnimationState(e.defaultClip.name)).wrapMode = o ? cc.WrapMode.Reverse : cc.WrapMode.Normal;
    var n = new Promise(function (t) {
      e.once(cc.Animation.EventType.FINISHED, function () {
        null == t || t(true);
        t = null;
      });
    });
    if (t) {
      e.play(t);
    } else {
      e.play();
    }
    return n;
  }
  popAnim(e, t = 0, o = 0.5, i = false, a = TweenEasing.elasticOut) {
    e.scale = 0;
    e.active = i;
    return cc.tween(e).delay(0.09 * t).call(function () {
      e.active = true;
    }).to(o, {
      scale: 1
    }, {
      easing: a
    }).start();
  }
}
export default a.instance;