import AudioManager from "./framework/Utils/AudioManager";
const {
  ccclass,
  property,
  menu
} = cc._decorator;
@ccclass
@menu(`gkey_053`)
export default class BtnClickSoundComp extends cc.Component {
  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, function () {
      AudioManager.instance.playBtn();
    });
  }
  start() {}
}