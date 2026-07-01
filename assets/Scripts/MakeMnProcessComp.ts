import AudioManager from "./framework/Utils/AudioManager";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import SdkHelper from "./framework/Utils/SdkHelper";
import EngineUtil from "./framework/Utils/EngineUtil";
import { PageEnum } from "./framework/enum/AllEnum";
import { GuideEnum } from "./framework/enum/GuideConfig";
import Service from "./service/Service";
import CommonUtil from "./common/CommonUtil";
import GlobalApp from "./common/GlobalApp";
import { TweenEasing } from "./game/config/AnimeConfig";
import LocalData from "./game/cyll/LocalData";
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
  rewardList = [];
  isFirstInit = false;
  set goldBubbleTip(e) {
    if ("string" == typeof e) {
      this._goldBubbleTip = e;
      this.goldBubbleRichText.string = e || "闯关越多，赚钱越多";
    }
  }
  set cashBubbleTip(e) {
    if ("string" == typeof e) {
      this._cashBubbleTip = e;
      this.cashBubbleRichText.string = e;
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
    this.goldLabel.string = MakeMnGlobalData.getCNGoldBalanceNum(MakeMnGlobalData.goldBalance);
    this.signInNode.scale = 0;
    this.taskNode.scale = 0;
    this.cashLabel.string = MakeMnGlobalData.getCashBalance(MakeMnGlobalData.cashBalance);
    this.goldLabel.string = MakeMnGlobalData.getCNGoldBalanceNum(MakeMnGlobalData.goldBalance);
    this.goldBubbleTip = MakeMnGlobalData.infoType.bubble_gold_balance;
    this.cashBubbleTip = MakeMnGlobalData.infoType.bubble_cash_balance;
    this.signInRedNode.active = false;
    this.taskRedNode.active = false;
  }
  commonShowPage(e, t) {
    if (!CommonUtil.onAwait(t + "pageShow", 300)) {
      AudioManager.instance.playBtn();
      PageMgr.showPageByEnum(t, {
        startPosition: e.target.worldPosition
      });
    }
  }
  async guideStep4() {
    var e;
    await PageMgr.showPageByEnum(PageEnum.CollecImgPage, {
      step: 2
    });
    e = await PageMgr.showPageByEnum(PageEnum.CombineCashPage);
    await Service.gotoWithdraw_v2({
      tx_id: "101"
    });
    await PageMgr.showPageByEnum(PageEnum.wdSuccPage2, {
      amount: e,
      isShowAwait: true
    });
    EngineUtil.setGuideLocal(GuideEnum.galleryGuideStep4);
    await PageMgr.showPageByEnum(PageEnum.CollecImgPage, {
      step: 3
    });
    return;
  }
  async guideStep3() {
    var e;
    await PageMgr.showPageByEnum(PageEnum.ActLargeWithdrawPage);
    e = await PageMgr.showPageByEnum(PageEnum.CombineCashPage);
    await PageMgr.showPageByEnum(PageEnum.wdSuccPage2, {
      amount: e
    });
    EngineUtil.setGuideLocal(GuideEnum.galleryGuideStep3);
    MakeMnGlobalData.startGameData.process_info = {
      step: 3,
      num: MakeMnGlobalData.startGameData.gallery_count,
      target_num: MakeMnGlobalData.infoType.gallery_count_one_limit
    };
    await PageMgr.showPageByEnum(PageEnum.WithdrawRefundPage, {
      amount: e,
      isGuide: true
    });
    await PageMgr.showPageByEnum(PageEnum.CollecImgPage, {
      step: 1
    });
    await PageMgr.showPageByEnum(PageEnum.HandBookPage);
    this.levelBorardGrp.init(MakeMnGlobalData.startGameData);
    return;
  }
  async excuteRequestStartGameBefore() {
    if (!EngineUtil.testHasGuide(GuideEnum.welcomeGuideTip)) {
      await PageMgr.showPageByEnum(PageEnum.FirstPage);
      EngineUtil.setGuideLocal(GuideEnum.welcomeGuideTip);
      SdkHelper.reportData("guide_start");
    }
    return;
  }
  async excuteRequestStartGameAfter(e) {
    var t, o, n;
    e.is_extract;
    if (!(1 != e.is_extract)) {
      await PageMgr.showPageByEnum(PageEnum.AutoWithdrawPage, e);
      await PageMgr.showPageByEnum(PageEnum.wdPage, {
        isGuide: true
      });
    }
    if (e.subsidy_reward_flag) {
      await PageMgr.showPageByEnum(PageEnum.Cash1000Page);
    }
    if (2 == e.process_info.step && EngineUtil.testUnHasGuide(GuideEnum.activeGuide)) {
      await PageMgr.showPageByEnum(PageEnum.ActCheckPage);
      await PageMgr.showPageByEnum(PageEnum.ActTipPage);
      await PageMgr.showPageByEnum(PageEnum.ActLargeWithdrawPage, {
        isGuide: true
      });
      EngineUtil.setGuideLocal(GuideEnum.activeGuide);
    }
    if (3 == e.process_info.step && EngineUtil.testUnHasGuide(GuideEnum.galleryGuideStep3)) {
      await this.guideStep3();
    }
    if (4 == e.process_info.step && EngineUtil.testUnHasGuide(GuideEnum.galleryGuideStep4)) {
      await this.guideStep4();
    }
    this.levelBorardGrp.init(e);
    this.goldBubbleTip = e.bubble_gold_balance;
    this.cashBubbleTip = e.bubble_cash_balance;
    if (2 == e.process_info.step && EngineUtil.testUnHasGuide(GuideEnum.activeGuideClick)) {
      await GlobalApp.GameMain.showGuideNode({
        guideType: GuideEnum.activeGuideClick,
        nodes: [this.levelBorardGrp.node]
      });
    }
    if (MakeMnGlobalData.startGameData.game_level >= 4) {
      cc.tween(this.signInNode).to(0.3, {
        scale: 1
      }, {
        easing: TweenEasing.backOut
      }).start();
    } else {
      MakeMnGlobalData.infoType.sign_popup_flag = 0;
    }
    if (MakeMnGlobalData.startGameData.game_level >= 4 && EngineUtil.testUnHasGuide(GuideEnum.signPop) || MakeMnGlobalData.infoType.sign_popup_flag) {
      await EngineUtil.sleep(300);
      this.signInRedNode.active = true;
      await PageMgr.showPageByEnum(PageEnum.signInPage, {
        isGuide: true
      });
      MakeMnGlobalData.infoType.sign_popup_flag = 0;
      SdkHelper.reportData("signin_guide");
      EngineUtil.setGuideLocal(GuideEnum.signPop);
    }
    MakeMnGlobalData.startGameData.game_level >= 5 && MakeMnGlobalData.infoType.task_show && cc.tween(this.taskNode).to(0.3, {
      scale: 1
    }, {
      easing: TweenEasing.backOut
    }).start();
    ((null === (t = MakeMnGlobalData.submitGameData) || void 0 === t ? void 0 : t.task_point) > 0 || MakeMnGlobalData.infoType.task_point > 0) && (this.taskRedNode.active = true);
    if (MakeMnGlobalData.startGameData.game_level >= 5 && EngineUtil.testUnHasGuide(GuideEnum.taskPop)) {
      await EngineUtil.sleep(300);
      await PageMgr.showPageByEnum(PageEnum.taskPage, {
        isGuide: true
      });
      SdkHelper.reportData("task_guide_compete");
      EngineUtil.setGuideLocal(GuideEnum.taskPop);
    }
    if (null === (n = null === (o = MakeMnGlobalData.submitGameData) || void 0 === o ? void 0 : o.tx_ratio) || void 0 === n ? void 0 : n.new_tx_ratio) {
      if (await PageMgr.showPageByEnum(PageEnum.gradeCashPage, MakeMnGlobalData.submitGameData.tx_ratio)) {
        await PageMgr.showPageByEnum(PageEnum.redWdPage);
      }
    }
    if (!(1 == MakeMnGlobalData.startGameData.game_level)) {
      await PageMgr.showPageByEnum(PageEnum.LevelStartPage);
      return;
    } else {
      return;
    }
  }
  async excuteAfterStartGame() {
    var e;
    null === (e = PageMgr.getPageComp(PageEnum.wdPage)) || void 0 === e || e._hide();
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
    if (MakeMnGlobalData.startGameData.game_level >= 2 && !o) {
      if (gameData._isHelpCombine) return;
      MakeMnGlobalData.linkTimes++;
      if (MakeMnGlobalData.linkTimes >= MakeMnGlobalData.infoType.big_scroll_xc_count) {
        EventMgr.trigger(GameEventType.SHOW_TOPBIGBARRAGE);
        MakeMnGlobalData.linkTimes = 0;
      }
    }
    return;
  }
  showDemo(e = false) {
    if (!PageMgr.hasShowPage(PageEnum.wdSuccPage)) {
      AudioManager.getInstance().playMusic("btntouch");
      PageMgr.closeEventBlock("clearBlock");
      var t = MakeMnGlobalData.goldBalance;
      if (t < 1) e || EngineUtil.showCocosToast3("小于0.01元无法提现");else {
        this.demoWithDrawal(t);
        EventMgr.trigger(GameEventType.PAGE_SHOW, {
          name: "wdSuccPage",
          data: {
            amount: t
          }
        });
      }
    }
  }
  demoWithDrawal(e) {
    MakeMnGlobalData.goldBalance = 0;
    this.goldLabel.string = MakeMnGlobalData.getCNGoldBalanceNum(MakeMnGlobalData.goldBalance);
    this.rewardList.push(e);
    LocalData.getInstance().setUserCashData(MakeMnGlobalData.goldBalance);
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
    this.goldLabel.string = MakeMnGlobalData.getCNGoldBalanceNum(this.goldBalance);
  }
  setCashBalance(e) {
    this.cashBalance = e;
    this.cashLabel.string = MakeMnGlobalData.getCNCashNum(this.cashBalance);
  }
  async showCashPage() {
    await PageMgr.showPageByEnum(PageEnum.wdPage);
    return;
  }
  async showGoldPage() {
    await PageMgr.showPageByEnum(PageEnum.redWdPage);
    return;
  }
}