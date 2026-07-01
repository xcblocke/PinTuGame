import AudioManager from "../framework/Utils/AudioManager";
import EngineUtil from "../framework/Utils/EngineUtil";
import GlobalApp from "../common/GlobalApp";
import { TweenEasing } from "../game/config/AnimeConfig";
import { gameData } from "../data/GameData";
import MakeMnGlobalData from "../data/MakeMnGlobalData";
import { Constants } from "../main/Constants";
import PageMgr from "./PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class effect extends cc.Component {
  @property(cc.Node)
  goldNode: cc.Node = null;
  @property(cc.Node)
  cashNode: cc.Node = null;
  effectPool = new cc.NodePool();
  @property(cc.SpriteFrame)
  typeIcon: cc.SpriteFrame = [];
  @property(cc.Node)
  goldBeFlyNode: cc.Node = null;
  @property(cc.Node)
  cashBeFlyNode: cc.Node = null;
  @property(cc.Node)
  goldFlyNode: cc.Node = null;
  @property(cc.Node)
  cashFlyNode: cc.Node = null;
  @property(cc.Label)
  cashLabel: cc.Label = null;
  @property(cc.Label)
  goldLabel: cc.Label = null;
  goldShowTween = null;
  cashShowTween = null;
  @property(cc.Node)
  numCompNode: cc.Node = null;
  @property(cc.Node)
  activityFlyNode: cc.Node = null;
  numCompGolds = [];
  numCompCashes = [];
  isPlayingGold = false;
  isPlayingCash = false;
  get goldBalance() {
    return MakeMnGlobalData.goldBalance;
  }
  set goldBalance(e) {
    MakeMnGlobalData.goldBalance = e;
  }
  get cashBalance() {
    return MakeMnGlobalData.cashBalance;
  }
  set cashBalance(e) {
    MakeMnGlobalData.cashBalance = e;
  }
  onLoad() {
    this.goldFlyNode.active = false;
    this.cashFlyNode.active = false;
  }
  start() {
    PageMgr.setEffectNode(this.node);
  }
  recoveryEffect(e, t) {
    cc.Tween.stopAllByTarget(e);
    e.scale = 0.7;
    this.effectPool.put(e);
    t && t();
  }
  goldOrCashChangeAnim(e, t = null, o?) {
    return __awaiter(this, void 0, void 0, function () {
      var n,
        i,
        a = this;
      return __generator(this, function (r) {
        switch (r.label) {
          case 0:
            if (0 == e) return [2];
            n = "gold" == o ? this.goldBalance : this.cashBalance;
            i = n + e;
            "cash" == o && (this.cashBalance = i);
            "gold" == o && (this.goldBalance = i);
            return [4, EngineUtil.sleep(200)];
          case 1:
            r.sent();
            return [2, new Promise(function (r) {
              return __awaiter(a, void 0, void 0, function () {
                var a,
                  l,
                  u,
                  p,
                  d = this;
                return __generator(this, function (f) {
                  switch (f.label) {
                    case 0:
                      if (t) return [3, 2];
                      a = r;
                      return [4, this.changeAnimegoldOrCash(n, i, 0, o)];
                    case 1:
                      a.apply(void 0, [f.sent()]);
                      return [2];
                    case 2:
                      if ("gold" == o) {
                        u = e / 2;
                        u = Math.max(u, 3);
                        u = Math.min(u, 10);
                        l = 0.05 * u + 0.3;
                        this.flyTogold(t, this.goldBeFlyNode.worldPosition, u, function () {
                          return __awaiter(d, void 0, void 0, function () {
                            var t;
                            return __generator(this, function (a) {
                              switch (a.label) {
                                case 0:
                                  this.showNumComp(true, e);
                                  t = r;
                                  return [4, this.changeAnimegoldOrCash(n, i, l, o)];
                                case 1:
                                  t.apply(void 0, [a.sent()]);
                                  return [2];
                              }
                            });
                          });
                        });
                        return [2];
                      }
                      if ("cash" == o) {
                        u = e / 1000;
                        u = Math.max(u, 3);
                        u = Math.min(u, 10);
                        p = 0.05 * u + 0.3;
                        this.flyToCash(t, this.cashBeFlyNode.worldPosition, u, function () {
                          return __awaiter(d, void 0, void 0, function () {
                            var t;
                            return __generator(this, function (a) {
                              switch (a.label) {
                                case 0:
                                  this.showNumComp(false, e);
                                  t = r;
                                  return [4, this.changeAnimegoldOrCash(n, i, p, o)];
                                case 1:
                                  t.apply(void 0, [a.sent()]);
                                  return [2];
                              }
                            });
                          });
                        });
                        return [2];
                      }
                      return [2];
                  }
                });
              });
            })];
        }
      });
    });
  }
  changeAnimegoldOrCash(e, t, o = 0, n?) {
    var i,
      a = this;
    var r = "gold" == n ? "goldShowTween" : "cashShowTween";
    null === (i = this[r]) || void 0 === i || i.stop();
    var c = o || 0.5 + Math.abs(t - e) / 3000;
    return new Promise(function (o) {
      a[r] = cc.tween({
        num: e || 0
      }).to(Math.min(c, 2), {
        num: t
      }, {
        progress: function (o, i, r, c) {
          if ("gold" == n) {
            a.goldLabel.string = MakeMnGlobalData.getCNGoldBalanceNum(Math.floor(e + c * (t - e))).toString();
          } else {
            a.cashLabel.string = MakeMnGlobalData.getCNCashNum(e + c * (t - e));
          }
          if ("gold" == n) {
            a.goldLabel.node.scale = 1.09 + 0.3 * Math.random();
          } else {
            a.cashLabel.node.scale = 1.09 + 0.3 * Math.random();
          }
          return c;
        }
      }).delay(0.2).call(function () {
        if ("gold" == n) {
          a.goldLabel.node.scale = 1;
        } else {
          a.cashLabel.node.scale = 1;
        }
        o(1);
        gameData.isOpenDemo && gameData.debugData.isOpenAutoGet && GlobalApp.MakeMnProcessComp.showDemo(true);
      }).start();
    });
  }
  flyToActivity(e = cc.v3(0, 0, 0), t?, o?, n = null) {
    var i = this;
    AudioManager.instance.playMusic("addbalance");
    for (var a = function a(o) {
        var a = cc.instantiate(r.activityFlyNode);
        a.parent = r.node;
        a.worldPosition = e;
        a.active = true;
        cc.tween(a).to(0.2, {
          worldPosition: e.add(cc.v3(50 - 100 * Math.random(), 50 - 100 * Math.random(), 0))
        }).delay(0.05 * o).to(0.5, {
          worldPosition: t
        }).to(0.1, {
          scale: 0
        }).call(function () {
          1 == o && n && n();
          i.scheduleOnce(function () {
            a.destroy();
          }, 0);
        }).start();
      }, r = this, c = 0; c < o; c++) a(c);
  }
  flyToCash(e = cc.v3(0, 0, 0), t?, o?, n = null) {
    var i = this;
    AudioManager.instance.playMusic("addbalance");
    for (var r = function r(o) {
        var r = cc.instantiate(c.cashFlyNode);
        r.parent = c.node;
        r.worldPosition = e;
        r.active = true;
        cc.tween(r).delay(0.05 * o).to(0.5, {
          worldPosition: t
        }, __assign({}, Constants.bezierOpts(r, e, t, e.y < t.y ? 1 : -1))).to(0.1, {
          scale: 0
        }).call(function () {
          1 == o && n && n();
          i.scheduleOnce(function () {
            r.destroy();
          }, 0);
        }).start();
      }, c = this, s = 0; s < o; s++) r(s);
  }
  flyTogold(e = cc.v3(0, 0, 0), t?, o?, n = null) {
    var i = this;
    AudioManager.instance.playMusic("addbalance");
    for (var r = function r(o) {
        var r = cc.instantiate(c.goldFlyNode);
        r.parent = c.node;
        r.worldPosition = e;
        r.active = true;
        cc.tween(r).delay(0.05 * o).to(0.5, {
          worldPosition: t
        }, __assign({}, Constants.bezierOpts(r, e, t, e.y < t.y ? 1 : -1))).to(0.1, {
          scale: 0
        }).call(function () {
          1 == o && n && n();
          i.scheduleOnce(function () {
            r.destroy();
          }, 0);
        }).start();
      }, c = this, s = 0; s < o; s++) r(s);
  }
  showNumComp(e, t) {
    var o = this;
    if (e ? this.isPlayingGold : this.isPlayingCash) {
      if (e) {
        this.numCompGolds.push(t);
      } else {
        this.numCompCashes.push(t);
      }
    } else {
      if (e) {
        this.isPlayingGold = true;
      } else {
        this.isPlayingCash = true;
      }
      this.scheduleOnce(function () {
        var t = e ? o.numCompGolds.shift() : o.numCompCashes.shift();
        if (e) {
          o.isPlayingGold = false;
        } else {
          o.isPlayingCash = false;
        }
        t && o.showNumComp(e, t);
      }, 0.3);
      var n = cc.instantiate(this.numCompNode);
      n.active = true;
      n.getChildByName("gold").active = e;
      n.getChildByName("cash").active = !e;
      n.getChildByName("mn").getComponent(cc.Label).string = "+" + (e ? MakeMnGlobalData.getCNGoldBalanceNum(t) : MakeMnGlobalData.getCNCashNum(t)) + "元";
      n.parent = e ? this.goldNode : this.cashNode;
      n.worldPosition = (e ? this.goldNode.worldPosition : this.cashNode.worldPosition).add(cc.v3(20 * Math.random() - 100, 35, 0));
      n.scale = 0;
      cc.tween(n).to(0.15, {
        scale: 1
      }, {
        easing: TweenEasing.backOut
      }).delay(0.4).by(1, {
        position: cc.v3(0, 100, 0)
      }).call(function () {
        o.scheduleOnce(function () {
          n.destroy();
        }, 0);
      }).start();
    }
  }
}