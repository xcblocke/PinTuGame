import AudioManager from "./framework/Utils/AudioManager";
import DeadLineBtn from "./comp/DeadLineBtn";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import { CommonReport } from "./report/CommonReport";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class AutoWithdrawPage extends BasePage {
  @property(cc.Label)
  levelLabel: cc.Label = null;
  @property(cc.Label)
  moneyLabel: cc.Label = null;
  @property(DeadLineBtn)
  deadLineBtn: DeadLineBtn = null;
  _init(t) {
    var o = this;
    super._init.call(this, t);
    CommonReport.instance.reportGameCashGuide();
    AudioManager.instance.playCash("withdrawal_target_complete");
    this.levelLabel.string = "恭喜通过第 " + ((null == t ? void 0 : t.game_level) - 1) + " 关";
    this.moneyLabel.string = MakeMnGlobalData.getCashBalance() + "元";
    this.deadLineBtn.init(4, function () {
      o._hide();
    }, "自动提现");
  }
  update() {}
  _onHide() {
    AudioManager.instance.stopCash("withdrawal_target_complete");
    super._onHide.call(this);
  }
  _onShow() {
    super._onShow.call(this);
    this.deadLineBtn.startTime();
  }
}