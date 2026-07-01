import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
import Service from "./service/Service";
import GlobalApp from "./common/GlobalApp";
import UiNode from "./common/UiNode";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
var m = cc.v3(215.964, 23.388);
var _ = cc.v3(290.709, 50.331);
@ccclass
export default class ActLargeWithdrawPage extends BasePage {
  @property(cc.Node)
  listNode: cc.Node = null;
  @property(cc.Label)
  curActivityNum: cc.Label = null;
  @property(cc.Label)
  targetActivityNum: cc.Label = null;
  @property(cc.Label)
  titleLb: cc.Label = null;
  @property(cc.Node)
  completeNode: cc.Node = null;
  @property(cc.Node)
  clickBtnNode: cc.Node = null;
  isCompete = false;
  @property(cc.Sprite)
  headSprite: cc.Sprite = null;
  async verify() {
    EngineUtil.showCocosToast3("验证不通过，继续闯关吧");
    await EngineUtil.sleep(600);
    this.close();
    return;
  }
  _onHide() {
    super._onHide.call(this);
    AudioManager.instance.stopCash("activity_3");
    AudioManager.instance.stopCash("activity_complete");
  }
  _onShow() {
    super._onShow.call(this);
  }
  async _init(t) {
    var o,
      n,
      i,
      a,
      f = this;
    super._init.call(this, t);
    this.inputData = t;
    EngineUtil.setUserNameAndHeadImage(null, this.headSprite);
    o = await Service.getBigCashExtractInfo();
    if (1 == (n = o.data).status) {
      GlobalApp.MakeMnProcessComp.levelBorardGrp.setStage2Progress(n.current_activity_num, n.target_activity_num);
      this.isCompete = true;
      this.playCompleteAnim();
      this.titleLb.string = "恭喜活跃度达标";
      AudioManager.instance.playCash("activity_complete");
    } else {
      AudioManager.instance.playCash("activity_3");
      t.isGuide && this.scheduleOnce(function () {
        f._hide();
      }, 5);
    }
    this.curActivityNum.string = "" + n.current_activity_num;
    this.targetActivityNum.string = "活跃度目标：" + n.target_activity_num;
    i = 0;
    a = -1;
    this.listNode.children.forEach(function (e, t) {
      var o = e.getComponent(UiNode),
        s = n.verify_list[t],
        u = o.uiLabels.get("111"),
        p = o.uiLabels.get("title"),
        h = o.uiLabels.get("New Label"),
        g = 3;
      if ("level" == s.type) u.string = "任务" + (t + 1) + " : 通过关卡一次";else if ("video" == s.type) u.string = "任务" + (t + 1) + " : 观看视频一次";else {
        g = 5;
        u.string = "任务" + (t + 1) + " : 提现一次";
      }
      p.string = "+" + Math.max(s.base_score, g);
      i += s.total_score;
      h.string = "x" + s.count;
      h.node.active = s.count > 0;
      var y = h.node.position;
      if (s.count > 0) {
        h.node.position = m;
        h.node.opacity = 0;
        h.node.scale = 1;
        a++;
        cc.tween(h.node).delay(0.3).delay(0.2 * a).to(0.3, {
          y: 40,
          opacity: 255
        }).delay(0.5).to(0.3, {
          scale: 0.5,
          position: _
        }).to(0.1, {
          scale: 0
        }).call(function () {
          h.node.active = false;
          h.node.position = y;
          EngineUtil.showNumTween(0.4, function (e) {
            p.string = "+" + Math.floor(s.total_score * e);
          }, async function () {
            const __async_this = f;
            var e,
              t,
              o,
              a,
              r = __async_this;
            await EngineUtil.sleep(200);
            p.string = "+" + s.total_score;
            e = p.node.position;
            t = __async_this.curActivityNum.node.position;
            o = __async_this.curActivityNum.node.parent.convertToWorldSpaceAR(t);
            a = p.node.parent.convertToNodeSpaceAR(o);
            cc.tween(p.node).to(0.4, {
              position: a
            }).call(function () {
              p.node.opacity = 0;
              EngineUtil.showNumTween(0.4, function (e) {
                r.curActivityNum.string = "" + Math.floor(n.current_activity_num - i + i * e);
              }, function () {
                p.node.position = e;
                p.string = "+" + s.base_score;
                cc.tween(p.node).to(0.3, {
                  opacity: 255
                }).start();
                if (1 != r.clickBtnNode.active) {
                  r.clickBtnNode.active = true;
                  r.clickBtnNode.opacity = 0;
                  cc.tween(r.clickBtnNode).to(0.3, {
                    opacity: 255
                  }).start();
                  1 == n.status && r.scheduleOnce(function () {
                    r.close();
                  }, 1);
                }
              });
            }).start();
            return;
          });
        }).start();
      }
    });
    this.curActivityNum.string = "" + (n.current_activity_num - i);
    this.clickBtnNode.active = 0 == i;
    return;
  }
  onLoad() {
    this.startPosition = GlobalApp.MakeMnProcessComp.levelBorardGrp.node.worldPosition;
    super.onLoad.call(this);
  }
  close() {
    this._hide();
  }
  playCompleteAnim() {
    this.completeNode.active = true;
    this.completeNode.scale = 1.5;
    cc.tween(this.completeNode).to(0.2, {
      scale: 1
    }).start();
  }
  onbtnAddClick() {}
  isCompleteTask() {
    var e = this.listNode.children[0].getChildByPath("comptask1finish"),
      t = this.listNode.children[1].getChildByPath("comptask2finish"),
      o = this.listNode.children[2].getChildByPath("comptask3finish");
    return e.active && t.active && o.active;
  }
}