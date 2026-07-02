import decorator from "./decorator/decorator";
import EngineUtil from "./framework/Utils/EngineUtil";
import { PageEnum } from "./framework/enum/AllEnum";
import GlobalApp from "./common/GlobalApp";
import UiNode from "./common/UiNode";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import PageMgr from "./view/PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export class LevelBorardGrp extends cc.Component {
  @property(cc.Node)
  stage1: cc.Node = null;
  @property(cc.Node)
  stage2: cc.Node = null;
  @property(cc.Node)
  stage3: cc.Node = null;
  @property(cc.Sprite)
  progressSprite: cc.Sprite = null;
  @property(cc.Label)
  progressText: cc.Label = null;
  nowTween = null;
  nowActiveNum = 0;
  nowActiveTargetNum = 0;
  numTween = null;
  newstNum = 0;
  waitTime = 1;
  addTime = 0;
  @property(cc.Node)
  activityNode: cc.Node = null;
  @property(cc.Label)
  handBookLabel: cc.Label = null;
  onLoad() {
    this.stage1.active = false;
    this.stage2.active = false;
    this.stage3.active = false;
    this.progressSprite.fillRange = 0;
    this.progressText.string = "";
  }
  setProgressAnime(e, t) {
    var o;
    null === (o = this.nowTween) || void 0 === o || o.stop();
    this.nowTween = cc.tween(e).to(0.2, {
      fillRange: t
    }).start();
  }
  @decorator.Debounce(500)
  clickBoard() {
    return;
  }
  init(e) {
    var t = e.process_info.step;
    this.stage1.active = 1 == t;
    this.stage2.active = 2 == t;
    this.stage3.active = 3 == t || 4 == t;
    1 == t && this.initStage1(e);
    2 == t && this.initStage2(e);
    3 != t && 4 != t || this.initStage3(e);
  }
  getRoundDes(e) {
    var t = e.profile.level_info,
      o = t.turn_id,
      n = t.turn_max,
      i = t.round_id,
      a = t.round_max,
      r = (1 == o ? "" : o + "/" + n + "轮") + " " + (1 == i ? "" : i + "/" + a + "场");
    return r.replace(/\s+$/, "");
  }
  initStage1(e) {
    var t = this;
    this.progressText.string = "";
    var o = e.process_info.level_reward_list[e.process_info.level_reward_list.length - 1].level;
    this.setProgressAnime(this.progressSprite, (e.game_level - 1) / (o - 1));
    this.stage1.children[0].children.forEach(function (o, n) {
      var i = e.process_info.level_reward_list[n],
        a = o.getComponent(UiNode);
      a.uiLabels.get("level").string = "" + i.level;
      var r = a.uiNodes.get("core_jinduzt1");
      if (r) {
        a.uiLabels.get("qqq1").string = "" + i.desc;
        a.uiLabels.get("level2").string = "" + i.level;
        var c = a.uiNodes.get("core_jinduzt2"),
          s = a.uiNodes.get("core_jinduzt3");
        r.active = e.game_level > i.level;
        c.active = e.game_level == i.level;
        s.active = e.game_level < i.level;
      } else {
        var l = a.uiLabels.get("levelDetail");
        l.string = t.getRoundDes(e);
        l.node.parent.active = e.profile.level_info.turn_id > 1;
      }
    });
  }
  setStage2Progress(e, t) {
    this.progressText.string = e + "";
    this.setProgressAnime(this.progressSprite, e / t);
  }
  initStage2(e) {
    if (0 != this.nowActiveNum) this.updateActiveNum(e.process_info.num);else {
      this.progressText.string = e.process_info.num + "";
      this.setProgressAnime(this.progressSprite, e.process_info.num / e.process_info.target_num);
      this.nowActiveNum = e.process_info.num;
      this.nowActiveTargetNum = e.process_info.target_num;
    }
  }
  update(e) {
    if (PageMgr.isHasShowPage()) {
      this.addTime = 0;
    } else {
      this.addTime += e;
    }
  }
  async updateActiveNum(e) {
    var t = this;
    if (2 != MakeMnGlobalData.startGameData.process_info.step) return;
    if (e == this.nowActiveNum || isNaN(+e)) return;
    if (e < this.newstNum) return;
    MakeMnGlobalData.startGameData.process_info.num = e;
    this.newstNum = e;
    if (this.addTime <= this.waitTime) {
      this.scheduleOnce(function () {
        t.updateActiveNum(t.newstNum);
      }, 0.1);
      return;
    }
    e >= this.nowActiveTargetNum && PageMgr.openEventBlock("guide3sTEP");
    GlobalApp.MakeMnProcessComp.effectNode.flyToActivity(this.node.worldPosition.add(cc.v3(0, -150, 0)), this.activityNode.worldPosition, 10, async function () {
      const __async_this = t;
      var t_local,
        o,
        n = __async_this;
      t_local = __async_this.nowActiveNum;
      __async_this.setProgressAnime(__async_this.progressSprite, e / __async_this.nowActiveTargetNum);
      null === (o = __async_this.numTween) || void 0 === o || o.stop();
      __async_this.numTween = EngineUtil.showNumTween(0.2, function (o) {
        n.progressText.string = "" + Math.floor(t_local + (e - t_local) * o);
      }, function () {
        MakeMnGlobalData.startGameData.process_info.num = e;
        n.progressSprite.fillRange = e / n.nowActiveTargetNum;
      });
      PageMgr.closeEventBlock("guide3sTEP");
      if (e >= __async_this.nowActiveTargetNum) {
        await GlobalApp.MakeMnProcessComp.guideStep3();
      }
      return;
    });
    return;
  }
  initStage3(e) {
    this.progressText.string = e.process_info.num + "";
    this.setProgressAnime(this.progressSprite, e.process_info.num / e.process_info.target_num);
    this.handBookLabel.string = "" + e.process_info.target_num;
  }
}