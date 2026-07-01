import EngineUtil from "./framework/Utils/EngineUtil";
const {
  ccclass,
  property,
  menu
} = cc._decorator;
@ccclass("SpinesLoopData")
class SpinesLoopData {
  @property(sp.Skeleton)
  spine: sp.Skeleton = null;
  @property(cc.Float)
  delayTime: number = 0.5;
  @property(cc.String)
  animation: string = "animation";
}
@ccclass
@menu("动画/多spine周期播放")
export default class SpinesLoop extends cc.Component {
  @property([SpinesLoopData])
  spineLoopDatas: Array<SpinesLoopData> = [];
  @property({
    type: cc.Float,
    tooltip: "间隔周期"
  })
  interval: number = 2;
  async setSpine(e = 0) {
    var t,
      o = this;
    if (!(0 != e)) {
      await EngineUtil.sleep(1000 * this.interval);
    }
    (t = this.spineLoopDatas[e].spine).node.active = true;
    t.setAnimation(0, this.spineLoopDatas[e].animation, false);
    t.setCompleteListener(function () {
      o.setSpine((e + 1) % o.spineLoopDatas.length);
    });
    return;
  }
  onLoad() {
    this.spineLoopDatas.forEach(function (e) {
      e.spine.node.active = false;
    });
    this.setSpine();
  }
  start() {}
}