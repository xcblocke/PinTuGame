import EventMgr from "../framework/Event/EventMgr";
import GameEventType from "../framework/Event/GameEventType";
import EngineUtil from "../framework/Utils/EngineUtil";
import AnimUtil from "../game/common/AnimUtil";
export var EffectType = {
  TakeoutRecive: "takeout_recive",
  UrgentFlash: "urgent",
  TakeoutOverTime: "takeout_overtime"
};
class _PageMgr {
  map_pages = new Map();
  arr_pageQueue = [];
  onShowNum = 0;
  set_onShowPages = new Set();
  persist = null;
  pages = null;
  effects = null;
  effectBefore = null;
  effectPageBefore = null;
  toast = null;
  openTimes = new Set();
  openTimers = new Map();
  effectMap = new Map();
  showPageSet = new Set();
  fullNode = null;
  static _instance = null;
  static get instance() {
    return this._getInstance();
  }
  static _getInstance() {
    if (this._instance) return this._instance;
    this._instance = new _PageMgr();
    return this._instance;
  }
  init() {
    this.createNodes();
    this.addEvent();
  }
  addEvent() {
    EventMgr.listen(GameEventType.PAGE_SHOW, this.showPage, this);
    EventMgr.listen(GameEventType.PAGE_HIDE, this.hidePage, this);
  }
  removeEvent() {
    EventMgr.ignore(GameEventType.PAGE_SHOW, this.showPage, this);
    EventMgr.ignore(GameEventType.PAGE_HIDE, this.hidePage, this);
  }
  setToastNode(e) {
    e.parent = this.toast;
  }
  setEffectNode2(e) {
    e.parent = this.effects;
  }
  createNodes() {
    var e = new cc.Node("persist");
    this.persist = e;
    this.persist.height = cc.winSize.height;
    this.persist.width = cc.winSize.width;
    var t = new cc.Node("effects"),
      o = new cc.Node("effectBefore"),
      n = new cc.Node("effectPageBefore");
    this.effectPageBefore = n;
    this.effects = t;
    this.effectBefore = o;
    var i = new cc.Node("pages");
    i.height = cc.winSize.height;
    i.width = cc.winSize.width;
    this.pages = i;
    var a = new cc.Node("toast"),
      r = new cc.Node("fullBlock");
    this.toast = a;
    this.persist.addChild(n);
    this.effectPageBefore.width = cc.winSize.width;
    this.effectPageBefore.height = cc.winSize.height;
    this.persist.addChild(i);
    this.persist.addChild(a);
    this.persist.addChild(this.effectBefore);
    this.effectBefore.width = cc.winSize.width;
    this.effectBefore.height = cc.winSize.height;
    this.persist.addChild(t);
    this.persist.addChild(r);
    r.width = 99999;
    r.height = 99999;
    r.addComponent(cc.BlockInputEvents);
    this.fullNode = r;
    this.fullNode.active = false;
    e.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
    cc.game.addPersistRootNode(e);
  }
  openEventBlock(e) {
    var t = this;
    if (!this.openTimes.has(e)) {
      this.fullNode.active = true;
      this.openTimes.add(e);
      this.clearOpenTimer(e);
      var o = setTimeout(function () {
        t.closeEventBlock(e);
      }, 6666);
      this.openTimers.set(e, o);
    }
  }
  clearOpenTimer(e) {
    var t = this.openTimers.get(e);
    if (void 0 !== t) {
      clearTimeout(t);
      this.openTimers.delete(e);
    }
  }
  closeEventBlock(e) {
    this.clearOpenTimer(e);
    this.openTimes.has(e) && this.openTimes.delete(e);
    0 === this.openTimes.size && (this.fullNode.active = false);
  }
  loadBaseEffect() {
    var e = this;
    cc.resources.load(EngineUtil.addBehindFixByPath("effects/effects"), cc.Prefab, function (t, o) {
      if (t) console.error("加载基础特效失败", t);else {
        var n = cc.instantiate(o);
        e.effectBase = n;
        n.children.forEach(function (e) {
          e.active = false;
        });
        e.effects.addChild(n);
      }
    });
  }
  showEffect(e) {
    var t = this.effectMap.get(e);
    if (!t) {
      var o = this.effectBase.children.find(function (t) {
        if (t.name === e) return true;
      });
      o.active = true;
      (t = null == o ? void 0 : o.getComponent(cc.Animation)) && this.effectMap.set(e, t);
    }
    if (!t || t.getAnimationState(t.defaultClip.name).isPlaying) return false;
    t.node.active = true;
    return AnimUtil.callAnimPlay(t);
  }
  hideEffect(e) {
    var t = this.effectMap.get(e);
    if (t) {
      t.node.active = false;
      null == t || t.stop();
    }
  }
  setEffectNode(e) {
    e.parent = this.effects;
  }
  showPageByEnum(e, t = null, o = null) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function () {
        return [2, this.showPage({
          name: e,
          option: o,
          data: t
        })];
      });
    });
  }
  getOption(e) {
    e || (e = {
      reuse: true,
      inQueue: false,
      only: true
    });
    var t = e.reuse,
      o = e.inQueue,
      n = e.only;
    void 0 === o && (e.inQueue = false);
    void 0 === t && (e.reuse = true);
    void 0 === n && (e.only = true);
    return e;
  }
  showPage(e) {
    return __awaiter(this, void 0, void 0, function () {
      var t,
        o,
        a,
        r,
        s,
        l,
        u,
        p,
        d,
        f,
        h = this;
      return __generator(this, function (g) {
        switch (g.label) {
          case 0:
            t = e.name, o = e.data;
            a = e.option;
            if (!t) {
              console.error("class:pageMgr.fun:showPage页面名称为空");
              return [2];
            }
            if (this.showPageSet.has(t)) return [2];
            a = this.getOption(a);
            r = 0;
            if (a.inQueue) {
              if (this.onShowNum > 0) {
                this.arr_pageQueue.push(e);
                return [2];
              }
              this.onShowNum++;
            } else r = this.getPageIndex();
            if (!a.reuse) return [3, 2];
            if (!(s = this.map_pages.get(t))) return [3, 2];
            if (!(l = s.node)) return [3, 2];
            if (l.getComponent(t).isShow) {
              if (a.inQueue) {
                this.onShowNum--;
                this.onShowNum < 0 && (this.onShowNum = 0);
              }
              return [2];
            }
            p = new Promise(function (e) {
              u = e;
            });
            l.getComponent(t).resolve = u;
            l.opacity = 0;
            this.showPageSet.add(t);
            return [4, l.getComponent(t)._init(o)];
          case 1:
            g.sent();
            l.zIndex = r;
            l.active = true;
            this.set_onShowPages.add(l);
            return [2, p];
          case 2:
            f = new Promise(function (e) {
              d = e;
            });
            cc.resources.load(EngineUtil.addBehindFixByPath("pages/" + t), cc.Prefab, function (e, c) {
              return __awaiter(h, void 0, void 0, function () {
                var n;
                return __generator(this, function (i) {
                  switch (i.label) {
                    case 0:
                      if (e) {
                        console.error("class:pageMgr.fun:showPage加载页面错误", e);
                        return [2];
                      }
                      if (a.only && this.hasShowPage(t)) return [2];
                      (n = cc.instantiate(c)).zIndex = r;
                      this.set_onShowPages.add(n);
                      this.map_pages.set(t, {
                        node: n,
                        prefab: c,
                        option: a
                      });
                      n.opacity = 0;
                      this.pages.addChild(n);
                      this.showPageSet.add(t);
                      return [4, n.getComponent(t)._init(o)];
                    case 1:
                      i.sent();
                      n.getComponent(t).resolve = d;
                      return [2];
                  }
                });
              });
            });
            return [2, f];
        }
      });
    });
  }
  preloadPage(e) {
    return __awaiter(this, void 0, void 0, function () {
      var t = this;
      return __generator(this, function () {
        return this.hasShowPage(e) ? [2] : [2, new Promise(function (o) {
          cc.resources.load(EngineUtil.addBehindFixByPath("pages/" + e), cc.Prefab, function (a, r) {
            return __awaiter(t, void 0, void 0, function () {
              var t;
              return __generator(this, function () {
                if (a) {
                  console.error("class:pageMgr.fun:showPage加载页面错误", a);
                  return [2];
                }
                t = cc.instantiate(r);
                this.map_pages.set(e, {
                  node: t,
                  prefab: r,
                  option: this.getOption(null)
                });
                t.parent = this.pages;
                t.active = false;
                t.getComponent(e).isShow = false;
                this.closeEventBlock(e + "show");
                o(1);
                return [2];
              });
            });
          });
        })];
      });
    });
  }
  hasShowPage(e) {
    var t = this.map_pages.get(e);
    return !!t && !!t.node && !!t.node.active;
  }
  isHasShowPage() {
    var e = false;
    this.map_pages.forEach(function (t) {
      t && t.node && t.node.active && (e = true);
    });
    return e;
  }
  hidePage(e) {
    if (e) {
      var t = this.map_pages.get(e);
      if (t) {
        var o = t.node,
          n = t.option,
          i = n.reuse,
          a = n.inQueue;
        if (i) o.active = false;else {
          o.destroy();
          t.node = null;
        }
        if (a) {
          this.onShowNum--;
          this.onShowNum < 0 && (this.onShowNum = 0);
          var r = this.arr_pageQueue.shift();
          r && this.showPage(r);
        }
        this.showPageSet.delete(e);
      }
    } else console.error("class:pageMgr.fun:hidePage页面名称为空");
  }
  getPageIndex() {
    var e = 0;
    this.set_onShowPages.forEach(function (t) {
      var o = t.zIndex;
      o >= e && (e = o + 1);
    });
    return e;
  }
  hasPage(e) {
    return !!this.map_pages.get(e);
  }
  getPage(e) {
    return this.map_pages.get(e);
  }
  getPageComp(e) {
    var t;
    return null === (t = this.map_pages.get(e)) || void 0 === t ? void 0 : t.node.getComponent(e);
  }
  clear() {
    this.removeEvent();
    this.map_pages.forEach(function (e) {
      var t = e.prefab,
        o = e.node;
      t && cc.assetManager.releaseAsset(t);
      o && o.destroy();
    });
    this.map_pages.clear();
    this.set_onShowPages.clear();
    this.onShowNum = 0;
    this.arr_pageQueue = [];
    this.persist && this.persist.destroy();
    this.pages.children.forEach(function (e) {
      return e.destroy();
    });
    this.pages = null;
    this.persist = null;
    this.effects = null;
    _PageMgr._instance = null;
  }
}
export default _PageMgr._getInstance();