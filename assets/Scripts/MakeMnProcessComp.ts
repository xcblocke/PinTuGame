import AudioManager from "./framework/Utils/AudioManager";
import CommonUtil from "./common/CommonUtil";
import GlobalApp from "./common/GlobalApp";
import { gameData } from "./data/GameData";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import effect from "./view/effect";
import PageMgr from "./view/PageMgr";
import { LevelBorardGrp } from "./LevelBorardGrp";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class MakeMnProcessComp extends cc.Component {
  @property(cc.Node)
  goldNode: cc.Node = null;
  @property(cc.Node)
  cashNode: cc.Node = null;
  @property(cc.Label)
  cashLabel: cc.Label = null;
  @property(cc.Label)
  goldLabel: cc.Label = null;
  @property(cc.RichText)
  cashBubbleRichText: cc.RichText = null;
  @property(cc.RichText)
  goldBubbleRichText: cc.RichText = null;
  @property(cc.Node)
  taskNode: cc.Node = null;
  @property(cc.Node)
  taskRedNode: cc.Node = null;
  @property(cc.Node)
  signInNode: cc.Node = null;
  @property(cc.Node)
  signInRedNode: cc.Node = null;
  @property(effect)
  effectNode: effect = null;
  @property(LevelBorardGrp)
  levelBorardGrp: LevelBorardGrp = null;
  _goldBubbleTip = "";
  _cashBubbleTip = "";
  set goldBubbleTip(e) {
    if ("string" == typeof e) {
      this._goldBubbleTip = e;
      this.goldBubbleRichText && (this.goldBubbleRichText.string = e || "");
    }
  }
  set cashBubbleTip(e) {
    if ("string" == typeof e) {
      this._cashBubbleTip = e;
      this.cashBubbleRichText && (this.cashBubbleRichText.string = e);
    }
  }
  get cashBalance() {
    return MakeMnGlobalData.cashBalance;
  }
  set cashBalance(e) {
    MakeMnGlobalData.cashBalance = e;
  }
  get goldBalance() {
    return MakeMnGlobalData.goldBalance;
  }
  set goldBalance(e) {
    MakeMnGlobalData.goldBalance = e;
  }
  onLoad() {
    GlobalApp.MakeMnProcessComp = this;
    this.goldLabel && (this.goldLabel.string = MakeMnGlobalData.getCNGoldBalanceNum(MakeMnGlobalData.goldBalance));
    this.signInNode && (this.signInNode.scale = 0);
    this.taskNode && (this.taskNode.scale = 0);
    this.cashLabel && (this.cashLabel.string = MakeMnGlobalData.getCashBalance(MakeMnGlobalData.cashBalance));
    this.goldLabel && (this.goldLabel.string = MakeMnGlobalData.getCNGoldBalanceNum(MakeMnGlobalData.goldBalance));
    MakeMnGlobalData.infoType && (this.goldBubbleTip = MakeMnGlobalData.infoType.bubble_gold_balance);
    MakeMnGlobalData.infoType && (this.cashBubbleTip = MakeMnGlobalData.infoType.bubble_cash_balance);
    this.signInRedNode && (this.signInRedNode.active = false);
    this.taskRedNode && (this.taskRedNode.active = false);
    this.hideMonetizationUI();
  }
  hideMonetizationUI() {
    [this.goldNode, this.cashNode, this.levelBorardGrp && this.levelBorardGrp.node, this.signInNode, this.taskNode].forEach(function (e) {
      e && (e.active = false);
    });
    var e = this.node.getChildByName("top");
    e && (e.active = false);
  }
  commonShowPage(e, t) {
    if (!CommonUtil.onAwait(t + "pageShow", 300)) {
      AudioManager.instance.playBtn();
      PageMgr.showPageByEnum(t, {
        startPosition: e.target.worldPosition
      });
    }
  }
  async excuteRequestStartGameBefore() {
    return;
  }
  async excuteRequestStartGameAfter(e) {
    this.goldBubbleTip = e.bubble_gold_balance;
    this.cashBubbleTip = e.bubble_cash_balance;
    return;
  }
  async excuteAfterStartGame() {
    return;
  }
  async excuteSubmitGameBefore() {
    return;
  }
  async excuteSubmitGameAfter(e, t = null, o = false) {
    MakeMnGlobalData.submitGameDataInit(e);
    if (MakeMnGlobalData.startGameData.game_level > 2) {
      this.goldAddChangeAnim(e.gold_reward, t);
      this.cashAddChangeAnim(e.cash_reward, t);
    }
    if (!o) {
      this.goldBubbleTip = e.bubble_gold_balance;
      this.cashBubbleTip = e.bubble_cash_balance;
    }
    return;
  }
  async cashAddChangeAnim(e, t = null) {
    return this.effectNode.goldOrCashChangeAnim(e, t, "cash");
  }
  async goldAddChangeAnim(e, t = null) {
    return this.effectNode.goldOrCashChangeAnim(e, t, "gold");
  }
  async cashChangeAnim(e, t = null) {
    return this.effectNode.goldOrCashChangeAnim(e - this.cashBalance, t, "cash");
  }
  async goldChangeAnim(e, t = null) {
    return this.effectNode.goldOrCashChangeAnim(e - this.goldBalance, t, "gold");
  }
  setGoldBalance(e) {
    this.goldBalance = e;
    this.goldLabel && (this.goldLabel.string = MakeMnGlobalData.getCNGoldBalanceNum(this.goldBalance));
  }
  setCashBalance(e) {
    this.cashBalance = e;
    this.cashLabel && (this.cashLabel.string = MakeMnGlobalData.getCNCashNum(this.cashBalance));
  }
}
