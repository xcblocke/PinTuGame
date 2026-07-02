import decorator from "./decorator/decorator";
import EngineUtil from "./framework/Utils/EngineUtil";
import { PropType, AdRewardType, VideoActionType } from "./framework/enum/AllEnum";
import GlobalApp from "./common/GlobalApp";
import { gameData } from "./data/GameData";
import { CommonReport } from "./report/CommonReport";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
var i;
(i = {})[PropType.helpCombine] = {
  config: `gkey_233`,
  titlte: `gkey_234`,
  reportName: AdRewardType.helpCombine
};
i[PropType.wholeImage] = {
  config: `gkey_021`,
  titlte: `gkey_235`,
  reportName: AdRewardType.wholeImage
};
var v = i;
@ccclass
export default class propBuyPage extends BasePage {
  @property(cc.Sprite)
  propSprite: cc.Sprite = null;
  @property([cc.SpriteFrame])
  propSpriteFrames: Array<cc.SpriteFrame> = [];
  @property(cc.Label)
  propDescLabel: cc.Label = null;
  @property(cc.Node)
  closeNode: cc.Node = null;
  @property(cc.Node)
  btnNode: cc.Node = null;
  @property(sp.Skeleton)
  spine: sp.Skeleton = null;
  nowPropType = null;
  get cxName() {
    return this.nowPropType == PropType.helpCombine ? "cx2" : "cx";
  }
  get djName() {
    return this.nowPropType == PropType.helpCombine ? "dj2" : "dj";
  }
  _onShow() {
    var t = this;
    super._onShow.call(this);
    this.spine.setAnimation(0, this.cxName, false);
    this.scheduleOnce(function () {
      t.spine.node.opacity = 255;
    }, 0.01);
    this.spine.setCompleteListener(function () {
      t.spine.setAnimation(0, t.djName, true);
      t.spine.setCompleteListener(null);
    });
    this.scheduleOnce(function () {
      t.btnNode.active = true;
      t.btnNode.opacity = 0;
      cc.tween(t.btnNode).to(0.3, {
        opacity: 255
      }).start();
      t.closeNode.active = true;
      t.closeNode.opacity = 0;
      cc.tween(t.closeNode).to(0.3, {
        opacity: 255
      }).start();
      cc.tween(t.propDescLabel.node).to(0.3, {
        opacity: 255
      }).start();
    }, 0.3);
  }
  _init(e) {
    this.nowPropType = e;
    this.propSprite.spriteFrame = this.propSpriteFrames[this.nowPropType - 1];
    this.resolveData = false;
    this.propDescLabel.string = v[this.nowPropType].config;
    CommonReport.instance.reportGameAdPlay({
      page_id: v[this.nowPropType].reportName,
      action_type: VideoActionType.show,
      force: 0
    });
    this.spine.node.opacity = 0;
    this.btnNode.active = false;
    this.closeNode.active = false;
    this.propDescLabel.node.opacity = 0;
  }
  successRelive(e) {
    if (e) {
      gameData.startgameData.prop_info = e.prop_info;
      GlobalApp.GameContainer.propComp.init();
      this.resolveData = true;
      this._hide();
    } else this._hide();
  }
  @decorator.Debounce(1000)
  async buyProp() {
    var e;
    if (!(await EngineUtil.isOppoAd())) return;
    e = this.nowPropType == PropType.helpCombine ? {
      propCount: 2
    } : {
      propCount2: 2
    };
    EngineUtil.playVideoCommon(v[this.nowPropType].reportName, this.nowPropType, this.successRelive.bind(this), false, 0, e);
    return;
  }
}