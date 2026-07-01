import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
import GlobalApp from "./common/GlobalApp";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class CombineCashPage extends BasePage {
  @property(cc.Label)
  totalAmountLabel: cc.Label = null;
  @property(cc.RichText)
  oldAmountRichText: cc.RichText = null;
  @property(cc.Node)
  listNode: cc.Node = null;
  @property(cc.Node)
  item: cc.Node = null;
  @property(cc.Node)
  buttonNode: cc.Node = null;
  arr = [];
  _init(t) {
    super._init.call(this, t);
    this.totalAmountLabel.string = "0";
    this.item.parent = null;
    this.buttonNode.active = false;
    this.arr = Object.values(MakeMnGlobalData.startGameData.combine_extract_amount_dict);
    this.resolveData = this.arr.reduce(function (e, t) {
      return e + t;
    }, 0);
    this.oldAmountRichText.string = "检测到您之前共有<color=#FF0000FF><size=39>" + this.arr.length + "笔</size></c>提现，本次所有现金将一并提现。";
  }
  _onHide() {
    super._onHide.call(this);
  }
  close() {
    super.close.call(this);
    this.listNode.children.forEach(function (e) {
      cc.tween(e).to(0.1, {
        scale: 0
      }).start();
    });
  }
  async _onShow() {
    var t,
      o = this;
    super._onShow.call(this);
    t = 0;
    this.listNode.removeAllChildren();
    this.listNode.x = 300;
    AudioManager.instance.playCash("cash_together");
    this.arr.forEach(async function (e) {
      const __async_this = o;
      var t;
      (t = cc.instantiate(__async_this.item)).active = true;
      t.parent = __async_this.listNode;
      t.getComponentInChildren(cc.Label).string = "" + MakeMnGlobalData.getCNCashNum(e);
      return;
    });
    await EngineUtil.sleep(300);
    cc.tween(this.listNode).to(0.5 * this.arr.length, {
      x: -this.listNode.width
    }).call(function () {
      cc.tween(o.listNode).to(1, {
        x: -o.listNode.width / 2
      }).call(function () {
        o.buttonNode.active = true;
        o.arr.forEach(async function (e, n) {
          const __async_this = o;
          var o_local = __async_this;
          await EngineUtil.sleep(0.05 * n);
          GlobalApp.MakeMnProcessComp.effectNode.flyToCash(__async_this.listNode.children[n].worldPosition, __async_this.totalAmountLabel.node.worldPosition, 10, function () {
            AudioManager.instance.playMusic("addbalance");
            t += e;
            EngineUtil.showNumTween(0.2, function (e) {
              o_local.totalAmountLabel.string = "" + MakeMnGlobalData.getCNCashNum(t * e);
            });
            n == o_local.arr.length - 1 && (o_local.buttonNode.active = true);
          });
          return;
        });
      }).start();
    }).start();
    return;
  }
}