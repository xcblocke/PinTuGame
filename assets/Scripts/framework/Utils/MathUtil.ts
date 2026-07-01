export class MathUtils {
  static instance = null;
  static getInstance() {
    null == this.instance && (this.instance = new MathUtils());
    return this.instance;
  }
  accAdd(e, t) {
    var o,
      n,
      i = 0,
      a = 0;
    try {
      i = e.toString().split(".")[1].length;
    } catch (e) {
      i = 0;
    }
    try {
      a = t.toString().split(".")[1].length;
    } catch (e) {
      a = 0;
    }
    n = Math.abs(i - a);
    o = Math.pow(10, Math.max(i, a));
    if (n > 0) {
      var r = Math.pow(10, n);
      if (i > a) {
        e = Number(e.toString().replace(".", ""));
        t = Number(t.toString().replace(".", "")) * r;
      } else {
        e = Number(e.toString().replace(".", "")) * r;
        t = Number(t.toString().replace(".", ""));
      }
    } else {
      e = Number(e.toString().replace(".", ""));
      t = Number(t.toString().replace(".", ""));
    }
    return (e + t) / o;
  }
  accSub(e, t) {
    var o,
      n = 0,
      i = 0;
    try {
      n = e.toString().split(".")[1].length;
    } catch (e) {
      n = 0;
    }
    try {
      i = t.toString().split(".")[1].length;
    } catch (e) {
      i = 0;
    }
    return ((e * (o = Math.pow(10, Math.max(n, i))) - t * o) / o).toFixed(n >= i ? n : i);
  }
  accMul(e, t) {
    var o = 0,
      n = e.toString(),
      i = t.toString();
    try {
      o += n.split(".")[1].length;
    } catch (e) {}
    try {
      o += i.split(".")[1].length;
    } catch (e) {}
    return Number(n.replace(".", "")) * Number(i.replace(".", "")) / Math.pow(10, o);
  }
  accDiv(e, t) {
    var o = 0,
      n = 0;
    try {
      o = e.toString().split(".")[1].length;
    } catch (e) {}
    try {
      n = t.toString().split(".")[1].length;
    } catch (e) {}
    return Number(e.toString().replace(".", "")) / Number(t.toString().replace(".", "")) * Math.pow(10, n - o);
  }
}