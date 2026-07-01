import EventHandler from "./EventHandler";
export default class EventDispatcher {
  _events = null;
  hasListener(e) {
    return !(!this._events || !this._events[e]);
  }
  event(e, t = null) {
    if (!this._events || !this._events[e]) return false;
    var o = this._events[e];
    if (o.run) {
      o.once && delete this._events[e];
      o.check(this, e) && (null != t ? o.runWith(t) : o.run());
    } else {
      for (var n = 0, i = o.length; n < i; n++) {
        var a = o[n];
        a && a.check(this, e) && (null != t ? a.runWith(t) : a.run());
        if (!a || a.once) {
          o.splice(n, 1);
          n--;
          i--;
        }
      }
      0 === o.length && this._events && delete this._events[e];
    }
    return true;
  }
  on(e, t, o, n = null) {
    return this._createListener(e, t, o, n, false);
  }
  once(e, t, o, n = null) {
    return this._createListener(e, t, o, n, true);
  }
  _createListener(e, t, o, i, a, r = true) {
    r && this.off(e, t, o, a);
    var c = EventHandler.create(t || this, o, i, a);
    c.register(this, e);
    this._events || (this._events = {});
    var s = this._events;
    if (s[e]) {
      if (s[e].run) {
        s[e] = [s[e], c];
      } else {
        s[e].push(c);
      }
    } else {
      s[e] = c;
    }
    return this;
  }
  off(e, t, o, n = false) {
    if (!this._events || !this._events[e]) return this;
    var i = this._events[e];
    if (null != i) if (i.run) {
      if ((!t || i.caller === t) && (null == o || i.method === o) && (!n || i.once)) {
        delete this._events[e];
        i.recover();
      }
    } else {
      for (var a = 0, r = i.length, c = 0; c < r; c++) {
        var s = i[c];
        if (s) {
          if (s && (!t || s.caller === t) && (null == o || s.method === o) && (!n || s.once)) {
            a++;
            i[c] = "NULL";
            s.recover();
          }
        } else {
          i[c] = "NULL";
          a++;
        }
      }
      if (a === r) delete this._events[e];else if (a > 0) {
        for (var l = 0, u = 0; u < r; ++u) {
          var p = i[u];
          if (null == p) {
            i.splice(u);
            break;
          }
          if ("NULL" == p) i[u] = null;else {
            if (u != l) {
              i[l] = p;
              i[u] = null;
            }
            ++l;
          }
        }
        i.length = r - a;
      }
    }
    return this;
  }
  offAll(e = null) {
    var t = this._events;
    if (!t) return this;
    if (e) {
      this._recoverHandlers(t[e]);
      delete t[e];
    } else {
      for (var o in t) this._recoverHandlers(t[o]);
      this._events = null;
    }
    return this;
  }
  offAllCaller(e) {
    if (e && this._events) for (var t in this._events) this.off(t, e, null);
    return this;
  }
  _recoverHandlers(e) {
    if (e) if (e.run) e.recover();else for (var t = e.length - 1; t > -1; t--) if (e[t]) {
      e[t].recover();
      e[t] = null;
    }
  }
}