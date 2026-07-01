import AudioManager from "./framework/Utils/AudioManager";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import EngineUtil from "./framework/Utils/EngineUtil";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class wdSuccPage2 extends BasePage {
  @property(cc.Label)
  amount: cc.Label = null;
  @property(cc.Label)
  userName: cc.Label = null;
  @property(cc.Sprite)
  headSp: cc.Sprite = null;
  @property(cc.Node)
  waitNode: cc.Node = null;
  _init(t) {
    var o = t.amount,
      n = t.isShowAwait;
    this.amount.string = "" + MakeMnGlobalData.getCNCashNum(o);
    this.waitNode.active = n;
    EngineUtil.setUserNameAndHeadImage(this.userName, this.headSp);
    AudioManager.getInstance().playCash("wd_succ");
    super._init.call(this, t);
  }
  clickClose() {
    EventMgr.trigger(GameEventType.REFRESH_MYBALANCE);
    this._hide();
  }
}