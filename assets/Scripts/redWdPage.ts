import AudioManager from "./framework/Utils/AudioManager";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import EngineUtil from "./framework/Utils/EngineUtil";
import { PageEnum } from "./framework/enum/AllEnum";
import { GuideEnum } from "./framework/enum/GuideConfig";
import { RequestType } from "./service/RequestType";
import Service from "./service/Service";
import GlobalApp from "./common/GlobalApp";
import UiNode from "./common/UiNode";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import redWdItem from "./prefab/redWdItem";
import GameSystem from "./system/GameSystem";
import BasePage from "./view/BasePage";
import PageMgr from "./view/PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class redWdPage extends BasePage {
  @property(cc.Node)
  content: cc.Node = null;
  @property(cc.Node)
  guide_2_node: cc.Node = null;
  @property(cc.Node)
  bg: cc.Node = null;
  @property(cc.Label)
  myBlanceLb: cc.Label = null;
  @property(cc.Label)
  txBlanceLb: cc.Label = null;
  @property(cc.Label)
  txBlanceLb2: cc.Label = null;
  @property(cc.Label)
  sucCountLb: cc.Label = null;
  @property(cc.Node)
  conditionNode: cc.Node = null;
  @property(cc.Node)
  btnNode: cc.Node = null;
  curSelectItemInfo = null;
  redWdItemArr = [];
  selectItemMgr = null;
  clickToast = "";
  maxId = "0";
  needLevel = 0;
  success_count = 0;
  itemInfo = [];
  maxRate = 0;
  @property(cc.Node)
  conditionList: cc.Node = null;
  @property(cc.Node)
  conditionItem: cc.Node = null;
  @property(cc.Node)
  topViewNode: cc.Node = null;
  async _onShow() {
    super._onShow.call(this);
    PageMgr.openEventBlock("redWdPage");
    await EngineUtil.sleep(200);
    PageMgr.closeEventBlock("redWdPage");
    if (!this.node.active) return;
    if (cc.sys.localStorage.getItem("redWdPage_guide")) {

    } else {
      this.checkGuide();
      cc.sys.localStorage.setItem("redWdPage_guide", 1);
    }
    return;
  }
  clickSetUp() {
    EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "SetUpPage"
    });
  }
  async _init() {
    var e, t, o;
    e = await Service.commonApiPost(RequestType.GetGoldExtractInfo);
    (t = e.data).gold_balance, o = t.info;
    this.clickToast = "";
    this.success_count = o[0].grade;
    this.itemInfo = o;
    this.maxId = this.findMaxId();
    this.redWdItemArr.forEach(function (e) {
      e.selectNode.active = false;
    });
    this.setItems(this.itemInfo);
    this.sucCountLb.string = this.success_count + "次";
    this.myBlanceLb.string = MakeMnGlobalData.getGoldBalanceWithUnit(MakeMnGlobalData.goldBalance, "元");
    this.findMaxRateItem();
    return;
  }
  findMaxId() {
    var e = "0";
    this.itemInfo.forEach(function (t) {
      "2倍" == t.title && (e = t.id);
    });
    return e;
  }
  getOutlineFont(e) {
    return "<color=#FFFF00FF> " + e + " </c>";
  }
  setItems(e) {
    for (var t = this, o = 0; o < e.length; o++) {
      var n = e[o];
      n.success_count = this.success_count;
      var i = this.redWdItemArr[o];
      if (!i) {
        this.redWdItemArr[o] = this.content.children[o].getComponent(redWdItem);
        i = this.redWdItemArr[o];
      }
      i.init(n, this);
      i.node.active = true;
    }
    var a = this.findCurrentItemInfo();
    if (a) {
      var r = this.redWdItemArr.find(function (e) {
        return e._data.id === a.id;
      });
      this.redWdItemArr.forEach(function (e) {
        Number(e._data.grade_limit) <= t.success_count && Number(e._data.grade_limit) >= a.grade_limit && e.select();
      });
      if (r) {
        this.curSelectItemInfo = a;
        this.setConditionPos(a.id);
        r.selectNode.active = true;
        this.txBlanceLb.string = MakeMnGlobalData.getGoldBalanceWithUnit(a.amount, "");
        this.txBlanceLb2.string = a.title.replace("倍", "元");
      }
    }
  }
  itemClick(e) {
    if (e && e.target) {
      var t = e.target.getComponent(redWdItem);
      t.itemClick();
      this.redWdItemArr.forEach(function (e) {
        e.selectNode.active = false;
      });
      t.selectNode.active = true;
      this.curSelectItemInfo = t._data;
    }
  }
  setConditionPos(e) {
    if (e >= "7") {
      this.conditionNode.active = true;
      this.setCondition(e);
      "1" != e && "2" != e && "3" != e || this.redWdItemArr[1];
      "4" != e && "2" != e && "3" != e || this.redWdItemArr[1];
      if ("6" == e) {
        this.conditionNode.zIndex = 6;
        this.redWdItemArr.forEach(function (e, t) {
          e.node.zIndex = t >= 6 ? t + 1 : t;
        });
      } else if (e >= "7") {
        this.conditionNode.zIndex = this.conditionNode.parent.childrenCount;
        this.redWdItemArr.forEach(function (e, t) {
          e.node.zIndex = t >= 8 ? t + 1 : t;
        });
      }
    } else this.conditionNode.active = false;
    this.curSelectItemInfo && (this.txBlanceLb.string = MakeMnGlobalData.getGoldBalanceWithUnit(this.curSelectItemInfo.amount, ""));
  }
  createConditionItem(e, t) {
    var o = cc.instantiate(this.conditionItem);
    o.parent = this.conditionList;
    var n = o.getComponent(UiNode);
    n.uiLabels.get("title").string = t;
    n.uiNodes.get("duigou").active = e;
    n.uiNodes.get("complete").active = e;
  }
  setCondition(e) {
    var t = cc.find("jiaobiao", this.conditionNode);
    this.conditionList.removeAllChildren();
    var o = this.itemInfo.findIndex(function (t) {
        return t.id == e;
      }),
      n = this.itemInfo[o];
    t.worldPositionX = this.redWdItemArr[o].node.worldPositionX;
    n.vidoe_limit && this.createConditionItem(n.vidoe >= n.vidoe_limit, "观看视频 " + Math.min(n.vidoe, n.vidoe_limit) + "/" + n.vidoe_limit + " 次");
    n.activity_limit && this.createConditionItem(n.activity >= n.activity_limit, "活跃度到达 " + Math.min(n.activity, n.activity_limit) + "/" + n.activity_limit);
    n.gallery_limit && this.createConditionItem(n.gallery >= n.gallery_limit, "集齐图集 " + Math.min(n.gallery, n.gallery_limit) + "/" + n.gallery_limit + " 本");
  }
  onLoad() {
    super.onLoad.call(this);
    this.startPosition = GlobalApp.MakeMnProcessComp.goldNode.worldPosition;
  }
  txBtnClick() {
    var e,
      t = this,
      o = this.findCurrentItemInfo();
    if (o) {
      if (this.curSelectItemInfo && (null === (e = this.curSelectItemInfo) || void 0 === e ? void 0 : e.id) > this.maxId) {
        EngineUtil.showCocosToast2("当前未满足提现条件,继续完成任务吧");
      } else {
        if ((null == o ? void 0 : o.amount) < 0.1) {
          EngineUtil.showCocosToast2("受微信官方限制\n红包可到账金额不能低于0.1元");
        } else {
          GameSystem.gotoGoldWithdraw({
            tx_id: o.id
          }).then(async function (e) {
            const __async_this = t;
            var t_local, o, n;
            EngineUtil.reconnectSuc();
            if (!(!e || 1 != e.code)) {
              GlobalApp.MakeMnProcessComp.levelBorardGrp.updateActiveNum(e.data.activity_num);
              t_local = e.data, o = t_local.amount, n = t_local.gold_balance;
              GlobalApp.MakeMnProcessComp.goldBubbleTip = e.data.bubble_gold_balance;
              GlobalApp.MakeMnProcessComp.cashBubbleTip = e.data.bubble_cash_balance;
              __async_this.txBlanceLb.string = "0";
              await PageMgr.showPageByEnum(PageEnum.goldSuccPage, {
                gold_reward: o
              });
              GlobalApp.MakeMnProcessComp.setGoldBalance(n);
              __async_this.close();
              return;
            }
            return;
          }).catch(function (e) {
            EngineUtil.netError(e, t.txBtnClick.bind(t)) || EngineUtil.reconnectSuc();
          });
        }
      }
    } else {
      EngineUtil.showCocosToast2("还未解锁提现比例，继续闯关吧");
    }
  }
  _onHide() {
    super._onHide.call(this);
  }
  clickClose() {
    AudioManager.getInstance().playMusic("btntouch");
    // AudioManager.getInstance().stopMusic("red_wd_in", false);
    this._hide();
  }
  checkGuide() {
    var e,
      t = this;
    this.topViewNode && GlobalApp.GameMain.showGuideNode({
      guideType: GuideEnum.redShow1,
      nodes: [this.topViewNode]
    });
    this.guide_2_node && GlobalApp.GameMain.showGuideNode({
      guideType: GuideEnum.redShow2,
      nodes: [this.guide_2_node]
    });
    MakeMnGlobalData.startGameData.game_level > 2 && (null === (e = this.selectItemMgr) || void 0 === e ? void 0 : e.node) && GlobalApp.GameMain.showGuideNode({
      guideType: GuideEnum.redShow3,
      nodes: [this.btnNode],
      cb: function () {
        if (t.selectItemMgr.extract_amount >= 10) {
          t.txBtnClick();
        } else {
          GlobalApp.GameMain.showGuideNode({
            guideType: GuideEnum.redShow4
          });
        }
      }
    });
  }
  click_record() {
    AudioManager.getInstance().playMusic("btntouch");
    GameSystem.withdrawHistory().then(function (e) {
      e && 1 == e.code && EventMgr.trigger(GameEventType.PAGE_SHOW, {
        name: "wdRecordPage",
        data: Object.assign({
          name: "红包提现记录"
        }, e.data)
      });
    }).then(function () {});
  }
  click_describe(e) {
    AudioManager.getInstance().playMusic("btntouch");
    PageMgr.showPageByEnum(PageEnum.GoldTipPage, {
      desc: MakeMnGlobalData.extract_desc,
      startPosition: e.target.worldPosition
    });
  }
  findCurrentItemInfo() {
    var e = this,
      t = null;
    this.itemInfo.forEach(function (o) {
      e.success_count >= o.grade_limit && o.id <= e.maxId && (t = (t && (t.grade_limit, o.grade_limit), o));
    });
    return t;
  }
  findMaxRateItem() {
    var e = this,
      t = null;
    this.itemInfo.forEach(function (o) {
      e.success_count >= o.grade_limit && (t = (t && (t.grade_limit, o.grade_limit), o));
    });
    return t;
  }
}