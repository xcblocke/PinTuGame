import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
import GlobalApp from "./common/GlobalApp";
import { TweenEasing } from "./game/config/AnimeConfig";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class rewardToastPage extends BasePage {
  @property(cc.Label)
  cashLabel: cc.Label = null;
  @property(cc.Label)
  goldLabel: cc.Label = null;
  @property(cc.Node)
  cashNode: cc.Node = null;
  @property(cc.Node)
  goldNode: cc.Node = null;
  @property(cc.Node)
  cashIconNode: cc.Node = null;
  @property(cc.Node)
  goldIconNode: cc.Node = null;
  @property(cc.Node)
  propNode: cc.Node = null;
  @property(cc.Node)
  propNode2: cc.Node = null;
  goldReward = 0;
  cashReward = 0;
  inputData = null;
  i = 0;
  get PropNode() {
    return GlobalApp.GameContainer.propComp.propUiNode[0].node;
  }
  get PropNode2() {
    return GlobalApp.GameContainer.propComp.propUiNode[1].node;
  }
  _init(e) {
    var t = e.goldReward,
      o = e.cashReward,
      n = e.propCount,
      i = e.propCount2;
    this.i++;
    this.inputData = {
      goldReward: t,
      cashReward: o,
      propCount: n,
      propCount2: i
    };
    this.goldReward = t;
    this.cashReward = o;
    this.goldNode.active = t;
    this.cashNode.active = o;
    this.propNode.getComponentInChildren(cc.Label).string = "x" + (n || 1);
    this.propNode2.getComponentInChildren(cc.Label).string = "x" + (i || 1);
    this.propNode.active = false;
    this.goldNode.scale = 0;
    this.cashNode.scale = 0;
    this.propNode.scale = 0;
    this.propNode2.scale = 0;
    this.propNode.active = n > 0;
    this.propNode2.active = i > 0;
    this.cashLabel.string = MakeMnGlobalData.getCashBalanceWithUnit(o, "元");
    this.goldLabel.string = MakeMnGlobalData.getGoldBalanceWithUnit(t, "元");
    AudioManager.instance.playMusic("target_succ");
  }
  _onHide() {
    super._onHide.call(this);
    EngineUtil.triggerPromise("rewardToastPromise");
  }
  end() {
    console.log("end");
  }
  async _onShow() {
    var t,
      o,
      n,
      i,
      a,
      s,
      d = this;
    super._onShow.call(this);
    t = 0;
    this.cashNode.active && cc.tween(this.cashNode).delay(t++).to(0.1, {
      scale: 1
    }, {
      easing: TweenEasing.backOut
    }).start();
    this.goldNode.active && cc.tween(this.goldNode).delay(0.05 * t++).to(0.1, {
      scale: 1
    }, {
      easing: TweenEasing.backOut
    }).start();
    this.propNode.active && cc.tween(this.propNode).delay(0.05 * t++).to(0.1, {
      scale: 1
    }, {
      easing: TweenEasing.backOut
    }).start();
    this.propNode2.active && cc.tween(this.propNode2).delay(0.05 * t).to(0.1, {
      scale: 1
    }, {
      easing: TweenEasing.backOut
    }).start();
    await EngineUtil.sleep(1000 * (0.05 * t + 0.1));
    o = false;
    var r = GlobalApp.MakeMnProcessComp;
    if (!r) {
      if (!o) {
        o = true;
        this._hide();
      }
      return;
    }
    if (this.cashReward > 0) {
      r.cashNode && EngineUtil.setNodeToTop(r.cashNode);
      (async function () {
        const __async_this = d;
        await r.cashAddChangeAnim(__async_this.cashReward, __async_this.cashIconNode.worldPosition);
        r.cashNode && EngineUtil.recoverNodeToTop(r.cashNode);
        if (!o) {
          o = true;
          __async_this._hide();
        }
        return;
      }).call(d);
    }
    if (this.goldReward > 0) {
      r.goldNode && EngineUtil.setNodeToTop(r.goldNode);
      (async function () {
        const __async_this = d;
        await r.goldAddChangeAnim(__async_this.goldReward, __async_this.goldIconNode.worldPosition);
        r.goldNode && EngineUtil.recoverNodeToTop(r.goldNode);
        if (!o) {
          o = true;
          __async_this._hide();
        }
        return;
      }).call(d);
    }
    if (this.propNode.active) {
      EngineUtil.setNodeToTop(this.PropNode);
      i = this.propNode.getChildByName("prop_icon");
      n = cc.instantiate(i);
      s = i.worldPosition;
      n.parent = this.PropNode.parent;
      n.worldPosition = s;
      cc.tween(n).to(0.7, {
        worldPosition: this.PropNode.worldPosition,
        scale: 0.5
      }, {
        easing: TweenEasing.sineOut
      }).to(0.2, {
        scale: 0
      }).call(function () {
        EngineUtil.recoverNodeToTop(d.PropNode);
        n.destroy();
        if (!d.goldReward && !d.cashReward && !o) {
          o = true;
          d._hide();
        }
        GlobalApp.GameContainer.propComp.init();
      }).start();
    }
    if (this.propNode2.active) {
      EngineUtil.setNodeToTop(this.PropNode2);
      i = this.propNode2.getChildByName("prop_icon");
      a = cc.instantiate(i);
      s = i.worldPosition;
      a.parent = this.PropNode2.parent;
      a.worldPosition = s;
      cc.tween(a).to(0.7, {
        worldPosition: this.PropNode2.worldPosition,
        scale: 0.5
      }, {
        easing: TweenEasing.sineOut
      }).to(0.2, {
        scale: 0
      }).call(function () {
        EngineUtil.recoverNodeToTop(d.PropNode2);
        a.destroy();
        if (!d.goldReward && !d.cashReward && !o) {
          o = true;
          d._hide();
        }
        GlobalApp.GameContainer.propComp.init();
      }).start();
    }
    return;
  }
  close() {
    this._hide();
  }
}