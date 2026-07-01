import EngineUtil from "./framework/Utils/EngineUtil";
import GameSystem from "./system/GameSystem";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class WdPageBarrage extends cc.Component {
  @property(cc.Node)
  item1: cc.Node = null;
  @property(cc.Node)
  item2: cc.Node = null;
  standbyArr = new Array();
  requestTimes = 0;
  startNode = this.item1;
  start() {
    this.requestMsg(this.initView.bind(this));
    this.startNode = this.item1;
  }
  requestMsg(e) {
    var t = this;
    return new Promise(function (o, n) {
      GameSystem.getScrollMsg().then(function (n) {
        if (n && 1 == n.code) {
          var i = n.data;
          if (i && i.size > 0) {
            var a = i.dm_info;
            t.node.active = true;
            e && e(a);
            o(a);
            return;
          }
        }
      }).catch(function () {
        try {
          t.requestTimes++;
          if (t.requestTimes > 3) {
            t.node.active = false;
            n(new Error("请求失败"));
            return;
          }
          t.scheduleOnce(function () {
            t.requestMsg(e);
          }, 10);
        } catch (e) {
          t.node && (t.node.active = false);
          n(new Error("请求失败"));
        }
      });
    });
  }
  initView(e) {
    e && e.length && (this.standbyArr = this.standbyArr.concat(e));
    this.createByTime();
  }
  createByTime() {
    this.createItem();
  }
  async createItem() {
    var e,
      t,
      o = this;
    if (!(0 != this.standbyArr.length)) {
      this.unschedule(this.createItem);
      await this.requestMsg(this.pushStandby.bind(this));
    }
    e = this.standbyArr.shift();
    t = this.startNode;
    this.startNode = t === this.item1 ? this.item2 : this.item1;
    this.setItemString(t, e);
    cc.Tween.stopAllByTarget(t);
    t.y = 46;
    cc.tween(t).to(1, {
      y: 0
    }).delay(2).call(function () {
      o.createItem();
    }).to(1, {
      y: -46
    }).start();
    return;
  }
  setItemString(e, t) {
    var o = e.getChildByPath("text/user_head"),
      n = e.getChildByPath("text/desc").getComponent(cc.RichText),
      i = o.getChildByPath("mask/head").getComponent(cc.Sprite),
      a = t.image,
      r = t.msg;
    n.string = r;
    a && EngineUtil.loadRemoteImg(a).then(function (e) {
      e && (i.spriteFrame = new cc.SpriteFrame(e));
    }).catch(function () {});
  }
  pushStandby(e) {
    e && e.length && (this.standbyArr = this.standbyArr.concat(e));
  }
}