import decorator from "./decorator/decorator";
import AudioManager from "./framework/Utils/AudioManager";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import EngineUtil from "./framework/Utils/EngineUtil";
import TimeUtils from "./framework/Utils/TimeUtils";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class goldSuccPage extends BasePage {
  @property(cc.Label)
  cashLb: cc.Label = null;
  @property(cc.Label)
  cashLb2: cc.Label = null;
  @property(cc.Node)
  page1: cc.Node = null;
  @property(cc.Node)
  font1: cc.Node = null;
  @property(cc.Node)
  page2: cc.Node = null;
  @property(cc.Node)
  handNode1: cc.Node = null;
  @property(sp.Skeleton)
  skeleton: sp.Skeleton = null;
  @property(cc.Label)
  nicknameLabel: cc.Label = null;
  @property(cc.Label)
  timeLabel: cc.Label = null;
  @property(cc.Sprite)
  headSp: cc.Sprite = null;
  cb = null;
  isOver = false;
  async _init(t) {
    EventMgr.trigger(GameEventType.UPDATE_BUBBLE);
    this.rewardCashData = t;
    this.cb = t.cb;
    super._init.call(this, t);
    this.page1.active = true;
    this.page2.active = false;
    this.cashLb2.string = t.gold_reward + "元";
    this.cashLb.string = t.gold_reward + "";
    MakeMnGlobalData.addUserGoldBalance(t.gold_reward, false);
    this.font1.opacity = 255;
    this.font1.y = 98.249;
    EngineUtil.setUserNameAndHeadImage(this.nicknameLabel, this.headSp);
    this.timeLabel.string = TimeUtils.getDateString();
    this.skeleton.setAnimation(0, "dj1", false);
    return;
  }
  @decorator.Debounce(1000)
  openPage2() {
    var e = this;
    AudioManager.getInstance().playMusic("dztx");
    cc.tween(this.font1).delay(0.1).by(0.3, {
      opacity: -255,
      y: 300
    }).start();
    this.skeleton.setAnimation(0, "dj2", false);
    this.handNode1.opacity = 0;
    this.skeleton.setCompleteListener(function () {
      // AudioManager.instance.playMusic("gold_succ");
      cc.tween(e.page2).to(0.2, {
        opacity: 255
      }).call(function () {
        e.handNode1.opacity = 255;
        e.isOver = true;
      }).start();
    });
    this.page2.active = true;
    this.page2.opacity = 0;
    this.page1.active = false;
  }
  async close() {
    if (!this.isOver) return;
    this.cb && this.cb();
    this.isOver = false;
    AudioManager.getInstance().playMusic("btntouch");
    this._hide();
    return;
  }
}