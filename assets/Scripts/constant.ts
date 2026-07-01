import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
export var Constant = {
  ArrayEnd: function (e) {
    return 0 == e.length ? null : e[e.length - 1];
  },
  showCommonDialog: function (e, t, o = true, a = true, r = null, c = null) {
    EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "commonPopTipsPage",
      data: {
        title: e,
        content: t,
        showYes: o,
        showNo: a,
        yesCallback: r,
        noCallback: c
      }
    });
  },
  limitStrLength: function (e, t) {
    return e.length > t ? e.substring(0, t) + "..." : e;
  },
  setGray: function (e, t = true, o?) {
    var n = e,
      i = cc.Material.getBuiltinMaterial(t ? cc.Material.BUILTIN_NAME.GRAY_SPRITE : cc.Material.BUILTIN_NAME.SPRITE);
    if (e instanceof cc.Node) {
      (n = e.getComponent(cc.Sprite)) && n.setMaterial(0, i);
      (n = e.getComponent(cc.Label)) && n.setMaterial(0, i);
      o && e.children.forEach(function (e) {
        (n = e.getComponent(cc.Sprite)) && n.setMaterial(0, i);
        (n = e.getComponent(cc.Label)) && n.setMaterial(0, i);
      }, this);
    } else n && n.setMaterial(0, i);
  },
  formatEmail: function (e, t = 20) {
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
};