import decorator from "./decorator/decorator";
import AudioManager from "./framework/Utils/AudioManager";
import GlobaldataMgr from "./framework/data/GlobaldataMgr";
import { PageEnum } from "./framework/enum/AllEnum";
import { GuideConfig } from "./framework/enum/GuideConfig";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import SdkHelper from "./framework/Utils/SdkHelper";
import EngineUtil from "./framework/Utils/EngineUtil";
import CommonUtil from "./common/CommonUtil";
import GlobalApp from "./common/GlobalApp";
import { Res } from "./common/ResourcesManager";
import { gameData, GameState } from "./data/GameData";
import { CommonReport } from "./report/CommonReport";
import GameSystem from "./system/GameSystem";
import PageMgr from "./view/PageMgr";
import Guide from "./Guide";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class GameMain extends cc.Component {
  guideNode = null;
  guideArrs = [];
  debugNode = null;
  showTimes = 0;
  get guideComp() {
    var e;
    return null === (e = this.guideNode) || void 0 === e ? void 0 : e.getComponent(Guide);
  }
  get makeMnProcessComp() {
    return GlobalApp.MakeMnProcessComp;
  }
  get gameContainerComp() {
    return GlobalApp.GameContainer;
  }
  commonShowPage(e, t) {
    if (!CommonUtil.onAwait(t + "pageShow", 300)) {
      AudioManager.instance.playBtn();
      PageMgr.showPageByEnum(t, {
        startPosition: e.target.worldPosition
      });
    }
  }
  onLoad() {
    GlobalApp.GameMain = this;
    EventMgr.listen(GameEventType.STOP_GAME_TIME, this.stopUpdateGameTime, this, null);
    EventMgr.listen(GameEventType.START_GAME_TIME, this.startUpdateGameTime, this, null);
    "1" == EngineUtil.localStorageGetItem("bg_audio", "1") && AudioManager.getInstance().openBg();
  }
  hideNodeIfExists(e) {
    try {
      var t = cc.find(e, this.node);
      t && (t.active = false);
    } catch (o) {}
  }
  
  @decorator.Debounce(2000)
  restartGame() {
    gameData.restart_times++;
    this.startgame(1);
  }
  async overgame() {
    var e, t;
    gameData.gameState = GameState.gameover;
    this.stopUpdateGameTime();
    e = GameSystem.submitGame(1);
    await PageMgr.showPageByEnum(PageEnum.SettleWholeImgPage);
    t = await e;
    await PageMgr.showPageByEnum(PageEnum.SettlementPage, t);
    this.startgame(0);
    return;
  }
  closeGuideNode(e) {
    var t;
    (null === (t = this.guideComp) || void 0 === t ? void 0 : t.nowGuideType) == e && this.guideComp.close();
  }
  async showGuideNode(e) {
    var t, o, n;
    var i,
      a,
      r,
      s = this;
    i = e.guideType;
    if (EngineUtil.testHasGuide(i)) return;
    if (null === (t = this.guideNode) || void 0 === t ? void 0 : t.parent) {
      (null === (o = this.guideNode) || void 0 === o ? void 0 : o.getComponent(Guide).nowGuideType) != i && !this.guideArrs.find(function (e) {
        return e[0] === i;
      }) && this.guideArrs.push(e);
      return;
    }
    a = cc.instantiate(Res.getPrefab("guide"));
    if (null === (n = GuideConfig[i]) || void 0 === n ? void 0 : n.needShowTween) {
      a.opacity = 0;
      cc.tween(a).to(0.2, {
        opacity: 255
      }).start();
    }
    this.guideNode = a;
    a.name = "guide";
    a.getComponent(Guide).showGuideByNode(e);
    r = EngineUtil.getPromiseResolve("guide" + e.guideType);
    a.getComponent(Guide).cb = function () {
      var t;
      s.guideNode = null;
      null === (t = e.cb) || void 0 === t || t.call(e);
      var o = s.guideArrs.shift();
      o && s.showGuideNode(o);
      EngineUtil.triggerPromise("guide" + e.guideType);
    };
    if (e.parentNode) {
      e.parentNode.addChild(a);
    } else {
      this.node.parent.addChild(a);
    }
    return r;
  }
  start() {
    GlobaldataMgr.auth_type && SdkHelper.ysdkLogin();
    this.startgame();
  }
  onDestroy() {
    EventMgr.ignore(GameEventType.RESTART_GAME, this.restartGame, this);
    EventMgr.ignore(GameEventType.STOP_GAME_TIME, this.stopUpdateGameTime, this);
    EventMgr.ignore(GameEventType.START_GAME_TIME, this.startUpdateGameTime, this);
  }
  async initGameData(e) {
    gameData.gameState = GameState.gameing;
    this.startUpdateGameTime();
    await this.gameContainerComp.init(e);
    gameData.loadRemoteLevelData(e.profile.next_level_url);
    return;
  }
  async startgame(e = 0) {
    var t = this.makeMnProcessComp;
    if (t) {
      await t.excuteRequestStartGameBefore();
    }
    var o = await GameSystem.startGame(e);
    if (t) {
      await t.excuteRequestStartGameAfter(o.data);
      await t.excuteAfterStartGame(o.data);
    }
    CommonReport.instance.reportGameStart();
    await this.initGameData(o.data);
  }
  stopUpdateGameTime() {
    this.unschedule(this.updateGameTime);
  }
  startUpdateGameTime() {
    this.schedule(this.updateGameTime, 1);
  }
  updateGameTime() {
    gameData.gameTime++;
  }
}