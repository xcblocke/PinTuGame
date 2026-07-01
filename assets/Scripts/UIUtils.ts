export var UITools = {
  typingAni: function (e, t, o, n) {
    for (var i = this, a = /<.+?\/?>/g, r = t.match(a), c = t.replace(a, "│").split("│"), s = [], l = 0, u = 0, p = c; u < p.length; u++) {
      if ("" !== (v = p[u])) {
        v = "$[" + l + "]";
        l += 1;
      }
      s.push(v);
    }
    for (var d = s.join("│"), f = 0; f < c.length; f++) if ("" === c[f]) {
      c.splice(f, 1);
      f -= 1;
    }
    for (; -1 !== d.search("│");) if (r[0]) {
      d = d.replace("│", r[0].toString());
      r.splice(0, 1);
    } else {
      d = d.replace("│", "");
      console.warn("matchArr not enough");
    }
    for (var h = [], g = new Array(l).fill(""), y = 0; y < c.length; y++) for (var m = 0, _ = c[y]; m < _.length; m++) {
      var v = _[m];
      g[y] = g[y] + v;
      var b = d;
      for (f = 0; f < l; f++) b = b.replace("$[" + f + "]", g[f]);
      h.push(b);
    }
    var w = 0,
      P = function P() {
        if (!i.isPlayDone) if (w >= h.length) {
          i.isPlayDone = true;
          n && n();
        } else {
          e.string = h[w];
          w += 1;
          setTimeout(function () {
            P();
          }, o);
        }
      };
    P();
    setTimeout(function () {
      P();
    }, o);
  }
};