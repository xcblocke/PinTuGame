import HotUpdate from "./framework/Event/HotUpdate";
const {
  ccclass,
  property
} = cc._decorator;
function c(e, t) {
  return e ? c(e.parent, t * e.scale) : t;
}
if (!cc.Node.prototype.getChildByPath) {
  Object.defineProperty(Array.prototype, "last", {
    get: function () {
      return this[this.length - 1];
    }
  });
  cc.Node.prototype.getChildByPath = function (e) {
    return cc.find(e, this);
  };
  Object.defineProperty(cc.Node.prototype, "worldPosition", {
    get: function () {
      return this.convertToWorldSpaceAR(cc.v3(0, 0, 0)).add(cc.v3(-cc.winSize.width / 2, -cc.winSize.height / 2));
    },
    set: function (e) {
      if (this.parent) {
        e = this.parent.convertToNodeSpaceAR(e).add(cc.v3(cc.winSize.width / 2, cc.winSize.height / 2));
        this.setPosition(e);
      }
    }
  });
  Object.defineProperty(cc.Node.prototype, "worldPositionX", {
    get: function () {
      return this.worldPosition.x;
    },
    set: function (e) {
      var t = this.worldPosition;
      t.x = e;
      this.worldPosition = t;
    }
  });
  Object.defineProperty(cc.Node.prototype, "worldPositionY", {
    get: function () {
      return this.worldPosition.y;
    },
    set: function (e) {
      var t = this.worldPosition;
      t.y = e;
      this.worldPosition = t;
    }
  });
  Object.defineProperty(cc.Node.prototype, "worldScale", {
    get: function () {
      return c(null == this ? void 0 : this.parent, this.scale);
    }
  });
  String.prototype.format = function () {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return this.replace(/\{(\d+)\}/g, function (t, o) {
      return o < e.length ? e[o] : t;
    });
  };
}
@ccclass
export default class init extends cc.Component {
  onLoad() {
    HotUpdate.getInstance().getBaseVersion();
    if (HotUpdate.getInstance().isOnlineRelease()) {
      console.log = function () {};
      console.warn = function () {};
      console.info = function () {};
      console.debug = function () {};
      console.trace = function () {};
      console.dir = function () {};
      console.time = function () {};
      console.timeEnd = function () {};
    }
    cc.director.loadScene("loadingScene");
  }
}