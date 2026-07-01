import AudioManager from "./framework/Utils/AudioManager";
import { PageEnum } from "./framework/enum/AllEnum";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import EngineUtil from "./framework/Utils/EngineUtil";
import Service from "./service/Service";
import GlobalApp from "./common/GlobalApp";
import UiNode from "./common/UiNode";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import GameSystem from "./system/GameSystem";
import BasePage from "./view/BasePage";
import PageMgr from "./view/PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
var A = cc.color().fromHEX("#9C9C9CFF");
var E = cc.color().fromHEX("#15B86CFF");
cc.color().fromHEX("#F92525FF");
@ccclass
export default class wdPage extends BasePage {
  @property(cc.ScrollView)
  scrollView: cc.ScrollView = null;
  @property(cc.Node)
  addHandNode: cc.Node = null;
  @property(cc.Label)
  amountLabel: cc.Label = null;
  @property(cc.Node)
  isUnSuccNode: cc.Node = null;
  @property(cc.Label)
  descLabel: cc.Label = null;
  @property(cc.RichText)
  conditionLabel: cc.RichText = null;
  @property(cc.Node)
  listNode: cc.Node = null;
  @property(cc.Node)
  itemNode: cc.Node = null;
  @property(cc.Label)
  usernameLabel: cc.Label = null;
  @property(cc.Sprite)
  headSprite: cc.Sprite = null;
  isGuide = false;
  needChangeArrs = [];
  @property(cc.Node)
  descBgNode: cc.Node = null;
  @property(cc.Node)
  descBgNode2: cc.Node = null;
  isZero = false;
  AudioObj = {
    1: "cash_rate_1",
    2: "cash_rate_1_5",
    3: "cash_rate_100",
    4: "cash_rate_200"
  };
  inputData = null;
  newestInfo = null;
  nextInfo = null;
  newestNode = null;
  globalInfo = null;
  onLoad() {
    super.onLoad.call(this);
    this.startPosition = GlobalApp.MakeMnProcessComp.cashNode.worldPosition;
    this.listNode.removeAllChildren();
  }
  _onHide() {
    super._onHide.call(this);
    AudioManager.instance.stopCash("combineMn");
  }
  async updateUI() {
    var e, t, o, n, i;
    e = await GameSystem.getExtractInfo();
    this.globalInfo = e.data;
    t = this.globalInfo;
    this.amountLabel.string = "" + MakeMnGlobalData.getCNCashNum(t.cash_balance);
    this.setList(t.info);
    this.descBgNode.active = false;
    this.descBgNode2.active = false;
    o = MakeMnGlobalData.startGameData.process_info.step - (this.isGuide && MakeMnGlobalData.oldStep != MakeMnGlobalData.startGameData.process_info.step ? 1 : 0);
    MakeMnGlobalData.oldStep = MakeMnGlobalData.startGameData.process_info.step;
    if (1 == o) {
      this.descBgNode.active = true;
      this.conditionLabel.string = "<outline color=white width=3>每过1关<color=#FF0606FF>自动提现</color>，通过第5关，<color=#FF0606FF>全部提现</c></outline>";
    }
    if (2 == o) {
      n = Object.values(MakeMnGlobalData.startGameData.combine_extract_amount_dict).length;
      i = Object.values(MakeMnGlobalData.startGameData.combine_extract_amount_dict).reduce(function (e, t) {
        return e + t;
      }, 0);
      this.descBgNode2.active = true;
      this.conditionLabel.string = "<size=28><outline color=white width=3>活跃度到达<color=#FF0606FF>" + MakeMnGlobalData.startGameData.process_info.num + "/5000</color>可通过审核\n前" + n + "笔共提现<color=#FF0606FF>" + MakeMnGlobalData.getCNCashNum(i) + "元，立即到账</color></outline></size=28>";
    }
    if (3 == o) {
      this.descBgNode.active = true;
      this.conditionLabel.string = "<outline color=white width=3>集齐<color=#FF0606FF>" + MakeMnGlobalData.startGameData.process_info.num + "/5本图集</color>，免排队<color=#FF0606FF>立即提现</c></outline>";
    }
    if (4 == o) {
      this.descBgNode.active = true;
      this.conditionLabel.string = "<outline color=white width=3>集齐<color=#FF0606FF>" + MakeMnGlobalData.startGameData.process_info.num + "/30本图集</color>，立即加速<color=#FF0606FF>秒到账</c></outline>";
    }
    if (this.isZero) {
      this.amountLabel.string = "0";
      this.needChangeArrs.push([this.amountLabel, +MakeMnGlobalData.getCNCashNum(t.cash_balance), ""]);
    }
    return;
  }
  playMusicTestTime(e) {
    var t = this;
    console.log("🚀yxl ~ wdPage.ts:151 ~ WdPage ~ playMusicTestTime ~ name:", e);
    return new Promise(function (o) {
      AudioManager.instance.playCash(e, false, false, function (e, t) {
        o(t.duration);
      });
      t.scheduleOnce(function () {
        o(4);
      }, 2);
    });
  }
  async _onShow() {
    var t;
    var o,
      n,
      i,
      a,
      r,
      p,
      d,
      _,
      v,
      w,
      P,
      S,
      A = this;
    super._onShow.call(this);
    (null === (t = this.inputData) || void 0 === t ? void 0 : t.dayTaskMusic) && AudioManager.instance.playCash("combineMn");
    this.isZero = false;
    if (!this.isGuide) {
      PageMgr.closeEventBlock("wdGuideTip");
      return;
    }
    o = this.AudioObj[this.newestInfo.id] || "cash_rate_all";
    n = await this.playMusicTestTime(o);
    i = this.newestNode.getComponent(UiNode);
    a = i.uiNodes.get("left");
    r = i.uiNodes.get("right");
    p = i.uiNodes.get("mnLabel");
    d = i.uiNodes.get("tixian_saoguang_1");
    _ = i.uiNodes.get("tixian_saoguang_btn");
    (v = i.uiNodes.get("tixian_saoguang_2")).x = 141.515;
    v.scale = 1.7;
    if (1 == +this.newestInfo.id) {
      v.x = 85;
      v.scale = 1;
    }
    if (2 == +this.newestInfo.id) {
      v.x = 91.7;
      v.scale = 1.1;
    }
    cc.tween(a).to(0.3, {
      scale: 1.2
    }).call(function () {
      d.active = true;
    }).start();
    cc.tween(r).to(0.3, {
      scale: 1.2
    }).call(function () {
      _.active = true;
    }).start();
    cc.tween(p).to(0.3, {
      scale: 1.1
    }).call(function () {
      v.active = true;
    }).start();
    await EngineUtil.sleep(1000 * n - 300);
    d.active = false;
    _.active = false;
    v.active = false;
    cc.tween(a).to(0.3, {
      scale: 1
    }).call(function () {}).start();
    cc.tween(r).to(0.3, {
      scale: 1
    }).call(function () {}).start();
    cc.tween(p).to(0.3, {
      scale: 1
    }).call(function () {}).start();
    await EngineUtil.sleep(500);
    await PageMgr.showPageByEnum(PageEnum.AutoProcessPage);
    P = false;
    if (+this.newestInfo.id > 2) {
      w = await Service.gotoWithdraw_v2({
        tx_id: this.newestInfo.id
      });
      MakeMnGlobalData.startGameData.combine_extract_amount_dict[this.newestInfo.level_target] = w.data.amount;
      PageMgr.closeEventBlock("wdGuideTip");
      await PageMgr.showPageByEnum(PageEnum.wdSuccPage2, {
        amount: w.data.amount
      });
      PageMgr.openEventBlock("wdGuideTip");
      this.isGuide = false;
      this.isZero = w.data.back_amount > 0;
      S = this.nextInfo;
      await this.updateUI();
      GlobalApp.MakeMnProcessComp.setCashBalance(0);
      if (this.isZero) {
        PageMgr.closeEventBlock("wdGuideTip");
        await PageMgr.showPageByEnum(PageEnum.CashbackPage, {
          amount: w.data.back_amount,
          nextLevel: S.level_target - S.level
        });
        GlobalApp.MakeMnProcessComp.setCashBalance(w.data.back_amount);
        PageMgr.openEventBlock("wdGuideTip");
        GlobalApp.MakeMnProcessComp.effectNode.flyToCash(cc.Vec3.ZERO, this.amountLabel.node.worldPosition, 10, function () {
          cc.tween({
            num: 0
          }).to(0.5, {
            num: 1
          }, {
            progress: function (e, t, o, n) {
              A.needChangeArrs.forEach(function (e) {
                e[0].string = "" + Math.floor(e[1] * n * 100) / 100 + e[2];
              });
              return n;
            }
          }).call(async function () {
            const __async_this = A;
            __async_this.needChangeArrs = [];
            __async_this.needChangeArrs.forEach(function (e) {
              e[0].string = "" + e[1] + e[2];
            });
            PageMgr.closeEventBlock("wdGuideTip");
            if (P) {
              __async_this.addHandNode.active = true;
              return;
            }
            await PageMgr.showPageByEnum(PageEnum.WithdrawRefundPage, {
              amount: w.data.amount,
              isGuide: true
            });
            __async_this.addHandNode.active = true;
            return;
          }).start();
        });
        return;
      }
      PageMgr.closeEventBlock("wdGuideTip");
      this.addHandNode.active = true;
      return;
    }
    w = await Service.gotoWithdraw({
      tx_id: this.newestInfo.id
    });
    P = true;
    PageMgr.closeEventBlock("wdGuideTip");
    await PageMgr.showPageByEnum(PageEnum.wdSuccPage2, {
      amount: w.data.amount
    });
    PageMgr.openEventBlock("wdGuideTip");
    this.isGuide = false;
    this.isZero = w.data.back_amount > 0;
    S = this.nextInfo;
    await this.updateUI();
    GlobalApp.MakeMnProcessComp.setCashBalance(0);
    if (this.isZero) {
      PageMgr.closeEventBlock("wdGuideTip");
      await PageMgr.showPageByEnum(PageEnum.CashbackPage, {
        amount: w.data.back_amount,
        nextLevel: S.level_target - S.level
      });
      GlobalApp.MakeMnProcessComp.setCashBalance(w.data.back_amount);
      PageMgr.openEventBlock("wdGuideTip");
      GlobalApp.MakeMnProcessComp.effectNode.flyToCash(cc.Vec3.ZERO, this.amountLabel.node.worldPosition, 10, function () {
        cc.tween({
          num: 0
        }).to(0.5, {
          num: 1
        }, {
          progress: function (e, t, o, n) {
            A.needChangeArrs.forEach(function (e) {
              e[0].string = "" + Math.floor(e[1] * n * 100) / 100 + e[2];
            });
            return n;
          }
        }).call(async function () {
          const __async_this = A;
          __async_this.needChangeArrs = [];
          __async_this.needChangeArrs.forEach(function (e) {
            e[0].string = "" + e[1] + e[2];
          });
          PageMgr.closeEventBlock("wdGuideTip");
          if (P) {
            __async_this.addHandNode.active = true;
            return;
          }
          await PageMgr.showPageByEnum(PageEnum.WithdrawRefundPage, {
            amount: w.data.amount,
            isGuide: true
          });
          __async_this.addHandNode.active = true;
          return;
        }).start();
      });
      return;
    }
    PageMgr.closeEventBlock("wdGuideTip");
    this.addHandNode.active = true;
    return;
  }
  async _init(t = {
    isGuide: false
  }) {
    this.inputData = t;
    this.isZero = false;
    this.needChangeArrs = [];
    this.addHandNode.active = false;
    this.isGuide = (null == t ? void 0 : t.isGuide) || false;
    super._init.call(this, t);
    EngineUtil.setUserNameAndHeadImage(this.usernameLabel, this.headSprite);
    PageMgr.openEventBlock("wdGuideTip");
    await this.updateUI();
    return;
  }
  setItemString(e, t, o = {
    level_target: 0
  }) {
    var n = e.getComponent(UiNode),
      i = n.uiLabels.get("rate"),
      a = n.uiNodes.get("p_h"),
      r = n.uiNodes.get("p_g"),
      c = n.uiLabels.get("level"),
      s = n.uiLabels.get("mnLabel"),
      l = n.uiNodes.get("btn_old"),
      u = n.uiNodes.get("btn_untouch"),
      p = n.uiNodes.get("btn_ing"),
      d = n.uiNodes.get("qipao");
    i.string = 100 * t.withdraw_percent + "%";
    var f = MakeMnGlobalData.getCNCashNum(100 * t.amount);
    s.string = f + "元";
    c.string = "第" + t.level_target + "关";
    a.active = 1 == t.status;
    r.active = 1 != t.status;
    i.node.color = 1 == t.status ? A : E;
    s.node.color = 1 == t.status ? A : E;
    var h = t.level;
    this.isGuide && (h -= 1);
    var g = 2 == t.status || t.level == t.level_target && this.isGuide;
    if (h >= o.level_target && h < t.level_target) {
      var _ = t.level_target - h == 1;
      this.descLabel.string = _ ? "通过本关，现金全部到账" : "再过" + (t.level_target - h) + "关，自动到账" + f + "元";
      this.newestInfo = t;
      this.newestNode = e;
    }
    this.newestInfo && this.newestInfo == o && (this.nextInfo = t);
    p.active = 1 != t.status && g;
    l.active = 1 == t.status;
    u.active = 1 != t.status && !g;
    d.active = t.level_target > 1 && 1 != t.status;
    u.itemData = t;
    p.itemData = t;
    if (0 == t.status && this.isZero) {
      s.string = "0元";
      this.needChangeArrs.push([s, +f, "元"]);
    }
  }
  clickBtn(e) {
    var t = e.target.itemData;
    if (2 != t.status) {
      if (t.level_target != t.level + 1 || 5 == t.level_target) {
        EngineUtil.showCocosToast3("通过第" + t.level_target + "关，自动发起" + 100 * t.withdraw_percent + "%提现");
      } else {
        EngineUtil.showCocosToast3("通过本关，自动发起" + 100 * t.withdraw_percent + "%提现");
      }
    } else {
      if (4 == MakeMnGlobalData.startGameData.process_info.step) {
        this.directRecord();
        return;
      }
      PageMgr.showPageByEnum(PageEnum.WithdrawRefundPage, {
        amount: 100 * t.amount,
        time: t.extract_amount_time
      });
    }
  }
  clickOldBtn() {
    EngineUtil.showCocosToast3("已到账");
  }
  setList(e = []) {
    var t = this;
    this.newestInfo = null;
    e.forEach(async function (o, n) {
      const __async_this = t;
      var t_local,
        i = __async_this;
      t_local = __async_this.listNode.children[n] || cc.instantiate(__async_this.itemNode);
      __async_this.setItemString(t_local, o, n > 0 ? e[n - 1] : void 0);
      await EngineUtil.sleep(10 * n);
      t_local.parent = __async_this.listNode;
      t_local.active = true;
      n == e.length - 1 && "1" != __async_this.newestInfo.id && __async_this.scheduleOnce(function () {
        var e = -i.newestNode.y - 220;
        i.scrollView.content.y = e;
      });
      return;
    });
  }
  click_describe(e) {
    AudioManager.getInstance().playMusic("btntouch");
    PageMgr.showPageByEnum(PageEnum.GoldTipPage, {
      desc: MakeMnGlobalData.extract_cash_desc,
      startPosition: e.target.worldPosition
    });
  }
  directRecord() {
    GameSystem.withdrawHistory().then(function (e) {
      e && 1 == e.code && EventMgr.trigger(GameEventType.PAGE_SHOW, {
        name: "wdRecordPage",
        data: Object.assign({
          name: "提现记录"
        }, e.data)
      });
    }).then(function () {});
  }
  click_record() {
    AudioManager.getInstance().playMusic("btntouch");
    this.directRecord();
  }
  close() {
    super.close.call(this);
  }
}