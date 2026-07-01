import AudioManager from "../framework/Utils/AudioManager";
import EventMgr from "../framework/Event/EventMgr";
import GameEventType from "../framework/Event/GameEventType";
import EngineUtil from "../framework/Utils/EngineUtil";
import MakeMnGlobalData from "../data/MakeMnGlobalData";
const {
  ccclass,
  property
} = cc._decorator;
cc.color().fromHEX("#767676FF");
var h = cc.color().fromHEX("#FF1F5BFF");
var g = cc.color().fromHEX("#3C618EFF");
var y = cc.color().fromHEX("#767676");
var m = cc.color().fromHEX("#FFFFFFFF");
@ccclass
export default class redWdItem extends cc.Component {
  @property(cc.Label)
  tier_txt: cc.Label = null;
  @property(cc.Label)
  beishuLb: cc.Label = null;
  @property(cc.Label)
  title: cc.Label = null;
  @property(cc.SpriteFrame)
  itemStateSpriteFrame: cc.SpriteFrame = [];
  @property(cc.Sprite)
  itemBg: cc.Sprite = null;
  @property(cc.Node)
  selectNode: cc.Node = null;
  isCanClick = false;
  tx_id = "";
  withdraw_percent = 0;
  extract_amount = 0;
  grade = "0";
  rate_title = "";
  wdReq = false;
  get needLevel() {
    return +this.grade - MakeMnGlobalData.startGameData.game_level + 1;
  }
  setOldRate() {
    this.setItemBg();
  }
  init(e, t) {
    this.redWdPage = t;
    var o = e.title,
      n = e.amount,
      i = void 0 === n ? 0 : n,
      a = (e.grade, e.grade_limit),
      r = e.id,
      c = e.withdraw_percent;
    this._data = e;
    this.tx_id = r;
    this.grade = o;
    this.rate_title = "" + o.replace("倍", "");
    this.title.string = "" + this.rate_title;
    this.extract_amount = i;
    this.withdraw_percent = c;
    this.tier_txt.fontSize = 24;
    this.tier_txt.string = "闯关" + a + "次";
    this.setItemBg();
  }
  setItemBg() {
    this.itemBg.spriteFrame = this.itemStateSpriteFrame[0];
    this.title.node.color = m;
    this.beishuLb.node.color = m;
    if (this._data.success_count >= this._data.grade_limit) {
      this.itemBg.spriteFrame = this.itemStateSpriteFrame[0];
      this.beishuLb.node.color = y;
      this.title.node.color = y;
    }
    if (this._data.success_count < this._data.grade_limit) {
      this.itemBg.spriteFrame = this.itemStateSpriteFrame[2];
      this.beishuLb.node.color = g;
      this.title.node.color = g;
    }
    this._data.id >= this.redWdPage.maxId && (this.itemBg.spriteFrame = this.itemStateSpriteFrame[2]);
  }
  onReqPageReview() {
    4 == this._data.status && EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "redReqPageReview",
      data: {
        server_data: {
          cash_extract_limit_info: this._data
        },
        skipAni: false,
        wdType: "redWd"
      },
      option: {
        reuse: false
      }
    });
  }
  itemClick() {
    var e, t;
    AudioManager.instance.playBtnEffect();
    if ((null === (e = this.redWdPage.curSelectItemInfo) || void 0 === e ? void 0 : e.id) != (null === (t = this._data) || void 0 === t ? void 0 : t.id)) {
      if (this._data.grade_limit < this._data.success_count && this._data.id < this.redWdPage.maxId) EngineUtil.showCocosToast2("此比例较低，已为您选择当前最高比例");else if (this._data.grade_limit > this._data.success_count) EngineUtil.showCocosToast2("再闯" + (this._data.grade_limit - this._data.success_count) + "次解锁");else if (this.isCanClick) {
        this.redWdPage.redWdItemArr.forEach(function (e) {
          e.selectNode.active = false;
        });
        this.selectNode.active = true;
        this.redWdPage.curSelectItemInfo = this._data;
        this.redWdPage.setConditionPos(this._data.id);
      }
    } else EngineUtil.showCocosToast2("当前比例已选中");
  }
  testSelect() {
    AudioManager.instance.playBtnEffect();
    this.oldUnSelect();
  }
  select() {
    this.isCanClick = true;
    this.tier_txt.node.color = h;
    this.beishuLb.node.color = m;
    this.title.node.color = m;
    if (+this._data.id <= 6) {
      this.tier_txt.string = "可提现";
      this.itemBg.spriteFrame = this.itemStateSpriteFrame[1];
      this.tier_txt.fontSize = 30;
    } else {
      this.tier_txt.string = "达成条件提现";
      this.itemBg.spriteFrame = this.itemStateSpriteFrame[1];
    }
  }
  oldUnSelect() {
    if (0 != this._data.extract_status && this.redWdPage.curSelectItemInfo.id != this._data.id) if (this.redWdPage.maxRate > 2) {
      if (+this._data.title.replace("倍", "") < 2) {
        EngineUtil.showCocosToast2("此比例较低，已为您选择当前最高可提现比例");
        return;
      }
      var e = 2 == this._data.extract_status ? "审核中" : "排队中";
      EngineUtil.showCocosToast2("此比例" + e + "，已为您选择当最高可提现比例");
    } else EngineUtil.showCocosToast2("此比例较低，已为您选择当前最高比例");
  }
  cancel() {}
}