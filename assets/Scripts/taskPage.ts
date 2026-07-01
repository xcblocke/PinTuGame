import decorator from "./decorator/decorator";
import AudioManager from "./framework/Utils/AudioManager";
import PlayerDataSys from "./framework/Utils/PlayerDataSys";
import { PageEnum } from "./framework/enum/AllEnum";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import EngineUtil from "./framework/Utils/EngineUtil";
import Service from "./service/Service";
import GlobalApp from "./common/GlobalApp";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import BasePage from "./view/BasePage";
import PageMgr from "./view/PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
enum s {
  UnStart = 0,
  AWAIT_GET = 1,
  HAS_GET = 2,
  DOING = 3,
}
var A = new cc.Color().fromHEX("#B5692E");
var E = new cc.Color().fromHEX("#7F5347");
var O = new cc.Color().fromHEX("#FF3535");
var C = new cc.Color().fromHEX("#33B10AFF");
@ccclass
export default class taskPage extends BasePage {
  @property(cc.Node)
  containerNode: cc.Node = null;
  @property(cc.Node)
  itemNode: cc.Node = null;
  @property(cc.Node)
  gridNode: cc.Node = null;
  @property(cc.Label)
  titleLb: cc.Label = null;
  listData = [];
  cb = null;
  isGuide = false;
  curAwaitInfo = null;
  curDay = 0;
  hasDoing = false;
  async _onShow() {
    super._onShow.call(this);
    return;
  }
  onLoad() {
    super.onLoad.call(this);
    this.startPosition = GlobalApp.MakeMnProcessComp.taskNode.worldPosition;
  }
  _init(e) {
    this.cb = (null == e ? void 0 : e.cb) || null;
    this.isGuide = (null == e ? void 0 : e.isGuide) || false;
    this.containerNode.active = true;
    this.isGuide && AudioManager.instance.playCash("task_guide");
    this.reqData();
  }
  reqData() {
    var e = this;
    Service.getTaskList().then(function (t) {
      e.listData = t.data;
      e.setView();
    }, function (e) {
      console.error(e);
    }).finally(function () {});
  }
  setView() {
    this.processData();
    this.gridNode.removeAllChildren();
    for (var e = this.listData, t = 0; t < e.length; t++) {
      var o = e[t],
        n = cc.instantiate(this.itemNode);
      n.active = true;
      n.x = 0;
      n.name = o.id;
      this.gridNode.addChild(n);
      this.setItem(n, o);
    }
    this.titleLb.string = "" + this.curDay;
  }
  processData() {
    var e = this;
    this.hasDoing = false;
    var t = false,
      o = true;
    this.listData.forEach(function (n) {
      if (n.current_login_days >= n.sign_up_day_limit && 1 == n.status) {
        n.status = s.AWAIT_GET;
        t = true;
      } else if (2 == n.status) n.status = s.HAS_GET;else if (n.current_login_days >= n.sign_up_day_limit && 0 == n.status) {
        e.hasDoing = true;
        n.status = s.DOING;
      } else n.status = s.UnStart;
      2 != n.status && (o = false);
    });
    GlobalApp.MakeMnProcessComp.taskNode.active = !o;
    PlayerDataSys.playerInfo.task_point = t ? 1 : 0;
    if (!this.hasDoing) for (var n = 0; n < this.listData.length; n++) {
      var i = this.listData[n];
      if (0 == i.status && i.status == s.UnStart) {
        i.status = s.DOING;
        break;
      }
    }
    this.curDay = this.listData[0].current_login_days;
    this.curAwaitInfo = this.listData.find(function (e) {
      return e.status == s.AWAIT_GET;
    });
  }
  @decorator.Debounce(300)
  clickItem(e) {
    console.log(e.target);
    var t = e.target.parent.parent.name,
      o = this.getInfoById(t);
    if (o) switch (o.status) {
      case s.UnStart:
        EngineUtil.showCocosToast3("时间还没到哦～继续加油！");
        break;
      case s.AWAIT_GET:
        this.getReward(t);
        break;
      case s.HAS_GET:
        if (o.id == this.listData[this.listData.length - 1].id) {
          EngineUtil.showCocosToast3("已领取");
        } else {
          EngineUtil.showCocosToast3("奖励已领取，后边还有更多大奖!");
        }
        break;
      case s.DOING:
        if (o.current_login_days < o.sign_up_day_limit) {
          EngineUtil.showCocosToast3("时间还没到哦～继续加油！");
        } else {
          EngineUtil.showCocosToast3("继续通关，完成任务吧!");
        }
    }
  }
  setItem(e, t) {
    if (e) {
      var o = e.getChildByPath("awaitBg"),
        n = e.getChildByPath("receivedBg"),
        i = e.getChildByPath("unFinishBg"),
        a = e.getChildByPath("progressBg");
      o.active = false;
      n.active = false;
      i.active = false;
      a.active = false;
      switch (t.status) {
        case s.HAS_GET:
          n.active = true;
          break;
        case s.UnStart:
          i.active = true;
          break;
        case s.AWAIT_GET:
          o.active = true;
          break;
        case s.DOING:
          a.active = true;
      }
      this.initItemLeftUI(e, t);
      this.initItmeMidUI(e, t);
      this.initItemRightUI(e, t);
    }
  }
  initItemLeftUI(e, t) {
    var o = e.getChildByPath("leftNode/normalIcon"),
      n = e.getChildByPath("leftNode/receivedIcon"),
      i = e.getChildByPath("leftNode/redArrow"),
      a = e.getChildByPath("leftNode/rewardLy/num"),
      r = e.getChildByPath("leftNode/rewardLy/yuan");
    Number(t.id) >= 6 && (r.getComponent(cc.Label).fontSize = 30);
    o.active = false;
    n.active = false;
    i.active = false;
    a.getComponent(cc.Label).string = MakeMnGlobalData.getCashBalanceWithUnit(t.show_money, "");
    i.active = 0 == t.true_money;
    switch (t.status) {
      case s.HAS_GET:
        n.active = true;
        r.color = A;
        a.color = A;
        break;
      case s.UnStart:
      case s.DOING:
      case s.AWAIT_GET:
        o.active = true;
        r.color = O;
        a.color = O;
    }
  }
  initItmeMidUI(e, t) {
    var o = e.getChildByPath("midNode/des1/lb1"),
      n = e.getChildByPath("midNode/des1/lb2"),
      i = e.getChildByPath("midNode/des2/lb1"),
      a = e.getChildByPath("midNode/des2/lb2");
    o.getComponent(cc.RichText).string = "登录" + t.sign_up_day_limit + "天";
    n.getComponent(cc.Label).string = "(" + Math.min(t.current_login_days, t.sign_up_day_limit) + "/" + t.sign_up_day_limit + ")";
    var r = "";
    r = t.current_login_days >= t.sign_up_day_limit ? "今日通关<color=#FF3535>" + t.today_level_count_limit + "</color>次" : "通关" + t.today_level_count_limit + "次";
    a.getComponent(cc.Label).string = "(" + Math.min(t.level_count, t.today_level_count_limit) + "/" + t.today_level_count_limit + ")";
    switch (t.status) {
      case s.HAS_GET:
      case s.UnStart:
        o.color = A;
        n.color = A;
        i.color = A;
        a.color = A;
        r = "通关" + t.today_level_count_limit + "次";
        break;
      case s.DOING:
        o.color = E;
        n.color = O;
        i.color = E;
        a.color = O;
        if (t.level_count >= t.today_level_count_limit) {
          i.color = C;
          a.color = C;
        }
        if (t.current_login_days >= t.sign_up_day_limit) {
          o.color = C;
          n.color = C;
          o.getComponent(cc.RichText).string = "登录" + t.sign_up_day_limit + "天";
        } else o.getComponent(cc.RichText).string = "登录<color=#FF3535>" + t.sign_up_day_limit + "</color>天";
        break;
      case s.AWAIT_GET:
        o.color = E;
        n.color = E;
        i.color = E;
        a.color = E;
        if (t.level_count >= t.today_level_count_limit) {
          i.color = C;
          a.color = C;
        }
        if (t.current_login_days >= t.sign_up_day_limit) {
          o.color = C;
          n.color = C;
          o.getComponent(cc.RichText).string = "登录" + t.sign_up_day_limit + "天";
          r = "今日通关" + t.today_level_count_limit + "次";
        } else o.getComponent(cc.RichText).string = "登录<color=#FF3535>" + t.sign_up_day_limit + "</color>天";
    }
    i.getComponent(cc.RichText).string = r;
  }
  initItemRightUI(e, t) {
    var o = e.getChildByPath("rightNode/unFinishBtnBg"),
      n = e.getChildByPath("rightNode/awaitBtnBg"),
      i = e.getChildByPath("rightNode/receivedFlg"),
      a = e.getChildByPath("rightNode/progressBtnBg");
    o.active = false;
    n.active = false;
    i.active = false;
    a.active = false;
    switch (t.status) {
      case s.HAS_GET:
        i.active = true;
        break;
      case s.UnStart:
        o.active = true;
        break;
      case s.AWAIT_GET:
        n.active = true;
        break;
      case s.DOING:
        a.active = true;
    }
  }
  getInfoById(e) {
    return this.listData.find(function (t) {
      return t.id == e;
    });
  }
  checkAllGetReward() {
    var e = true;
    this.listData.forEach(function (t) {
      t.status != s.HAS_GET && (e = false);
    });
    return e;
  }
  getReward(e) {
    var t = this;
    Service.getTaskExtract({
      tx_id: e
    }).then(async function (o) {
      const __async_this = t;
      __async_this.getInfoById(e).status = s.HAS_GET;
      __async_this.setView();
      __async_this.checkAllGetReward();
      GlobalApp.MakeMnProcessComp.levelBorardGrp.updateActiveNum(o.data.activity_num);
      AudioManager.instance.stopCash("task_guide");
      if (!(0 !== o.data.extract_status)) {
        await PageMgr.showPageByEnum(PageEnum.rewardToastPage, {
          cashReward: o.data.amount
        });
        __async_this._fakeHide();
        await PageMgr.showPageByEnum(PageEnum.wdPage, {
          dayTaskMusic: true
        });
        AudioManager.instance.playMusic("combineMn");
        __async_this._onHide();
        return;
      }
      await PageMgr.showPageByEnum(PageEnum.wdSuccPage2, {
        amount: o.data.amount
      });
      if (!(0 != PlayerDataSys.playerInfo.task_point)) {
        await EngineUtil.sleep(400);
        __async_this._hide();
      }
      return;
    });
  }
  _onHide() {
    super._onHide.call(this);
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
    AudioManager.instance.stopCash("task_guide");
    this.cb && this.cb();
    this._hide();
  }
}