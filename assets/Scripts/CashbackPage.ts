import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class CashbackPage extends BasePage {
  @property(cc.Sprite)
  headSprite: cc.Sprite = null;
  @property(cc.Label)
  nicknameLabel: cc.Label = null;
  @property(cc.Label)
  moneyLabel: cc.Label = null;
  @property(cc.Label)
  levelLabel: cc.Label = null;
  _init(t) {
    super._init.call(this, t);
    EngineUtil.setUserNameAndHeadImage(this.nicknameLabel, this.headSprite);
    this.moneyLabel.string = "" + MakeMnGlobalData.getCNCashNum(t.amount);
    this.levelLabel.string = t.nextLevel + "关";
    AudioManager.instance.playCash("cash_back");
  }
  _onHide() {
    super._onHide.call(this);
    AudioManager.instance.stopCash("cash_back");
  }
  _onShow() {
    super._onShow.call(this);
  }
}