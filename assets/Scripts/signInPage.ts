import BasePage from "./view/BasePage";
import Service from "./service/Service";
import EngineUtil from "./framework/Utils/EngineUtil";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import AudioManager from "./framework/Utils/AudioManager";
import GlobalApp from "./common/GlobalApp";
import PageMgr from "./view/PageMgr";
import { PageEnum } from "./framework/enum/AllEnum";
import decorator from "./decorator/decorator";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
const {
  ccclass,
  property
} = cc._decorator;
enum s {
  UnFinish = 0,
  AWAIT_GET = 1,
  HAS_GET = 2,
}
@ccclass
export default class signInPage extends BasePage {
  @property(cc.Node)
  gridNode: cc.Node = null;
  @property(cc.Node)
  handNode: cc.Node = null;
  @property(cc.Node)
  titleNode: cc.Node = null;
  listData = [];
  cb = null;
  isGuide = false;
  curAwaitInfo = null;
  curDay = 0;
  onLoad() {
    super.onLoad.call(this);
    this.startPosition = GlobalApp.MakeMnProcessComp.signInNode.worldPosition;
  }
  async _init(e) {
    var t;
    this.cb = (null == e ? void 0 : e.cb) || null;
    this.isGuide = (null == e ? void 0 : e.isGuide) || false;
    // this.isGuide && AudioManager.instance.playCash("signin_guide");
    this.handNode.active = false;
    t = await Service.getSignInfo();
    this.listData = t.data.sign_info_list;
    this.processData();
    this.setView();
    return;
  }
  setView() {
    var e;
    e = this.checkChangeNextStep() ? this.listData.slice(7) : this.listData.slice(0, 7);
    for (var t = 0; t < e.length; t++) {
      var o = e[t];
      this.setItem(t, o, t);
    }
    this.titleNode.getChildByPath("ly/day").getComponent(cc.Label).string = "" + this.curDay;
  }
  processData() {
    this.curDay = this.listData[0].current_login_days;
    this.curAwaitInfo = this.listData.find(function (e) {
      return e.status == s.AWAIT_GET;
    });
    if (this.curAwaitInfo) {
      GlobalApp.MakeMnProcessComp.signInRedNode.active = 30 != this.curAwaitInfo.sign_up_day_limit;
    } else {
      GlobalApp.MakeMnProcessComp.signInRedNode.active = false;
    }
  }
  @decorator.Debounce(300)
  clickItem(e) {
    console.log(e.target);
    var t = e.target.name,
      o = this.getInfoById(t);
    if (o) switch (o.status) {
      case s.UnFinish:
        EngineUtil.showCocosToast3("时间还没到哦～继续加油！");
        break;
      case s.AWAIT_GET:
        if (o.is_limit) {
          EngineUtil.showCocosToast3("集齐30本图集，可立即领取");
          return;
        }
        this.getReward(t);
        break;
      case s.HAS_GET:
        if (o.id == this.listData[this.listData.length - 1].id) {
          EngineUtil.showCocosToast3("已领取");
        } else {
          EngineUtil.showCocosToast3("奖励已领取，后边还有更多大奖!");
        }
    }
  }
  setItem(e, t, o) {
    var n = this,
      i = this.gridNode.children[e];
    i.name = t.id;
    if (i) {
      var a = i.getChildByPath("awaitSp"),
        r = i.getChildByPath("unFinishSp"),
        c = i.getChildByPath("zuigao"),
        l = i.getChildByPath("rewardLy/num"),
        u = i.getChildByPath("unFinishSp/ly/day");
      a.active = false;
      r.active = false;
      c.active = false;
      var p = t.status,
        d = t.red_show_money;
      t.money;
      l.getComponent(cc.Label).string = MakeMnGlobalData.getGoldBalanceWithUnit(d, "元");
      l.getComponent(cc.LabelOutline).enabled = false;
      u.getComponent(cc.Label).string = "第" + t.sign_up_day_limit + "天";
      if (t.current_login_days == t.sign_up_day_limit || t.current_login_days > t.sign_up_day_limit && p == s.AWAIT_GET) {
        c.active = t.is_top;
      } else {
        c.active = false;
      }
      if (1 == o) {
        u.getComponent(cc.LabelOutline).enabled = true;
        u.color = new cc.Color().fromHEX("#FFFFFF");
      }
      i.opacity = 255;
      switch (p) {
        case s.HAS_GET:
          r.active = true;
          u.getComponent(cc.Label).string = "已领取";
          i.opacity = 150;
          if (1 == o) {
            u.color = new cc.Color().fromHEX("#972626FF");
            u.getComponent(cc.LabelOutline).enabled = false;
          }
          break;
        case s.UnFinish:
          r.active = true;
          break;
        case s.AWAIT_GET:
          this.scheduleOnce(function () {
            if (!n.handNode.active) {
              n.handNode.active = 30 !== t.sign_up_day_limit;
              n.handNode.worldPosition = i.worldPosition.add(new cc.Vec3(40, -40, 0));
            }
          }, 0.3);
          r.active = true;
          a.active = true;
          l.getComponent(cc.LabelOutline).enabled = true;
      }
    }
  }
  getInfoById(e) {
    return this.listData.find(function (t) {
      return t.id == e;
    });
  }
  getNextInfo() {
    var e = this;
    return this.listData.find(function (t) {
      return t.sign_up_day_limit > e.curDay;
    });
  }
  getReward(e) {
    var t = this;
    Service.getSignInReward({
      sign_id: e
    }).then(async function (o) {
      const __async_this = t;
      __async_this.handNode.active = false;
      await PageMgr.showPageByEnum(PageEnum.rewardToastPage, {
        goldReward: o.data.reward
      });
      __async_this.getInfoById(e).status = s.HAS_GET;
      __async_this.handNode.active = false;
      __async_this.processData();
      __async_this.setView();
      if (!GlobalApp.MakeMnProcessComp.signInRedNode.active) {
        await EngineUtil.sleep(400);
        __async_this._hide();
      }
      return;
    });
  }
  checkChangeNextStep() {
    return this.getTotolSignInDays() >= 7;
  }
  _onHide() {
    super._onHide.call(this);
    this.cb && this.cb();
    // AudioManager.instance.stopCash("signin_guide");
    EventMgr.trigger(GameEventType.UPDATE_MAIN_BTN_STATE);
  }
  getTotolSignInDays() {
    var e;
    return (null === (e = this.listData.filter(function (e) {
      return e.current_login_days >= e.sign_up_day_limit && e.status == s.HAS_GET;
    })) || void 0 === e ? void 0 : e.length) || 0;
  }
  close() {
    AudioManager.instance.playBtn();
    this._hide();
  }
}