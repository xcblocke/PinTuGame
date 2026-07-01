import AudioManager from "./framework/Utils/AudioManager";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import EngineUtil from "./framework/Utils/EngineUtil";
import PlayerDataSys from "./framework/Utils/PlayerDataSys";
import { gameData } from "./data/GameData";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class wdSuccPage extends BasePage {
  @property(cc.Label)
  amount: cc.Label = null;
  @property(cc.Label)
  userName: cc.Label = null;
  @property(cc.Node)
  head: cc.Node = null;
  @property(cc.Node)
  succTip: cc.Node = null;
  guide_cb = null;
  gameSucc = false;
  _init(t) {
    var o = t.amount,
      n = t.gameSucc,
      i = t.guide_cb;
    console.log("======== init wd success page", i);
    this.gameSucc = n || false;
    this.guide_cb = i || null;
    this.amount.string = o < 1 ? "" + o : MakeMnGlobalData.getCNCashNum(o);
    this.userName.string = "随风";
    PlayerDataSys.headimgurl && EngineUtil.loaderHead(PlayerDataSys.headimgurl, this.head);
    AudioManager.getInstance().playCash("withdrawal_success");
    AudioManager.getInstance().playMusic("yanhua");
    if (this.succTip) {
      this.succTip.setPosition(cc.v3(0, 980));
      cc.tween(this.succTip).to(0.5, {
        position: cc.v3(0, 750)
      }).start();
    }
    super._init.call(this, t);
  }
  clickClose() {
    AudioManager.getInstance().stopEffect("yanhua");
    console.log("========", null == this.guide_cb);
    this.guide_cb && this.guide_cb();
    EventMgr.trigger(GameEventType.REFRESH_MYBALANCE);
    PlayerDataSys.guideStep;
    this._hide();
  }
  showRewardList() {
    gameData.isOpenDemo && EventMgr.trigger(GameEventType.PAGE_SHOW, {
      name: "rewardListPage",
      data: {
        amount: 1
      }
    });
    this.clickClose();
  }
}