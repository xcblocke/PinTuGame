import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
import { RequestType } from "./service/RequestType";
import Service from "./service/Service";
import GlobalApp from "./common/GlobalApp";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class ActCheckPage extends BasePage {
  @property(cc.Sprite)
  headSprite: cc.Sprite = null;
  @property(cc.Label)
  nicknameLabel: cc.Label = null;
  @property(cc.Label)
  activeValueLabel: cc.Label = null;
  @property(cc.Node)
  activeListRoot: cc.Node = null;
  @property(cc.Node)
  activeListItem: cc.Node = null;
  @property(cc.Node)
  closeNode: cc.Node = null;
  res = null;
  onLoad() {
    super.onLoad.call(this);
    this.startPosition = GlobalApp.MakeMnProcessComp.levelBorardGrp.node.worldPosition;
  }
  async _init(t) {
    var o;
    super._init.call(this, t);
    AudioManager.instance.playCash("activity_1");
    this.activeListRoot.removeAllChildren();
    this.closeNode.active = false;
    o = await Service.commonApiPost(RequestType.getBigCashVerifyInfo);
    this.res = o.data;
    this.activeValueLabel.string = "0";
    EngineUtil.setUserNameAndHeadImage(this.nicknameLabel, this.headSprite);
    return;
  }
  _onHide() {
    AudioManager.instance.stopCash("activity_1");
    super._onHide.call(this);
  }
  async _onShow() {
    var t,
      o,
      n,
      i,
      a,
      s,
      u,
      p = this;
    super._onShow.call(this);
    t = this.res;
    o = t.verify_list;
    n = 0;
    while (n < t.verify_list.length) {
      i = n;
      (a = cc.instantiate(this.activeListItem)).parent = this.activeListRoot;
      a.active = true;
      s = a.getChildByName("title").getComponent(cc.Label);
      if ("extract" == o[i].type) {
        s.string = "已提现" + o[i].current + "次";
      } else {
        if ("video" == o[i].type) {
          s.string = "累计看视频" + o[i].current + "个";
        } else {
          s.string = "已闯关" + o[i].current + "次";
        }
      }
      u = t.verify_list[n].base_num;
      a.getChildByName("activity").getComponent(cc.Label).string = "+" + u;
      a.opacity = 0;
      cc.tween(a).to(0.2, {
        opacity: 255
      }).start();
      await EngineUtil.sleep(500);
      n++;
    }
    EngineUtil.showNumTween(0.5, function (e) {
      p.activeValueLabel.string = "" + Math.floor(p.res.current_activity_num * e);
    }, async function () {
      const __async_this = p;
      __async_this.activeValueLabel.string = "" + __async_this.res.current_activity_num;
      await EngineUtil.sleep(1000);
      __async_this._hide();
      return;
    });
    return;
  }
}