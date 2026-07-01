import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class WithdrawRefundPage extends BasePage {
  @property(cc.Label)
  descLabel: cc.Label = null;
  @property(cc.Label)
  amountLabel: cc.Label = null;
  @property(cc.Label)
  timeLabel: cc.Label = null;
  @property(cc.Label)
  timeLabel2: cc.Label = null;
  @property(cc.RichText)
  tipRichText: cc.RichText = null;
  @property(cc.Label)
  tipTimeLabel: cc.Label = null;
  _init(t) {
    super._init.call(this, t);
    var o = new Date(1000 * t.time || Date.now());
    this.timeLabel.string = "" + EngineUtil.formatDateToChineseDateTime(o);
    var n = Date.now(),
      i = n - o.getTime() > 259200000 ? new Date(n + 86400000) : new Date(o.getTime() + 259200000);
    this.timeLabel2.string = "" + EngineUtil.formatDateToChineseDateTime(i);
    this.amountLabel.string = "" + MakeMnGlobalData.getCNCashNum(t.amount);
    switch (MakeMnGlobalData.startGameData.process_info.step) {
      case 2:
        t.isGuide && AudioManager.instance.playCash("cash_fail_activity");
        this.descLabel.string = "由于平台今日遭受恶意刷单，大额提现验证后才可到账\n预估到账成功率：92.86%";
        this.tipRichText.string = "通过<color=#FF0606FF>活跃度验证</color>，提现可<color=#FF0606FF>立即到账</color>";
        this.tipTimeLabel.string = "预计到账时间";
        break;
      case 3:
        t.isGuide && AudioManager.instance.playCash("cash_fail_5gallery");
        this.descLabel.string = "由于提现人数较多，大额提现需要排队，排队完成，即可提现\n当前队列：" + Math.floor(Math.max(6037 - (Date.now() - o.getTime()) / 259200000 * 6037, 3)) + "/12578";
        this.tipTimeLabel.string = "预计排队时间";
        this.tipRichText.string = "集齐<color=#FF0606FF>5本图集</c>，即可成为本游戏的<color=#FF0606FF>超级会员</c>，<color=#FF0606FF>立即插队</c>，<color=#FF0606FF>完成提现</c>。";
    }
  }
  _onHide() {
    super._onHide.call(this);
    AudioManager.instance.stopCash("cash_fail_activity");
    AudioManager.instance.stopCash("cash_fail_5gallery");
  }
  _onShow() {
    super._onShow.call(this);
  }
}