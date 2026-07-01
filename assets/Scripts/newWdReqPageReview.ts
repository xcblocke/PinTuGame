import PlayerDataSys from "./framework/Utils/PlayerDataSys";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import EngineUtil from "./framework/Utils/EngineUtil";
import { gameData } from "./data/GameData";
import BasePage from "./view/BasePage";
import PageMgr from "./view/PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
cc.color().fromHEX("#111111");
cc.color().fromHEX("#FF8800");
@ccclass
export default class newWdReqPageReview extends BasePage {
  @property(cc.Label)
  moneyLabel: cc.Label = null;
  @property(cc.Label)
  btnLabel: cc.Label = null;
  @property(cc.Label)
  timeLabel: cc.Label = null;
  @property(cc.Sprite)
  greenLineSprite: cc.Sprite = null;
  @property(cc.Node)
  animListNode: cc.Node = null;
  @property(cc.Node)
  content: cc.Node = null;
  @property(cc.Label)
  arriveTimeLabel: cc.Label = null;
  @property(cc.Label)
  descLabel: cc.Label = null;
  @property(cc.RichText)
  descRichText: cc.RichText = null;
  arrs = [];
  cb = null;
  get animListSingles() {
    return this.animListNode.children;
  }
  async showAnime(e) {
    var t = this;
    if (!this.arrs[e]) {
      cc.tween(this.btnLabel.node.parent).to(0.1, {
        opacity: 255
      }).start();
      PageMgr.fullNode.active = false;
      return;
    }
    cc.tween(this.greenLineSprite).to(0.1, {
      fillRange: -e / 4
    }).start();
    this.nowTween = cc.tween(this.arrs[e]).delay(0.1).call(function () {
      t.arrs[e].opacity = 255;
    }).delay(0.4).call(function () {
      if (t.baseData.txId < 3) {
        t.animListSingles[e].getChildByName("xj_daiji").active = false;
      } else {
        4 != e && (t.animListSingles[e].getChildByName("xj_daiji").active = false);
      }
      t.showAnime(e + 1);
    }).start();
    return;
  }
  async _onHide() {
    super._onHide.call(this);
    return;
  }
  _onShow() {
    PageMgr.fullNode.active = true;
    super._onShow.call(this);
  }
  async _init(e) {
    var t;
    this.cb = (null == e ? void 0 : e.cb) || null;
    this.baseData = e;
    this.btnLabel.node.parent.opacity = 0;
    this.animListSingles.forEach(function (e) {
      e.opacity = 0;
      e.active = true;
      e.getChildByName("xj_daiji").active = true;
    });
    this.greenLineSprite.fillRange = 0;
    this.timeLabel.string = "" + EngineUtil.formatDateToChineseDateTime(new Date());
    this.moneyLabel.string = PlayerDataSys.getCashBalanceWithUnit((null === (t = e.cash_extract_limit_info) || void 0 === t ? void 0 : t.amount) || e.amount, "");
    this.arriveTimeLabel.string = "到账时间：" + EngineUtil.formatDateToChineseDateTime(new Date());
    this.arrs = [...this.animListSingles];
    if (this.baseData.txId < 3 && this.baseData.level >= this.baseData.level_target) {
      this.animListSingles.forEach(function (e, t) {
        e.active = 5 != t;
      });
      this.arrs.splice(5);
      console.log("this.arrs", this.arrs);
      this.showAnime(0);
      return;
    }
    switch (e.extract_status) {
      case 0:
      case 1:
      case 2:
        this.descLabel.string = "通过第" + this.baseData.level_target + "关可完成提现";
        this.descRichText.string = "已通关" + this.baseData.level + "/" + this.baseData.level_target + "（再闯" + (this.baseData.level_target - this.baseData.level) + "关）";
        break;
      case 3:
        this.descLabel.string = "支付宝审核中...";
        this.descRichText.string = "集齐5福可完成审核 (" + gameData.getWufuCount() + "/5)";
        break;
      case 4:
        this.descLabel.string = "大额打款活跃度验证中...";
        this.descRichText.string = "达成活跃度可完成验证 (" + this.baseData.activity + "/" + this.baseData.activity_limit + ")";
        break;
      case 5:
        this.descLabel.string = "打款排队中...";
        this.descRichText.string = "集齐12生肖贺卡可免排队 (" + this.baseData.cards + "/" + this.baseData.cards_limit + ")";
    }
    this.animListSingles.forEach(function (e, t) {
      e.active = 4 != t;
    });
    this.arrs.splice(4, 1);
    console.log("this.arrs", this.arrs);
    this.showAnime(0);
    return;
  }
  async close() {
    EventMgr.trigger(GameEventType.PAGE_HIDE, "wdPage");
    this._hide();
    this.cb && this.cb();
    return;
  }
}