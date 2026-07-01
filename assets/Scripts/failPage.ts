import decorator from "./decorator/decorator";
import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
import { AdRewardType, VideoActionType } from "./framework/enum/AllEnum";
import GlobalApp from "./common/GlobalApp";
import { CommonReport } from "./report/CommonReport";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class failPage extends BasePage {
  @property(cc.Node)
  buttonNode: cc.Node = null;
  @property(cc.Node)
  buttonNode2: cc.Node = null;
  @property(cc.Node)
  levelNode: cc.Node = null;
  @property(sp.Skeleton)
  spine: sp.Skeleton = null;
  @property(cc.Node)
  chongkaiNode: cc.Node = null;
  isRelive = false;
  onLoad() {
    super.onLoad.call(this);
  }
  _onShow() {
    var t = this;
    super._onShow.call(this);
    this.scheduleOnce(function () {
      t.spine.node.opacity = 255;
    }, 0.01);
    this.spine.setAnimation(0, "show", false);
    this.spine.setCompleteListener(function () {
      t.spine.setAnimation(0, "loop", true);
      t.spine.setCompleteListener(null);
    });
  }
  async _init(e = false) {
    this.buttonNode.active = e;
    this.chongkaiNode.active = e;
    this.buttonNode2.active = !e;
    this.spine.node.opacity = 0;
    AudioManager.getInstance().playMusic("fail");
    CommonReport.instance.failPass();
    e && CommonReport.instance.reportGameAdPlay({
      page_id: AdRewardType.revive,
      action_type: VideoActionType.show,
      force: 0
    });
    return;
  }
  tryAgain() {
    this._hide();
    this.isRelive = false;
  }
  _onHide() {
    super._onHide.call(this);
    this.isRelive || GlobalApp.GameMain.restartGame();
  }
  @decorator.Debounce(1000)
  async lookAd() {
    EngineUtil.playVideoCommon(AdRewardType.revive, 0, this.relive.bind(this));
    return;
  }
  async relive() {
    this.isRelive = true;
    this._hide();
    return;
  }
}