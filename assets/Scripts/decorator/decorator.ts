import AudioManager from "../framework/Utils/AudioManager";
import EngineUtil from "../framework/Utils/EngineUtil";
import CommonUtil from "../common/CommonUtil";

export default class decorator {
  static Debounce(e = 300, t = true, o = "") {
    return function (n, i, s) {
      var l = s.value;
      s.value = function () {
        for (var n = [], s = 0; s < arguments.length; s++) n[s] = arguments[s];
        t && AudioManager.getInstance().playBtn();
        if (!CommonUtil.onAwait(i + o, e)) return l.apply(this, n);
        EngineUtil.showCocosToast3("点击过快，请稍后再试");
      };
      return s;
    };
  }
  static Singleton(e) {
    var t;
    return class _decorator extends e {
      constructor() {
        super(o);
        for (var o = [], n = 0; n < arguments.length; n++) o[n] = arguments[n];
        if (t) return t;
      }
    };
  }
  static Watch(e) {
    return function (t, o) {
      var n = t[o];
      Object.defineProperty(t, o, {
        get: function () {
          return n;
        },
        set: function (t) {
          var o = n;
          n = t;
          e(t, o);
        },
        enumerable: true,
        configurable: true
      });
    };
  }
}