import { SeedRandom } from "../common/SeedRandom";
class _Constants {
  cellWidth = 79;
  cellHeight = 79;
  cellWidthHalf = 40;
  cellHeightHalf = 40;
  gridWidth = 8;
  gridHeight = 8;
  gameConfig = {
    emptyRateWeight: 1,
    adjacentWeight: 1,
    completeLinesWeight: 10,
    isolatedSpacesWeight: 10
  };
  BlockMaxColor = 4;
  BlockTarget = {
    SCORE: 1
  };
  SaveKey = {
    LevelMap: "levelMap",
    RuntimeData: "levelRunTime",
    CurLevel: "CurLevel"
  };
  StoneShape = [40, 39, 38, 37, 36, 31, 30, 29, 28];
  defaultLevel = 1;
  Random = new SeedRandom(Date.now());
  Vibrator = {
    put: 50,
    clear: 100,
    mult_clear: 150,
    comb: 200
  };
  levelMap = {
    conf: null,
    map: null
  };
  maxLevel = 20;
  SignleBlocks = [0, 3, 4, 5, 6];
  CashTipsStep = [13, 22];
  NewPlayerRwdLevel = 4;
  firstLevel = 12;
  addOnLevel = 6;
  realLevel = 15;
  guideAmount = 1000000;
  static getInstance() {
    _Constants._instance || (_Constants._instance = new _Constants());
    return _Constants._instance;
  }
  randomInArray(e) {
    return e[Math.floor(this.Random.Random() * e.length)];
  }
  randomInArrayByIndex(e, t) {
    var o = this;
    return new Array(t).fill(0).map(function () {
      return e[Math.floor(o.Random.Random() * e.length)];
    });
  }
  randomIndexInArray(e) {
    return Math.floor(Math.random() * e.length);
  }
  randomNum(e) {
    return Math.floor(Math.random() * e);
  }
  randomIn(e, t) {
    return e == t ? e : Math.floor(Math.random() * (t - e + 1)) + e;
  }
  saveData(e, t) {
    if (t) {
      cc.sys.localStorage.setItem(e, t);
    } else {
      this.removeData(e);
    }
  }
  getSaveData(e) {
    return cc.sys.localStorage.getItem(e);
  }
  removeData(e) {
    cc.sys.localStorage.removeItem(e);
  }
  getIntData(e, t = 0) {
    try {
      var o = parseInt(this.getSaveData(e));
      if (!isNaN(o)) return o;
    } catch (e) {}
    return t;
  }
  clearChild(e) {
    for (var t = e.childrenCount - 1; t >= 0; t--) e.children[t].destroy();
  }
  bezierOpts2(e, t, o, n = 1, i = null) {
    var a = Object.create(null),
      r = cc.v3(0, 0);
    if (i) {
      cc.Vec3.add(r, t, i);
    } else {
      cc.Vec3.add(r, t, cc.v3(-50 * n, 100));
    }
    a.onUpdate = function (n, i) {
      var a,
        c,
        s,
        l,
        u,
        p,
        d = (s = r, l = o, u = (1 - (a = i)) * (1 - a) * (c = t).x + 2 * a * (1 - a) * s.x + a * a * l.x, p = (1 - a) * (1 - a) * c.y + 2 * a * (1 - a) * s.y + a * a * l.y, cc.v2(u, p));
      e.setPosition(d.x, d.y);
    };
    return a;
  }
  bezierOpts(e, t, o, n = 1) {
    var i = Object.create(null),
      a = cc.v3(0, 0);
    cc.Vec3.add(a, t, cc.v3(-50 * n, 100));
    i.onUpdate = function (n, i) {
      var r,
        c,
        s,
        l,
        u,
        p,
        d = (s = a, l = o, u = (1 - (r = i)) * (1 - r) * (c = t).x + 2 * r * (1 - r) * s.x + r * r * l.x, p = (1 - r) * (1 - r) * c.y + 2 * r * (1 - r) * s.y + r * r * l.y, cc.v2(u, p));
      e.setPosition(d.x, d.y);
    };
    return i;
  }
  bezierTo(e, t, o, n, i, a) {
    var r = Object.create(null);
    r.onUpdate = function (t, a) {
      var r,
        c,
        s,
        l,
        u,
        p,
        d = (s = n, l = i, u = (1 - (r = a)) * (1 - r) * (c = o).x + 2 * r * (1 - r) * s.x + r * r * l.x, p = (1 - r) * (1 - r) * c.y + 2 * r * (1 - r) * s.y + r * r * l.y, cc.v2(u, p));
      e.setPosition(d.x, d.y);
    };
    return cc.tween(e).to(t, {}, r).call(function () {
      a();
    });
  }
  Clamp01(e) {
    return Math.max(0, Math.min(1, e));
  }
  getLevelMax() {
    return 9999999;
  }
  ConvertMap(e) {
    if (e[0] >= 0) {
      for (var t = [], o = 0; o < e.length; o++) t.push({
        x: o % this.gridWidth,
        y: Math.floor(o / this.gridWidth),
        type: e[o]
      });
      return t;
    }
    return e;
  }
  runBezierAction(e, t, o, i, a, r) {
    var c = [...[t], ...o, ...[i]],
      s = c.length - 1,
      l = this.calculateCombinations(s),
      u = function u(e) {
        for (var t = cc.v2(0, 0), o = 0; o <= s; o++) {
          var n = l[o] * Math.pow(e, o) * Math.pow(1 - e, s - o);
          t.x += c[o].x * n;
          t.y += c[o].y * n;
        }
        return t;
      },
      p = Object.create(null);
    p.onUpdate = function (t, o) {
      var n = u(o);
      e.setPosition(n);
    };
    cc.tween(e).to(a, {}, p).call(function () {
      return r && r();
    }).start();
  }
  calculateCombinations(e) {
    for (var t = [], o = 0; o <= e; o++) t[o] = this.combination(e, o);
    return t;
  }
  combination(e, t) {
    if (t < 0 || t > e) return 0;
    if (0 === t || t === e) return 1;
    for (var o = 1, n = 1; n <= t; n++) o = o * (e - t + n) / n;
    return o;
  }
  subNumberStr(e, t = true) {
    var o = e.split(".");
    if (1 == o.length) return e;
    if (!t) return o[0];
    var n = o[0],
      i = o[1];
    return i.length > 1 && n.length > 1 && "0" == (i = i[0])[0] ? n : n + "." + i;
  }
  ArrayLike(e, t) {
    if (!e || !t) return false;
    if (e.length != t.length) return false;
    for (var o = 0; o < e.length; o++) if (e[o] != t[o]) return false;
    return true;
  }
  toFix(e, t) {
    var o = e.toFixed(t);
    return parseFloat(o.toString());
  }
  GetWordPosition(e) {
    return e.parent.convertToWorldSpaceAR(e.position);
  }
  GetNodePosition(e, t) {
    var o = t.parent.convertToNodeSpaceAR(e);
    return cc.v2(o.x, o.y);
  }
  formatEmail(e, t = 20) {
    var o;
    if (e.length <= t) return e;
    var n = e.indexOf("@");
    if (-1 === n) {
      var i = Math.floor(0.5 * t),
        a = t - i - 3 > 0 ? Math.floor(0.35 * t) : 3,
        r = t - i - a,
        c = e.slice(0, i),
        s = e.slice(-a);
      return "" + c + "*".repeat(r) + s;
    }
    var l,
      u = e.slice(0, 3),
      p = e.slice(n - 3, n),
      d = e.slice(n + 1),
      f = null !== (o = d[0]) && void 0 !== o ? o : "",
      h = d.lastIndexOf(".com"),
      g = t - (8 + (l = -1 !== h ? d.slice(h) : d.slice(-4)).length);
    g < 0 && (g = 0);
    var y = Math.floor(g / 2),
      m = g - y;
    return "" + u + "*".repeat(y) + p + "@" + f + "*".repeat(m) + l;
  }
}
export var Constants = _Constants.getInstance();
window["Constants"] = Constants;