import { gameData } from "./data/GameData";
import SdkHelper from "./framework/Utils/SdkHelper";
import AudioManager from "./framework/Utils/AudioManager";
import { GuideConfig } from "./framework/enum/GuideConfig";
import CommonUtil from "./common/CommonUtil";
import GlobalApp from "./common/GlobalApp";
import PlayerDataSys from "./framework/Utils/PlayerDataSys";
import EngineUtil from "./framework/Utils/EngineUtil";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class Guide extends cc.Component {
  @property(cc.Node)
  bg: cc.Node = null;
  @property(cc.RichText)
  desLabel: cc.RichText = null;
  @property(cc.Node)
  border: cc.Node = null;
  @property(cc.Node)
  handNode: cc.Node = null;
  @property(cc.Node)
  guideBoard: cc.Node = null;
  @property(cc.Node)
  closeNode: cc.Node = null;
  @property(cc.Node)
  fullBtnUnclick: cc.Node = null;
  _index = 0;
  _infos = null;
  _path = null;
  _type = 0;
  _scale_rate = 0;
  isShowNewGuide = false;
  nowGuideType = null;
  nodeParents = [];
  guideParamInput = null;
  get testHasGuide() {
    return EngineUtil.testHasGuide(this.nowGuideType);
  }
  get AudioName() {
    return PlayerDataSys.isOppoReviewer() && this.guideConfig.audioNameOppo || this.guideConfig.audioName;
  }
  get DescString() {
    return PlayerDataSys.isOppoReviewer() && this.guideConfig.desOppo || this.guideConfig.des;
  }
  get guideConfig() {
    return Object.assign(Object.assign({}, GuideConfig[this.nowGuideType]), this.guideParamInput);
  }
  update() {}
  onLoad() {
    var e = this;
    this.guideBoard.active = false;
    this.fullBtnUnclick.zIndex = 999;
    this.fullBtnUnclick.active = true;
    this.scheduleOnce(function () {
      e.isShowNewGuide = true;
      e.fullBtnUnclick.active = false;
    }, 0.5);
    this.bg.opacity = 0;
  }
  start() {
    this.bg.opacity = 0;
    cc.tween(this.bg).to(0.2, {
      opacity: this.guideConfig.blackOpacity || (this.guideConfig.isTransparentBg ? 0 : 200)
    }).start();
  }
  setParent(e, t = null) {
    if (null == e ? void 0 : e.getComponent(cc.Widget)) {
      e.getComponent(cc.Widget).target = GlobalApp.GameMain.node.parent;
      e.getComponent(cc.Widget).updateAlignment();
    }
  }
  onTouchStart() {
    this.guideConfig.isBlackClose && this.close();
  }
  close(e = false) {
    var t,
      o,
      n,
      i,
      r,
      c,
      s = this;
    e = true === e;
    if (this.isShowNewGuide) {
      AudioManager.getInstance().stopMusic(this.AudioName);
      e || EngineUtil.setGuideLocal(this.nowGuideType);
      if (this.guideConfig.reportName) {
        this.guideConfig.reportParam || (this.guideConfig.reportParam = {});
        SdkHelper.reportData(this.guideConfig.reportName, Object.assign({
          level: gameData.startgameData.success_count + 1
        }, this.guideConfig.reportParam));
      }
      if (this.inputGuideData) {
        if (this.inputGuideData.needClone) {
          null === (i = this.inputGuideData.nodes) || void 0 === i || i.forEach(function (e) {
            e.destroy();
          });
        } else {
          !this.guideConfig.noRestorePosition && (null === (n = this.inputGuideData.nodes) || void 0 === n || n.forEach(function (e, t) {
            e.getComponent(cc.Button) && (e.getComponent(cc.Button).enabled = true);
            s.nodeParents[t].parent.insertChild(e, s.nodeParents[t].childrenIndex);
            e.position = s.nodeParents[t].oldPos;
            e.scale = s.nodeParents[t].oldScale;
            s.nodeParents[t].parent.getComponent(cc.Layout) && (s.nodeParents[t].parent.getComponent(cc.Layout).enabled = true);
            e.removeComponent(cc.BlockInputEvents);
          }));
        }
        null === (r = this.node) || void 0 === r || r.destroy();
        null === (c = this.cb) || void 0 === c || c.call(this);
      } else {
        null === (t = this.node) || void 0 === t || t.destroy();
        null === (o = this.cb) || void 0 === o || o.call(this);
      }
    }
  }
  cb() {}
  computeLabelPos() {
    this.guideBoard.active = true;
    this.guideBoard.zIndex = 999;
    var e = this.guideConfig.txtBoardScale || 1;
    this.guideBoard.scale = e;
    if ("top" !== this.guideConfig.textPosition) {
      if ("bottom" !== this.guideConfig.textPosition) {
        if ("center" !== this.guideConfig.textPosition) {
          if (this.showNode) {
            var t = this.showNode.position.y - (this.showNode.anchorY - 0.5) * this.showNode.height,
              o = t > 0,
              n = this.showNode.height / 2 + this.guideBoard.height / 2 + 30;
            this.guideBoard.y = t + (o ? -n : n);
          }
        } else this.guideBoard.y = 200;
      } else this.guideBoard.y = -this.node.height / 2 + this.guideBoard.height / 2 + 50;
    } else {
      this.guideBoard.getComponent(cc.Widget).enabled = true;
      this.guideBoard.getComponent(cc.Widget).top = 50 * e;
    }
  }
  justShowTxt(e) {
    this.nowGuideType = e;
    if (this.testHasGuide) this.close(true);else {
      this.setDesc(this.DescString);
      this.guideBoard.active = true;
      this.computeLabelPos();
    }
  }
  setDesc(e) {
    this.typingAni(this.desLabel, e, 30);
    this.setLength(e);
  }
  setLength(e) {
    if (e.length <= 13) {
      this.desLabel.horizontalAlign = cc.macro.TextAlignment.CENTER;
    } else {
      this.desLabel.horizontalAlign = cc.macro.TextAlignment.LEFT;
    }
  }
  showGuide2() {
    this.setDesc(this.guideConfig.des2);
    AudioManager.getInstance().playMusic(this.guideConfig.audioName2);
  }
  async showGuideByNode(e) {
    var t,
      o,
      n,
      i,
      a,
      r,
      c,
      l,
      u,
      d = this;
    this.guideParamInput = e.param || {};
    this.inputGuideData = e;
    t = e.guideType, o = e.nodes, n = e.needClone, i = void 0 !== n && n, a = e.offset, r = void 0 === a ? cc.v3(0, 0, 0) : a;
    this.nowGuideType = t;
    c = this.guideConfig.unBindClose;
    this.closeNode.zIndex = 999;
    this.closeNode.active = this.guideConfig.isBlackClose;
    await CommonUtil.sleep(50);
    this.handNode.active = false;
    this.AudioName && AudioManager.getInstance().playMusic(this.AudioName);
    if (!o) {
      this.justShowTxt(t);
      return;
    }
    this.node.zIndex = 999;
    o.forEach(function (e, t) {
      var n;
      (null === (n = e.parent) || void 0 === n ? void 0 : n.getComponent(cc.Layout)) && (e.parent.getComponent(cc.Layout).enabled = false);
      e.active = true;
      var a = e.worldPosition;
      !i && d.nodeParents.push({
        parent: e.parent,
        oldPos: e.position.clone(),
        childrenIndex: e.getSiblingIndex(),
        oldScale: e.scale
      });
      var s = e.worldScale;
      i && (e = cc.instantiate(e));
      if (!c) {
        e.getComponent(cc.Button) && (e.getComponent(cc.Button).enabled = false);
        e.addComponent(cc.BlockInputEvents);
        e.once(cc.Node.EventType.TOUCH_START, function () {
          e.parent == d.node && d.close();
        });
      }
      EngineUtil.recoverNodeToTop(e);
      e.parent = d.node;
      e.scale = d.guideConfig.scale ? d.guideConfig.scale : s;
      r && a.addSelf(r);
      e.worldPosition = a;
      o[t] = e;
    });
    if (this.guideConfig.needShowHand) {
      this.handNode.parent = null;
      this.handNode.parent = this.node;
      this.handNode.active = true;
      l = o[0].width / 2;
      u = o[0].height / 2;
      o[0].x > 0 && !this.guideConfig.unMirrorHand && (this.handNode.scaleX = -1);
      this.handNode.position = o[0].position.add(cc.v3(this.handNode.scaleX * l * 0.5, 0.2 * -u, 0)).add(this.guideConfig.handOffset || cc.v3(0, 0, 0));
    }
    this.showNode = o[0];
    this.computeLabelPos();
    if (this.DescString) {
      this.border.active = true;
      this.setDesc(this.DescString);
    } else this.border.active = false;
    return;
  }
  onDestroy() {
    this.unscheduleAllCallbacks();
  }
  typingAni(e, t, o, n = null) {
    var i = this;
    clearTimeout(this.timeout);
    e.string = "";
    this.isPlayDone = false;
    for (var a = /<.+?\/?>/g, r = t.match(a), c = t.replace(a, "│").split("│"), s = [], l = 0, u = 0, p = c; u < p.length; u++) {
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
        var t;
        if ((null === (t = i.node) || void 0 === t ? void 0 : t.active) && !i.isPlayDone) if (w >= h.length) {
          i.isPlayDone = true;
          n && n();
        } else {
          e.string = h[w];
          w += 1;
          i.timeout = setTimeout(function () {
            P();
          }, o);
        }
      };
    this.timeout = setTimeout(function () {
      P();
    }, o);
  }
}