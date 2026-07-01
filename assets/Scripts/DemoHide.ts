import GameData from "./data/GameData";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export class DemoHide extends cc.Component {
  onLoad() {
    GameData.getInstance().isOpenDemo && (this.node.active = false);
  }
}