import AudioManager from "../framework/Utils/AudioManager";
import EngineUtil from "../framework/Utils/EngineUtil";
import { GuideEnum } from "../framework/enum/GuideConfig";
import GlobalApp from "../common/GlobalApp";
import { TweenEasing } from "../game/config/AnimeConfig";
import { gameData } from "../data/GameData";
import GameSystem from "../system/GameSystem";
import PageMgr from "../view/PageMgr";
import SpriteControl from "./SpriteControl";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class SplitSprite extends cc.Component {
  @property(cc.Node)
  splitItem: cc.Node = null;
  @property(cc.SpriteFrame)
  SpriteFrame: cc.SpriteFrame = null;
  @property(cc.Integer)
  splitX: number = 5;
  @property(cc.Integer)
  splitY: number = 5;
  @property(cc.Material)
  material: cc.Material = null;
  @property(cc.Node)
  combineSpineNode: cc.Node = null;
  splitNodeArr = [];
  splitOriginArr = [];
  cellWidth = 0;
  cellHeight = 0;
  hintTipCombineTime = 0;
  isHinting = false;
  @property(cc.Node)
  hintHandNode: cc.Node = null;
  hintHandTween = null;
  groups = [];
  groupRound = 0;
  GlobalAspectRatio = 0;
  get CombineTime() {
    return 1 == gameData.startgameData.game_level ? 0.5 : 15;
  }
  cancelHint() {
    var e;
    this.isHinting = false;
    this.hintHandNode.active = false;
    this.hintTipCombineTime = 0;
    null === (e = this.hintHandTween) || void 0 === e || e.stop();
  }
  showHintHand() {
    this.isHinting = true;
    this.hintHandNode.active = true;
    for (var e = 0; e < this.splitY; e++) for (var t = 0; t < this.splitX; t++) {
      var o = this.splitNodeArr[t][e],
        n = this.splitOriginArr[t][e];
      if (o != n) {
        this.hintHandNode.worldPosition = n.node.worldPosition;
        this.hintHandNode.opacity = 0;
        this.hintHandTween = cc.tween(this.hintHandNode).to(0, {
          worldPosition: n.node.worldPosition
        }).to(0.3, {
          opacity: 255
        }).to(1, {
          worldPosition: o.node.worldPosition
        }).delay(0.1).to(0.3, {
          opacity: 0
        }).delay(0.1).union().repeatForever().start();
        return;
      }
    }
  }
  update(e) {
    if (!gameData.GlobalCanMove || GlobalApp.GameContainer.isWin || gameData._isDragging) this.cancelHint();else if (!this.isHinting) {
      this.hintTipCombineTime += e;
      this.hintTipCombineTime >= this.CombineTime && this.showHintHand();
    }
  }
  async helpCombine() {
    var e,
      t,
      o,
      n,
      i,
      a = this;
    this.cancelHint();
    e = 0;
    PageMgr.openEventBlock("helpCombine");
    gameData._isHelpCombine = true;
    t = 0;
    while (t < this.splitY) {
      o = 0;
      while (o < this.splitX && !(e >= 4)) {
        n = this.splitNodeArr[o][t];
        i = this.splitOriginArr[o][t];
        if (!(n == i)) {
          this.groups[i.groupId].forEach(function (e) {
            var t,
              o,
              n = a.splitNodeArr[e.reallyX][e.reallyY],
              i = e.node.parent,
              r = n.node.parent;
            if (i != a.node) {
              null === (t = e.nowTween) || void 0 === t || t.stop();
              e.node.parent = a.node;
              e.node.position = e.oldPosition;
            }
            if (r != a.node) {
              null === (o = n.nowTween) || void 0 === o || o.stop();
              n.node.parent = a.node;
              n.node.position = n.oldPosition;
            }
            a.swap2DArrayByControl(e, n);
          });
          e++;
          this.testGroupImage();
          await EngineUtil.sleep(300);
        }
        o++;
      }
      t++;
    }
    gameData._isHelpCombine = false;
    PageMgr.closeEventBlock("helpCombine");
    return;
  }
  async playCombineAnimation(e) {
    var t,
      o,
      n,
      i,
      a,
      r,
      l,
      u,
      p,
      d = this;
    t = this.groups[e];
    (o = new cc.Node()).parent = this.node;
    n = -9999;
    i = -9999;
    a = 9999;
    r = 9999;
    t.forEach(function (e) {
      var t;
      null === (t = e.nowTween) || void 0 === t || t.stop();
      e.node.zIndex = 1;
      e.isPlayCombineAnimation = false;
      var c = e.oldPosition,
        s = c.x,
        l = c.y;
      s > n && (n = s);
      s < a && (a = s);
      l > i && (i = l);
      l < r && (r = l);
      e.node.parent = o;
    });
    l = n - a + t[0].node.width;
    u = i - r + t[0].node.height;
    p = l * u / (this.node.width * this.node.height);
    o.x = a + (n - a) / 2;
    o.y = r + (i - r) / 2;
    o.zIndex = 2;
    t.forEach(function (e) {
      e.node.x = e.oldPosition.x - o.x;
      e.node.y = e.oldPosition.y - o.y;
    });
    GameSystem.clearBlock(cc.v3(o.x, o.y, 0));
    await new Promise(function (e) {
      cc.tween(o).by(0.15, {
        y: 20,
        scale: 0.05
      }).call(function () {
        AudioManager.instance.playGameSound("combine");
        var e = cc.instantiate(d.combineSpineNode);
        e.scale = Math.min(Math.max(p, 0.34), 0.6);
        e.active = true;
        e.parent = d.node;
        e.x = o.x;
        e.y = o.y;
        e.zIndex = 6;
        e.getComponent(sp.Skeleton).setAnimation(0, "show", false);
        e.getComponent(sp.Skeleton).setCompleteListener(function () {
          e.destroy();
        });
      }).by(0.15, {
        y: -20,
        scale: -0.05
      }).call(function () {
        t.forEach(function (e) {
          if (e.node.parent === o) {
            e.node.parent = d.node;
            e.node.position = e.oldPosition;
          }
        });
        o.destroy();
        e(null);
      }).start();
    });
    return;
  }
  testCanSwap(e) {
    var t = this,
      o = null,
      n = 9999;
    this.splitNodeArr.forEach(function (i, a) {
      i.forEach(function (i, r) {
        if (i.node !== e) {
          var c = t.computeXPosition(a),
            s = t.computeYPosition(r),
            l = Math.abs(c - e.x),
            u = Math.abs(s - e.y),
            p = e.width / 2 * e.scaleX * 1.2,
            d = e.height / 2 * e.scaleY * 1.5;
          if (!(l > p || u > d)) {
            var f = l + u / t.GlobalAspectRatio;
            if (f < n) {
              n = f;
              o = i;
            }
          }
        }
      });
    });
    return o || null;
  }
  testShowAngleBorder(e, t) {
    var o,
      n,
      i,
      a,
      r,
      c,
      s,
      l = null === (o = this.splitNodeArr[e]) || void 0 === o ? void 0 : o[t];
    if (l) {
      var u = null === (n = this.splitNodeArr[e - 1]) || void 0 === n ? void 0 : n[t],
        p = null === (i = this.splitNodeArr[e - 1]) || void 0 === i ? void 0 : i[t - 1],
        d = null === (a = this.splitNodeArr[e + 1]) || void 0 === a ? void 0 : a[t],
        f = null === (r = this.splitNodeArr[e + 1]) || void 0 === r ? void 0 : r[t - 1],
        h = this.splitNodeArr[e][t - 1],
        g = null === (c = this.splitNodeArr[e - 1]) || void 0 === c ? void 0 : c[t + 1],
        y = this.splitNodeArr[e][t + 1],
        m = null === (s = this.splitNodeArr[e + 1]) || void 0 === s ? void 0 : s[t + 1],
        _ = u && u.reallyX === l.reallyX - 1 && u.reallyY === l.reallyY,
        v = d && d.reallyX === l.reallyX + 1 && d.reallyY === l.reallyY,
        b = h && h.reallyX === l.reallyX && h.reallyY === l.reallyY - 1,
        w = y && y.reallyX === l.reallyX && y.reallyY === l.reallyY + 1,
        P = p && p.reallyX === l.reallyX - 1 && p.reallyY === l.reallyY - 1,
        S = f && f.reallyX === l.reallyX + 1 && f.reallyY === l.reallyY - 1,
        A = g && g.reallyX === l.reallyX - 1 && g.reallyY === l.reallyY + 1,
        E = m && m.reallyX === l.reallyX + 1 && m.reallyY === l.reallyY + 1;
      l.leftTop = _ && b && !P;
      l.rightTop = v && b && !S;
      l.leftBottom = _ && w && !A;
      l.rightBottom = v && w && !E;
      l.changeBorader();
    }
  }
  testIsNear(e, t, o) {
    var n,
      i,
      a = this.splitNodeArr[e][t];
    switch (o) {
      case "left":
        return (r = null === (n = this.splitNodeArr[e - 1]) || void 0 === n ? void 0 : n[t]) && a.reallyX - 1 === r.reallyX && a.reallyY === r.reallyY || null;
      case "right":
        return (r = null === (i = this.splitNodeArr[e + 1]) || void 0 === i ? void 0 : i[t]) && a.reallyX + 1 === r.reallyX && a.reallyY === r.reallyY || null;
      case "top":
        return (r = this.splitNodeArr[e][t - 1]) && a.reallyX === r.reallyX && a.reallyY - 1 === r.reallyY || null;
      case "bottom":
        var r;
        return (r = this.splitNodeArr[e][t + 1]) && a.reallyX === r.reallyX && a.reallyY + 1 === r.reallyY || null;
    }
  }
  testCanMerge(e, t) {
    var o,
      n,
      i = this.splitNodeArr[e][t],
      a = null === (o = this.splitNodeArr[e - 1]) || void 0 === o ? void 0 : o[t],
      r = null === (n = this.splitNodeArr[e + 1]) || void 0 === n ? void 0 : n[t],
      c = this.splitNodeArr[e][t - 1],
      s = this.splitNodeArr[e][t + 1],
      l = this.testIsNear(e, t, "left"),
      u = this.testIsNear(e, t, "right"),
      p = this.testIsNear(e, t, "top"),
      d = this.testIsNear(e, t, "bottom");
    i.left = !l;
    i.right = !u;
    i.top = !p;
    i.bottom = !d;
    i.changeBorader();
    null == a || a.setBorderRight(l);
    null == r || r.setBorderLeft(u);
    null == c || c.setBorderBottom(p);
    null == s || s.setBorderTop(d);
    this.testShowAngleBorder(e - 1, t - 1);
    this.testShowAngleBorder(e + 1, t - 1);
    this.testShowAngleBorder(e - 1, t + 1);
    this.testShowAngleBorder(e + 1, t + 1);
    this.testShowAngleBorder(e + 1, t);
    this.testShowAngleBorder(e, t - 1);
    this.testShowAngleBorder(e, t + 1);
    this.testShowAngleBorder(e - 1, t);
  }
  getNearGroupId(e, t) {
    if (this.splitNodeArr[e][t]) {
      var o = this.testIsNear(e, t, "right"),
        n = this.testIsNear(e, t, "bottom"),
        i = this.testIsNear(e, t, "top"),
        a = this.testIsNear(e, t, "left");
      return [i ? this.splitNodeArr[e][t - 1] : null, o ? this.splitNodeArr[e + 1][t] : null, n ? this.splitNodeArr[e][t + 1] : null, a ? this.splitNodeArr[e - 1][t] : null];
    }
  }
  testGroupImage() {
    var e = this;
    this.groups = [];
    var t = this.splitNodeArr;
    this.groupRound++;
    for (var o = 0; o < t.length; o++) for (var n = function n(n) {
        var a = t[o][n];
        if (i.groupRound != a.groupRound) {
          a.groupId = i.groups.length;
          i.groups.push([a]);
          a.groupRound = i.groupRound;
        }
        i.getNearGroupId(o, n).forEach(function (t) {
          var o;
          if (null !== t) {
            if (t.groupRound == e.groupRound) {
              if (t.groupId != a.groupId) {
                var n = t.groupId;
                e.groups[t.groupId].forEach(function (e) {
                  e.groupId = a.groupId;
                });
                (o = e.groups[a.groupId]).push.apply(o, e.groups[n]);
                e.groups[n] = [];
              }
              return;
            }
            t.groupId = a.groupId;
            e.groups[a.groupId].push(t);
            t.groupRound = e.groupRound;
          }
        });
      }, i = this, a = 0; a < t[o].length; a++) n(a);
    if (this.groups[0].length == this.splitX * this.splitY) {
      gameData.GlobalCanMove = false;
      GlobalApp.GameContainer.isWin = true;
      GlobalApp.GameMain.closeGuideNode(GuideEnum.gameGuide1);
    }
    this.groups.forEach(function (e) {
      e.forEach(function (t) {
        t.isPlayCombineAnimation = false;
        e.length > t.combineGroupLength && (t.isPlayCombineAnimation = true);
        t.combineGroupLength = e.length;
      });
    });
  }
  swap2DArrayByControl(e, t) {
    var o = e.arrPosX,
      n = e.arrPosY,
      i = t.arrPosX,
      a = t.arrPosY;
    this.swap2DArray(o, n, i, a);
  }
  swap2DArray(e, t, o, n) {
    var i,
      a = this.splitNodeArr;
    i = [a[o][n], a[e][t]], a[e][t] = i[0], a[o][n] = i[1];
    this.setPosition(a[e][t], e, t);
    this.setPosition(a[o][n], o, n);
  }
  computeXPosition(e) {
    return e * this.cellWidth + this.cellWidth / 2 - this.node.width / 2;
  }
  computeYPosition(e) {
    return (this.splitY - e - 1) * this.cellHeight + this.cellHeight / 2 - this.node.height / 2;
  }
  setPosition(e, t, o) {
    e.arrPosX = t;
    e.arrPosY = o;
    e.setTargetPosition(this.computeXPosition(t), this.computeYPosition(o));
  }
  setPositionByNode(e, t, o) {
    e.arrPosX = t;
    e.arrPosY = o;
    e.setPosition(this.computeXPosition(t), this.computeYPosition(o));
  }
  canJoin(e, t) {
    var o = Math.abs(e.reallyX - t.reallyX),
      n = Math.abs(e.reallyY - t.reallyY);
    return 1 === o && 0 === n || 0 === o && 1 === n;
  }
  countJoinGroups(e) {
    for (var t = [], o = 0; o < this.splitX; o++) {
      t[o] = [];
      for (var n = 0; n < this.splitY; n++) t[o][n] = false;
    }
    var i = [[1, 0], [-1, 0], [0, 1], [0, -1]],
      a = 0,
      r = [];
    for (o = 0; o < this.splitX; o++) for (n = 0; n < this.splitY; n++) if (!t[o][n]) {
      a++;
      t[o][n] = true;
      r.length = 0;
      r.push({
        x: o,
        y: n
      });
      for (; r.length > 0;) for (var c = r.shift(), s = c.x, l = c.y, u = e[s][l], p = 0, d = i; p < d.length; p++) {
        var f = d[p],
          h = s + f[0],
          g = l + f[1];
        if (!(h < 0 || h >= this.splitX || g < 0 || g >= this.splitY || t[h][g])) {
          var y = e[h][g];
          if (this.canJoin(u, y)) {
            t[h][g] = true;
            r.push({
              x: h,
              y: g
            });
          }
        }
      }
    }
    return a;
  }
  countBadAdjacency(e) {
    for (var t = 0, o = 0; o < this.splitX; o++) for (var n = 0; n < this.splitY; n++) {
      var i = e[o][n];
      if (o + 1 < this.splitX) {
        var a = e[o + 1][n];
        this.canJoin(i, a) && t++;
      }
      if (n + 1 < this.splitY) {
        var r = e[o][n + 1];
        this.canJoin(i, r) && t++;
      }
    }
    return t;
  }
  shuffleNoAdjacent(e) {
    for (var t, o = this.splitX * this.splitY, n = [], i = 0; i < o; i++) n.push(i);
    for (var a = 0; a < o; a++) {
      var r = o - a,
        c = a + Math.floor(Math.random() * r);
      t = [n[c], n[a]], n[a] = t[0], n[c] = t[1];
    }
    for (i = 0; i < o; i++) {
      var s = Math.floor(i / this.splitY),
        l = i % this.splitY,
        u = n[i],
        p = Math.floor(u / this.splitY),
        d = u % this.splitY;
      e[s][l] = this.splitOriginArr[p][d];
    }
    for (var f = this.countBadAdjacency(e), h = 0; h < 20000 && f > 0; h++) {
      var g = Math.floor(Math.random() * this.splitX),
        y = Math.floor(Math.random() * this.splitY),
        m = Math.floor(Math.random() * this.splitX),
        _ = Math.floor(Math.random() * this.splitY);
      if (g !== m || y !== _) {
        var v = e[g][y];
        e[g][y] = e[m][_];
        e[m][_] = v;
        var b = this.countBadAdjacency(e);
        if (b <= f) {
          if (0 === (f = b)) break;
        } else {
          var w = e[g][y];
          e[g][y] = e[m][_];
          e[m][_] = w;
        }
      }
    }
  }
  shuffle2DArray(e, t = 0) {
    var o,
      n = this;
    var i = this.splitX * this.splitY;
    if (t <= 0) this.shuffleNoAdjacent(e);else {
      var a = t;
      t > i && (a = i);
      if (1 !== a) {
        for (var r = [], c = 0; c < i; c++) r.push(c);
        for (var s = function s(t) {
            for (var o = 0; o < i; o++) {
              var a = Math.floor(o / n.splitY),
                r = o % n.splitY,
                c = t[o],
                s = Math.floor(c / n.splitY),
                l = c % n.splitY;
              e[a][r] = n.splitOriginArr[s][l];
            }
          }, l = null, u = Number.MAX_SAFE_INTEGER, p = 0; p < 500; p++) {
          for (y = 0; y < i; y++) {
            var d = i - y,
              f = y + Math.floor(Math.random() * d);
            o = [r[f], r[y]], r[y] = o[0], r[f] = o[1];
          }
          s(r);
          var h = this.countJoinGroups(e),
            g = Math.abs(h - a);
          if (g < u) {
            u = g;
            l = r.slice();
          }
          if (0 === g) break;
        }
        if (l) {
          s(l);
        } else {
          this.fullRandomShuffle(e);
        }
      } else for (var y = 0; y < this.splitX; y++) for (var m = 0; m < this.splitY; m++) e[y][m] = this.splitOriginArr[y][m];
    }
  }
  fullRandomShuffle(e) {
    for (var t, o = [], n = 0; n < this.splitX; n++) for (var i = 0; i < this.splitY; i++) o.push(e[n][i]);
    for (var a = o.length, r = 0; r < a; r++) {
      var c = a - r,
        s = r + Math.floor(Math.random() * c);
      t = [o[s], o[r]], o[r] = t[0], o[s] = t[1];
    }
    var l = 0;
    for (n = 0; n < this.splitX; n++) for (i = 0; i < this.splitY; i++) e[n][i] = o[l++];
  }
  computeId(e, t) {
    return e * this.splitY + t;
  }
  async init(e = this.splitX, t = this.SpriteFrame, o = 0) {
    var n,
      i,
      a,
      r,
      s,
      u,
      p,
      d,
      h,
      g,
      m,
      _,
      v,
      b,
      w = this;
    this.SpriteFrame = t;
    this.splitOriginArr = [];
    this.splitX = e;
    this.splitY = e;
    this.groupRound = 0;
    this.groups = [];
    this.splitNodeArr = [];
    n = this.SpriteFrame;
    i = this.node.width / this.splitX;
    a = this.node.height / this.splitY;
    r = this.node.width;
    s = this.node.height;
    this.cellWidth = i;
    this.cellHeight = a;
    this.GlobalAspectRatio = a / i;
    this.material.setProperty("aspectRatio", this.GlobalAspectRatio);
    this.material.setProperty("maxRow", this.splitX);
    this.material.setProperty("maxCol", this.splitY);
    u = cc.view.getFrameSize();
    p = cc.view.getVisibleSize();
    d = 1;
    p.width > 0 && p.height > 0 && (d = Math.min(u.width / p.width, u.height / p.height) / 0.52083333);
    this.material.setProperty("borderScale", d);
    this.node.removeAllChildren();
    for (h = 0; h < this.splitX; h++) for (g = 0; g < this.splitY; g++) {
      m = cc.instantiate(this.splitItem);
      _ = m.getComponent(SpriteControl);
      m.name = "" + (h * this.splitY + g);
      _.reallyX = h;
      _.reallyY = g;
      (v = m.getComponent(cc.Sprite)).enabled = false;
      v.spriteFrame = n;
      m.getComponentInChildren(cc.Label).string = "" + (h * this.splitY + g);
      m.width = i;
      m.height = a;
      m.x = h * i - r / 2;
      m.y = (this.splitY - g - 1) * a - s / 2;
      m.color = new cc.Color(h, g, 15, 15);
      m.zIndex = 1;
      v.setMaterial(0, this.material);
      _.setSpriteFrame(this.splitX);
      if (!this.splitNodeArr[h]) {
        this.splitNodeArr[h] = [];
        this.splitOriginArr[h] = [];
      }
      this.splitNodeArr[h][g] = _;
      this.splitOriginArr[h][g] = _;
      this.node.addChild(m);
    }
    this.shuffle2DArray(this.splitNodeArr, o);
    this.splitNodeArr.forEach(function (e, t) {
      e.forEach(function (e, o) {
        w.setPositionByNode(e, t, o);
        w.testCanMerge(t, o);
      });
    });
    this.testGroupImage();
    gameData.GlobalCanMove = false;
    this.hintHandNode.parent = this.node;
    this.hintHandNode.zIndex = 5;
    b = EngineUtil.getPromiseResolve("playStartAnimation");
    this.playStartAnimation();
    await b;
    return;
  }
  playStartAnimation() {
    for (var e, t = this.splitNodeArr[0][0].node.scaleX, o = function o(o) {
        for (var i = function i(i) {
            var a = null === (e = n.splitNodeArr[o]) || void 0 === e ? void 0 : e[i];
            if (!a) return {
              value: void 0
            };
            a.node.position = n.splitNodeArr[n.splitX - 1][n.splitY - 1].oldPosition;
            cc.tween(a.node).delay(0.05 * (i * n.splitX + o)).call(function () {
              AudioManager.instance.playGameSound("shootCard");
            }).to(0.1, {
              position: a.oldPosition
            }, {
              easing: TweenEasing.quartOut
            }).delay(n.splitX * n.splitY * 0.05 - 0.05 * (i * n.splitX + o)).call(function () {
              0 == o && 0 == i && AudioManager.instance.playGameSound("openCard2");
            }).to(0.2, {
              scaleX: 0
            }).call(function () {
              a.node.getChildByName("1").active = false;
              a.node.getComponent(cc.Sprite).enabled = true;
            }).to(0.2, {
              scaleX: t
            }).call(function () {
              gameData.GlobalCanMove = true;
              EngineUtil.triggerPromise("playStartAnimation");
            }).start();
          }, a = 0; a < n.splitX; a++) {
          var r = i(a);
          if ("object" == typeof r) return r;
        }
      }, n = this, i = 0; i < this.splitY; i++) {
      var a = o(i);
      if ("object" == typeof a) return a.value;
    }
  }
  onLoad() {
    this.node.removeAllChildren();
  }
  start() {}
}