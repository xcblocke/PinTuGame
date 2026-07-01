import decorator from "../decorator/decorator";
import AudioManager from "../framework/Utils/AudioManager";
import EventMgr from "../framework/Event/EventMgr";
import GameEventType from "../framework/Event/GameEventType";
import SdkHelper from "../framework/Utils/SdkHelper";
import EngineUtil from "../framework/Utils/EngineUtil";
import PageMgr from "./PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
export enum AnimType {
  NONE = 0,
  SCALE = 1,
  FADE = 2,
  DOWN_UP = 3,
  LEFT_RIGHT = 4,
}
@ccclass
export default class BasePage extends cc.Component {
  _set_oldContent = new Set();
  _peneLock = null;
  _black = null;
  _touchLock = null;
  _content = null;
  _highestIndex = 0;
  _show_timestemp = 0;
  _report_data = null;
  _lockOption = {
    hasBlack: true,
    hasPeneLock: true,
    hasTouchLock: true
  };
  _animOption = {
    startOpacity: 0,
    endOpacity: 220,
    blackTime: 0.3,
    pageTime: 0.3,
    animType: AnimType.SCALE
  };
  startPosition = cc.Vec3.ZERO;
  startPosition2 = null;
  @property(cc.Integer)
  endOpacity: number = 0;
  @property({
    type: cc.Integer,
    displayName: "进入动画",
    tooltip: "-1 不使用外部输入 0 没有动画 1 由小变大 2 渐显 3 从下往上 4 从左往右"
  })
  animTypeIn: number = -1;
  @property({
    type: cc.Integer,
    displayName: "离开动画",
    tooltip: "-1 不使用外部输入 0 没有动画 1 由小变大 2 渐显 3 从下往上 4 从左往右"
  })
  animTypeOut: number = -1;
  isShow = false;
  isHide = false;
  get useStartPosition() {
    return this.startPosition2 || this.startPosition;
  }
  onLoad() {
    this._saveContent();
    this._createPeneLock();
    this._createBlack();
    this._createContent();
    this._createTouchLock();
    this.registerBtnEvent(this.node);
  }
  setResolveData(e) {
    this.resolveData = e;
  }
  close() {
    AudioManager.instance.playBtn();
    this._hide();
  }
  onEnable() {
    this._reportEntry();
    this._show();
  }
  onDisable() {
    this._reportExit();
  }
  _reportEntry() {
    this._show_timestemp = new Date().getTime();
    var e = {
      act_page: this.node.name
    };
    this._report_data && Object.assign(e, this._report_data);
    SdkHelper.reportData("b_entry_game_page", e);
  }
  _reportExit() {
    var e = new Date().getTime();
    SdkHelper.reportData("b_leave_game_page", {
      act_page: this.node.name,
      duration: e - this._show_timestemp
    });
    this._show_timestemp = 0;
  }
  _animInit(e) {
    var t = this;
    Object.keys(e).forEach(function (o) {
      if (void 0 !== t._animOption[o]) {
        t._animOption[o] = e[o];
      } else {
        console.error("class:basePage", "页面动画配置错误,属性名:" + o);
      }
    });
  }
  _lockInit(e) {
    var t = this;
    Object.keys(e).forEach(function (o) {
      if (void 0 !== t._lockOption[o]) {
        t._lockOption[o] = e[o];
      } else {
        console.error("class:basePage", "屏蔽触碰配置错误,属性名:" + o);
      }
    });
  }
  _init(e) {
    if (null == e ? void 0 : e.startPosition) {
      this.startPosition2 = e.startPosition;
    } else {
      this.startPosition2 = null;
    }
  }
  _show() {
    var e = this;
    this.isShow = true;
    EngineUtil.log("显示页面", this.node.name);
    var t = this._animOption.animType;
    -1 != this.animTypeIn && (t = this.animTypeIn);
    this._lockTouch();
    var o = this._content;
    o.scale = 1;
    o.opacity = 255;
    this.node.opacity = 255;
    o.worldPosition = this.useStartPosition;
    cc.Tween.stopAllByTarget(o);
    var n = this._animOption.pageTime;
    PageMgr.openEventBlock(this.node.name + "show");
    setTimeout(function () {
      PageMgr.closeEventBlock(e.node.name + "show");
    }, 300);
    switch (t) {
      case AnimType.NONE:
        this._onShow();
        break;
      case AnimType.SCALE:
        o.scale = 0;
        cc.tween(o).to(n, {
          scale: 1,
          worldPosition: cc.Vec3.ZERO
        }, {
          easing: "backOut"
        }).call(function () {
          e._onShow();
        }).start();
        break;
      case AnimType.FADE:
        o.opacity = 0;
        cc.tween(o).to(n, {
          opacity: 255
        }).call(function () {
          e._onShow();
        }).start();
        break;
      case AnimType.DOWN_UP:
        o.y = -cc.winSize.height;
        cc.tween(o).to(n, {
          y: 0
        }).call(function () {
          e._onShow();
        }).start();
        break;
      case AnimType.LEFT_RIGHT:
        o.x = -cc.winSize.width;
        cc.tween(o).to(n, {
          x: 0
        }).call(function () {
          e._onShow();
        }).start();
    }
    this._showBlack();
  }
  hideTemplate() {
    var e = this,
      t = this._animOption.animType;
    -1 != this.animTypeIn && (t = this.animTypeIn);
    -1 != this.animTypeOut && (t = this.animTypeOut);
    this._lockTouch();
    var o = this._content;
    cc.Tween.stopAllByTarget(o);
    var n = this._animOption.pageTime;
    this._hideBlack();
    return new Promise(function (i) {
      switch (t) {
        case AnimType.NONE:
          i(1);
          break;
        case AnimType.SCALE:
          o.scale = 1;
          cc.tween(o).to(n, {
            scale: 0,
            worldPosition: e.useStartPosition
          }, {
            easing: "backIn"
          }).call(function () {
            i(1);
          }).start();
          break;
        case AnimType.FADE:
          o.opacity = 255;
          cc.tween(o).to(n, {
            opacity: 0
          }).call(function () {
            i(1);
          }).start();
          break;
        case AnimType.DOWN_UP:
          o.y = 0;
          cc.tween(o).to(n, {
            y: -cc.winSize.height
          }).call(function () {
            i(1);
          }).start();
          break;
        case AnimType.LEFT_RIGHT:
          o.x = 0;
          cc.tween(o).to(n, {
            x: cc.winSize.width + 200
          }).call(function () {
            i(1);
          }).start();
          break;
        default:
          i(1);
      }
    });
  }
  _fakeHide() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (e) {
        switch (e.label) {
          case 0:
            return [4, this.hideTemplate()];
          case 1:
            e.sent();
            return [2];
        }
      });
    });
  }
  _hide() {
    return __awaiter(this, void 0, void 0, function () {
      var e = this;
      return __generator(this, function (t) {
        switch (t.label) {
          case 0:
            if (this.isHide) return [2];
            this.isHide = true;
            setTimeout(function () {
              e.isHide = false;
            }, 300);
            return [4, this.hideTemplate()];
          case 1:
            t.sent();
            this._onHide();
            this.isHide = false;
            return [2];
        }
      });
    });
  }
  _onShow() {
    PageMgr.closeEventBlock(this.node.name + "show");
    this._unLockTouch();
  }
  _onHide() {
    var e;
    PageMgr.showPageSet.delete(this.node.name);
    this.isShow = false;
    null === (e = this.resolve) || void 0 === e || e.call(this, this.resolveData);
    this._unLockTouch();
    EventMgr.trigger(GameEventType.PAGE_HIDE, this.node.name);
  }
  _showBlack() {
    var e = this._animOption,
      t = e.blackTime,
      o = e.startOpacity,
      n = e.endOpacity,
      i = this._black;
    if (i) {
      i.opacity = o;
      cc.Tween.stopAllByTarget(i);
      cc.tween(i).to(t, {
        opacity: this.endOpacity || n
      }).start();
    }
  }
  _hideBlack() {
    var e = this._animOption,
      t = e.blackTime,
      o = e.startOpacity,
      n = e.endOpacity,
      i = this._black;
    if (i) {
      i.opacity = this.endOpacity || n;
      cc.Tween.stopAllByTarget(i);
      cc.tween(i).to(t, {
        opacity: o
      }).start();
    }
  }
  _unLockTouch() {
    this._touchLock && (this._touchLock.active = false);
  }
  _lockTouch() {
    this._touchLock && (this._touchLock.active = true);
  }
  _saveContent() {
    var e = this;
    this.node.children.forEach(function (t) {
      return e._set_oldContent.add(t);
    });
  }
  _setIndex(e) {
    if (e) {
      e.zIndex = this._highestIndex;
      this._highestIndex++;
    }
  }
  _createContent() {
    var e = this,
      t = new cc.Node("content");
    this.node.addChild(t);
    this._set_oldContent.forEach(function (o) {
      o.parent = t;
      "top" == o.name && e._setTopNodes(o);
      "bottom" == o.name && e._setBottomNodes(o);
    });
    t.setContentSize(cc.winSize);
    this._content = t;
    this._setIndex(t);
  }
  _setTopNodes(e) {
    var t = cc.winSize.height;
    e.y = EngineUtil.isLargeScreen() ? t / 2 - 40 : t / 2;
  }
  _setBottomNodes(e) {
    var t = cc.winSize.height,
      o = EngineUtil.isLargeScreen() ? t / 2 - 40 : t / 2;
    e.y = o;
  }
  _createTouchLock() {
    if (this._lockOption.hasTouchLock) {
      var e = new cc.Node("closeTouch");
      e.addComponent(cc.BlockInputEvents);
      e.setContentSize(cc.winSize);
      this.node.addChild(e);
      this._touchLock = e;
      this._setIndex(e);
    }
  }
  _createPeneLock() {
    if (this._lockOption.hasPeneLock) {
      var e = new cc.Node("peneLock");
      e.addComponent(cc.BlockInputEvents);
      e.setContentSize(cc.winSize);
      this.node.addChild(e);
      this._peneLock = e;
      this._setIndex(e);
    }
  }
  _createBlack() {
    if (this._lockOption.hasBlack) {
      var e = new cc.Node("black"),
        t = e.addComponent(cc.Sprite);
      cc.resources.load("pages/res/back", cc.SpriteFrame, function (o, n) {
        if (o) console.error("class:basePage", o);else {
          t.spriteFrame = n;
          e.setContentSize(cc.winSize);
        }
      });
      this.node.addChild(e);
      e.color = EngineUtil.getColor("000000");
      this._black = e;
      this._setIndex(e);
    }
  }
  DoClosePage() {
    this._hide();
  }
  registerBtnEvent(e) {
    var t = this,
      o = e.getComponent(cc.Button);
    if (o && 0 == o.clickEvents.length) {
      var n = new cc.Component.EventHandler();
      n.target = this.node;
      n.component = "BasePage";
      n.handler = "_hookOnBtnClick";
      n.customEventData = o.node.name;
      o.clickEvents.push(n);
    }
    e.children.forEach(function (e) {
      return t.registerBtnEvent(e);
    });
  }
  _hookOnBtnClick(e, t) {
    AudioManager.getInstance().playBtn();
    if (-1 == (t = t.replace("comp", "")).indexOf("btnClose")) {
      var o = this["on" + t + "Click"];
      o || t.startsWith("btn") && (o = this["on" + (t = t.substring(3, t.length)) + "Click"]);
      null == o || o.call(this);
    } else this.DoClosePage();
  }
  @decorator.Debounce(1000)
  showCommonPage(e, t) {
    AudioManager.instance.playBtn();
    PageMgr.showPageByEnum(t, {
      startPosition: e.target.worldPosition
    });
  }
}